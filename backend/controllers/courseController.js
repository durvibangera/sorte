const Course = require('../models/Course');
const Task = require('../models/Task');

// Get all courses for a user
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ user: req.userId });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    const { name, instructor, location, color } = req.body;

    try {
        const newCourse = new Course({
            name: name.toUpperCase(),
            instructor,
            location,
            color,
            user: req.userId
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create course', error: error.message });
    }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, user: req.userId });
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch course', error: error.message });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    const { name, instructor, location, color } = req.body;
    
    try {
        const updatedCourse = await Course.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { 
                name: name ? name.toUpperCase() : undefined,
                instructor,
                location,
                color
            },
            { new: true, runValidators: true }
        );
        
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update course', error: error.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ _id: req.params.id, user: req.userId });
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Delete all tasks associated with this course
        await Task.deleteMany({ course: req.params.id });
        
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete course', error: error.message });
    }
};

module.exports = {
    getCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse
}; 