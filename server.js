// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend directory
dotenv.config({ path: join(__dirname, '.env') });

// Verify critical environment variables
console.log('\n=== Environment Check ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ MISSING');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY || '❌ MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Loaded' : '❌ MISSING');
console.log('========================\n');

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import registrationRoutes from './routes/registrationRoutes.js';
import upload from './middleware/upload.js';

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware - Allow all origins for now (update with specific domains in production)
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/registrations', registrationRoutes);

// Test endpoint to verify everything is working
app.post('/api/test-upload', upload.single('paymentScreenshot'), (req, res) => {
  console.log('\n=== TEST UPLOAD ===');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  console.log('==================\n');
  
  res.json({
    success: true,
    message: 'Test successful',
    body: req.body,
    file: req.file ? {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    } : null
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Handle port already in use error
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: Port ${PORT} is already in use!`);
    console.error('\nTo fix this:');
    console.error('1. Close any other Node/backend processes');
    console.error('2. Or change PORT in .env file to a different number (e.g., 5001)');
    console.error('3. Or run: taskkill /F /IM node.exe\n');
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});
