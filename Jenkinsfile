stage('Deploy to EC2') {
    steps {

        sshagent(credentials: ['EC2-SSH']) {

            sh '''
                ssh -o StrictHostKeyChecking=no \
                ${EC2_USER}@${EC2_HOST} "
                    cd ${EC2_APP_DIR} &&

                    echo 'Updating backend image...' &&
                    sed -i 's|rajsharmaa/ems-backend:.*|rajsharmaa/ems-backend:${IMAGE_TAG}|' docker-compose.yml &&

                    echo 'Updating frontend image...' &&
                    sed -i 's|rajsharmaa/ems-frontend:.*|rajsharmaa/ems-frontend:${IMAGE_TAG}|' docker-compose.yml &&

                    echo 'Pulling new images...' &&
                    docker compose pull &&

                    echo 'Starting containers...' &&
                    docker compose up -d &&

                    echo 'Container status:' &&
                    docker compose ps
                "
            '''
        }
    }
}