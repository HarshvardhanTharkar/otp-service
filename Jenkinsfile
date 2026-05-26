pipeline {
    agent any

    environment {
        AWS_REGION = "eu-north-1"
        ECR_REPO = "761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/HarshvardhanTharkar/otp-service.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Login to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr-credentials'
                ]]) {

                    sh """
                    aws ecr get-login-password \
                    --region $AWS_REGION | \
                    docker login \
                    --username AWS \
                    --password-stdin $ECR_REPO
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t otp-service .'
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh 'docker tag otp-service:latest $ECR_REPO:$IMAGE_TAG'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $ECR_REPO:$IMAGE_TAG'
            }
        }

      stage('Deploy to EC2') {
    steps {
        sshagent(credentials: ['ec2-key']) {
            sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@16.171.172.56 << EOF

            docker pull 761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service:latest

            docker stop otp-service || true
            docker rm otp-service || true

            docker run -d \
              --name otp-service \
              -p 3000:3000 \
              761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service:latest

            EOF
            '''
        }
    }
}
    }
}