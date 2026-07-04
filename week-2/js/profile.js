// =====================================
// GET LOGGED-IN USER
// =====================================

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// =====================================
// DISPLAY USER DETAILS
// =====================================

document.getElementById("name").value = user.name;
document.getElementById("email").value = user.email;
document.getElementById("phone").value = user.phone;
document.getElementById("age").value = user.age;
document.getElementById("gender").value = user.gender;
document.getElementById("blood").value = user.blood;

// =====================================
// SAVE PROFILE
// =====================================

document.getElementById("profileForm").addEventListener("submit", function(event){

    event.preventDefault();

    user.name = document.getElementById("name").value.trim();
    user.phone = document.getElementById("phone").value.trim();
    user.age = document.getElementById("age").value.trim();
    user.gender = document.getElementById("gender").value;
    user.blood = document.getElementById("blood").value;

    // Update logged in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Update registered user
    localStorage.setItem("patient", JSON.stringify(user));

    alert("Profile Updated Successfully!");

    window.location.href = "dashboard.html";

});

// =====================================
// LOGOUT
// =====================================

document.getElementById("logoutBtn").addEventListener("click", function(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("loggedInUser");

        window.location.href="login.html";

    }

});