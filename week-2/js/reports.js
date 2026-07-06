<<<<<<< HEAD
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
// ARRAYS
// ======================================

let appointments = [];
let medicalRecords = [];
let prescriptions = [];
let reports = [];

// ======================================
// LOAD ALL DATA
// ======================================

async function loadReports() {

    try {

        // ===============================
        // APPOINTMENTS
        // ===============================

        const appointmentResponse = await fetch(

            "http://localhost:5000/appointments/" + loggedInUser.id

        );

        const appointmentData = await appointmentResponse.json();

        if (appointmentData.success) {

            appointments = appointmentData.appointments;

        }

        // ===============================
        // MEDICAL RECORDS
        // ===============================

        const medicalResponse = await fetch(

            "http://localhost:5000/medical-records/" + loggedInUser.id

        );

        const medicalData = await medicalResponse.json();

        if (medicalData.success) {

            medicalRecords = medicalData.records;

        }

        // ===============================
        // PRESCRIPTIONS
        // ===============================

        const prescriptionResponse = await fetch(

            "http://localhost:5000/prescriptions/" + loggedInUser.id

        );

        const prescriptionData = await prescriptionResponse.json();

        if (prescriptionData.success) {

            prescriptions = prescriptionData.prescriptions;

        }

        // ===============================
        // REPORTS
        // ===============================

        const reportResponse = await fetch(

            "http://localhost:5000/reports/" + loggedInUser.id

        );

        const reportData = await reportResponse.json();

        if (reportData.success) {

            reports = reportData.reports;

        }

        updateDashboard();

    }

    catch (error) {

        console.error(error);

        alert("Unable to load report data.");

    }

}

// ======================================
// UPDATE SUMMARY
// ======================================

function updateDashboard() {

    document.getElementById("appointmentCount").textContent =
        appointments.length;

    document.getElementById("recordCount").textContent =
        medicalRecords.length;

    document.getElementById("prescriptionCount").textContent =
        prescriptions.length;

    document.getElementById("reportCount").textContent =
        reports.length;

    loadRecentActivity();

}

// ======================================
// RECENT ACTIVITY
// ======================================

function loadRecentActivity() {

    const activityTable =
        document.getElementById("activityTable");

    activityTable.innerHTML = "";

    // ===============================
    // APPOINTMENTS
    // ===============================

    appointments.forEach(function(item){

        activityTable.innerHTML += `

        <tr>

            <td>${item.appointment_date}</td>

            <td>Appointment with ${item.doctor_name}</td>

            <td>${item.status}</td>

        </tr>

        `;

    });

    // ===============================
    // MEDICAL RECORDS
    // ===============================

    medicalRecords.forEach(function(item){

        activityTable.innerHTML += `

        <tr>

            <td>${item.visit_date}</td>

            <td>${item.record_title}</td>

            <td>Completed</td>

        </tr>

        `;

    });

    // ===============================
    // REPORTS
    // ===============================

    reports.forEach(function(item){

        activityTable.innerHTML += `

        <tr>

            <td>${item.report_date}</td>

            <td>${item.report_title}</td>

            <td>${item.report_type}</td>

        </tr>

        `;

    });

    // ===============================
    // NO ACTIVITY
    // ===============================

    if(activityTable.innerHTML === ""){

        activityTable.innerHTML = `

        <tr>

            <td colspan="3">

                No recent activity available.

            </td>

        </tr>

        `;

    }

}

// ======================================
// DOWNLOAD REPORT
// ======================================

document.getElementById("downloadReport").addEventListener("click", function(){

    alert(

        "Healthcare Summary Report\n\n" +

        "Patient : " + loggedInUser.name +

        "\nAppointments : " + appointments.length +

        "\nMedical Records : " + medicalRecords.length +

        "\nPrescriptions : " + prescriptions.length +

        "\nReports : " + reports.length +

        "\n\nPDF Download feature will be added later."

    );

});

// ======================================
// LOAD PAGE
// ======================================

