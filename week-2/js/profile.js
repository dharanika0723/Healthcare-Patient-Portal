<<<<<<< HEAD
// =====================================
// GET LOGGED-IN USER
// =====================================

const user = JSON.parse(localStorage.getItem("loggedInUser"));
// ======================================
// LOAD PROFILE IMAGE
// ======================================

if (user.profile_image) {

    document.getElementById("profileImage").src =
        "http://localhost:5000/uploads/" + user.profile_image;

}

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

    const updatedUser = {

        id: user.id,
        full_name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        age: document.getElementById("age").value.trim(),
        gender: document.getElementById("gender").value,
        blood_group: document.getElementById("blood").value

    };

    fetch("http://localhost:5000/profile", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(updatedUser)

    })

    .then(response => response.json())

    .then(data => {

        if(data.success){

            // Update local logged-in user
            user.name = updatedUser.full_name;
            user.phone = updatedUser.phone;
            user.age = updatedUser.age;
            user.gender = updatedUser.gender;
            user.blood = updatedUser.blood_group;

            localStorage.setItem("loggedInUser", JSON.stringify(user));

            alert(data.message);

            window.location.href = "dashboard.html";

        }else{

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please try again.");

    });

});

// ======================================
// CHOOSE IMAGE
// ======================================

document.getElementById("chooseImageBtn").addEventListener("click", function () {

    document.getElementById("profileImageInput").click();

});

// ======================================
// IMAGE PREVIEW
// ======================================

document.getElementById("profileImageInput").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        document.getElementById("profileImage").src = e.target.result;

    };

    reader.readAsDataURL(file);

});

// ======================================
// UPLOAD PROFILE IMAGE
// ======================================

document.getElementById("uploadImageBtn").addEventListener("click", function () {

    const fileInput = document.getElementById("profileImageInput");

    if (fileInput.files.length === 0) {

        alert("Please choose an image first.");

        return;

    }

    const formData = new FormData();

    formData.append("patient_id", user.id);

    formData.append("profileImage", fileInput.files[0]);

    fetch("http://localhost:5000/upload-profile", {

        method: "POST",

        body: formData

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(data.message);

            user.profile_image = data.image;

            localStorage.setItem(

                "loggedInUser",

                JSON.stringify(user)

            );

            document.getElementById("profileImage").src =
                "http://localhost:5000/uploads/" + data.image;

        }

        else {

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Unable to upload image.");

    });

});

// =====================================
// LOGOUT
// =====================================

document.getElementById("logoutBtn").addEventListener("click", function(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    }

=======
// =====================================
// GET LOGGED-IN USER
// =====================================

const user = JSON.parse(localStorage.getItem("loggedInUser"));
// ======================================
// LOAD PROFILE IMAGE
// ======================================

if (user.profile_image) {

    document.getElementById("profileImage").src =
        "http://localhost:5000/uploads/" + user.profile_image;

}

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

    const updatedUser = {

        id: user.id,
        full_name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        age: document.getElementById("age").value.trim(),
        gender: document.getElementById("gender").value,
        blood_group: document.getElementById("blood").value

    };

    fetch("http://localhost:5000/profile", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(updatedUser)

    })

    .then(response => response.json())

    .then(data => {

        if(data.success){

            // Update local logged-in user
            user.name = updatedUser.full_name;
            user.phone = updatedUser.phone;
            user.age = updatedUser.age;
            user.gender = updatedUser.gender;
            user.blood = updatedUser.blood_group;

            localStorage.setItem("loggedInUser", JSON.stringify(user));

            alert(data.message);

            window.location.href = "dashboard.html";

        }else{

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please try again.");

    });

});

// ======================================
// CHOOSE IMAGE
// ======================================

document.getElementById("chooseImageBtn").addEventListener("click", function () {

    document.getElementById("profileImageInput").click();

});

// ======================================
// IMAGE PREVIEW
// ======================================

document.getElementById("profileImageInput").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        document.getElementById("profileImage").src = e.target.result;

    };

    reader.readAsDataURL(file);

});

// ======================================
// UPLOAD PROFILE IMAGE
// ======================================

document.getElementById("uploadImageBtn").addEventListener("click", function () {

    const fileInput = document.getElementById("profileImageInput");

    if (fileInput.files.length === 0) {

        alert("Please choose an image first.");

        return;

    }

    const formData = new FormData();

    formData.append("patient_id", user.id);

    formData.append("profileImage", fileInput.files[0]);

    fetch("http://localhost:5000/upload-profile", {

        method: "POST",

        body: formData

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(data.message);

            user.profile_image = data.image;

            localStorage.setItem(

                "loggedInUser",

                JSON.stringify(user)

            );

            document.getElementById("profileImage").src =
                "http://localhost:5000/uploads/" + data.image;

        }

        else {

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Unable to upload image.");

    });

});

// =====================================
// LOGOUT
// =====================================

document.getElementById("logoutBtn").addEventListener("click", function(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    }

>>>>>>> d612fe8 (Initial UI UX Healthcare Patient Portal)
});