const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

// Routes with authentication middleware
router.use(protect);

// GET all courses for logged in user
router.get('/', getCourses);

// POST create a new course
router.post('/', createCourse);

// GET course by ID
router.get('/:id', getCourseById);

// PUT update course
router.put('/:id', updateCourse);

// DELETE course
router.delete('/:id', deleteCourse);

module.exports = router; 