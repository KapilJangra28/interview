# InterviewIQ 🚀
> **AI-Powered Platform for Smarter Interview Preparation and Recruitment**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKapilJangra28%2Finterview)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/KapilJangra28/interview)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg)](https://tailwindcss.com/)

---

## 📖 Overview

**InterviewIQ** bridges the gap between ambitious candidates preparing for high-stakes technical interviews and modern hiring teams seeking top engineering talent. Featuring a role-based dual portal architecture, candidates can practice with a non-repeating AI mock interview chamber while recruiters can configure custom interview campaigns and screen applicants with rubric evaluations.

---

## ✨ Key Features

### 🎓 1. Student Portal
* **Role-Based Authentication**: Seamless registration and sign-in with full validation, demo shortcuts, and session recovery.
* **Student Dashboard**: 8 integrated feature modules:
  * 🚀 **Start Mock Interview**: Launch category-tailored practice sessions.
  * 💻 **Technical Interview**: System design, concurrency, JavaScript internals, and database architectures.
  * 🤝 **HR & Behavioral**: Conflict resolution, leadership, production post-mortems, and stakeholder tradeoffs.
  * 🔀 **Mixed Interview**: Full-spectrum sessions blending behavioral depth and technical rigor.
  * 📊 **Performance Analytics**: Radar competency maps, score trajectories, and percentile rankings.
  * 📜 **Interview History**: Chronological session logs with detailed rubric breakdowns.
  * 🎯 **Skill Improvement**: AI-recommended learning paths and drill recommendations.
  * 👤 **Personal Profile**: Dynamic name, college, degree, and verified skills management.
* **AI Mock Room**:
  * **15-Question Non-Repeating Question Bank**: Tracks asked question IDs across sessions so questions never repeat.
  * **Live Speech Recognition & Synthesis**: Practice speaking answers directly using Web Speech APIs.
  * **Rubric Evaluations (0–10)**: Instant automated feedback covering correctness, communication, and depth.
  * **Model Answers**: Detailed reference answers for comparison and learning.

### 🏢 2. Company ATS Portal
* **Recruiter Sign-in & Registration**: Dedicated portal for hiring managers and recruiters.
* **Company Dashboard**: 5 core capabilities:
  1. **Overview**: Key recruitment metrics (Total Candidates, Active Interviews, Completed Interviews, Average Score).
  2. **Create Interview**: Custom title, job role, required skill tags, experience level, interview format, and question count.
  3. **Manage Candidates**: Interactive applicant table with status filters, rubric scores, and match summary modals.
  4. **Interview Management**: View, filter, edit, and delete created interview campaigns.
  5. **Company Profile**: Brand overview, recruiter credentials, industry tags, and verified links.

---

## 🛠️ Architecture & Tech Stack

```
interviewIQ/
├── backend/                   # Node.js + Express REST API
│   ├── config/                # Database & Cloudinary configurations
│   ├── controllers/           # Auth, Interview, Candidate controllers
│   ├── middleware/            # JWT verification & role authorization
│   ├── models/                # Mongoose schemas (User, Interview, Session)
│   ├── routes/                # Express API routes
│   ├── services/              # AI (Gemini) evaluation services
│   └── server.js              # Express app entrypoint
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/        # Layout, UI components, Brand slider
│   │   ├── context/           # AuthContext, ToastContext
│   │   └── pages/             # Auth, Student, and Company pages
│   ├── package.json
│   └── vite.config.js
├── public/                    # Zero-dependency interactive frontend bundle
│   └── index.html             # Standalone production preview
├── live_server.js             # High-performance local HTTP server
└── README.md
```

### Technology Highlights:
* **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, Framer Motion
* **Modern Typography**:
  * **Outfit**: High-impact, geometric font for titles, headings, and branding
  * **Plus Jakarta Sans**: Polished, human-centric font for body, cards, and UI components
  * **JetBrains Mono**: Clean monospace font for code, metrics, and timers
* **Backend**: Node.js, Express, MongoDB / Mongoose, JWT authentication
* **AI Engine**: Gemini API for answer analysis and rubric grading
* **Speech Engine**: Web Speech Recognition & Web Speech Synthesis

---

## ☁️ Deployment Guide

### 1. Deploy Backend to Render

1. Sign in to [Render](https://render.com/).
2. Click **New +** > **Blueprint** (or **Web Service**).
3. Connect your GitHub repository: `https://github.com/KapilJangra28/interview`.
4. Render automatically detects `render.yaml` with the following pre-configured settings:
   * **Root / Build Command**: `cd backend && npm install`
   * **Start Command**: `cd backend && npm start`
   * **Health Check Path**: `/api/health`
5. Configure your Environment Variables in the Render dashboard:
   * `MONGO_URI`: Your MongoDB Atlas connection string
   * `JWT_SECRET`: Random 32+ character secret string
   * `CLIENT_URL`: Your Vercel frontend URL (e.g. `https://your-app.vercel.app`)
   * `GEMINI_API_KEY`: Your Google Gemini API Key

---

### 2. Deploy Frontend to Vercel

1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New...** > **Project** and import `KapilJangra28/interview`.
3. Configure Project Settings:
   * **Framework Preset**: Vite
   * **Root Directory**: `./` (or `frontend`)
   * **Build Command**: `cd frontend && npm install && npm run build`
   * **Output Directory**: `frontend/dist`
4. Add Environment Variables:
   * `VITE_API_URL`: Your deployed Render backend URL (e.g. `https://interviewiq-backend.onrender.com`)
5. Click **Deploy**. Vercel will automatically apply `vercel.json` with SPA routing rewrites and security headers.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [MongoDB](https://www.mongodb.com/) (optional for local database connection)

### 2. Installation & Setup

Clone the repository:
```bash
git clone https://github.com/KapilJangra28/interview.git
cd interview
```

### 3. Running the Application

#### Option A: Quick-Start Standalone Server (Port 5173)
Launch the zero-dependency live preview server:
```bash
node live_server.js
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

#### Option B: Full-Stack Development
Start the Backend API:
```bash
cd backend
npm install
npm run dev
```

Start the Vite Frontend:
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
