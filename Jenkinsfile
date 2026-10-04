pipeline {

    agent any

    environment {

        // ==========================================
        // Docker Hub Images
        // ==========================================

        BACKEND_IMAGE  = 'rajsharmaa/ems-backend'
        FRONTEND_IMAGE = 'rajsharmaa/ems-frontend'

        // Jenkins Build Number as Docker Image Tag
        IMAGE_TAG = "${BUILD_NUMBER}"


        // ==========================================
        // Application EC2
        // ==========================================

        EC2_USER    = 'ubuntu'
        EC2_HOST    = '13.203.130.223'
        EC2_APP_DIR = '/home/ubuntu/Employee-Management-System-'
    }


    stages {


        // ==========================================
        // 1. CHECKOUT
        // ==========================================

        stage('Checkout') {

            steps {

                checkout scm
            }
        }


        // ==========================================
        // 2. SONARQUBE ANALYSIS - DEBUG
        // ==========================================

        stage('SonarQube Analysis') {

            steps {

                script {

                    // Get SonarScanner configured in:
                    // Manage Jenkins → Tools → SonarQube Scanner

                    def scannerHome = tool 'SonarScanner'


                    echo "======================================"
                    echo "SonarScanner Location"
                    echo "${scannerHome}"
                    echo "======================================"


                    withSonarQubeEnv('sonarqube') {

                        withCredentials([
                            string(
                                credentialsId: 'sonarqube-token',
                                variable: 'SONAR_TOKEN'
                            )
                        ]) {

                            sh """
                                set -e

                                echo "======================================"
                                echo "Checking SonarScanner Installation"
                                echo "======================================"

                                ls -la "${scannerHome}"

                                echo "--------------------------------------"

                                ls -la "${scannerHome}/bin"


                                echo "======================================"
                                echo "SonarScanner Version"
                                echo "======================================"

                                "${scannerHome}/bin/sonar-scanner" --version


                                echo "======================================"
                                echo "SonarQube Server URL"
                                echo "======================================"

                                echo "\$SONAR_HOST_URL"


                                echo "======================================"
                                echo "Running SonarQube Analysis"
                                echo "======================================"


                                "${scannerHome}/bin/sonar-scanner" \
                                    -Dsonar.projectKey=employee-management-system \
                                    -Dsonar.projectName=Employee-Management-System \
                                    -Dsonar.sources=. \
                                    -Dsonar.exclusions='**/node_modules/**,**/dist/**,**/build/**,**/.git/**' \
                                    -Dsonar.token="\$SONAR_TOKEN"


                                echo "======================================"
                                echo "Checking SonarQube Report"
                                echo "======================================"


                                echo "Workspace files:"
                                ls -la


                                echo "--------------------------------------"


                                echo "Checking .scannerwork directory:"


                                if [ -d ".scannerwork" ]; then

                                    echo ".scannerwork FOUND"

                                    ls -la .scannerwork

                                else

                                    echo ".scannerwork NOT FOUND"

                                fi


                                echo "======================================"
                                echo "SonarQube Analysis Completed"
                                echo "======================================"
                            """
                        }
                    }
                }
            }
        }


        // ==========================================
        // 3. SONARQUBE QUALITY GATE
        // ==========================================

        stage('Quality Gate') {

            steps {

                timeout(
                    time: 5,
                    unit: 'MINUTES'
                ) {

                    waitForQualityGate(
                        abortPipeline: true
                    )
                }
            }
        }


        // ==========================================
        // 4. BUILD BACKEND DOCKER IMAGE
        // ==========================================

        stage('Build Backend Image') {

            steps {

                sh '''
                    echo "======================================"
                    echo "Building Backend Docker Image"
                    echo "======================================"

                    docker build \
                        -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                        ./backend

                    echo "Backend image created:"
                    echo "${BACKEND_IMAGE}:${IMAGE_TAG}"
                '''
            }
        }


        // ==========================================
        // 5. BUILD FRONTEND DOCKER IMAGE
        // ==========================================

        stage('Build Frontend Image') {

            steps {

                sh '''
                    echo "======================================"
                    echo "Building Frontend Docker Image"
                    echo "======================================"

                    docker build \
                        -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                        ./Employee-Management-System-

                    echo "Frontend image created:"
                    echo "${FRONTEND_IMAGE}:${IMAGE_TAG}"
                '''
            }
        }


        // ==========================================
        // 6. PUSH IMAGES TO DOCKER HUB
        // ==========================================

        stage('Push Images to Docker Hub') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'Docker-Hub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "======================================"
                        echo "Logging in to Docker Hub"
                        echo "======================================"

                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin


                        echo "======================================"
                        echo "Pushing Backend Image"
                        echo "======================================"

                        docker push \
                            ${BACKEND_IMAGE}:${IMAGE_TAG}


                        echo "======================================"
                        echo "Pushing Frontend Image"
                        echo "======================================"

                        docker push \
                            ${FRONTEND_IMAGE}:${IMAGE_TAG}


                        echo "======================================"
                        echo "Logging out from Docker Hub"
                        echo "======================================"

                        docker logout
                    '''
                }
            }
        }


        // ==========================================
        // 7. DEPLOY TO APPLICATION EC2
        // ==========================================

        stage('Deploy to EC2') {

            steps {

                sshagent(credentials: ['EC2-SSH']) {

                    sh '''
                        echo "======================================"
                        echo "Deploying Application to EC2"
                        echo "======================================"


                        ssh -o StrictHostKeyChecking=no \
                            ${EC2_USER}@${EC2_HOST} << EOF

                            set -e


                            echo "======================================"
                            echo "Application Directory"
                            echo "======================================"

                            cd ${EC2_APP_DIR}

                            pwd


                            echo "======================================"
                            echo "Updating Backend Image"
                            echo "======================================"

                            sed -i \
                                's|rajsharmaa/ems-backend:.*|rajsharmaa/ems-backend:${IMAGE_TAG}|' \
                                docker-compose.yml


                            echo "======================================"
                            echo "Updating Frontend Image"
                            echo "======================================"

                            sed -i \
                                's|rajsharmaa/ems-frontend:.*|rajsharmaa/ems-frontend:${IMAGE_TAG}|' \
                                docker-compose.yml


                            echo "======================================"
                            echo "Pulling New Images"
                            echo "======================================"

                            docker compose pull


                            echo "======================================"
                            echo "Starting Updated Containers"
                            echo "======================================"

                            docker compose up -d


                            echo "======================================"
                            echo "Container Status"
                            echo "======================================"

                            docker compose ps


                            echo "======================================"
                            echo "Cleaning Unused Docker Images"
                            echo "======================================"

                            docker image prune -f


                            echo "======================================"
                            echo "Deployment Completed Successfully"
                            echo "======================================"

                        EOF
                    '''
                }
            }
        }
    }


    // ==========================================
    // POST ACTIONS
    // ==========================================

    post {

        success {

            echo """
            ==========================================
             CI/CD PIPELINE SUCCESSFUL
            ==========================================

            SonarQube      : PASSED
            Quality Gate   : PASSED

            Backend Image  : ${BACKEND_IMAGE}:${IMAGE_TAG}
            Frontend Image : ${FRONTEND_IMAGE}:${IMAGE_TAG}

            Deployment     : SUCCESSFUL

            ==========================================
            """
        }


        failure {

            echo """
            ==========================================
             CI/CD PIPELINE FAILED
            ==========================================

            Check Jenkins Console Output.

            Possible failure points:

            1. SonarQube Analysis
            2. SonarQube Quality Gate
            3. Docker Build
            4. Docker Hub Push
            5. SSH Connection
            6. Docker Compose Deployment

            ==========================================
            """
        }
    }
}