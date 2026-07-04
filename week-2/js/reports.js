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
// GET DATA FROM LOCAL STORAGE
// ======================================

const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const medicalRecords = JSON.parse(localStorage.getItem("medicalRecords")) || [];

const prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];

// ======================================
// FILTER CURRENT USER DATA
// ======================================

const userAppointments = appointments.filter(function(item){

    return item.patientEmail === loggedInUser.email;

});

const userRecords = medicalRecords.filter(function(item){

    return item.patientEmail === loggedInUser.email;

});

const userPrescriptions = prescriptions.filter(function(item){

    return item.patientEmail === loggedInUser.email;

});

// ======================================
// UPDATE SUMMARY CARDS
// ======================================

document.getElementById("appointmentCount").textContent =
userAppointments.length;

document.getElementById("recordCount").textContent =
userRecords.length;

const activeMedicines = userPrescriptions.filter(function(item){

    return item.status === "Active";

});

document.getElementById("prescriptionCount").textContent =
activeMedicines.length;

// ======================================
// RECENT ACTIVITY
// ======================================

const activityTable = document.getElementById("activityTable");

activityTable.innerHTML = "";

userAppointments.forEach(function(item){

    activityTable.innerHTML += `

    <tr>

        <td>${item.date}</td>

        <td>Appointment with ${item.doctor}</td>

        <td>${item.status}</td>

    </tr>

    `;

});

userRecords.forEach(function(item){

    activityTable.innerHTML += `

    <tr>

        <td>${item.visitDate}</td>

        <td>Medical Record - ${item.department}</td>

        <td>Completed</td>

    </tr>

    `;

});

// ======================================
// NO ACTIVITY
// ======================================

if(activityTable.innerHTML === ""){

    activityTable.innerHTML = `

    <tr>

        <td colspan="3">

            No recent activity available.

        </td>

    </tr>

    `;

}

// ======================================
// DOWNLOAD REPORT
// ======================================

document.getElementById("downloadReport").addEventListener("click",function(){

    alert(

        "Healthcare Summary Report\n\n" +

        "Patient : " + loggedInUser.name +

        "\nAppointments : " + userAppointments.length +

        "\nMedical Records : " + userRecords.length +

        "\nActive Prescriptions : " + activeMedicines.length +

        "\n\nPDF Download will be available after backend integration."

    );

});