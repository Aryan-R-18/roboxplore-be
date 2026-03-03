# Cloudinary Setup Guide

## Issue: "Must supply api_key" Error

This error means Cloudinary credentials are not being loaded from the `.env` file.

## Quick Fix

### Step 1: Test Environment Variables

Run this command in the backend folder:
```bash
npm run test-env
```

You should see:
```
✅ All Cloudinary credentials are loaded!
```

If you see missing credentials, continue to Step 2.

### Step 2: Verify .env File

1. Open `backend/.env` file
2. Make sure it looks EXACTLY like this (no extra spaces):

```env
PORT=5000
MONGODB_URI=your_mongodb_uri_here
CLOUDINARY_CLOUD_NAME=Roboxplore
CLOUDINARY_API_KEY=145656318929987
CLOUDINARY_API_SECRET=_I_SwRXJKTudZIeaeNuDpcbGvQc
NODE_ENV=development
```

**Important:**
- No spaces before or after the `=` sign
- No quotes around values
- No empty lines between variables
- File must be named exactly `.env` (not `env.txt` or `.env.txt`)

### Step 3: Verify Cloudinary Credentials

1. Login to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret
3. Paste them in `.env` file (replace existing values)

### Step 4: Restart Server

1. Stop the server (Ctrl + C)
2. Start again:
   ```bash
   npm run dev
   ```
3. You should see:
   ```
   ✅ Cloudinary credentials loaded
   Server running on port 5000
   MongoDB Connected: ...
   ```

## Common Issues

### Issue 1: File named wrong
- File must be `.env` (with the dot)
- Not `env.txt` or `.env.txt`
- Check in File Explorer with "Show file extensions" enabled

### Issue 2: Extra spaces
```env
# ❌ Wrong (space after =)
CLOUDINARY_API_KEY= 145656318929987

# ✅ Correct (no spaces)
CLOUDINARY_API_KEY=145656318929987
```

### Issue 3: Quotes around values
```env
# ❌ Wrong (has quotes)
CLOUDINARY_API_KEY="145656318929987"

# ✅ Correct (no quotes)
CLOUDINARY_API_KEY=145656318929987
```

### Issue 4: Wrong credentials
- Double-check on Cloudinary dashboard
- Make sure you copied the full API Secret (it's long)
- Cloud Name is case-sensitive

## Verify It's Working

### Test 1: Check Server Logs
When you start the server, you should see:
```
✅ Cloudinary credentials loaded
```

### Test 2: Submit a Registration
1. Fill the form
2. Upload an image
3. Submit
4. Should succeed without "api_key" error

### Test 3: Check Cloudinary Dashboard
1. Go to Media Library
2. Look for `roboxplore/payment-screenshots` folder
3. Your uploaded image should be there

## Still Not Working?

### Debug Steps:

1. **Check file location:**
   ```
   backend/
   ├── .env          ← Must be here
   ├── server.js
   └── package.json
   ```

2. **Check file contents:**
   ```bash
   cd backend
   type .env
   ```
   Should show your credentials

3. **Check if dotenv is installed:**
   ```bash
   npm list dotenv
   ```
   Should show version number

4. **Reinstall dependencies:**
   ```bash
   npm install
   ```

5. **Try absolute path (temporary test):**
   
   In `server.js`, change:
   ```javascript
   dotenv.config();
   ```
   
   To:
   ```javascript
   import { fileURLToPath } from 'url';
   import { dirname, join } from 'path';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);
   
   dotenv.config({ path: join(__dirname, '.env') });
   ```

## Your Current Credentials

Based on your `.env` file:
- Cloud Name: `Roboxplore`
- API Key: `145656318929987`
- API Secret: `_I_SwRXJKTudZIeaeNuDpcbGvQc`

These should work if entered correctly in the `.env` file.

## Test Upload Manually

Create a test file `test-upload.js`:

```javascript
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing Cloudinary upload...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);

// Test with a URL
cloudinary.uploader.upload('https://via.placeholder.com/150', {
  folder: 'test'
})
.then(result => {
  console.log('✅ Upload successful!');
  console.log('URL:', result.secure_url);
})
.catch(error => {
  console.error('❌ Upload failed:', error.message);
});
```

Run:
```bash
node test-upload.js
```

## Contact Support

If still not working:
1. Run `npm run test-env` and share output
2. Check server logs for exact error message
3. Verify credentials on Cloudinary dashboard
