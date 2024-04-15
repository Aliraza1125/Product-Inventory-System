class RegistrationManager {
  constructor() {
    this.registerForm = document.getElementById("registerForm");
    this.registerForm.addEventListener("submit", event => this.handleRegistration(event));
  }

  handleRegistration(event) {
    event.preventDefault();
    const user = this.getUserData();
    if (!this.acceptedTerms()) return;
    this.saveUser(user);
  }

  getUserData() {
    return {
      username: document.getElementById("firstName").value,
      email: document.getElementById("email-address").value,
      password: document.getElementById("password").value,
      phoneNumber: document.getElementById("phoneNumber").value
    };
  }

  acceptedTerms() {
    if (!document.getElementById("terms-checkbox").checked) {
      alert("Please accept the terms and conditions.");
      return false;
    }
    return true;
  }

  async saveUser(user) {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        alert("Sign up successful!");
        this.clearForm();
        window.location.href = 'SignIn.html';
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed. Please try again.');
    }
  }

  clearForm() {
    const formFields = ["firstName", "email-address", "password", "phoneNumber", "terms-checkbox"];
    formFields.forEach(field => document.getElementById(field).value = "");
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  new RegistrationManager();
});
