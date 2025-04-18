const Task = require('../models/Task');
const Course = require('../models/Course');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('course', 'name color');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

// Get tasks for a specific course
const getTasksByCourse = async (req, res) => {
    try {
        // Verify the course exists
        const course = await Course.findById(req.params.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        const tasks = await Task.find({ course: req.params.courseId });
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, description, dueDate, courseId } = req.body;

    try {
        // Verify the course exists
        const course = await Course.findById(courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        const newTask = new Task({
            title,
            description,
            dueDate,
            course: courseId,
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
        const task = await Task.findById(req.params.id)
            .populate('course', 'name color');
        
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
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
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
        const task = await Task.findById(req.params.id);
        
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
        const task = await Task.findByIdAndDelete(req.params.id);
        
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