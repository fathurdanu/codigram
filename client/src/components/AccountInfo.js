import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/userActions';


function AccountInfo() {
    const { action, status, data } = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (!localStorage.getItem("access_token") && !localStorage.getItem("profile_pic")) navigate('/login');
        dispatch(getUser(+params.id));
    }, []);



    return (
        <div className="min-height mt-5">
            <div className="center col-lg-5 col-sm-10 h-550 bg-light-color rounded-edge">
                <div className="center text-center huge-text pdy">User Information</div>
                <hr className=" mx-auto width-80" />
                <div className="mx-auto width-80 pt-5">
                    <h3 >Id :   {data.id}</h3>
                    <h3 >Username : {data.username}</h3>
                    <h3 >Name : {data.name}</h3>
                    <h3 >Email :    {data.email}</h3>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo