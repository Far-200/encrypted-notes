# CipherNotes 🔐

CipherNotes is a full-stack encrypted notes application built with **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend.

It allows users to securely create, edit, pin, search, and delete personal notes with **JWT-based authentication** and **AES-encrypted note storage**.

---

## ✨ Features

- User registration and login
- JWT authentication
- Protected frontend routes
- Persistent login with localStorage
- Create notes
- Edit existing notes
- Delete notes
- Pin and unpin notes
- Search notes in real time
- Notes stored per user
- AES encryption for note content before storing in MongoDB
- Clean dark UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- crypto

---

## 📁 Project Structure

```bash
encrypted-notes/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── noteService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── noteController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Note.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── noteRoutes.js
│   │   ├── utils/
│   │   │   └── encryption.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

```
🔐 Security Highlights

CipherNotes stores note content in encrypted form using AES-256 encryption before saving to MongoDB.

Security flow
User passwords are hashed using bcrypt
Authentication uses JWT
Protected routes verify the token before giving access
Note content is encrypted before storing in the database
Encrypted content is decrypted only when notes are fetched for the authenticated user

Note: This project uses a backend-managed encryption key from the .env file for development and demonstration purposes.

🚀 Getting Started
1. Clone the repository
git clone https://github.com/Far-200/encrypted-notes.git
cd encrypted-notes
⚙️ Backend Setup
1. Go to backend
cd backend
2. Install dependencies
npm install
3. Create a .env file inside backend/
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/encrypted_notes_app
JWT_SECRET=your_super_secret_jwt_key
ENCRYPTION_KEY=12345678901234567890123456789012
4. Start backend
npm run dev

Backend runs on:

http://localhost:5000
💻 Frontend Setup
1. Go to frontend
cd frontend
2. Install dependencies
npm install
3. Start frontend
npm run dev

Frontend usually runs on:

http://localhost:5173
🔄 API Overview
Auth Routes
Method	Route	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current logged-in user
Note Routes
Method	Route	Description
GET	/api/notes	Fetch all notes for logged-in user
POST	/api/notes	Create note
PUT	/api/notes/:id	Update note
DELETE	/api/notes/:id	Delete note
PATCH	/api/notes/:id/pin	Toggle pin/unpin
🧪 Current Functionality
Authentication flow works
Protected dashboard works
Notes are user-specific
Search works
Pin/unpin works
Edit works
Delete works
Note content is encrypted before storage
📸 Screenshots

Add your screenshots here after pushing the project.

Example:

## 📸 Screenshots

### Login Page
![Login Page](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Notes View
![Notes View](./screenshots/notes.png)

You can create a screenshots/ folder in the repo root and place images there.

🌱 Future Improvements
Separate Note Editor page
Rich text / markdown notes
Archive and restore notes
Tags / categories
Dark/light theme toggle
Deploy frontend and backend
Better encryption key management
Mobile UI refinements
🧠 What I Learned

This project helped reinforce:

Authentication and protected route flow
REST API design
State management in React
CRUD operations with MongoDB
Secure password handling
Encryption and decryption of sensitive user data
Component-based frontend organization
👨‍💻 Author

Farhaan Khan

GitHub: Far-200
Portfolio: farhaankhan.dev
📜 License

This project is for learning, portfolio, and demonstration purposes.
```
