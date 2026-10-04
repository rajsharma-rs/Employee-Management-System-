pipeline {

    agent any

    environment {

        // ==============================
        // Docker Hub Images
        // ==============================

        BACKEND_IMAGE  = 'rajsharmaa/ems-backend'
        FRONTEND_IMAGE = 'rajsharmaa/ems-frontend'

        // Jenkins build number = image tag
        IMAGE_TAG = "${BUILD_NUMBER}"


        // ==============================
        // Application EC2
        // ==============================

        EC2_USER    = 'ubuntu'
        EC2_HOST    = '13.203.130.223'
        EC2_APP_DIR = '/home/ubuntu/Employee-Management-System-'
    }


    stages {


        // ============================================================
        // 1. CHECKOUT
        // ============================================================

        stage('Checkout') {

            steps {

                checkout scm

            }
        }


        // ============================================================
        // 2. SONARQUBE CODE ANALYSIS
        // ============================================================

        stage('SonarQube Analysis') {

            steps {

                withSonarQubeEnv('sonarqube') {

                    withCredentials([
                        string(
                            credentialsId: 'sonarqube-token',
                            variable: 'SONAR_TOKEN'
                        )
                    ]) {

                        sh '''
                            echo "======================================"
                            echo "Running SonarQube Analysis"
                            echo "======================================"

                            sonar-scanner \
                                -Dsonar.projectKey=employee-management-system \
                                -Dsonar.projectName=Employee-Management-System \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/.git/** \
                                -Dsonar.token=$SONAR_TOKEN

                            echo "SonarQube analysis completed."
                        '''
                    }
                }
            }
        }


        // ============================================================
        // 3. SONARQUBE QUALITY GATE
        // ============================================================

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


        // ============================================================
        // 4. BUILD BACKEND DOCKER IMAGE
        // ============================================================

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


        // ============================================================
        // 5. BUILD FRONTEND DOCKER IMAGE
        // ============================================================

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


        // ============================================================
        // 6. PUSH IMAGES TO DOCKER HUB
        // ============================================================

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


                        echo "Pushing Backend Image..."

                        docker push \
                            ${BACKEND_IMAGE}:${IMAGE_TAG}


                        echo "Pushing Frontend Image..."

                        docker push \
                            ${FRONTEND_IMAGE}:${IMAGE_TAG}


                        echo "Logging out from Docker Hub..."

                        docker logout


                        echo "======================================"
                        echo "Docker Images Successfully Pushed"
                        echo "======================================"
                    '''
                }
            }
        }


        // ============================================================
        // 7. DEPLOY TO APPLICATION EC2
        // ============================================================

        stage('Deploy to EC2') {

            steps {

                sshagent(credentials: ['EC2-SSH']) {

                    sh '''
                        echo "======================================"
                        echo "Deploying Application"
                        echo "======================================"


                        ssh -o StrictHostKeyChecking=no \
                            ${EC2_USER}@${EC2_HOST} << EOF

                            set -e

                            cd ${EC2_APP_DIR}


                            echo "Current directory:"
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
                            echo "Starting Containers"
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


    // ================================================================
    // POST ACTIONS
    // ================================================================

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
            - SonarQube Analysis
            - SonarQube Quality Gate
            - Docker Build
            - Docker Hub Push
            - SSH Connection
            - Docker Compose Deployment

            ==========================================
            """
        }
    }
}




// ================================================================
// END OF JENKINSFILE
// ================================================================