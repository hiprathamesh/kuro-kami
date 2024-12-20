import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your Gmail
    pass: process.env.EMAIL_PASSWORD // Your Gmail app password
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const mailOptions = {
      from: email, // Visitor's email
      to: process.env.EMAIL, // Your Gmail
      subject: `Portfolio Contact from ${name}`,
      text: `
        From: ${name} (${email})
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));