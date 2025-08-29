const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

function verifyToken(req, res, next) {
  let token = req.header('x-auth-token') || req.header('Authorization');
 

  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied.' });
  }

  // If sent as "Bearer <token>", remove Bearer part
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1]; // same as slice(7), but safer
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // should contain { id, email, etc }
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ msg: 'Invalid token.' });
  }
}

module.exports = verifyToken;
