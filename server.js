// ======================================
// IMPORT REQUIRED PACKAGES
// ======================================

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const db = require("./db");

// ======================================
// CREATE EXPRESS APP
// ======================================

const app = express();

// ======================================
// MIDDLEWARE
// ======================================

// Allow requests from the frontend
app.use(cors());

// Read JSON data sent from the frontend
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ======================================
// TEST ROUTE
// ======================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Healthcare Patient Portal Backend is Running!"
    });
});

// ======================================
// MULTER CONFIGURATION
// ======================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const upload = multer({

    storage: storage,

    limits: {

        fileSize: 15 * 1024 * 1024

    },

    fileFilter: function (req, file, cb) {

        const allowedTypes =
            /jpeg|jpg|png/;

        const ext =
            allowedTypes.test(

                path.extname(file.originalname).toLowerCase()

            );

        const mime =
            allowedTypes.test(file.mimetype);

        if (ext && mime) {

            return cb(null, true);

        }

        cb(new Error("Only JPG, JPEG and PNG images are allowed."));

    }

});
app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {

            return res.status(400).json({

                success: false,

                message: "Image size must be less than 15 MB."

            });

        }

    }

    next(err);

});

// ======================================
// REGISTER API
// ======================================

app.post("/register", async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            age,
            gender,
            blood_group,
            phone
        } = req.body;

        // Check required fields
        if (
            !full_name ||
            !email ||
            !password ||
            !age ||
            !gender ||
            !blood_group ||
            !phone
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        // Check if email already exists
        const checkQuery = "SELECT * FROM patients WHERE email = ?";

        db.query(checkQuery, [email], async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered."
                });
            }

            // Encrypt password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert patient
            const insertQuery = `
                INSERT INTO patients
                (full_name, email, password, age, gender, blood_group, phone)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
                insertQuery,
                [
                    full_name,
                    email,
                    hashedPassword,
                    age,
                    gender,
                    blood_group,
                    phone
                ],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "Registration Successful!"
                    });

                }
            );

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// ======================================
// LOGIN API
// ======================================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please enter email and password."
        });

    }

    // Find patient by email
    const query = "SELECT * FROM patients WHERE email = ?";

    db.query(query, [email], async (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        if (result.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Email not found."
            });

        }

        const patient = result[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, patient.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Incorrect password."
            });

        }

        // Remove password before sending data
        delete patient.password;

        res.status(200).json({

            success: true,
            message: "Login Successful!",

            patient: {

                id: patient.id,
                name: patient.full_name,
                email: patient.email,
                age: patient.age,
                gender: patient.gender,
                blood: patient.blood_group,
                phone: patient.phone

            }

        });

    });

});

// ======================================
// UPDATE PROFILE API
// ======================================

app.put("/profile", (req, res) => {

    const {
        id,
        full_name,
        phone,
        age,
        gender,
        blood_group
    } = req.body;

    if (
        !id ||
        !full_name ||
        !phone ||
        !age ||
        !gender ||
        !blood_group
    ) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });

    }

    const query = `
        UPDATE patients
        SET
            full_name = ?,
            phone = ?,
            age = ?,
            gender = ?,
            blood_group = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            full_name,
            phone,
            age,
            gender,
            blood_group,
            id
        ],
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.status(200).json({

                success: true,
                message: "Profile Updated Successfully!"

            });

        }
    );

});

// ======================================
// UPLOAD PROFILE IMAGE API
// ======================================

app.post("/upload-profile", upload.single("profileImage"), (req, res) => {

    try {

        const patient_id = req.body.patient_id;

        if (!req.file) {

            return res.json({

                success: false,

                message: "Please select an image."

            });

        }

        const imageName = req.file.filename;

        const sql = `
            UPDATE patients
            SET profile_image = ?
            WHERE id = ?
        `;

        db.query(sql, [imageName, patient_id], (err, result) => {

            if (err) {

                console.log(err);

                return res.json({

                    success: false,

                    message: "Image upload failed."

                });

            }

            res.json({

                success: true,

                message: "Profile picture updated successfully.",

                image: imageName

            });

        });

    }

    catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Server Error"

        });

    }

});

// ======================================
// BOOK APPOINTMENT API
// ======================================

