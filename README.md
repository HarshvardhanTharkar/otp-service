OTP Service SaaS — Full Stack DevOps Project

A production-style OTP (One-Time Password) SaaS application built using Node.js, MongoDB, Docker, Jenkins, AWS EC2, and AWS ECR.

This project demonstrates a complete end-to-end Full Stack + DevOps workflow including:

OTP generation and verification
REST API development
MongoDB integration
Docker containerization
Jenkins CI/CD pipeline
AWS ECR image registry
AWS EC2 deployment
Automated Docker deployments
SMTP email integration using Gmail
Architecture
Frontend UI
     ↓
Node.js Express Backend
     ↓
MongoDB Database


-----------------------------
CI/CD FLOW
-----------------------------
GitHub
   ↓
Jenkins Pipeline
   ↓
Docker Build
   ↓
AWS ECR Push
   ↓
EC2 Deployment via SSH
   ↓
Docker Container Deployment
Tech Stack
Frontend
HTML
CSS
JavaScript
Backend
Node.js
Express.js
Nodemailer
Mongoose
Database
MongoDB
DevOps & Cloud
Docker
Jenkins
AWS EC2
AWS ECR
GitHub
Linux (Ubuntu)
Features
Generate OTP
Verify OTP
Email-based OTP delivery
MongoDB OTP storage
Dockerized backend
CI/CD with Jenkins
Automated deployment to EC2
Secure AWS ECR integration
SMTP integration with Gmail App Password
Environment variable based configuration
Project Structure
otp-service/
│
├── config/
│   └── connectDB.js
│
├── controllers/
│   ├── otpController.js
│   └── sendMailController.js
│
├── middleware/
│   └── index.js
│
├── models/
│   └── otpModel.js
│
├── routes/
│   └── otpRoutes.js
│
├── utils/
│   └── logger.js
│
├── Dockerfile
├── Jenkinsfile
├── package.json
├── server.js
└── .env
Local Setup
1. Clone Repository
git clone https://github.com/HarshvardhanTharkar/otp-service.git
cd otp-service
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file:

PORT=5000
NODE_ENV=development


MONGODB_URI=mongodb://127.0.0.1:27017/otp_service


SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
4. Start MongoDB
mongod
5. Run Backend
npm start

Server runs at:

http://localhost:5000
Docker Setup
Build Docker Image
docker build -t otp-service .
Run Docker Container
docker run -d \
  --name otp-service \
  -p 3000:5000 \
  --env-file .env \
  otp-service
MongoDB Docker Setup
Create Docker Network
docker network create app-network
Run MongoDB Container
docker run -d \
  --name mongodb \
  --network app-network \
  -p 27017:27017 \
  mongo
Run OTP Service Container
docker run -d \
  --name otp-service \
  --restart unless-stopped \
  --network app-network \
  -p 3000:5000 \
  -e MONGODB_URI="mongodb://mongodb:27017/otp_service" \
  -e SMTP_HOST="smtp.gmail.com" \
  -e SMTP_PORT="465" \
  -e SMTP_USER="your_email@gmail.com" \
  -e SMTP_PASS="your_app_password" \
  761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service:latest
Jenkins CI/CD Pipeline
Pipeline Workflow
Clone GitHub repository
Build Docker image
Authenticate with AWS ECR
Push Docker image to ECR
SSH into EC2 instance
Pull latest Docker image
Restart application container
Jenkinsfile
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


                    withCredentials([[
AWS Infrastructure
EC2
Ubuntu Server
Docker Installed
Jenkins Installed
Security Group configured
Open Ports
Port	Purpose
22	SSH
8080	Jenkins
3000	OTP Backend
50000	Jenkins Agent
AWS ECR

Used for storing Docker images.

Example repository:

761554981636.dkr.ecr.eu-north-1.amazonaws.com/otp-service
Gmail SMTP Setup
Enable 2-Step Verification

Google Account → Security → 2-Step Verification

Generate App Password

Google Account → App Passwords

Use generated password inside:

SMTP_PASS=your_generated_app_password
API Endpoints
Generate OTP
POST
/api/otp/generate
Request Body
{
  "email": "user@example.com",
  "type": "numeric",
  "organization": "OTP SaaS",
  "subject": "Your OTP Code"
}
Verify OTP
POST
/api/otp/verify
Request Body
{
  "email": "user@example.com",
  "otp": "123456"
}
Deployment Commands
Check Running Containers
docker ps
View Logs
docker logs -f otp-service
Restart Container
docker restart otp-service
Future Improvements
Docker Compose
Kubernetes deployment
Nginx reverse proxy
HTTPS using Certbot
GitHub Webhooks
Terraform Infrastructure as Code
Monitoring with Prometheus & Grafana
AWS ECS deployment
Rate limiting
Redis OTP caching
JWT Authentication
Learning Outcomes

This project demonstrates practical knowledge of:

Full Stack Development
REST APIs
Node.js Backend Development
MongoDB Integration
Docker Containerization
CI/CD Pipeline Automation
AWS Cloud Deployment
Jenkins Automation
Linux Server Management
SMTP Email Integration
Production Deployment Workflow
Author

Harshvardhan Tharkar

GitHub:

https://github.com/HarshvardhanTharkar
License

This project is created for educational and portfolio purposes.

Created a complete production-style GitHub README covering:

Full stack architecture
Docker setup
MongoDB setup
Jenkins CI/CD
AWS EC2 + ECR deployment
SMTP configuration
API documentation
Deployment workflow
DevOps architecture
Future improvements
Commands and troubleshooting

It is structured for:

GitHub portfolio
Resume projects
Recruiter visibility
DevOps showcase
Real-world deployment demonstration
