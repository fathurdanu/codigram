const userRoutes = require('express').Router();
const {UserController} = require('../controllers');
const upload = require('../helpers/multer');
const {authentication} = require('../middlewares/auth');

userRoutes.post('/register', upload.single('image'), UserController.register);
userRoutes.post('/login', UserController.login);
userRoutes.get('/:id', authentication, UserController.getUser);


module.exports = userRoutes;