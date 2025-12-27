const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMsg');

function validateUsername() {
  const value = username.value.trim();
  if (value.length < 3 || value.length > 15) {
    username.nextElementSibling.textContent = "Username must be between 3 and 15 characters";
    return false;
  }
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    username.nextElementSibling.textContent = "Username can only contain letters and numbers";
    return false;
  }
  username.nextElementSibling.textContent = "";
  return true;
}

function validateFullName() {
  const value = fullName.value.trim();
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    fullName.nextElementSibling.textContent = "Full name must contain only letters and spaces";
    return false;
  }
  if (value.split(" ").length < 2) {
    fullName.nextElementSibling.textContent = "Please enter your full name";
    return false;
  }
  fullName.nextElementSibling.textContent = "";
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    email.nextElementSibling.textContent = "Please enter a valid email address";
    return false;
  }
  email.nextElementSibling.textContent = "";
  return true;
}

function validatePassword() {
  const value = password.value.trim();
  const name = fullName.value.toLowerCase();
  const mail = email.value.toLowerCase();
  if (value.length < 8) {
    password.nextElementSibling.textContent = "Password must be at least 8 characters";
    return false;
  }
  if (!(/[\d!@#$%^&*]/.test(value))) {
    password.nextElementSibling.textContent = "Password must include at least one number or symbol";
    return false;
  }
  if (name && value.toLowerCase().includes(name)) {
    password.nextElementSibling.textContent = "Password cannot contain your name";
    return false;
  }
  if (mail && value.toLowerCase().includes(mail.split("@")[0])) {
    password.nextElementSibling.textContent = "Password cannot contain your email";
    return false;
  }
  password.nextElementSibling.textContent = "";
  return true;
}

function checkFormValidity() {
  const isValid = validateUsername() && validateFullName() && validateEmail() && validatePassword();
  submitBtn.disabled = !isValid;
}

username.addEventListener('input', checkFormValidity);
fullName.addEventListener('input', checkFormValidity);
email.addEventListener('input', checkFormValidity);
password.addEventListener('input', checkFormValidity);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (validateUsername() && validateFullName() && validateEmail() && validatePassword()) {
    successMsg.textContent = "Registration successful!";
    console.log({
      username: username.value,
      fullName: fullName.value,
      email: email.value,
      password: "********"
    });
    form.reset();
    submitBtn.disabled = true;
  }
});