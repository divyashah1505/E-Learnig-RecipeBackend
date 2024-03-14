// const { validationResult } = require('express-validator');
// const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
// const pool = require('../../config/db'); // Assuming you have a database connection pool defined in db.js

// const adminLoginController = async (req, res) => {
//   // Validate request body
//   console.log('work');
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   // Extract email and password from request body
//   const { email_id, password } = req.body; // Updated keys here

//   // SQL query to retrieve admin with provided email
//   const query = 'SELECT * FROM admins WHERE email_id = $1';
//   const values = [email_id];

//   try {
//     // Execute the query
//     const result = await pool.query(query, values);

//     // Check if admin with provided email exists
//     if (result.rows.length > 0) {
//       // Compare the hashed password with the provided password
//       console.log(password);
//       console.log(result.rows[0]);
//       const match = await bcrypt.compare(password, result.rows[0].password);
//       if (match) {
//         // Admin login successful
//         console.log(`Successful admin login for user: ${email_id}`);
//         res.json({ success: true, message: 'Admin login successful' });
//       } else {
//         // Incorrect password
//         console.log(`Failed admin login attempt for user: ${email_id} (Incorrect password)`);
//         res.status(401).json({ success: false, message: 'Invalid credentials' });
//       }
//     } else {
//       // No admin found with provided email
//       console.log(`Failed admin login attempt for user: ${email_id} (User not found)`);
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     // Error occurred while executing the query
//     console.error('Error executing query', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// module.exports = adminLoginController;
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const pool = require('../../config/db'); // Assuming you have a database connection pool defined in db.js

const adminLoginController = async (req, res) => {
  // Validate request body
  console.log('work');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  // Extract email and password from request body
  const { email_id, password } = req.body; // Updated keys here

  // SQL query to retrieve admin with provided email
  const query = 'SELECT * FROM admins WHERE email_id = $1';
  const values = [email_id];

  try {
    // Execute the query
    const result = await pool.query(query, values);

    // Check if admin with provided email exists
    if (result.rows.length > 0) {
      // Compare the hashed password with the provided password
      console.log(password);
      console.log(result.rows[0]);
      const match = await bcrypt.compare(password, result.rows[0].password);
      if (match) {
        // Admin login successful
        console.log(`Successful admin login for user: ${email_id}`);
        res.json({ success: true, message: 'Admin login successful' });
      } else {
        // Incorrect password
        console.log(`Failed admin login attempt for user: ${email_id} (Incorrect password)`);
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      // No admin found with provided email
      console.log(`Failed admin login attempt for user: ${email_id} (User not found)`);
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    // Error occurred while executing the query
    console.error('Error executing query', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = adminLoginController;

// const express = require('express');
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');

// const router = express.Router();

// // Validation rules for email and password:
// const validationRules = [
//   {
//     in: ['body'],
//     isEmail: true,
//     errorMessage: 'Invalid email format.',
//   },
//   {
//     in: ['body'],
//     notEmpty: true,
//     errorMessage: 'Password is required.',
//   },
// ];

// const adminLoginController = async (req, res) => {
//   try {
//     console.log(req);
//     // Validate request body:
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     // Extract email and password:
//     const { email, password } = req.body;

//     // Find admin by email:
//     const admin = await Admin.findOne({ email });

//     if (admin) {
//       // Compare hashed password using bcrypt:
//       const match = await bcrypt.compare(password, admin.password);
//       if (match) {
//         // Login successful:
//         console.log('Admin login successful.');

//         // Generate a secure session cookie instead of a JWT (replace with your session handling logic):
//         req.session.adminId = admin._id; // Store admin ID in session cookie
//         res.json({ success: true, message: 'Admin login successful' });
//       } else {
//         // Incorrect password:
//         res.status(401).json({ success: false, message: 'Invalid credentials' });
//       }
//     } else {
//       // Admin not found:
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     // Error handling:
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
// module.export= {adminLoginController};