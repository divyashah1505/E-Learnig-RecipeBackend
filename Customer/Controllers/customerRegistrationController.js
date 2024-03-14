// const pool = require('../../db');
// const jwt = require('jsonwebtoken');

// const isStrongPassword = (password) => {
//   const passwordRegex =
//     /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
//   return passwordRegex.test(password);
// };

// const registerCustomer = async (req, res) => {
//   try {
//     const { full_name, email_address, phone_number, password } = req.body;

//     // Validation checks for input fields
//     if (!full_name || !email_address || !phone_number || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email_address)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }

//     // Validate phone number format
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(phone_number)) {
//       return res.status(400).json({ error: "Invalid phone number format" });
//     }

//     // Check if email or phone number already exists
//     const existingUserWithEmail = await pool.query(
//       "SELECT * FROM customer WHERE email_address = $1",
//       [email_address]
//     );
//     if (existingUserWithEmail.rows.length > 0) {
//       return res.status(400).json({ error: "Email address already exists" });
//     }

//     const existingUserWithPhoneNumber = await pool.query(
//       "SELECT * FROM customer WHERE phone_number = $1",
//       [phone_number]
//     );
//     if (existingUserWithPhoneNumber.rows.length > 0) {
//       return res.status(400).json({ error: "Phone number already exists" });
//     }

//     // Validate password strength
//     if (!isStrongPassword(password)) {
//       return res.status(400).json({
//         error: "Password must be at least 6 characters, contain 1 uppercase letter, and 1 special character",
//       });
//     }

//     // Attempt to insert the new user into the database
//     const result = await pool.query(
//       "INSERT INTO customer (full_name, email_address, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *",
//       [full_name, email_address, phone_number, password]
//     );

//     const newUser = result.rows[0];
//     return res.status(201).json({ message: "Registration successful", user: newUser });

//   } catch (error) {
//     console.error(error);

//     // Handle unique constraint violation errors
//     if (error.code === "23505") {
//       // Extract constraint name from the error message
//       const match = error.detail.match(/\((.*?)\)/);
//       if (match && match.length > 1) {
//         const constraint = match[1];
//         if (constraint.includes("email_address")) {
//           return res.status(400).json({ error: "Email address already exists" });
//         } else if (constraint.includes("phone_number")) {
//           return res.status(400).json({ error: "Phone number already exists" });
//         }
//       }
//     }

//     // Handle other errors
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = { registerCustomer };
// registrationcontroller.js

const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

const jwtSecret = config.development.jwtSecret; // Ensure to access the correct environment configuration

const isStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
  return passwordRegex.test(password);
};

const registerCustomer = async (req, res) => {
  try {
    const { full_name, email_address, phone_number, password } = req.body;

    if (!full_name || !email_address || !phone_number || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_address)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone_number)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    const existingUserWithEmail = await pool.query(
      "SELECT * FROM customers WHERE email_address = $1",
      [email_address]
    );
    if (existingUserWithEmail.rows.length > 0) {
      return res.status(400).json({ error: "Email address already exists" });
    }

    const existingUserWithPhoneNumber = await pool.query(
      "SELECT * FROM customers WHERE phone_number = $1",
      [phone_number]
    );
    if (existingUserWithPhoneNumber.rows.length > 0) {
      return res.status(400).json({ error: "Phone number already exists" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error: "Password must be at least 6 characters, contain 1 uppercase letter, and 1 special character",
      });
    }

    const token = jwt.sign({ email: email_address }, jwtSecret, { expiresIn: '1h' });

    const result = await pool.query(
      `INSERT INTO customers (full_name, email_address, phone_number, password, token, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [full_name, email_address, phone_number, password, token]
    );
    const newUser = result.rows[0];
    return res.status(201).json({ message: "Registration successful", user: newUser, token });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      const match = error.detail.match(/\((.*?)\)/);
      if (match && match.length > 1) {
        const constraint = match[1];
        if (constraint.includes("email_address")) {
          return res.status(400).json({ error: "Email address already exists" });
        } else if (constraint.includes("phone_number")) {
          return res.status(400).json({ error: "Phone number already exists" });
        }
      }
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerCustomer };
