// Test if environment variables are loading correctly
import dotenv from 'dotenv';
dotenv.config();

console.log('\n=== Testing Environment Variables ===\n');

console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ Missing');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY || '❌ Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set (hidden)' : '❌ Missing');

console.log('\n=== Cloudinary Config ===\n');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? `${process.env.CLOUDINARY_API_SECRET.substring(0, 5)}...` : 'Missing');

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  console.log('\n✅ All Cloudinary credentials are loaded!\n');
} else {
  console.log('\n❌ Some Cloudinary credentials are missing!\n');
}
