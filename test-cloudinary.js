// Test Cloudinary upload
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

import { v2 as cloudinary } from 'cloudinary';

console.log('\n=== Testing Cloudinary Configuration ===\n');

// Configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Show config
const config = cloudinary.config();
console.log('Cloud Name:', config.cloud_name);
console.log('API Key:', config.api_key);
console.log('API Secret:', config.api_secret ? '✅ Set' : '❌ Missing');

// Test upload with a sample image URL
console.log('\n=== Testing Upload ===\n');
console.log('Uploading test image...');

cloudinary.uploader.upload('https://via.placeholder.com/300', {
  folder: 'roboxplore/test',
  public_id: `test_${Date.now()}`
})
.then(result => {
  console.log('\n✅ SUCCESS! Cloudinary is working!\n');
  console.log('Uploaded URL:', result.secure_url);
  console.log('Public ID:', result.public_id);
  console.log('\nYou can now use the registration form to upload payment screenshots!\n');
})
.catch(error => {
  console.error('\n❌ FAILED! Cloudinary upload error:\n');
  console.error('Error:', error.message);
  console.error('\nPlease check your credentials in .env file\n');
});