=======
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
// ARRAYS
// ======================================

let appointments = [];
let medicalRecords = [];
let prescriptions = [];
let reports = [];

// ======================================
// LOAD ALL DATA
// ======================================

async function loadReports() {

    try {

        // ===============================
        // APPOINTMENTS
        // ===============================

        const appointmentResponse = await fetch(

            "http://localhost:5000/appointments/" + loggedInUser.id

        );

        const appointmentData = await appointmentResponse.json();

        if (appointmentData.success) {

            appointments = appointmentData.appointments;

        }

        // ===============================
        // MEDICAL RECORDS
        // ===============================

        const medicalResponse = await fetch(

            "http://localhost:5000/medical-records/" + loggedInUser.id

        );

        const medicalData = await medicalResponse.json();

        if (medicalData.success) {

            medicalRecords = medicalData.records;

        }

        // ===============================
        // PRESCRIPTIONS
        // ===============================

        const prescriptionResponse = await fetch(

            "http://localhost:5000/prescriptions/" + loggedInUser.id

        );

        const prescriptionData = await prescriptionResponse.json();

        if (prescriptionData.success) {

            prescriptions = prescriptionData.prescriptions;

        }

        // ===============================
        // REPORTS
        // ===============================

        const reportResponse = await fetch(

            "http://localhost:5000/reports/" + loggedInUser.id

        );

        const reportData = await reportResponse.json();

        if (reportData.success) {

            reports = reportData.reports;

        }

        updateDashboard();

    }

    catch (error) {

        console.error(error);

        alert("Unable to load report data.");

    }

}

// ======================================
// UPDATE SUMMARY
// ======================================

function updateDashboard() {

    document.getElementById("appointmentCount").textContent =
        appointments.length;

    document.getElementById("recordCount").textContent =
        medicalRecords.length;

    document.getElementById("prescriptionCount").textContent =
        prescriptions.length;

    document.getElementById("reportCount").textContent =
        reports.length;

    loadRecentActivity();

}

// ======================================
// RECENT ACTIVITY
// ======================================

function loadRecentActivity() {

    const activityTable =
        document.getElementById("activityTable");

    activityTable.innerHTML = "";

    // ===============================
    // APPOINTMENTS
    // ===============================

    appointments.forEach(function(item){

        activityTable.innerHTML += `

        <tr>

            <td>${item.appointment_date}</td>

            <td>Appointment with ${item.doctor_name}</td>

            <td>${item.status}</td>

        </tr>

        `;

    });

    // ===============================
    // MEDICAL RECORDS
    // ===============================

    medicalRecords.forEach(function(item){

        activityTable.innerHTML += `

        <tr>

            <td>${item.visit_date}</td>

            <td>${item.record_title}</td>

            <td>Completed</td>

        </tr>

        `;

    });

    // ===============================
    // REPORTS
    // ===============================

    reports.forEach(function(item){

        activityTable.innerHTML += `

        <tr>

            <td>${item.report_date}</td>

            <td>${item.report_title}</td>

            <td>${item.report_type}</td>

        </tr>

        `;

    });

    // ===============================
    // NO ACTIVITY
    // ===============================

    if(activityTable.innerHTML === ""){

        activityTable.innerHTML = `

        <tr>

            <td colspan="3">

                No recent activity available.

            </td>

        </tr>

        `;

    }

}

// ======================================
// DOWNLOAD REPORT
// ======================================

document.getElementById("downloadReport").addEventListener("click", function(){

    alert(

        "Healthcare Summary Report\n\n" +

        "Patient : " + loggedInUser.name +

        "\nAppointments : " + appointments.length +

        "\nMedical Records : " + medicalRecords.length +

        "\nPrescriptions : " + prescriptions.length +

        "\nReports : " + reports.length +

        "\n\nPDF Download feature will be added later."

    );

});

// ======================================
// LOAD PAGE
// ======================================

>>>>>>> d612fe8 (Initial UI UX Healthcare Patient Portal)
loadReports();