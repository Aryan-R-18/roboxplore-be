import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verify configuration after setup
const config = cloudinary.config();
if (config.cloud_name && config.api_key && config.api_secret) {
  console.log('✅ Cloudinary credentials loaded');
  console.log('Cloud Name:', config.cloud_name);
} else {
  console.error('❌ Cloudinary credentials missing in .env file!');
  console.error('Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}

export default cloudinary;
