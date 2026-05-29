# OTP Service SaaS Platform

A production-ready Full Stack OTP Authentication Platform built with Node.js, Express, MongoDB, Docker, Jenkins, and AWS.

This project demonstrates complete end-to-end software engineering and DevOps implementation including:

* Full Stack OTP SaaS Application
* REST API Development
* MongoDB Database Integration
* Docker Containerization
* Jenkins CI/CD Automation
* AWS EC2 Deployment
* AWS ECR Container Registry
* SMTP Email Integration
* Automated Production Deployment

---

# Project Overview

The OTP Service SaaS Platform allows applications and organizations to:

* Generate OTPs
* Send OTPs through Email
* Verify OTPs securely
* Prevent spam OTP requests
* Manage OTP expiration and retries
* Deploy applications automatically using CI/CD pipelines

The system is fully containerized and deployed on AWS infrastructure using Docker and Jenkins.

---

# Full Stack Features

## Frontend Features

* OTP SaaS Demo Dashboard
* Generate OTP Interface
* Verify OTP Interface
* Dynamic Organization Branding
* Subject Customization
* OTP Type Selection

  * Numeric OTP
  * Alphanumeric OTP
* API-based frontend integration
* Responsive UI

---

## Backend Features

* RESTful API Architecture
* OTP Generation Service
* OTP Verification Service
* Email Delivery using Nodemailer
* MongoDB Integration with Mongoose
* Secure Environment Variables
* Request Validation Middleware
* Spam Protection Middleware
* Health Check Endpoint
* Error Handling Middleware
* Structured Logging
* Configurable OTP Expiry
* Configurable OTP Length
* Retry Attempt Limiting

---

## Database Features

* MongoDB Database
* OTP Data Storage
* Expiry Management
* Verification Tracking
* Secure Connection Handling
* Containerized MongoDB Deployment

---

## DevOps Features

* Dockerized Application
* Docker Network Communication
* Jenkins CI/CD Pipeline
* GitHub Integration
* AWS ECR Image Storage
* AWS EC2 Deployment
* Automated Docker Image Build
* Automated Docker Push
* Automated Deployment Pipeline
* SSH-based Remote Deployment
* Infrastructure Security Group Configuration
* Environment Variable Injection
* Container Restart Policies

---

# Tech Stack

| Category         | Technologies           |
| ---------------- | ---------------------- |
| Frontend         | HTML, CSS, JavaScript  |
| Backend          | Node.js, Express.js    |
| Database         | MongoDB, Mongoose      |
| Email Service    | Nodemailer, Gmail SMTP |
| Containerization | Docker                 |
| CI/CD            | Jenkins                |
| Cloud            | AWS EC2, AWS ECR       |
| Version Control  | Git, GitHub            |

---

# System Architecture

```text
Frontend Dashboard
        ↓
Express REST API
        ↓
OTP Controller Layer
        ↓
MongoDB Database
        ↓
SMTP Email Service

CI/CD Flow:
GitHub → Jenkins → Docker Build → AWS ECR → EC2 Deployment
```

---

# Project Structure

```bash
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
├── .env
├── Dockerfile
├── Jenkinsfile
├── package.json
├── server.js
└── README.md
```

---

# API Endpoints

## Health Check

```http
GET /health
```

Response:

```json
{
  "status": "OK"
}
```

---

## Generate OTP

```http
POST /api/otp/generate
```

Request:

```json
{
  "email": "user@example.com",
  "type": "numeric",
  "organization": "My Company",
  "subject": "OTP Verification"
}
```

Response:

```json
{
  "message": "OTP sent"
}
```

---

## Verify OTP

```http
POST /api/otp/verify
```

Request:

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Response:

```json
{
  "message": "OTP verified"
}
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=5000
NODE_ENV=production

MONGODB_URI=mongodb://mongodb:27017/otp_service

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

OTP_SIZE=6
OTP_VALIDITY_PERIOD_MINUTES=5
MAX_OTP_ATTEMPTS=3
```

---

# Docker Setup

## Build Docker Image

```bash
docker build -t otp-service .
```

## Run MongoDB Container

```bash
docker run -d \
  --name mongodb \
  --network app-network \
  mongo
```

## Run Application Container

```bash
docker run -d \
  --name otp-service \
  --restart unless-stopped \
  --network app-network \
  -p 3000:3000 \
  -e MONGODB_URI="mongodb://mongodb:27017/otp_service" \
  -e SMTP_HOST="smtp.gmail.com" \
  -e SMTP_PORT="465" \
  -e SMTP_USER="your-email@gmail.com" \
  -e SMTP_PASS="your-app-password" \
  -e PORT="5000" \
  otp-service
```

---

# Jenkins CI/CD Pipeline

The Jenkins pipeline automates:

1. GitHub Repository Cloning
2. Docker Image Build
3. Docker Image Tagging
4. AWS ECR Authentication
5. Docker Image Push to ECR
6. SSH Deployment to EC2
7. Automated Container Restart

---

# AWS Deployment

## AWS Services Used

* Amazon EC2
* Amazon ECR
* AWS IAM
* Security Groups
* VPC Networking

---

## Security Group Configuration

| Port | Purpose         |
| ---- | --------------- |
| 22   | SSH Access      |
| 8080 | Jenkins         |
| 5000 | Backend API     |
| 3000 | Frontend Access |

---

# CI/CD Workflow

```text
Developer Pushes Code
        ↓
GitHub Repository
        ↓
Jenkins Pipeline Triggered
        ↓
Docker Image Built
        ↓
Image Pushed to AWS ECR
        ↓
EC2 Pulls Latest Image
        ↓
Container Redeployed Automatically
```

---

# Production Features

* Persistent Container Restart Policies
* Centralized Environment Variables
* Automated Deployments
* Secure SMTP Authentication
* Container Networking
* Cloud-based Deployment
* Infrastructure Scalability
* Error Logging
* Health Monitoring Endpoint

---

# Future Improvements

* Kubernetes Deployment
* Redis OTP Caching
* Rate Limiting
* JWT Authentication
* HTTPS with Nginx
* Monitoring with Prometheus & Grafana
* Terraform Infrastructure Automation
* Multi-Environment Deployment
* GitHub Actions Integration

---

# Learning Outcomes

This project demonstrates practical implementation of:

* Backend Engineering
* REST API Development
* Database Integration
* Docker Containerization
* CI/CD Automation
* AWS Cloud Deployment
* DevOps Engineering
* Production Deployment Workflows
* Infrastructure Management
* SMTP Email Services

---

# Author

Harshvardhan Tharkar

GitHub: [https://github.com/HarshvardhanTharkar](https://github.com/HarshvardhanTharkar)
