import express from 'express';
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById
} from '../controllers/registrationController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// POST /api/registrations - Create new registration
router.post('/', upload.single('paymentScreenshot'), createRegistration);

// GET /api/registrations - Get all registrations
router.get('/', getAllRegistrations);

// GET /api/registrations/:id - Get single registration
router.get('/:id', getRegistrationById);

export default router;
