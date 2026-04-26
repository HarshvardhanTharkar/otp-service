
A production-ready **OTP (One-Time Password) microservice** built using **Node.js, Express, MongoDB, and Mongoose**.  
This service allows secure OTP generation, email delivery, verification, rate limiting, and automatic expiry.

---

# 📌 Features

- Generate OTP for email verification
- Secure OTP storage using hashing (SHA-256)
- Email delivery using SMTP (Nodemailer)
- OTP verification API
- Automatic OTP expiry (TTL index)
- Rate limiting to prevent spam
- Blocklist support (email/IP)
- Clean modular architecture (MVC pattern)

---

# 🏗️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **ODM:** Mongoose  
- **Email Service:** Nodemailer  
- **Security:** Crypto (SHA-256 hashing)

---

# 📂 Project Structure


otp-service/
│
├── config/
│ └── connectDB.js # MongoDB connection setup
│
├── controllers/
│ ├── otpController.js # OTP generation & verification logic
│ └── sendMailController.js # Email sending logic
│
├── middleware/
│ └── index.js # Email validation & rate limiting
│
├── models/
│ ├── otpModel.js # OTP schema & model
│ └── blockListModel.js # Blocklist schema
│
├── routes/
│ └── otpRoutes.js # API routes
│
├── utils/
│ ├── generateOTP.js # OTP generator
│ ├── validator.js # Email validator
│ └── logger.js # Logging utility
│
├── index.js # Entry point
├── package.json
└── .env # Environment variables


---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/HarshvardhanTharkar/otp-service.git
cd otp-service
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/otp-service

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

OTP_SIZE=6
OTP_VALIDITY_PERIOD_MINUTES=5
MAX_OTP_ATTEMPTS=3
4️⃣ Start the Server
npm start

Server runs at:

http://localhost:5000
🔌 API Endpoints
📥 Generate OTP

POST /api/otp/generate

Request Body:
{
  "email": "user@example.com"
}
Response:
{
  "message": "OTP sent successfully"
}
📤 Verify OTP

POST /api/otp/verify

Request Body:
{
  "email": "user@example.com",
  "otp": "123456"
}
Response:
{
  "message": "OTP verified successfully"
}
🔄 How It Works
1. OTP Generation
User sends email
OTP is generated
OTP is hashed using SHA-256
Stored in MongoDB
Sent via email
2. OTP Verification
User submits OTP
Input OTP is hashed
Compared with stored OTP
If matched → success
OTP record deleted
3. Expiry
OTP expires automatically using MongoDB TTL index
🧠 Database Design
OTP Collection (otps)
{
  "email": "user@example.com",
  "otp": "hashed_value",
  "attempts": 1,
  "createdAt": "timestamp"
}
Blocklist Collection (blocklists)
{
  "email": "blocked@example.com",
  "ip": "192.168.1.1"
}
🔐 Security Features
OTP is never stored in plain text
SHA-256 hashing used
Rate limiting prevents abuse
Blocklist support for malicious users
TTL ensures automatic cleanup
🚫 Rate Limiting
Limits OTP requests per email/IP
Prevents brute force attacks
Controlled via in-memory tracking
⏳ TTL (Auto Expiry)

MongoDB automatically deletes OTPs after expiry time:

expires: 300 // seconds

No manual cleanup required.

📬 Email Service

Uses Nodemailer with SMTP configuration.

Example email:

Subject: Your OTP Code

Your OTP is: 123456
🧪 Testing (Using Postman)
Generate OTP
Method: POST
URL: http://localhost:5000/api/otp/generate
Verify OTP
Method: POST
URL: http://localhost:5000/api/otp/verify
🚀 Future Improvements
Redis-based rate limiting
SMS OTP support
Multi-factor authentication (MFA)
JWT integration after verification
Docker containerization
Logging with Winston / ELK stack
🧑‍💻 Author

Harshvardhan Tharkar

📜 License

This project is open-source and available under the MIT License.
