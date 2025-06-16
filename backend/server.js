const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5001;

//  Handle CORS manually to avoid preflight failure
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Parse JSON
app.use(express.json());

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(" Email Request From:", name, email);

  const senderEmail = 'tcoders08164002@gmail.com';
  const receiverEmail = 'emailtosolankiom@gmail.com';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${senderEmail}>`,
      to: receiverEmail,
      subject: ` Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log(' Email sent');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

//  Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});