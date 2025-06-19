# MERN Notes App

A personal note‑taking application built with the MERN stack and TypeScript.  
Supports email/password login, Google OAuth, and per‑user CRUD on notes.

---

##  Tech Stack

- **Backend**:  
  - Node.js, Express  
  - TypeScript  
  - MongoDB (Mongoose)  
  - JWT Authentication  
  - Passport.js (Google OAuth)  

- **Frontend**:  
  - React, TypeScript  
  - React Router v6  
  - Tailwind CSS (or your CSS framework)  
  - Axios  
  - jwt‑decode  

---

##  Features

- Sign up / Sign in with email & password  
- Sign in with Google OAuth  
- Create, Read, Update, Delete (CRUD) notes  
- Notes scoped per user  
- Protected routes with JWT  
- Responsive UI  
- Edit, Search, and Filter (if implemented)  

---

##  Prerequisites

- Node.js v18+  
- npm v9+  
- A running MongoDB instance (local or Atlas)  
- Google OAuth credentials (Client ID & Secret)

---

##  Setup & Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/your‑username/mern-notes-app.git
cd mern-notes-app



//Backend
cd server
cp .env.example .env
# In .env, set:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_jwt_secret
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
npm install
npm run build       # compile TS → JS
npm run dev           


cd ../client
cp .env.example .env
# In .env, set:
# VITE_API_URL=http://localhost:9000/api
npm install
npm run dev
