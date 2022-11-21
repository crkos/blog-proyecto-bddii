const {sendError, uploadImageToCloud} = require("../utils/helper");
const User = require("../models/user");

const table = 'usuario';

exports.createUser = async (req, res) => {
    const { body, file } = req;
    const {name, first_ln, second_ln, email, password} = body;

    const oldUser = await User.findByEmail(email, table);

    if(oldUser) return sendError(res, "There's an user already registered with this email");

    const newUser = new User(name, first_ln, second_ln, email, password, table);

    if(file){
        const {url, public_id} = await uploadImageToCloud(file.path);
        newUser.avatar = url;
        newUser.avatar_public_id = public_id;
    }

    const [results] = await newUser.insert();

    if(!results) return sendError(res, 'There was an error while creating user');

    res.status(200).json({
        message: 'Se ha creado el usuario!',
        data: {results}
    });

};

exports.updateUser = async (req, res) => {


};

