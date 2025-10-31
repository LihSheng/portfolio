// Simple test script for the contact API
const testContactAPI = async () => {
  const testData = {
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Test Message",
    message: "This is a test message to verify the contact form API is working correctly."
  };

  try {
    console.log('Testing contact API...');
    console.log('Test data:', testData);
    
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Contact API test passed!');
    } else {
      console.log('❌ Contact API test failed!');
    }
  } catch (error) {
    console.error('❌ Error testing contact API:', error.message);
  }
};

// Test invalid data
const testInvalidData = async () => {
  const invalidData = {
    name: "A", // Too short
    email: "invalid-email", // Invalid format
    subject: "", // Empty
    message: "Short" // Too short
  };

  try {
    console.log('\nTesting validation with invalid data...');
    console.log('Invalid test data:', invalidData);
    
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', result);
    
    if (response.status === 400 && !result.success && result.errors) {
      console.log('✅ Validation test passed!');
    } else {
      console.log('❌ Validation test failed!');
    }
  } catch (error) {
    console.error('❌ Error testing validation:', error.message);
  }
};

// Test rate limiting
const testRateLimit = async () => {
  console.log('\nTesting rate limiting...');
  
  const testData = {
    name: "Rate Test",
    email: "rate@test.com",
    subject: "Rate Limit Test",
    message: "Testing rate limiting functionality."
  };

  // Send 6 requests quickly to trigger rate limit
  for (let i = 1; i <= 6; i++) {
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();
      console.log(`Request ${i}: Status ${response.status}, Success: ${result.success}`);
      
      if (response.status === 429) {
        console.log('✅ Rate limiting test passed!');
        break;
      }
    } catch (error) {
      console.error(`Request ${i} error:`, error.message);
    }
  }
};

// Run tests if server is available
const runTests = async () => {
  try {
    // Check if server is running
    const healthCheck = await fetch('http://localhost:3001/api/contact', {
      method: 'GET'
    });
    
    if (healthCheck.status === 405) {
      console.log('Server is running, starting tests...\n');
      await testContactAPI();
      await testInvalidData();
      await testRateLimit();
    }
  } catch (error) {
    console.log('Server not running on localhost:3001. Please start the dev server first with: npm run dev');
  }
};

runTests();