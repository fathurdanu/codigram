import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts, deletePost } from '../actions/postActions';
import Swal from 'sweetalert2';


function Account() {
    const { action, status, data } = useSelector(state => state.postReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem("access_token") && !localStorage.getItem("profile_pic")) navigate('/login');
        dispatch(getUserPosts(+localStorage.getItem("id")));
    }, [action]);


    const deleteHandler = async (id) => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePost(id));
            }
        })

    }

    return (
        <div className="canvas center light-color">
            <div className="row">
                <div className='col-lg-4 text-align-center'>
                    <img className="profile-img" src={localStorage.getItem('profile_pic')}></img>
                </div>
                <div className='col-lg-7 text-align-center py-lg-5 my-lg-5'>
                    <Link to={"/account/" + localStorage.getItem('id')} className='light-color no-decor'><p className='enormous-text'>{localStorage.getItem('username')}</p></Link>
                </div>
            </div>

            <hr className='my-5' />

            <div className="row">
                {
                    (action === "GET_USER_POSTS" && status === "data") ? data.map(post => {
                        return (
                            <div key={post.id} className=" col-sm-12 col-md-12 col-lg-4 pdy">
                                <div className="row g-0">
                                    <Link to={"/posts/" + post.id}>
                                        <img className="col-12 post-img" src={post.image} />
                                    </Link>
                                </div>
                                <div className="bg-dark-color light-color pd-15">
                                    <div className="row ">
                                        <div className="h2 light-color col-3"><IoIosHeart className="h2" /><p className="letter-size">{post.likesCount}</p></div>
                                        <div className="dropdown offset-4 col-5">
                                            <button className="light-color letter-size right dropbtn "><BsThreeDots />
                                                <div className="dropdown-content standard-size">
                                                    <button onClick={() => navigate('/posts/edit/' + post.id)}>Edit</button>
                                                    <button onClick={() => deleteHandler(post.id)} href="#">Delete</button>
                                                </div>
                                            </button>

                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <h4>{post.caption}</h4>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <>Loading</>
                }
            </div>
        </div>
    )
}

export default Account