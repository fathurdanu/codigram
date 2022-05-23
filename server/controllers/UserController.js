const { User } = require('../models');
const { encrypt, comparePwd } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jsonwebtoken');
const base_url = process.env.BASE_URL;

class UserController {
    static async register(req, res, next) {
        try {
            const image = base_url + req.file.path.replaceAll("\\", "/");
            const { username, password, name, email } = req.body;
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                res.status(400).json({ message: "Email has been used" });
            } else {
                const encrypted = (password)?encrypt(password):"";
                const result = await User.create({
                    username,
                    password: encrypted,
                    name,
                    email,
                    image
                });
                (result) ?
                    res.status(201).json({
                        message: `Email ${email} has been registered successfully`
                    }) :
                    res.status(400).json({
                        message: "Failed to register"
                    });
            }
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const errorMessage = {
                status: 400,
                message: "Invalid Email / Password"
            }
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                const result = comparePwd(password, user.password);
                const { id, username, image } = user;
                if (result) {
                    const token = generateToken({
                        id,
                        username,
                    });
                    res.status(200).json({
                        UserId: id,
                        image,
                        username,
                        access_token: token
                    })
                } else {
                    throw errorMessage;
                }
            } else {
                throw errorMessage
            }
        } catch (error) {
            next(error);
        }
    }

    static async getUser(req, res, next) {
        try {
            const errorMessage = {
                status: 404,
                message: "User Not Found"
            }
            const id = +req.params.id;
            const user = await User.findOne({
                attributes: {exclude: ['password']},
                where: {
                    id
                }
            })
            if (user) {
                res.status(200).json(user);
            } else {
                throw errorMessage
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;