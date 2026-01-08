const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.route('/')
    .get(protect, getAllTasks)
    .post(protect, createTask);

router.route('/:id')
    .get(protect, getTask)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

module.exports = router;