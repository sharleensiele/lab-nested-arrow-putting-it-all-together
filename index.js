

/**
 * Lab: JavaScript Functions - Secure Login Tracker
 * 
 * This function creates a login tracker that limits login attempts
 * to prevent unauthorized access.
 */

/**
 * Creates a login tracker for a user
 * @param {Object} userInfo - Object containing username and password
 * @param {string} userInfo.username - The user's username
 * @param {string} userInfo.password - The user's correct password
 * @returns {Function} Arrow function that handles login attempts
 */
function createLoginTracker(userInfo) {
  // Initialize attempt counter - this is in the closure scope
  // Only accessible to the inner function
  let attemptCount = 0;

  // Return an arrow function that handles each login attempt
  // This inner function has access to attemptCount and userInfo through closure
  return (passwordAttempt) => {
    // Increment the attempt count each time the function is called
    attemptCount++;

    // Check if account is locked (more than 3 attempts)
    if (attemptCount > 3) {
      return "Account locked due to too many failed login attempts";
    }

    // Check if the password matches
    if (passwordAttempt === userInfo.password) {
      // Successful login
      return "Login successful";
    } else {
      // Failed login - return attempt number and failure message
      return `Attempt ${attemptCount}: Login failed`;
    }
  };
}

// Export the function for testing (as a named export)
module.exports = { createLoginTracker };

// Example usage (for local testing):
if (require.main === module) {
  console.log("=== Testing Login Tracker ===\n");

  // Create a login tracker for a user
  const userLogin = createLoginTracker({
    username: "user1",
    password: "password123"
  });

  // Test Case 1: Failed login attempt
  console.log("Attempt 1 (wrong password):", userLogin("wrongpass"));

  // Test Case 2: Another failed login attempt
  console.log("Attempt 2 (wrong password):", userLogin("wrongpass2"));

  // Test Case 3: Successful login on third attempt
  console.log("Attempt 3 (correct password):", userLogin("password123"));

  console.log("\n--- Testing Account Lockout ---\n");

  // Create another login tracker
  const userLogin2 = createLoginTracker({
    username: "user2",
    password: "securepass"
  });

  // Test Case 4: Three failed attempts
  console.log("Attempt 1:", userLogin2("wrong1"));
  console.log("Attempt 2:", userLogin2("wrong2"));
  console.log("Attempt 3:", userLogin2("wrong3"));

  // Test Case 5: Fourth attempt should be locked
  console.log("Attempt 4 (should be locked):", userLogin2("securepass"));

  // Test Case 6: Fifth attempt should still be locked
  console.log("Attempt 5 (still locked):", userLogin2("securepass"));
}
module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};