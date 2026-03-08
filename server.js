// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import registrationRoutes from './routes/registrationRoutes.js';
import upload from './middleware/upload.js';

// Initialize express
const app = express();

// Connect database
connectDB();

// CORS configuration
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options('*', cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/registrations', registrationRoutes);

// Test upload route
app.post('/api/test-upload', upload.single('paymentScreenshot'), (req, res) => {

  console.log('Body:', req.body);
  console.log('File:', req.file);

  res.json({
    success: true,
    message: "Upload successful",
    body: req.body,
    file: req.file
  });

});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running",
    timestamp: new Date()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Server error",
    error: err.message
  });
});

// Export app for Vercel serverless
export default app;