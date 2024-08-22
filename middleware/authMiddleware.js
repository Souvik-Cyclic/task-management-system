const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

module.exports = (adminRequired = false) => async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if(!authHeader){
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        const user = await User.findByPk(verified.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user.role = user.role;
        if(adminRequired && user.role !== 'admin'){
            return res.status(403).json({ message: "Access Denied: Not an admin" });
        }

        next();
    } catch(err){
        return res.status(401).json({ message: "Invalid token" });
    }
}