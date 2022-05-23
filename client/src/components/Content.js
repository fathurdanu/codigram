import React, { useState, useEffect } from 'react'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, likePost } from '../actions/postActions';


function Content() {
    const { action, status, data } = useSelector(state => state.postReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("access_token") && !localStorage.getItem("profile_pic")) navigate('/login');
        dispatch(getPosts());
    }, [action]);

    const likeHandler = (id) => {
        dispatch(likePost(id))
    }

    return (
        <div className="canvas center light-color">
            {
                (action === "GET_ALL_POSTS" && status === "data") ? data.map(post => {
                    const date = post.createdAt.split('T')[0].split('-');
                    return (
                        <div key={post.id} className="center col-sm-12 col-md-12 col-lg-7 pdy">
                            <div className="row g-0">
                                <Link to={"/posts/" + post.id}>
                                    <img className="col-12" src={post.image} />
                                </Link>
                            </div>
                            <div className="bg-dark-color light-color pd-15">
                                <div className="flex">
                                    <button onClick={() => likeHandler(post.id)} className="h2 dark-color"> {(post.isLike) ? <IoIosHeart className="h2 maroon" /> : <IoIosHeartEmpty className="h2 light-color" />}<p className="letter-size light-color">{post.likescount}</p></button>
                                    <div className="letter-size right">{post.User.username}</div>
                                </div>
                                <hr />
                                <div>
                                    <h4>{post.caption}</h4>
                                    <p>{date[2]}-{date[1]}-{date[0]}</p>
                                </div>
                            </div>
                        </div>
                    )
                }) : <>Loading</>

            }
        </div>
    )
}

export default Content