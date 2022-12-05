const {sendError, uploadImageToCloud} = require("../utils/helper");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const table = 'usuario';

exports.createUser = async (req, res) => {
    const { body, file } = req;
    const {name, first_ln, second_ln, email, password} = body;

    const oldUser = await User.findByEmail(email, table);
    if(oldUser) return sendError(res, "There's an user already registered with this email", 200);

    const newUser = new User(null, name, first_ln, second_ln, email, password, table);

    const result = await newUser.getLastId();

    newUser.userId = result[0][0].LastID+1;

    if(file){
        const {url, public_id} = await uploadImageToCloud(file.path);
        newUser.avatar = url;
        newUser.avatar_public_id = public_id;
    }

    const [results] = await newUser.insert();

    if(results.length === 0) return sendError(res, 'There was an error while creating user', 200);

    const jwtToken = jwt.sign({
        userId: newUser.userId
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        message: 'Se ha creado el usuario!',
        user: {id: newUser.userId, name: newUser.name, email: newUser.email, token: jwtToken, role: newUser.role, avatar: newUser.avatar}
    });

};

exports.signIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findByEmail(email);
    if(!user) return sendError(res, 'This email/password are incorrect', 200);
    const matched = await user.comparePassword(password);
    if(!matched) return sendError(res, "This email/password are incorrect", 200);

    const {userId, name, role, } = user;
    const jwtToken = jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({message: "Has iniciado sesión con exito", user:{id: userId, name, email,token: jwtToken, role, avatar: user.avatar }});

}

