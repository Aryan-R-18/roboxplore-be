// Simple test script to verify API is working
// Run with: node test-api.js

const testHealthEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Backend is running successfully!');
      console.log('Response:', data);
    } else {
      console.log('❌ Backend returned an error');
      console.log('Response:', data);
    }
  } catch (error) {
    console.log('❌ Failed to connect to backend');
    console.log('Error:', error.message);
    console.log('\nMake sure:');
    console.log('1. Backend server is running (npm run dev)');
    console.log('2. Server is running on port 5000');
  }
};

console.log('Testing RoboXplore Backend API...\n');
testHealthEndpoint();
