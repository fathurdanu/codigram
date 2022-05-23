const {verifyToken} = require('../helpers/jsonwebtoken');
const {Post} = require('../models');

const authentication = (req,res,next) => {
    const {access_token} = req.headers;
    if( access_token ){
        try{
            const result = verifyToken(access_token);
            req.userData = result;
            next();
        }catch(error){
            res.status(401).json({
                message: "User not authenticated"
            });
        }
    }else{
        res.status(404).json({
            message: "Token not found"
        });
    }
}

const authorization = async (req,res,next)=>{
    try{
        const UserId = req.userData.id;
        const PostId = req.params.id;
        const post =  await Post.findByPk(PostId)
        if(!post){
            res.status(404).json({
                message: "Post not found"
            });
        }else if(post.UserId !== UserId){
            res.status(404).json({
                message: "User doesn't have access"
            });
        }else{
            next();
        }
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
    
}

module.exports = {authentication, authorization};