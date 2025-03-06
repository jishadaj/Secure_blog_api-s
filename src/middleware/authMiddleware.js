import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {

  const authorization = req.headers['authorization'];

  if (!authorization || !authorization.length || authorization === undefined || authorization === null) {
    return res.status(422).json({ message: "Authorization token doesn't appear in header." });
  }

  const tokenParts = authorization.split(' ');
  if (!tokenParts.length || !tokenParts[1]) {
    return res.status(422).json({ message: 'Invalid Authorization token format.' });
  }

  const token = tokenParts[1]; 
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    req.userId = user._id; 
    next();
  } catch (error) {
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

export default authMiddleware;

