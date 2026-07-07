# 🏥 Healthcare Patient Portal

## 📖 Project Description

The **Healthcare Patient Portal** is a full-stack web application developed to streamline healthcare services by providing patients with a secure and user-friendly platform. The system enables patients to register, log in, manage their personal information, book appointments, access medical records, view prescriptions, and update their profiles through an intuitive interface.

The project demonstrates modern web development practices by integrating a responsive frontend with a Node.js/Express backend and a MySQL database, while following RESTful API architecture and secure authentication techniques.

---

# 🌐 Live Demo

**Backend (Render):**

https://healthcare-patient-portal.onrender.com

**Frontend:**

Run locally using VS Code Live Server or deploy to GitHub Pages/Netlify.

---

# 📸 Screenshots

> Replace these image paths with your actual screenshots.

### Login Page
![Login Page](images/hospital.jpg)

### Patient Dashboard
![register](images/doctor.png)

### Profile Management
![Profile](images/profile.png)

---

# ✨ Features

- Secure User Registration
- Patient Login Authentication
- Dashboard Overview
- Profile Management
- Profile Picture Upload
- Appointment Booking
- View Medical Records
- View Prescriptions
- Reports Section
- Change Password
- Responsive User Interface
- MySQL Database Integration
- REST API Architecture
- Secure Password Encryption using bcrypt
- Backend Deployment using Render

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Libraries & Packages

- bcrypt
- multer
- cors
- dotenv
- mysql2

## Development Tools

- Visual Studio Code
- Git
- GitHub
- XAMPP
- Postman

## Deployment

- Render
- FreeSQLDatabase

---

# 📂 Project Structure

```
Healthcare-Patient-Portal
│
├── backend
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── uploads
│   └── .env
│
├── week-2
│   ├── css
│   ├── js
│   ├── images
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── appointment.html
│   ├── medicalrecords.html
│   ├── prescriptions.html
│   ├── reports.html
│   └── settings.html
│
└── README.md
```

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/dharanika0723/Healthcare-Patient-Portal.git
```

## 2. Navigate to Backend

```bash
cd Healthcare-Patient-Portal/backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306

PORT=5000
```

## 5. Start Backend Server

```bash
npm start
```

or

```bash
node server.js
```

## 6. Run Frontend

Open the project in **Visual Studio Code**.

Right-click:

```
login.html
```

Select:

```
Open with Live Server
```

The application will open in your browser.

---

# 🔒 Security Features

- Password Hashing using bcrypt
- Secure REST API Communication
- Environment Variable Configuration
- MySQL Database Authentication
- CORS Protection

---

# 🚀 Future Enhancements

- Doctor Dashboard
- Admin Panel
- Online Payments
- Email Notifications
- Video Consultation
- JWT Authentication
- Cloud Image Storage
- Mobile Responsive Improvements

---

# 👩‍💻 Author

**Dharanika**

Healthcare Patient Portal Project

UI/UX Design Internship Project

---

# 📄 License

This project is developed for educational and internship purposes.
