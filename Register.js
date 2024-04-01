document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email-address").value;
    let password = document.getElementById("password").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    

    let termsCheckbox = document.getElementById("terms-checkbox");
    if (!termsCheckbox.checked) {
        alert("Please accept the terms and conditions.");
        return;
    }
    

    let hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    
  
    let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword, 
        phoneNumber: phoneNumber
    };
    
  
    if (typeof(Storage) !== "undefined") {
    
        let users = JSON.parse(localStorage.getItem("users")) || [];
     
        users.push(user);
     
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign up successful!");
        window.location.href = 'SignIn.html';

        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email-address").value = "";
        document.getElementById("password").value = "";
        document.getElementById("phoneNumber").value = "";
        termsCheckbox.checked = false;
    } else {
        alert("Sorry, your browser does not support web storage...");
    }
});
