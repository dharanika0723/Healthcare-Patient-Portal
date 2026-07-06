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
// APPOINTMENTS ARRAY
// ======================================

let appointments = [];

// ======================================
// LOAD APPOINTMENTS FROM DATABASE
// ======================================

function loadAppointments() {

    fetch("http://localhost:5000/appointments/" + loggedInUser.id)

        .then(response => response.json())

        .then(data => {

            if (data.success) {

                appointments = data.appointments;

                displayAppointments(appointments);

            } else {

                alert(data.message);

            }

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load appointments.");

        });

}

// ======================================
// DISPLAY APPOINTMENTS
// ======================================

function displayAppointments(list) {

    const table = document.getElementById("appointmentTable");

    const emptyMessage = document.getElementById("noAppointments");

    table.innerHTML = "";

    if (list.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }

    emptyMessage.style.display = "none";

    list.forEach(function (appointment) {

        table.innerHTML += `

        <tr>

            <td>${appointment.doctor_name}</td>

            <td>${appointment.department}</td>

            <td>${appointment.appointment_date}</td>

            <td>${appointment.appointment_time}</td>

            <td>${appointment.reason}</td>

            <td class="status">${appointment.status}</td>

            <td>

                <button
                    class="cancel-btn"
                    onclick="cancelAppointment(${appointment.id})"
                >

                    Cancel

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// CANCEL APPOINTMENT
// ======================================

function cancelAppointment(id) {

    if (!confirm("Do you want to cancel this appointment?")) {

        return;

    }

    fetch("http://localhost:5000/appointments/" + id, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert(data.message);

            // Reload appointments
            loadAppointments();

        } else {

            alert(data.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please try again.");

    });

}

// ======================================
// SEARCH
// ======================================

document.getElementById("searchAppointment").addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const filtered = appointments.filter(function (appointment) {

        return (

            appointment.doctor_name.toLowerCase().includes(search)

            ||

            appointment.department.toLowerCase().includes(search)

        );

    });

    displayAppointments(filtered);

});

// ======================================
// LOAD DATA
// ======================================

loadAppointments();