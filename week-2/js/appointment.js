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

    const logout = confirm("Are you sure you want to logout?");

    if (logout) {

        localStorage.removeItem("loggedInUser");

        alert("Logged out successfully.");

        window.location.href = "login.html";

    }

});

// ======================================
// BOOK APPOINTMENT
// ======================================

document.getElementById("appointmentForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const doctor = document.getElementById("doctor").value;
    const department = document.getElementById("department").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const symptoms = document.getElementById("symptoms").value.trim();

    // ======================================
    // VALIDATION
    // ======================================

    if (
        doctor === "" ||
        department === "" ||
        date === "" ||
        time === "" ||
        symptoms === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    // ======================================
    // SEND DATA TO BACKEND
    // ======================================

    fetch("https://healthcare-patient-portal.onrender.com/appointments", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            patient_id: loggedInUser.id,
            doctor_name: doctor,
            department: department,
            appointment_date: date,
            appointment_time: time,
            reason: symptoms

        })

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(data.message);

            document.getElementById("appointmentForm").reset();

            window.location.href = "myappointments.html";

        } else {

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please try again.");

    });

});