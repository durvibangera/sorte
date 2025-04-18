const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
    const { name, email, password, school, yearLevel, birthday } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ 
            name, 
            email, 
            password,
            school: school || 'DJSCE',
            yearLevel: yearLevel || 'SY',
            birthday: birthday || '12-09-2005'
        });
        await newUser.save();

        res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        // Get the first user in the database
        const user = await User.findOne();
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return user data with all fields
        const userProfile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            school: user.school,
            yearLevel: user.yearLevel,
            birthday: user.birthday
        };
        
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { email, name, school, yearLevel, birthday } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user profile
        user.name = name || user.name;
        user.school = school || user.school;
        user.yearLevel = yearLevel || user.yearLevel;
        user.birthday = birthday || user.birthday;

        await user.save();

        res.status(200).json({ 
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                school: user.school,
                yearLevel: user.yearLevel,
                birthday: user.birthday
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};