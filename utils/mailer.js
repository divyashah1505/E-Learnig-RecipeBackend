require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // ✅ This line bypasses self-signed cert errors
  },
});

const sendWelcomeEmail = async (toEmail, customerName) => {
  const mailOptions = {
    from: `"CrazeeCooks" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: toEmail,
    subject: "Welcome to CrazeeCooks!",
    html: `<h2>Welcome to CrazeeCooks, ${customerName}!</h2>
           <p>Explore the world of culinary delights with us. We're excited to have you on board!</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
    throw error;
  }
};

module.exports = { sendWelcomeEmail };
