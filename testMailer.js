require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/mailer'); // This imports from utils/mailer.js

const testEmail = async () => {
  try {
    const to = 'divya.1505shah@gmail.com'; // 🔁 Replace this with an email you control
    const name = 'Test User';

    const result = await sendWelcomeEmail(to, name);
    console.log('✅ Test email sent successfully:', result.response);
  } catch (err) {
    console.error('❌ Failed to send test email:', err);
  }
};

testEmail();
