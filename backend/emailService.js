const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'achkeppetipola@gmail.com',
    pass: 'jnpmhtktsgyhfuva'  // Replace with your actual credentials
  }
});

const sendAppointmentEmail = async (toEmail, appointmentDetails) => {
  const mailOptions = {
    from: 'achkeppetipola@gmail.com',
    to: toEmail,
    subject: 'Appointment Confirmation',
    text: `Your appointment is confirmed for ${appointmentDetails.date}. Details: ${appointmentDetails.description}`,
    html: `<strong>Your appointment is confirmed for ${appointmentDetails.date}.</strong> Details: ${appointmentDetails.description}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendAppointmentEmail };
