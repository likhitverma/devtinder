const validator = require("validator");

function validateSignupData(req) {
  const { firstName, lastName, emailId, password } = req.body;

  // 1) Required checks
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }

  // 2) Length checks (optional if schema already enforces it)
  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name should be 4 to 50 characters");
  }

  // 3) Email validation
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  // 4) Strong password validation
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
}

function validateEditProfileData(req) {
  const { firstName, lastName, emailId, password } = req.body;

  // 1) Required checks
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }

  // 2) Length checks (optional if schema already enforces it)
  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name should be 4 to 50 characters");
  }

  // 3) Email validation
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  // 4) Strong password validation
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
}

module.exports = { validateSignupData, validateEditProfileData };
