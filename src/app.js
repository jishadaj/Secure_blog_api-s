import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connect from './config/db.js'; // Ensure this is using ES6 import
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'
import loggerMiddleware from './middleware/loggerMiddlerware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS configuration
app.use(express.json()); // Parse JSON bodies
app.use(loggerMiddleware)

// Rate limiting for login/signup routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use('/api/auth', limiter);

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Secure Blog API');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connect(); // Connect to the database
});

export default app; // Export the app for testing or other modules