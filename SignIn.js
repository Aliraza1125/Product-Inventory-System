class LoginManager {
    constructor() {
      document.getElementById("loginForm").addEventListener("submit", event => this.handleLogin(event));
    }
  
    handleLogin(event) {
      event.preventDefault();
      const { value: email } = document.getElementById("email-address");
      const { value: password } = document.getElementById("password");
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      const foundUser = users.find(user => user.email === email);
      if (!foundUser) return alert("User not found");
  
      if (CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64) === foundUser.password) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password");
      }
    }
  }
  
  // Usage
  document.addEventListener("DOMContentLoaded", () => new LoginManager());
  