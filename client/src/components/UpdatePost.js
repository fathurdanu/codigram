import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { updatePost, getPost } from '../actions/postActions';

function UpdatePost() {
    const { action, status, data } = useSelector(state => state.postReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    
    const [form, setForm] = useState({
        caption: "",
    });
    
    useEffect(() => {
        if (!localStorage.getItem("access_token") && !localStorage.getItem("profile_pic")) navigate('/login');
        dispatch(getPost(+params.id));
    }, [dispatch]);

    useEffect(() => {
        if(action==="GET_POST" && data){
            setForm({
                caption: data.caption
            })
        }
    },[data,dispatch])



    const submitHandler = () => {
        dispatch(updatePost(+params.id,form))
    }

    return (
        <div className="canvas-login center">
            <div className="centerv col-lg-3 col-md-6 col-sm-12 bg-light-color rounded-edge">
                <div className="center width-80 mb-5">
                    <div className="center text-center h4 pdy">Edit Post</div>
                    <hr />
                    <img className="fullwidth py-3 p-1" src={data.image}/>
                    <textarea type='text' value={form.caption} name='caption' className='form-control py-3 mb-2' rows="5" placeholder='Caption' onChange={(e) => { setForm({ ...form, caption: e.target.value }) }} />
                    <button onClick={() => submitHandler()} type='submit' className='h3 light-color my-3 py-3 fullwidth bg-dark-color'>Enter</button>
                </div>
            </div>
        </div>
    )
}

export default UpdatePost