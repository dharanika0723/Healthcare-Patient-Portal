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
// MEDICAL RECORDS ARRAY
// ======================================

let medicalRecords = [];

// ======================================
// ADD MEDICAL RECORD
// ======================================

document.getElementById("medicalRecordForm").addEventListener("submit", function(event){

    event.preventDefault();

    const recordTitle = document.getElementById("recordTitle").value.trim();
    const doctorName = document.getElementById("doctorName").value.trim();
    const visitDate = document.getElementById("visitDate").value;
    const diagnosis = document.getElementById("diagnosis").value.trim();
    const treatment = document.getElementById("treatment").value.trim();

    if(
        recordTitle === "" ||
        doctorName === "" ||
        visitDate === "" ||
        diagnosis === "" ||
        treatment === ""
    ){

        alert("Please fill all fields.");

        return;

    }

    fetch("http://localhost:5000/medical-records",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            patient_id:loggedInUser.id,
            record_title:recordTitle,
            diagnosis:diagnosis,
            treatment:treatment,
            doctor_name:doctorName,
            visit_date:visitDate

        })

    })

    .then(response=>response.json())

    .then(data=>{

        if(data.success){

            alert(data.message);

            document.getElementById("medicalRecordForm").reset();

            loadMedicalRecords();

        }
        else{

            alert(data.message);

        }

    })

    .catch(error=>{

        console.error(error);

        alert("Something went wrong.");

    });

});

// ======================================
// LOAD RECORDS
// ======================================

function loadMedicalRecords(){

    fetch("http://localhost:5000/medical-records/" + loggedInUser.id)

    .then(response=>response.json())

    .then(data=>{

        if(data.success){

            medicalRecords=data.records;

            displayRecords(medicalRecords);

        }

    })

    .catch(error=>{

        console.error(error);

    });

}

// ======================================
// DISPLAY RECORDS
// ======================================

function displayRecords(records){

    const table=document.getElementById("medicalTable");

    const empty=document.getElementById("noRecords");

    table.innerHTML="";

    if(records.length===0){

        empty.style.display="block";

        return;

    }

    empty.style.display="none";

    records.forEach(function(record){

        table.innerHTML+=`

        <tr>

            <td>${record.visit_date}</td>

            <td>${record.doctor_name}</td>

            <td>General</td>

            <td>${record.diagnosis}</td>

            <td>${record.treatment}</td>

            <td>${record.record_title}</td>

            <td>

                <button
                class="view-btn"
                onclick="viewRecord(${record.id})">

                View

                </button>

                <button
                class="download-btn"
                onclick="downloadRecord(${record.id})">

                Download

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// VIEW RECORD
// ======================================

function viewRecord(id){

    const record=medicalRecords.find(r=>r.id===id);

    if(!record) return;

    alert(

        "Medical Record\n\n"+

        "Title : "+record.record_title+

        "\nDoctor : "+record.doctor_name+

        "\nDiagnosis : "+record.diagnosis+

        "\nTreatment : "+record.treatment+

        "\nVisit Date : "+record.visit_date

    );

}

// ======================================
// DOWNLOAD
// ======================================

function downloadRecord(id){

    const record=medicalRecords.find(r=>r.id===id);

    if(!record) return;

    alert(

        "PDF Download feature will be implemented later.\n\n"+

        record.record_title

    );

}

// ======================================
// SEARCH
// ======================================

document.getElementById("searchRecord").addEventListener("keyup",function(){

    const search=this.value.toLowerCase();

    const filtered=medicalRecords.filter(function(record){

        return(

            record.doctor_name.toLowerCase().includes(search)

            ||

            record.diagnosis.toLowerCase().includes(search)

            ||

            record.record_title.toLowerCase().includes(search)

        );

    });

    displayRecords(filtered);

});

// ======================================
// INITIAL LOAD
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
// MEDICAL RECORDS ARRAY
// ======================================

let medicalRecords = [];

// ======================================
// ADD MEDICAL RECORD
// ======================================

document.getElementById("medicalRecordForm").addEventListener("submit", function(event){

    event.preventDefault();

    const recordTitle = document.getElementById("recordTitle").value.trim();
    const doctorName = document.getElementById("doctorName").value.trim();
    const visitDate = document.getElementById("visitDate").value;
    const diagnosis = document.getElementById("diagnosis").value.trim();
    const treatment = document.getElementById("treatment").value.trim();

    if(
        recordTitle === "" ||
        doctorName === "" ||
        visitDate === "" ||
        diagnosis === "" ||
        treatment === ""
    ){

        alert("Please fill all fields.");

        return;

    }

    fetch("http://localhost:5000/medical-records",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            patient_id:loggedInUser.id,
            record_title:recordTitle,
            diagnosis:diagnosis,
            treatment:treatment,
            doctor_name:doctorName,
            visit_date:visitDate

        })

    })

    .then(response=>response.json())

    .then(data=>{

        if(data.success){

            alert(data.message);

            document.getElementById("medicalRecordForm").reset();

            loadMedicalRecords();

        }
        else{

            alert(data.message);

        }

    })

    .catch(error=>{

        console.error(error);

        alert("Something went wrong.");

    });

});

// ======================================
// LOAD RECORDS
// ======================================

function loadMedicalRecords(){

    fetch("http://localhost:5000/medical-records/" + loggedInUser.id)

    .then(response=>response.json())

    .then(data=>{

        if(data.success){

            medicalRecords=data.records;

            displayRecords(medicalRecords);

        }

    })

    .catch(error=>{

        console.error(error);

    });

}

// ======================================
// DISPLAY RECORDS
// ======================================

function displayRecords(records){

    const table=document.getElementById("medicalTable");

    const empty=document.getElementById("noRecords");

    table.innerHTML="";

    if(records.length===0){

        empty.style.display="block";

        return;

    }

    empty.style.display="none";

    records.forEach(function(record){

        table.innerHTML+=`

        <tr>

            <td>${record.visit_date}</td>

            <td>${record.doctor_name}</td>

            <td>General</td>

            <td>${record.diagnosis}</td>

            <td>${record.treatment}</td>

            <td>${record.record_title}</td>

            <td>

                <button
                class="view-btn"
                onclick="viewRecord(${record.id})">

                View

                </button>

                <button
                class="download-btn"
                onclick="downloadRecord(${record.id})">

                Download

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// VIEW RECORD
// ======================================

function viewRecord(id){

    const record=medicalRecords.find(r=>r.id===id);

    if(!record) return;

    alert(

        "Medical Record\n\n"+

        "Title : "+record.record_title+

        "\nDoctor : "+record.doctor_name+

        "\nDiagnosis : "+record.diagnosis+

        "\nTreatment : "+record.treatment+

        "\nVisit Date : "+record.visit_date

    );

}

// ======================================
// DOWNLOAD
// ======================================

function downloadRecord(id){

    const record=medicalRecords.find(r=>r.id===id);

    if(!record) return;

    alert(

        "PDF Download feature will be implemented later.\n\n"+

        record.record_title

    );

}

// ======================================
// SEARCH
// ======================================

document.getElementById("searchRecord").addEventListener("keyup",function(){

    const search=this.value.toLowerCase();

    const filtered=medicalRecords.filter(function(record){

        return(

            record.doctor_name.toLowerCase().includes(search)

            ||

            record.diagnosis.toLowerCase().includes(search)

            ||

            record.record_title.toLowerCase().includes(search)

        );

    });

    displayRecords(filtered);

});

// ======================================
// INITIAL LOAD
// ======================================

>>>>>>> d612fe8 (Initial UI UX Healthcare Patient Portal)
loadMedicalRecords();