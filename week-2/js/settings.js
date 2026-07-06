// ======================================
// CHECK LOGIN
// ======================================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// ======================================
// LOGOUT
// ======================================

document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedInUser");

        alert("Logged out Successfully!");

        window.location.href = "login.html";

    }

});

// ======================================
// LOAD SAVED SETTINGS
// ======================================

const savedSettings = JSON.parse(localStorage.getItem("userSettings")) || {

    notifications: true,

    darkMode: false,

    language: "English"

};

document.getElementById("notificationToggle").checked =
savedSettings.notifications;

document.getElementById("darkModeToggle").checked =
savedSettings.darkMode;

document.getElementById("languageSelect").value =
savedSettings.language;

// ======================================
// APPLY DARK MODE
// ======================================

if(savedSettings.darkMode){

    document.body.style.background = "#1f2937";
}
else{

    document.body.style.background = "#eef5fb";
}

// ======================================
// DARK MODE TOGGLE
// ======================================

document.getElementById("darkModeToggle").addEventListener("change",function(){

    if(this.checked){

        document.body.style.background = "#1f2937";

    }else{

        document.body.style.background = "#eef5fb";

    }

});

// ======================================
// EDIT PROFILE
// ======================================

document.getElementById("editProfileBtn").addEventListener("click",function(){

    window.location.href = "profile.html";

});

// ======================================
// CHANGE PASSWORD
// ======================================

document.getElementById("changePasswordBtn").addEventListener("click", function () {

    const currentPassword =
        document.getElementById("currentPassword").value.trim();

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();

    // ===============================
    // VALIDATION
    // ===============================

    if (

        currentPassword === "" ||

        newPassword === "" ||

        confirmPassword === ""

    ) {

        alert("Please fill all password fields.");

        return;

    }

    if (newPassword !== confirmPassword) {

        alert("New passwords do not match.");

        return;

    }

    if (newPassword.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }

    // ===============================
    // CALL BACKEND API
    // ===============================

    fetch("https://healthcare-patient-portal.onrender.com/change-password", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            patient_id: loggedInUser.id,

            current_password: currentPassword,

            new_password: newPassword

        })

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(data.message);

            // Clear the form

            document.getElementById("currentPassword").value = "";

            document.getElementById("newPassword").value = "";

            document.getElementById("confirmPassword").value = "";

        }

        else {

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Unable to change password.");

    });

});

// ======================================
// SAVE SETTINGS
// ======================================

document.getElementById("saveSettings").addEventListener("click",function(){

    const settings = {

        notifications:
        document.getElementById("notificationToggle").checked,

        darkMode:
        document.getElementById("darkModeToggle").checked,

        language:
        document.getElementById("languageSelect").value

    };

    localStorage.setItem(

        "userSettings",

        JSON.stringify(settings)

    );

    alert("Settings saved successfully!");

});

// ======================================
// LANGUAGE CHANGE
// ======================================

document.getElementById("languageSelect").addEventListener("change",function(){

    console.log("Language Selected:", this.value);

});