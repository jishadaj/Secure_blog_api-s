import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import { handleValidationErrors, validatePost } from '../validators/postValidators.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts); // Get all posts
router.get('/:id', getPostById); // Get a specific post

// Protected routes (require authentication)
router.post('/', authMiddleware,validatePost,handleValidationErrors, createPost); // Create a new post
router.put('/:id', authMiddleware,validatePost, handleValidationErrors, updatePost); // Update a post
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deletePost); // Delete a post

export default router;