// const db = require('../config/db');

// async function authMiddleware(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const extractedToken = token.split(' ')[1];
//     const customerTokenQuery = `SELECT * FROM customers WHERE token = '${extractedToken}'`;

//     db.query(customerTokenQuery, (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ msg: 'Server Error' });
//       }
//       if (results.rows.length === 0) {
//         return res.status(401).json({ msg: 'Customer not found' });
//       }

//       const id = results?.rows[0]?.id
//       const storedToken = results?.rows[0]?.token;

//       if (extractedToken === storedToken) {
//         req.user = id
//         next();
//       } else {
//         return res.status(401).json({ msg: 'Token is not valid' });
//       }
//     });
//   } catch (err) {
//     console.error(err.message, 'error');
//     return res.status(401).json({ msg: 'Token is not valid' });
//   }
// }

// module.exports = authMiddleware;



// // auth.js
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const User = require('../models/Customer');
const db = require("../models/index");

const exemptRoutes = [
  '/viewcategories',
  '/register',
  '/clogin',
  '/recipes',
  '/customerroutes',
  '/editcategories',
  '/recipes/subcategory',
  '/recipes/subcategory/:subcategoryId/:recipeId',  
  '/recipes/featured',
  '/active-plans',
  '/activecombos',
  '/subcategories',
  '/uploadrecipe', 
  '/login',
  '/acategories',
  '/vcategories',
  '/editcategories',
  '/dcategories',   
  '/acombos',
  '/vacombos',
  '/combos',
  '/combos',
  '/aplans',
  '/vplans',
  '/editplans/:planId',
  '/dplans/:planId',
  '/addsubcategories',
  '/editsubcategories',
  '/deletesubcategories',
  '/subcategories/:categoryId',
  '/vsubcategories',
  '/recipes/:recipeId',
  '/recipes/:recipeId',
  '/vcustomers'
  
];

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  // Check if the route requires authentication
  if (!token) {
    // Check if the requested route is exempt from authentication
    if (exemptRoutes.some(route => req.originalUrl.includes(route))) {
      return next(); // Route exempt from authentication
    }
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const extractedToken = token.split(' ')[1];
    const decoded = jwt.verify(extractedToken, config.development.jwtSecret);
    const email = decoded.email;
    
    // Find the user by email ID in the database
    const user = await db.Customer.findOne({ where: { email_address: email } });
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