app.post("/appointments", (req, res) => {

    const {

        patient_id,
        doctor_name,
        department,
        appointment_date,
        appointment_time,
        reason

    } = req.body;

    // Check required fields
    if (
        !patient_id ||
        !doctor_name ||
        !department ||
        !appointment_date ||
        !appointment_time ||
        !reason
    ) {

        return res.status(400).json({

            success: false,
            message: "Please fill all fields."

        });

    }

    const query = `
        INSERT INTO appointments
        (
            patient_id,
            doctor_name,
            department,
            appointment_date,
            appointment_time,
            reason
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            patient_id,
            doctor_name,
            department,
            appointment_date,
            appointment_time,
            reason
        ],
        (err, result) => {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: err.message

                });

            }

            res.status(201).json({

                success: true,
                message: "Appointment Booked Successfully!",
                appointmentId: result.insertId

            });

        }
    );

});

// ======================================
// GET MY APPOINTMENTS API
// ======================================

app.get("/appointments/:patientId", (req, res) => {

    const patientId = req.params.patientId;

    const query = `
        SELECT *
        FROM appointments
        WHERE patient_id = ?
        ORDER BY appointment_date ASC, appointment_time ASC
    `;

    db.query(query, [patientId], (err, results) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        res.status(200).json({

            success: true,
            appointments: results

        });

    });

});

// ======================================
// CANCEL APPOINTMENT API
// ======================================

app.delete("/appointments/:id", (req, res) => {

    const appointmentId = req.params.id;

    const query = "DELETE FROM appointments WHERE id = ?";

    db.query(query, [appointmentId], (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                message: "Appointment not found."

            });

        }

        res.status(200).json({

            success: true,
            message: "Appointment Cancelled Successfully!"

        });

    });

});

// ======================================
// GET MEDICAL RECORDS API
// ======================================

app.get("/medical-records/:patientId", (req, res) => {

    const patientId = req.params.patientId;

    const query = `
        SELECT *
        FROM medical_records
        WHERE patient_id = ?
        ORDER BY visit_date DESC
    `;

    db.query(query, [patientId], (err, results) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        res.status(200).json({

            success: true,
            records: results

        });

    });

});

// ======================================
// ADD MEDICAL RECORD API
// ======================================

app.post("/medical-records", (req, res) => {

    const {

        patient_id,
        record_title,
        diagnosis,
        treatment,
        doctor_name,
        visit_date

    } = req.body;

    // Validate required fields
    if (
        !patient_id ||
        !record_title ||
        !diagnosis ||
        !treatment ||
        !doctor_name ||
        !visit_date
    ) {

        return res.status(400).json({

            success: false,
            message: "Please fill all fields."

        });

    }

    const query = `
        INSERT INTO medical_records
        (
            patient_id,
            record_title,
            diagnosis,
            treatment,
            doctor_name,
            visit_date
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            patient_id,
            record_title,
            diagnosis,
            treatment,
            doctor_name,
            visit_date
        ],
        (err, result) => {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: err.message

                });

            }

            res.status(201).json({

                success: true,
                message: "Medical Record Added Successfully!",
                recordId: result.insertId

            });

        }

    );

});

// ======================================
// GET PRESCRIPTIONS API
// ======================================

app.get("/prescriptions/:patientId", (req, res) => {

    const patientId = req.params.patientId;

    const query = `
        SELECT *
        FROM prescriptions
        WHERE patient_id = ?
        ORDER BY prescribed_date DESC
    `;

    db.query(query, [patientId], (err, results) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        res.status(200).json({

            success: true,
            prescriptions: results

        });

    });

});
// ======================================
// GET REPORTS API
// ======================================

app.get("/reports/:patientId", (req, res) => {

    const patientId = req.params.patientId;

    const query = `
        SELECT *
        FROM reports
        WHERE patient_id = ?
        ORDER BY report_date DESC
    `;

    db.query(query, [patientId], (err, results) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        res.status(200).json({

            success: true,
            reports: results

        });

    });

});

// ======================================
// CHANGE PASSWORD API
// ======================================

app.post("/change-password", async (req, res) => {

    try {

        const {

            patient_id,

            current_password,

            new_password

        } = req.body;

        // ===============================
        // CHECK USER
        // ===============================

        const checkQuery = `
            SELECT *
            FROM patients
            WHERE id = ?
        `;

        db.query(checkQuery, [patient_id], async (err, results) => {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: err.message

                });

            }

            if (results.length === 0) {

                return res.status(404).json({

                    success: false,
                    message: "Patient not found."

                });

            }

            const patient = results[0];

            // ===============================
            // VERIFY CURRENT PASSWORD
            // ===============================

            const isMatch = await bcrypt.compare(

                current_password,

                patient.password

            );

            if (!isMatch) {

                return res.status(400).json({

                    success: false,
                    message: "Current password is incorrect."

                });

            }

            // ===============================
            // HASH NEW PASSWORD
            // ===============================

            const hashedPassword =
                await bcrypt.hash(new_password, 10);

            // ===============================
            // UPDATE PASSWORD
            // ===============================

            const updateQuery = `
                UPDATE patients
                SET password = ?
                WHERE id = ?
            `;

            db.query(

                updateQuery,

                [hashedPassword, patient_id],

                (err) => {

                    if (err) {

                        return res.status(500).json({

                            success: false,
                            message: err.message

                        });

                    }

                    res.status(200).json({

                        success: true,
                        message: "Password updated successfully."

                    });

                }

            );

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});

const PORT = process.env.PORT || 5000;

// ======================================
// START SERVER
// ======================================

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});