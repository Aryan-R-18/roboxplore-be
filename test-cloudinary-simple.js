// Simple Cloudinary configuration test
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

import { v2 as cloudinary } from 'cloudinary';

console.log('\n=== Cloudinary Configuration Test ===\n');

// Configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get config
const config = cloudinary.config();

console.log('✅ Configuration loaded:');
console.log('   Cloud Name:', config.cloud_name);
console.log('   API Key:', config.api_key);
console.log('   API Secret:', config.api_secret ? '***' + config.api_secret.slice(-4) : '❌ Missing');

// Validate
if (config.cloud_name && config.api_key && config.api_secret) {
  console.log('\n✅ All credentials are set correctly!');
  console.log('\n🎉 Cloudinary is ready to use!');
  console.log('\nYou can now:');
  console.log('1. Start the server: npm run dev');
  console.log('2. Open index.html in browser');
  console.log('3. Fill the registration form');
  console.log('4. Upload a payment screenshot');
  console.log('5. Submit - the image will upload to Cloudinary!\n');
} else {
  console.log('\n❌ Some credentials are missing!');
  console.log('Please check your .env file\n');
}
