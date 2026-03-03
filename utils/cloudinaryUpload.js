import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import { logError, logInfo } from '../logger.js';

export const uploadToCloudinary = async (fileBuffer, fileName) => {
  try {
    logInfo('Starting Cloudinary upload for: ' + fileName);
    
    // Configure Cloudinary right here with environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // Verify config
    logInfo('Cloud Name: ' + process.env.CLOUDINARY_CLOUD_NAME);
    logInfo('API Key: ' + process.env.CLOUDINARY_API_KEY);
    logInfo('API Secret: ' + (process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'));
    
    // Sanitize filename
    const sanitizedFileName = fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\s+/g, '_')
      .toLowerCase();
    
    logInfo('Sanitized filename: ' + sanitizedFileName);
    logInfo('Buffer size: ' + fileBuffer.length);
    
    // Convert buffer to base64 data URI
    const base64Image = `data:image/png;base64,${fileBuffer.toString('base64')}`;
    logInfo('Converted to base64');
    
    // Upload
    logInfo('Calling cloudinary.uploader.upload...');
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64Image,
        {
          folder: 'roboxplore/payment-screenshots',
          public_id: `payment_${Date.now()}_${sanitizedFileName}`,
          resource_type: 'image'
        },
        (error, uploadResult) => {
          if (error) {
            logError('Cloudinary callback error', error);
            reject(new Error(error.message || JSON.stringify(error)));
          } else {
            resolve(uploadResult);
          }
        }
      );
    });
    
    logInfo('✅ Image uploaded to Cloudinary: ' + result.secure_url);
    return result.secure_url;
    
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    logError('Cloudinary upload error: ' + errorMessage, error);
    throw new Error(`Cloudinary upload failed: ${errorMessage}`);
  }
};
