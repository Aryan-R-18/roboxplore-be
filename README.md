# RoboXplore Backend

Backend API for RoboXplore Line Follower Bot Competition registration system.

## Features

- ✅ Team registration with validation
- ✅ Image upload to Cloudinary
- ✅ MongoDB database storage
- ✅ Zod schema validation
- ✅ RESTful API endpoints
- ✅ CORS enabled

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Zod** - Schema validation
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **dotenv** - Environment variables

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roboxplore
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Get Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Paste them in your `.env` file

### 4. Install MongoDB

**Option A: Local Installation**
- Download from [MongoDB](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string and update `MONGODB_URI` in `.env`

### 5. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Create Registration
```
POST /api/registrations
Content-Type: multipart/form-data

Body:
- teamName: string (required)
- leaderName: string (required)
- branch: string (required)
- leaderRegdNo: string (required, unique)
- teamSize: string "4" or "5" (required)
- member2: string (required)
- member3: string (required)
- member4: string (required)
- member5: string (optional, required if teamSize is 5)
- paymentScreenshot: file (required, max 5MB, jpg/jpeg/png)
```

### Get All Registrations
```
GET /api/registrations
```

### Get Single Registration
```
GET /api/registrations/:id
```

## Validation Rules

- **Team Name**: 3-50 characters
- **Leader Name**: 2-50 characters, letters and spaces only
- **Branch**: 2-50 characters
- **Registration Number**: 5-20 characters, must be unique
- **Team Size**: Must be 4 or 5
- **Member Names**: 2-50 characters, letters and spaces only
- **Payment Screenshot**: Max 5MB, JPEG/JPG/PNG only

## Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # Cloudinary configuration
├── controllers/
│   └── registrationController.js  # Business logic
├── middleware/
│   └── upload.js            # Multer configuration
├── models/
│   └── Registration.js      # Mongoose schema
├── routes/
│   └── registrationRoutes.js  # API routes
├── utils/
│   └── cloudinaryUpload.js  # Cloudinary upload helper
├── validators/
│   └── registrationValidator.js  # Zod schemas
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js                # Entry point
```

## Testing the API

You can test the API using:
- **Postman** - Import the endpoints
- **cURL** - Command line testing
- **Frontend form** - Use the provided HTML form

### Example cURL Request

```bash
curl -X POST http://localhost:5000/api/registrations \
  -F "teamName=Circuit Breakers" \
  -F "leaderName=John Doe" \
  -F "branch=Computer Science" \
  -F "leaderRegdNo=2021CS001" \
  -F "teamSize=4" \
  -F "member2=Jane Smith" \
  -F "member3=Bob Johnson" \
  -F "member4=Alice Williams" \
  -F "paymentScreenshot=@/path/to/screenshot.jpg"
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Cloudinary Upload Error
- Verify credentials in `.env`
- Check internet connection
- Ensure file size is under 5MB

### CORS Error
- Backend must be running on port 5000
- Frontend should make requests to `http://localhost:5000`

## License

MIT
