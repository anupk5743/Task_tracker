# Task Tracker Application

A full-stack task management application built with React (frontend) and Node.js/Express (backend).

## Features

- ✅ User authentication (Register/Login)
- ✅ Create, read, update, and delete tasks
- ✅ Task filtering by status (All, Pending, In Progress, Completed)
- ✅ Task sorting (by date, priority, title)
- ✅ Task priority levels (Low, Medium, High)
- ✅ Due dates and assignees
- ✅ Tags for task organization
- ✅ Beautiful, modern UI with glassmorphism design

## Tech Stack

### Frontend
- React 19
- Vite
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
Task tracker/
├── Backend/
│   ├── Config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── context/     # Context providers
    │   └── services/    # API services
    └── vite.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
PORT=3001
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Environment Variables

Make sure to set up the following environment variables in your Backend `.env` file:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - Token expiration time (e.g., "30d")
- `PORT` - Server port (default: 3001)

## License

ISC
