const { Post, User, Like } = require('../models');
const base_url = process.env.BASE_URL;
const fs = require('fs');

class PostController {
    static async getPosts(req, res, next) {
        try {
            const user = req.userData;
            let result = await Post.findAll({
                include: [
                    {
                        model: User,
                        as: "likes",
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                    { model: User, attributes: ["username"] }
                ],
            })

            let tempArray = []
            result.forEach((post, index) => {
                let isLike = false;
                post.dataValues.likes.forEach(like => { if (like.id === user.id) isLike = true })
                tempArray.push({ ...post.dataValues, likescount: post.dataValues.likes.length, isLike: isLike });
            });

            res.status(200).json(tempArray);
        } catch (error) {
            next(error);
        }
    }

    static async getUserPosts(req, res, next) {
        try {
            const userParam = req.userData;
            const id = +req.params.id;
            const user = await User.findOne({
                attributes: {
                    exclude: ["password"]
                },
                where: {
                    id
                },
            });

            if (user) {
                let result = await Post.findAll({
                    include: [
                        {
                            model: User,
                            as: "likes",
                            attributes: {
                                exclude: ["password"],
                            },
                        },
                    ],
                    where: { UserId: user.id }
                }, {

                })

                let newVar = [];
                result.forEach((post, index) => {
                    let isLike = false;
                    post.dataValues.likes.forEach(like => { if (like.id === userParam.id) isLike = true })
                    const likes = post.dataValues.likes.length
                    newVar.push({ ...post.dataValues, likesCount: likes, isLike:isLike });
                });

                res.status(200).json(newVar);
            } else {
                throw {
                    status: 404,
                    message: "User not found"
                }
            }
        } catch (error) {
            next(error);
        }
    }


    static async getPost(req, res, next) {
        try {
            const id = +req.params.id;
            const user = req.userData;
            const post = await Post.findOne({
                include: [
                    {
                        model: User,
                        as: "likes",
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                    { model: User, attributes: ["username"] }
                ],
                where: {
                    id
                },
            });
            if (post) {
                let isLike = false;
                post.dataValues.likes.forEach(like => { if (like.id === user.id) isLike = true })
                const likes = post.dataValues.likes.length
                let newVar = { ...post.dataValues, likesCount: likes, isLike: isLike };
                res.status(200).json(newVar);
            } else {
                throw {
                    status: 404,
                    message: "Post not found"
                }
            }
        } catch (error) {
            next(error);
        }
    }


    static async like(req, res, next) {
        try {
            const id = +req.params.id;
            const user = req.userData;

            const post = await Like.findOne({
                where: { PostId: id, UserId: user.id }
            });

            if (!post) {
                const result = await Like.create({
                    UserId: user.id,
                    PostId: id
                });
                res.status(200).json({ message: 1 });
            } else {
                const result = await Like.destroy({
                    where: {
                        PostId: id,
                        UserId: user.id
                    }
                });
                res.status(200).json({ message: 0 });
            }
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const image = base_url + req.file.path.replaceAll("\\", "/");
            const { caption } = req.body;
            const user = req.userData;
            const result = await Post.create({
                UserId: user.id,
                caption,
                image
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const id = +req.params.id;
            const { caption, image } = req.body;
            const user = req.userData;
            const result = await Post.update({
                UserId: user.id,
                caption,
                image
            }, {
                where: { id }
            });
            res.status(200).json({ message: `Id ${id} has been updated` });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = +req.params.id;
            await Like.destroy({
                where: { PostId: id }
            });
            const post = await Post.findByPk(id);
            const result = await Post.destroy({
                where: { id }
            });
            fs.unlinkSync(post.image.replace(base_url, ""));
            res.status(200).json({ message: `Id ${id} has been deleted` });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PostController;