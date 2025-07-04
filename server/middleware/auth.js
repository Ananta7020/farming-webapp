const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

function verifyToken(req, res, next) {
  let token = req.header('Authorization') || req.header('x-auth-token');
  console.log("Token being sent:", token);

  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied.' });
  }

  // If the header is "Bearer <token>", extract the token part
  if (token.startsWith('Bearer ')) {
    token = token.slice(7); // Remove "Bearer " part
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // decoded will contain { id: <your_user_id>, ... }
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token.' });
  }
}

module.exports = verifyToken;
