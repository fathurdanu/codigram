import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { getPost, likePost } from '../actions/postActions';


function PostDetails() {
    const { action, status, data } = useSelector(state => state.postReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (!localStorage.getItem("access_token") && !localStorage.getItem("profile_pic")) navigate('/login');
        dispatch(getPost(+params.id))
    }, [action]);

    const likeHandler = (id)=>{
        dispatch(likePost(id))
    }

    return (
        <div className="canvas center light-color pd-top">
            <div className="row g-4">
                <div className="col-lg-7 col-sm-12">
                    <div className="row">
                        <img className="rounded-edge" src={data.image} />
                    </div>
                </div>
                <div className="offset-lg-1 col-lg-4 col-sm-12 h3 bg-light-color dark-color p-3 rounded-edge">
                    <div className="relative">
                        <div className="flex bottom-0">
                            <button onClick={()=>likeHandler(data.id)} className="h2 dark-color"> { (data.isLike)?<IoIosHeart className="h2 maroon" />:<IoIosHeartEmpty className="h2" />} <p className="letter-size">{data.likesCount}</p></button>
                            <div className="letter-size right">{data.User ? data.User.username : ""}</div>
                        </div>
                    </div>
                    <hr/>
                    {data.caption}
                </div>
            </div>
        </div>
    )
}

export default PostDetails