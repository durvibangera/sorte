const Task = require('../models/Task');
const Course = require('../models/Course');

// Get all tasks for a user
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId })
            .populate('course', 'name color');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

// Get tasks for a specific course
const getTasksByCourse = async (req, res) => {
    try {
        // Verify the course exists and belongs to the user
        const course = await Course.findOne({ 
            _id: req.params.courseId, 
            user: req.userId 
        });
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        const tasks = await Task.find({ 
            course: req.params.courseId,
            user: req.userId
        });
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, description, dueDate, courseId } = req.body;

    try {
        // Verify the course exists and belongs to the user
        const course = await Course.findOne({ 
            _id: courseId, 
            user: req.userId 
        });
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        const newTask = new Task({
            title,
            description,
            dueDate,
            course: courseId,
            user: req.userId,
            color: course.color // Inherit color from course
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ 
            _id: req.params.id, 
            user: req.userId 
        }).populate('course', 'name color');
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch task', error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { title, description, dueDate, completed } = req.body;
    
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title, description, dueDate, completed },
            { new: true, runValidators: true }
        ).populate('course', 'name color');
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
};

// Toggle task completion status
const toggleTaskCompletion = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.userId });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        task.completed = !task.completed;
        await task.save();
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle task completion', error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.userId 
        });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};

module.exports = {
    getAllTasks,
    getTasksByCourse,
    createTask,
    getTaskById,
    updateTask,
    toggleTaskCompletion,
    deleteTask
}; 