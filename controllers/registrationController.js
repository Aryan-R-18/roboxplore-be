import Registration from '../models/Registration.js';
import { validateRegistration } from '../validators/registrationValidator.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';
import { logError, logInfo } from '../logger.js';

export const createRegistration = async (req, res) => {
  try {
    logInfo('=== NEW REGISTRATION REQUEST ===');
    logInfo('Body: ' + JSON.stringify(req.body));
    logInfo('File: ' + (req.file ? JSON.stringify({ name: req.file.originalname, size: req.file.size, type: req.file.mimetype }) : 'No file'));
    
    // Step 1: Validate request body
    logInfo('Step 1: Validating request body...');
    let validation;
    try {
      validation = validateRegistration(req.body);
      logInfo('Validation result: ' + JSON.stringify({ success: validation.success }));
    } catch (validationError) {
      logError('Validation threw an error', validationError);
      throw validationError;
    }
    
    if (!validation.success) {
      logInfo('❌ Validation failed');
      const errors = validation.error?.errors || validation.error?.issues || [];
      logInfo('Errors: ' + JSON.stringify(errors));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.map(err => ({
          field: Array.isArray(err.path) ? err.path.join('.') : String(err.path || 'unknown'),
          message: err.message || 'Validation error'
        }))
      });
    }
    logInfo('✅ Validation passed');

    // Step 2: Check if file is uploaded
    logInfo('Step 2: Checking file upload...');
    if (!req.file) {
      logInfo('❌ No file uploaded');
      return res.status(400).json({
        success: false,
        message: 'Payment screenshot is required'
      });
    }
    logInfo('✅ File present');

    const validatedData = validation.data;

    // Step 3: Check if registration number already exists
    logInfo('Step 3: Checking for duplicate registration number...');
    const existingRegistration = await Registration.findOne({
      leaderRegdNo: validatedData.leaderRegdNo
    });

    if (existingRegistration) {
      logInfo('❌ Registration number already exists');
      return res.status(409).json({
        success: false,
        message: 'This registration number is already registered'
      });
    }
    logInfo('✅ Registration number is unique');

    // Step 4: Upload image to Cloudinary
    logInfo('Step 4: Uploading image to Cloudinary...');
    let imageUrl;
    try {
      imageUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname
      );
      logInfo('✅ Image uploaded successfully: ' + imageUrl);
    } catch (uploadError) {
      logError('Cloudinary upload failed in controller', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image. Please try again.',
        error: process.env.NODE_ENV === 'development' ? uploadError.message : undefined
      });
    }

    // Step 5: Create registration
    logInfo('Step 5: Creating registration in database...');
    const registration = new Registration({
      teamName: validatedData.teamName,
      leaderName: validatedData.leaderName,
      branch: validatedData.branch,
      leaderRegdNo: validatedData.leaderRegdNo,
      teamSize: validatedData.teamSize,
      members: {
        member2: validatedData.member2,
        member3: validatedData.member3,
        member4: validatedData.member4,
        member5: validatedData.member5 || ''
      },
      paymentScreenshot: imageUrl
    });

    await registration.save();
    logInfo('✅ Registration saved to database');

    logInfo('=== REGISTRATION SUCCESSFUL ===');

    res.status(201).json({
      success: true,
      message: 'Registration successful! Check your email for confirmation.',
      data: {
        teamName: registration.teamName,
        leaderName: registration.leaderName,
        registrationId: registration._id
      }
    });

  } catch (error) {
    logError('REGISTRATION ERROR', error);
    
    // Handle specific error types
    if (error && error.message) {
      if (error.message.includes('Invalid file type')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      if (error.message.includes('api_key') || error.message.includes('Cloudinary')) {
        return res.status(500).json({
          success: false,
          message: 'Image upload service configuration error. Please contact administrator.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error.message || 'Unknown error') : undefined
    });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({ registeredAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations'
    });
  }
};

export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Fetch registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration'
    });
  }
};
