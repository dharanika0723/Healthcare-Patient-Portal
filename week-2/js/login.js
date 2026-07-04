document.getElementById("loginForm").addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Get registered user
    const storedUser = JSON.parse(localStorage.getItem("patient"));

    // Check if user has registered
    if(storedUser === null){

        alert("No account found. Please register first.");

        window.location.href = "register.html";

        return;
    }

    // Check email and password
    if(email === storedUser.email && password === storedUser.password){

    alert("Login Successful!");

    localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

    window.location.href = "dashboard.html";

    }   
    else{

        alert("Invalid Email or Password.");

    }

});