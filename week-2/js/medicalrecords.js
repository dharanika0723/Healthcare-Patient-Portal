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
// SAMPLE MEDICAL RECORDS
// (Only created once)
// ======================================

let medicalRecords = JSON.parse(localStorage.getItem("medicalRecords"));

if (!medicalRecords) {

    medicalRecords = [

        {

            patientEmail: loggedInUser.email,

            visitDate: "2026-07-10",

            doctor: "Dr. Sarah Johnson",

            department: "Cardiology",

            diagnosis: "Mild Chest Pain",

            prescription: "Paracetamol 500mg",

            labReport: "Blood Test - Normal"

        },

        {

            patientEmail: loggedInUser.email,

            visitDate: "2026-06-15",

            doctor: "Dr. Emily Davis",

            department: "Dermatology",

            diagnosis: "Skin Allergy",

            prescription: "Cetirizine",

            labReport: "Skin Test - Mild Allergy"

        }

    ];

    localStorage.setItem(

        "medicalRecords",

        JSON.stringify(medicalRecords)

    );

}

// ======================================
// SHOW ONLY CURRENT USER RECORDS
// ======================================

medicalRecords = medicalRecords.filter(function(record){

    return record.patientEmail === loggedInUser.email;

});

// ======================================
// DISPLAY RECORDS
// ======================================

function displayRecords(records){

    const table = document.getElementById("medicalTable");

    const empty = document.getElementById("noRecords");

    table.innerHTML = "";

    if(records.length === 0){

        empty.style.display = "block";

        return;

    }

    empty.style.display = "none";

    records.forEach(function(record){

        table.innerHTML += `

        <tr>

            <td>${record.visitDate}</td>

            <td>${record.doctor}</td>

            <td>${record.department}</td>

            <td>${record.diagnosis}</td>

            <td>${record.prescription}</td>

            <td>${record.labReport}</td>

            <td>

                <button
                    class="view-btn"
                    onclick="viewRecord('${record.doctor}')">

                    View

                </button>

                <button
                    class="download-btn"
                    onclick="downloadRecord('${record.doctor}')">

                    Download

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// VIEW REPORT
// ======================================

function viewRecord(doctor){

    alert(

        "Medical Report\\n\\nDoctor : "

        + doctor +

        "\\n\\nDetailed report feature will be added after backend integration."

    );

}

// ======================================
// DOWNLOAD REPORT
// ======================================

function downloadRecord(doctor){

    alert(

        "Downloading report of "

        + doctor +

        "\\n\\n(PDF download will be available after backend integration.)"

    );

}

// ======================================
// SEARCH
// ======================================

document.getElementById("searchRecord").addEventListener("keyup", function(){

    const search = this.value.toLowerCase();

    const filtered = medicalRecords.filter(function(record){

        return(

            record.doctor.toLowerCase().includes(search)

            ||

            record.department.toLowerCase().includes(search)

        );

    });

    displayRecords(filtered);

});

// ======================================
// LOAD RECORDS
// ======================================

displayRecords(medicalRecords);