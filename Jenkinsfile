pipeline {

    agent any

    environment {
        BACKEND_IMAGE  = 'rajsharmaa/ems-backend'
        FRONTEND_IMAGE = 'rajsharmaa/ems-frontend'

        IMAGE_TAG = "${BUILD_NUMBER}"

        EC2_USER = 'ubuntu'
        EC2_HOST = '13.203.130.223'
        EC2_APP_DIR = '/home/ubuntu/Employee-Management-System-'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build \
                    -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    ./Employee-Management-System-
                '''
            }
        }

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
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin

                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}

                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['EC2-SSH']) {

                    sh '''
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                            cd ${EC2_APP_DIR} &&
                            sed -i 's|rajsharmaa/ems-backend:.*|rajsharmaa/ems-backend:${IMAGE_TAG}|' docker-compose.yml &&
                            sed -i 's|rajsharmaa/ems-frontend:.*|rajsharmaa/ems-frontend:${IMAGE_TAG}|' docker-compose.yml &&
                            docker compose pull &&
                            docker compose up -d &&
                            docker compose ps
                        "
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "======================================"
            echo " CI/CD DEPLOYMENT SUCCESSFUL"
            echo " Backend  : ${BACKEND_IMAGE}:${IMAGE_TAG}"
            echo " Frontend : ${FRONTEND_IMAGE}:${IMAGE_TAG}"
            echo "======================================"
        }

        failure {
            echo "CI/CD DEPLOYMENT FAILED"
        }
    }
}