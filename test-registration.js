// Test registration validation
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

import { validateRegistration } from './validators/registrationValidator.js';

console.log('\n=== Testing Registration Validation ===\n');

// Test data for 4-member team
const testData4 = {
  teamName: 'Test Team',
  leaderName: 'John Doe',
  branch: 'Computer Science',
  leaderRegdNo: 'TEST001',
  teamSize: '4',
  member2: 'Jane Smith',
  member3: 'Bob Johnson',
  member4: 'Alice Williams',
  member5: ''
};

console.log('Testing 4-member team:');
console.log('Input:', testData4);
const result4 = validateRegistration(testData4);
console.log('Valid:', result4.success);
if (!result4.success) {
  console.log('Errors:', result4.error.errors);
} else {
  console.log('Validated data:', result4.data);
}

console.log('\n---\n');

// Test data for 5-member team
const testData5 = {
  teamName: 'Test Team',
  leaderName: 'John Doe',
  branch: 'Computer Science',
  leaderRegdNo: 'TEST002',
  teamSize: '5',
  member2: 'Jane Smith',
  member3: 'Bob Johnson',
  member4: 'Alice Williams',
  member5: 'Charlie Brown'
};

console.log('Testing 5-member team:');
console.log('Input:', testData5);
const result5 = validateRegistration(testData5);
console.log('Valid:', result5.success);
if (!result5.success) {
  console.log('Errors:', result5.error.errors);
} else {
  console.log('Validated data:', result5.data);
}

console.log('\n=== Test Complete ===\n');
