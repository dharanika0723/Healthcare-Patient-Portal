document.getElementById("registerForm").addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const blood = document.getElementById("blood").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(
        name === "" ||
        email === "" ||
        phone === "" ||
        age === "" ||
        password === "" ||
        confirmPassword === ""
    ){

        alert("Please fill all fields.");
        return;

    }

    if(password !== confirmPassword){

        alert("Passwords do not match.");
        return;

    }

    // ======================================
    // SEND DATA TO BACKEND
    // ======================================

    fetch("https://healthcare-patient-portal.onrender.com/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            full_name: name,
            email: email,
            password: password,
            age: age,
            gender: gender,
            blood_group: blood,
            phone: phone

        })

    })

    .then(response => response.json())

    .then(data => {

        if(data.success){

            alert(data.message);

            window.location.href = "login.html";

        }else{

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please try again.");

    });

});