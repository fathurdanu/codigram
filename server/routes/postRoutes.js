const postRoutes = require('express').Router();
const {PostController} = require('../controllers');
const {authentication,authorization} = require('../middlewares/auth');
const upload = require('../helpers/multer');

postRoutes.get('/', authentication, PostController.getPosts);
postRoutes.get('/detail/:id',authentication, PostController.getPost);
postRoutes.get('/user/:id', authentication, PostController.getUserPosts);
postRoutes.post('/create',authentication, upload.single('image'), PostController.create);
postRoutes.put('/update/:id',authentication, authorization, PostController.update);
postRoutes.delete('/delete/:id',authentication, authorization, PostController.delete);
postRoutes.put('/like/:id',authentication, PostController.like);


module.exports = postRoutes;