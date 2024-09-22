const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
// At the top of your server.js or app.js
const cors = require('cors');
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'achkeppetipola@gmail.com', // Replace with your email
    pass: 'jnpmhtktsgyhfuva' // Replace with your app password
  }
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    try {
      await transporter.sendMail({
        from: 'achkeppetipola@gmail.com',
        to: to,
        subject: subject,
        text: text
      });
      res.json({ message: 'Email sent successfully' });  // Send JSON response
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });  // Send JSON error
    }
  });
  

const PORT = process.env.PORT || 3000; // Use a different port from the React app
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
