const form = document.getElementById("signupForm");

const username = document.getElementById("username");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");

const successMsg = document.getElementById("successMsg");

const ruleLength = document.getElementById("rule-length");
const ruleNumber = document.getElementById("rule-number");

function showError(input, message, errorId) {
  input.classList.add("invalid");
  document.getElementById(errorId).innerText = message;
}

function clearError(input, errorId) {
  input.classList.remove("invalid");
  document.getElementById(errorId).innerText = "";
}

password.addEventListener("input", () => {
  ruleLength.style.color =
    password.value.length >= 8 ? "green" : "#999";

  ruleNumber.style.color =
    /[\d\W]/.test(password.value) ? "green" : "#999";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  // Username
  if (username.value.trim() === "") {
    showError(username, "Username is required", "usernameError");
    valid = false;
  } else {
    clearError(username, "usernameError");
  }

  // Full Name
  if (fullname.value.trim() === "") {
    showError(fullname, "Full name is required", "fullnameError");
    valid = false;
  } else {
    clearError(fullname, "fullnameError");
  }

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    showError(email, "Invalid email address", "emailError");
    valid = false;
  } else {
    clearError(email, "emailError");
  }

  // Password
  if (password.value.length < 8 || !/[\d\W]/.test(password.value)) {
    showError(
      password,
      "Password does not meet requirements",
      "passwordError"
    );
    valid = false;
  } else {
    clearError(password, "passwordError");
  }

  // Success
  if (valid) {
    successMsg.style.display = "block";
    form.reset();
  }
});