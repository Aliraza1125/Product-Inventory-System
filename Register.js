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
      this.clearForm();
      alert("Sign up successful!");
      window.location.href = 'SignIn.html';
    }
  
    getUserData() {
      return {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email-address").value,
        password: CryptoJS.SHA256(document.getElementById("password").value).toString(CryptoJS.enc.Base64),
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
  
    saveUser(user) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    clearForm() {
      const formFields = ["firstName", "lastName", "email-address", "password", "phoneNumber", "terms-checkbox"];
      formFields.forEach(field => document.getElementById(field).value = "");
    }
  }
  
  // Usage
  document.addEventListener("DOMContentLoaded", () => {
    new RegistrationManager();
  });
  