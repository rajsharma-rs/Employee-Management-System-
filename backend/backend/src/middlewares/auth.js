const jwt = require('jsonwebtoken');
const User = require('../utils/db');

const auth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = await jwt.verify(token, "ems$6020");
        const {_id} = decoded;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = auth;