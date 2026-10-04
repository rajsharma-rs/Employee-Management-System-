pipeline {

    agent any

    environment {

        // ==========================================
        // Docker Hub Images
        // ==========================================

        BACKEND_IMAGE  = 'rajsharmaa/ems-backend'
        FRONTEND_IMAGE = 'rajsharmaa/ems-frontend'

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
        // 2. SONARQUBE - DEBUG
        // ==========================================

        stage('SonarQube Analysis') {

            steps {

                script {

                    def scannerHome = tool 'SonarScanner'


                    echo "======================================"
                    echo "SonarScanner Location"
                    echo "======================================"

                    echo "${scannerHome}"


                    // ------------------------------------------
                    // TEST 1: Check scanner installation
                    // ------------------------------------------

                    sh """
                        echo "======================================"
                        echo "TEST 1: Checking SonarScanner"
                        echo "======================================"

                        echo "Scanner directory:"
                        ls -la "${scannerHome}"

                        echo ""
                        echo "Scanner bin directory:"
                        ls -la "${scannerHome}/bin"

                        echo ""
                        echo "SonarScanner version:"
                        "${scannerHome}/bin/sonar-scanner" --version

                        echo ""
                        echo "TEST 1 PASSED"
                        echo "======================================"
                    """


                    // ------------------------------------------
                    // TEST 2: Get SonarQube environment
                    // ------------------------------------------

                    withSonarQubeEnv('sonarqube') {

                        echo "======================================"
                        echo "SonarQube Environment Loaded"
                        echo "======================================"


                        withCredentials([
                            string(
                                credentialsId: 'sonarqube-token',
                                variable: 'SONAR_TOKEN'
                            )
                        ]) {


                            // ------------------------------------------
                            // TEST 3: Run SonarScanner
                            // ------------------------------------------

                            sh """
                                echo "======================================"
                                echo "TEST 3: Running SonarQube Scanner"
                                echo "======================================"

                                echo "SonarQube URL:"
                                echo "\$SONAR_HOST_URL"

                                echo ""
                                echo "Workspace:"
                                pwd

                                echo ""
                                echo "Running scanner..."

                                "${scannerHome}/bin/sonar-scanner" \
                                    -Dsonar.projectKey=employee-management-system \
                                    -Dsonar.projectName=Employee-Management-System \
                                    -Dsonar.sources=. \
                                    -Dsonar.exclusions='**/node_modules/**,**/dist/**,**/build/**,**/.git/**' \
                                    -Dsonar.token="\$SONAR_TOKEN"

                                echo ""
                                echo "======================================"
                                echo "SonarScanner Command Finished"
                                echo "======================================"

                                echo ""
                                echo "Checking workspace..."

                                ls -la

                                echo ""
                                echo "Checking .scannerwork..."

                                if [ -d ".scannerwork" ]; then

                                    echo ".scannerwork FOUND"

                                    ls -la .scannerwork

                                else

                                    echo ".scannerwork NOT FOUND"

                                fi

                                echo ""
                                echo "Checking report-task.txt..."

                                if [ -f ".scannerwork/report-task.txt" ]; then

                                    echo "report-task.txt FOUND"

                                    cat .scannerwork/report-task.txt

                                else

                                    echo "report-task.txt NOT FOUND"

                                fi
                            """
                        }
                    }
                }
            }
        }


        // ==========================================
        // 3. QUALITY GATE
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
        // 4. BUILD BACKEND IMAGE
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
        // 5. BUILD FRONTEND IMAGE
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


                        echo "Pushing Backend Image..."

                        docker push \
                            ${BACKEND_IMAGE}:${IMAGE_TAG}


                        echo "Pushing Frontend Image..."

                        docker push \
                            ${FRONTEND_IMAGE}:${IMAGE_TAG}


                        docker logout

                        echo "Docker images pushed successfully."
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
                        echo "Deploying Application"
                        echo "======================================"


                        ssh -o StrictHostKeyChecking=no \
                            ${EC2_USER}@${EC2_HOST} << EOF

                            set -e

                            cd ${EC2_APP_DIR}

                            echo "Application directory:"
                            pwd


                            echo "Updating backend image..."

                            sed -i \
                                's|rajsharmaa/ems-backend:.*|rajsharmaa/ems-backend:${IMAGE_TAG}|' \
                                docker-compose.yml


                            echo "Updating frontend image..."

                            sed -i \
                                's|rajsharmaa/ems-frontend:.*|rajsharmaa/ems-frontend:${IMAGE_TAG}|' \
                                docker-compose.yml


                            echo "Pulling new images..."

                            docker compose pull


                            echo "Starting containers..."

                            docker compose up -d


                            echo "Container status:"

                            docker compose ps


                            echo "Cleaning unused images..."

                            docker image prune -f


                            echo "Deployment completed."

                        EOF
                    '''
                }
            }
        }
    }


    // ==========================================
    // POST
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

            Check the Jenkins Console Output.

            ==========================================
            """
        }
    }
}