const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllTasks,
    getTasksByCourse,
    createTask,
    getTaskById,
    updateTask,
    toggleTaskCompletion,
    deleteTask
} = require('../controllers/taskController');

// Routes with authentication middleware
router.use(protect);

// GET all tasks for logged in user
router.get('/', getAllTasks);

// GET tasks for a specific course
router.get('/course/:courseId', getTasksByCourse);

// POST create a new task
router.post('/', createTask);

// GET task by ID
router.get('/:id', getTaskById);

// PUT update task
router.put('/:id', updateTask);

// PATCH toggle task completion
router.patch('/:id/toggle', toggleTaskCompletion);

// DELETE task
router.delete('/:id', deleteTask);

module.exports = router; 