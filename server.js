require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/connectDB');
const otpRoutes = require('./routes/otpRoutes');
const { validateEmail } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.set('trust proxy', true);
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});

app.get('/', (req, res) => {
  res.send('OTP Service Running');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api', validateEmail, otpRoutes);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start();
