import express from 'express';
import { signup, login, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { handleValidationErrors, validateLogin, validateSignup } from '../validators/userValidators.js';


const router = express.Router();

// Public routes
router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login',validateLogin, handleValidationErrors,  login);

// Protected routes (require authentication)
router.get('/me', authMiddleware, getUser);
router.put('/me', authMiddleware, updateUser);
router.delete('/me', authMiddleware, deleteUser);

export default router;