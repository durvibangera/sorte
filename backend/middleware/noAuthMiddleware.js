const User = require('../models/User');

const noAuthMiddleware = async (req, res, next) => {
    try {
        // Find the first user in the database or create a default one if none exists
        let user = await User.findOne();
        
        if (!user) {
            // Create a default user if none exists
            user = new User({
                name: 'Default User',
                email: 'default@example.com',
                password: 'password123'
            });
            await user.save();
        }
        
        // Set the user ID in the request
        req.userId = user._id;
        next();
    } catch (error) {
        console.error('Error in noAuthMiddleware:', error);
        // Fallback to a default ID if there's an error
        req.userId = '65faa097f352203c7772363d';
        next();
    }
};

module.exports = { noAuthMiddleware }; 