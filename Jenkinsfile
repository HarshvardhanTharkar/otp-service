pipeline {
    agent any

    environment {
        AWS_REGION = "eu-north-1"
        ECR_REPO = "761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service"
        IMAGE_TAG = "latest"
        EC2_HOST = "13.60.223.227"   
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
                    --region ${AWS_REGION} | \
                    docker login \
                    --username AWS \
                    --password-stdin ${ECR_REPO}
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
                sh "docker tag otp-service:latest ${ECR_REPO}:${IMAGE_TAG}"
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "docker push ${ECR_REPO}:${IMAGE_TAG}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-key']) {
                    withCredentials([[
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'aws-ecr-credentials'
                    ]]) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@''' + env.EC2_HOST + ''' << 'ENDSSH'
                            export AWS_ACCESS_KEY_ID=''' + env.AWS_ACCESS_KEY_ID + '''
                            export AWS_SECRET_ACCESS_KEY=''' + env.AWS_SECRET_ACCESS_KEY + '''
                            export AWS_DEFAULT_REGION=eu-north-1

                            aws ecr get-login-password --region eu-north-1 | \
                            docker login --username AWS --password-stdin 761554981636.dkr.ecr.eu-north-1.amazonaws.com

                            docker pull 761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service:latest

                            docker stop otp-service 2>/dev/null || true
                            docker rm otp-service 2>/dev/null || true

                            docker run -d \
                              --name otp-service \
                              --restart unless-stopped \
                              -p 3000:3000 \
                              761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service:latest
ENDSSH
                        '''
                    }
                }
            }
        }
    }
}