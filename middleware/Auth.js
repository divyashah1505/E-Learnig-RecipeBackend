const db = require('../config/db');

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const extractedToken = token.split(' ')[1];
    const customerTokenQuery = `SELECT * FROM customers WHERE token = '${extractedToken}'`;

    db.query(customerTokenQuery, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
      }
      if (results.rows.length === 0) {
        return res.status(401).json({ msg: 'Customer not found' });
      }

      const id = results?.rows[0]?.id
      const storedToken = results?.rows[0]?.token;

      if (extractedToken === storedToken) {
        req.user = id
        next();
      } else {
        return res.status(401).json({ msg: 'Token is not valid' });
      }
    });
  } catch (err) {
    console.error(err.message, 'error');
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
