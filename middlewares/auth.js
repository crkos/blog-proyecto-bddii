const {sendError} = require("../utils/helper");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.isAuth = async (req, res, next) => {
    const token = req.headers?.authorization;
    if(!token) return sendError(res, 'Invalid Token, not found');
    const jwtToken = token.split('Bearer ')[1];
    if(!jwtToken) return sendError(res, 'Invalid JWT Token');
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const {userId} = decode;

    const user = await User.findById(userId);
    if(!user) return sendError(res, 'Invalid Token user not found', 404);

    req.user = user;

    next();
}