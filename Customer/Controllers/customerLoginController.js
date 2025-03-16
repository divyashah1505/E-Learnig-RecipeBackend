// const { body, validationResult } = require('express-validator');

// const pool = require('../../db');


// const validateInput = [
//   body('email_address').isEmail().normalizeEmail(),
//   body('password').isLength({ min: 6 }), // Assuming minimum password length is 6 characters
// ];

// const customerLogin = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }
//   const { email_address, password } = req.body;

//   const query = 'SELECT * FROM customer WHERE email_address = $1';
//   const values = [email_address];

//   try {
//     const result = await pool.query(query, values);

//     if (result.rows.length > 0) {
//       const user = result.rows[0];

//       if (user.password === password) {
//         console.log(`Successful login for user: ${email_address}`);
//         res.json({ success: true, message: 'Login successful' });
//       } else {
//         console.log(`Failed login attempt for user: ${email_address} (Incorrect password)`);
//         res.status(401).json({ success: false, message: 'Password is incorrect' });
//       }
//     } else {
//       console.log(`Failed login attempt for user: ${email_address} (User not found)`);
//       res.status(402).json({ success: false, message: 'Please register yourself first' });
//     }
//   } catch (error) {
//     console.error('Error executing query', error);
//     console.log(`Failed login attempt for user: ${email_address} (Internal server error)`);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// module.exports = { customerLogin };
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');
const config = require('../../config/config.json');

const jwtSecret = config.development.jwtSecret;

const validateInput = [
  body('email_address').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

const customerLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email_address, password } = req.body;

  const query = 'SELECT * FROM customers WHERE email_address = $1';
  const values = [email_address];

  try {
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      if (user.password === password) {
        if (!jwtSecret) {
          console.error('jwtSecret is not defined in config');
          return res.status(500).json({ success: false, message: 'jwtSecret is not defined' });
        }
        
        console.log(`Successful login for user: ${email_address}`);
        const payload = {
          email: email_address
        };
        
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        await pool.query('UPDATE customers SET token = $1 WHERE email_address = $2', [token, email_address]);
        
        // Send customer name along with login success response
        res.status(200).json({ success: true, message: 'Login successful', customerName: user.full_name });
      
      } else {
        console.log(`Failed login attempt for user: ${email_address} (Incorrect password)`);
        res.status(401).json({ success: false, message: 'Password is incorrect' });
      }
    } else {
      console.log(`Failed login attempt for user: ${email_address} (User not found)`);
      res.status(402).json({ success: false, message: 'Please register yourself first' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    console.log(`Failed login attempt for user: ${email_address} (Internal server error)`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { customerLogin };