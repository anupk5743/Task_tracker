const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware - Allow frontend on common Vite ports and deployed URLs
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:5175',
    'http://127.0.0.1:5175',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            // In production, allow the frontend URL or all origins (restrict as needed)
            callback(null, true);
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Task Tracker API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
