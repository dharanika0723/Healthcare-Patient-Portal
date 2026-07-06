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
// PRESCRIPTIONS ARRAY
// ======================================

let prescriptions = [];

// ======================================
// LOAD PRESCRIPTIONS FROM DATABASE
// ======================================

function loadPrescriptions() {

    fetch("http://localhost:5000/prescriptions/" + loggedInUser.id)

        .then(response => response.json())

        .then(data => {

            if (data.success) {

                prescriptions = data.prescriptions;

                displayPrescriptions(prescriptions);

            }

            else {

                alert(data.message);

            }

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load prescriptions.");

        });

}

// ======================================
// DISPLAY PRESCRIPTIONS
// ======================================

function displayPrescriptions(list) {

    const table = document.getElementById("prescriptionTable");

    const empty = document.getElementById("noPrescription");

    table.innerHTML = "";

    if (list.length === 0) {

        empty.style.display = "block";

        return;

    }

    empty.style.display = "none";

    list.forEach(function(item) {

        table.innerHTML += `

        <tr>

            <td>${item.medicine_name}</td>

            <td>${item.dosage}</td>

            <td>${item.frequency}</td>

            <td>${item.duration}</td>

            <td>${item.doctor_name}</td>

            <td>${item.prescribed_date}</td>

        </tr>

        `;

    });

}

// ======================================
// SEARCH PRESCRIPTIONS
// ======================================

document.getElementById("searchMedicine").addEventListener("keyup", function(){

    const search = this.value.toLowerCase();

    const filtered = prescriptions.filter(function(item){

        return(

            item.medicine_name.toLowerCase().includes(search)

            ||

            item.doctor_name.toLowerCase().includes(search)

        );

    });

    displayPrescriptions(filtered);

});

// ======================================
// LOAD DATA
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
// PRESCRIPTIONS ARRAY
// ======================================

let prescriptions = [];

// ======================================
// LOAD PRESCRIPTIONS FROM DATABASE
// ======================================

function loadPrescriptions() {

    fetch("http://localhost:5000/prescriptions/" + loggedInUser.id)

        .then(response => response.json())

        .then(data => {

            if (data.success) {

                prescriptions = data.prescriptions;

                displayPrescriptions(prescriptions);

            }

            else {

                alert(data.message);

            }

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load prescriptions.");

        });

}

// ======================================
// DISPLAY PRESCRIPTIONS
// ======================================

function displayPrescriptions(list) {

    const table = document.getElementById("prescriptionTable");

    const empty = document.getElementById("noPrescription");

    table.innerHTML = "";

    if (list.length === 0) {

        empty.style.display = "block";

        return;

    }

    empty.style.display = "none";

    list.forEach(function(item) {

        table.innerHTML += `

        <tr>

            <td>${item.medicine_name}</td>

            <td>${item.dosage}</td>

            <td>${item.frequency}</td>

            <td>${item.duration}</td>

            <td>${item.doctor_name}</td>

            <td>${item.prescribed_date}</td>

        </tr>

        `;

    });

}

// ======================================
// SEARCH PRESCRIPTIONS
// ======================================

document.getElementById("searchMedicine").addEventListener("keyup", function(){

    const search = this.value.toLowerCase();

    const filtered = prescriptions.filter(function(item){

        return(

            item.medicine_name.toLowerCase().includes(search)

            ||

            item.doctor_name.toLowerCase().includes(search)

        );

    });

    displayPrescriptions(filtered);

});

// ======================================
// LOAD DATA
// ======================================

>>>>>>> d612fe8 (Initial UI UX Healthcare Patient Portal)
loadPrescriptions();