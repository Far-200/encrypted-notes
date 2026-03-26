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
├── backend/
├── screenshots/
├── README.md
```

---

## 🔐 Security Highlights

- Passwords hashed using **bcrypt**
- Authentication via **JWT**
- Protected routes with middleware
- Notes encrypted using **AES-256**
- Decrypted only when fetched

> ⚠️ Encryption key is stored in `.env` (for demo purposes)

---

## 🚀 Getting Started

### Clone repo

```bash
git clone https://github.com/Far-200/encrypted-notes.git
cd encrypted-notes
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/encrypted_notes_app
JWT_SECRET=your_secret
ENCRYPTION_KEY=12345678901234567890123456789012
```

Run:

```bash
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔄 API Overview

### Auth

| Method | Route              | Description  |
| ------ | ------------------ | ------------ |
| POST   | /api/auth/register | Register     |
| POST   | /api/auth/login    | Login        |
| GET    | /api/auth/me       | Current user |

### Notes

| Method | Route              | Description |
| ------ | ------------------ | ----------- |
| GET    | /api/notes         | Get notes   |
| POST   | /api/notes         | Create      |
| PUT    | /api/notes/:id     | Update      |
| DELETE | /api/notes/:id     | Delete      |
| PATCH  | /api/notes/:id/pin | Toggle pin  |

---

## 📸 Screenshots

### Login Page

![Login](./screenshots/Login_Page.png)

### Dashboard

![Dashboard](./screenshots/Welcome.png)

### Notes View

![Notes](./screenshots/Your_Notes.png)

---

## 🌱 Future Improvements

- Rich text / markdown notes
- Tags and categories
- Archive notes
- Dark/light mode
- Deployment
- Better key management

---

## 🧠 What I Learned

- Full-stack auth flow
- Secure API design
- Encryption handling
- React state management
- Clean component architecture

---

## 👨‍💻 Author

**Farhaan Khan**

- GitHub: [https://github.com/Far-200](https://github.com/Far-200)
- Portfolio: [https://farhaankhan.dev](https://farhaankhan.dev)

---

## 📜 License

For learning and portfolio use.
