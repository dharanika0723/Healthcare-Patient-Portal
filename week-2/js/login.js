<<<<<<< HEAD
document.getElementById("loginForm").addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check empty fields
    if(email === "" || password === ""){

        alert("Please enter email and password.");

        return;

    }

    // ======================================
    // SEND LOGIN REQUEST TO BACKEND
    // ======================================

    fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email: email,
            password: password

        })

    })

    .then(response => response.json())

    .then(data => {

        if(data.success){

            alert(data.message);

            // Save logged-in user
            localStorage.setItem("loggedInUser", JSON.stringify(data.patient));

            // Redirect to Dashboard
            window.location.href = "dashboard.html";

        }else{

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please try again.");

    });

=======
document.getElementById("loginForm").addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check empty fields
    if(email === "" || password === ""){

        alert("Please enter email and password.");

        return;

    }

    // ======================================
    // SEND LOGIN REQUEST TO BACKEND
    // ======================================

    fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email: email,
            password: password

        })

    })

    .then(response => response.json())

    .then(data => {

        if(data.success){

            alert(data.message);

            // Save logged-in user
            localStorage.setItem("loggedInUser", JSON.stringify(data.patient));

            // Redirect to Dashboard
            window.location.href = "dashboard.html";

        }else{

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please try again.");

    });

>>>>>>> d612fe8 (Initial UI UX Healthcare Patient Portal)
});