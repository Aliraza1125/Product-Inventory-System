class LoginManager {
  constructor() {
    document.getElementById("loginForm").addEventListener("submit", event => this.handleLogin(event));
  }

  async handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("email-address").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        // You can handle the user data as needed here, such as storing it in session storage or managing it dynamically in the application state.
        window.location.href = "index.html";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please check your email and password.');
    }
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => new LoginManager());
