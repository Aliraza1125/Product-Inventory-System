
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
    let email = document.getElementById("email-address").value;
    let password = document.getElementById("password").value;
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.length > 0) {
        let foundUser = users.find((user) => user.email === email);
        if (foundUser) {
            let hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
            if (foundUser.password === hashedPassword) {
                alert("Login successful!");
                localStorage.setItem("loggedInUser", email); 
                window.location.href = "index.html"; 
            } else {
                alert("Invalid email or password");
            }
        } else {
            alert("User not found"); 
        }
    } else {
        alert("No users found. Please register first."); 
    }
});
