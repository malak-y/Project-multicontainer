# 🚀 TaskMaster - Full Stack Task Manager

A beautiful, modern task management application built with React and Node.js, fully containerized with Docker.

## ✨ Features

- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop and mobile
- 🔄 **Real-time Updates** - Dynamic task management
- 🐳 **Containerized** - Easy deployment with Docker
- 🚀 **Fast Performance** - Optimized React frontend and Express backend

## 🏗️ Architecture

```
📦 TaskMaster
├── 🎨 frontend/          # React application
├── ⚙️ backend/           # Node.js Express API
├── 🐳 docker-compose.yml # Container orchestration
└── 📚 README.md          # Documentation
```

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone and navigate to the project
cd Project-multicontainer

# Start the application
docker-compose up --build
```

**That's it! 🎉**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Manual Setup

1. **Backend Setup**
```bash
cd backend
npm install
npm start
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React** - UI library
- 🎨 **CSS3** - Modern styling with animations
- 📱 **Responsive Design** - Mobile-first approach

### Backend
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express.js** - Web framework
- 🔗 **CORS** - Cross-origin resource sharing

### DevOps
- 🐳 **Docker** - Containerization
- 🐙 **Docker Compose** - Multi-container orchestration

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## 🎯 Features Overview

- ✅ Add new tasks
- ✏️ Edit existing tasks
- ❌ Delete tasks
- 🔄 Toggle task completion
- 🎨 Beautiful animations and transitions
- 📱 Fully responsive design

---

**Built with ❤️ using React & Node.js**