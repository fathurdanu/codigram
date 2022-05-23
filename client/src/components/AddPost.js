import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {create} from '../actions/postActions';

function AddPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("access_token") && !localStorage.getItem("profile_pic")) navigate('/login');
  }, []);


  const [form, setForm] = useState({
    caption : "",
    image : null,
  })

  const submitHandler = () => {
    let formData = new FormData();
    formData.append("caption", form.caption);
    formData.append("image", form.image);
    dispatch(create(formData));
  }

  return (
    <div className="canvas-login center">
      <div className="centerv col-lg-3 col-md-6 col-sm-12 bg-light-color rounded-edge">
        <div className="center width-80 mb-5">
          <div className="center text-center h4 pdy">Create new Post</div>
          <hr />
          <input type='file' name='image' className='custom-file-input py-2 mb-2' id="input-pic" onChange={(e)=>{setForm({...form, image: e.target.files[0]})}} />
          <textarea type='text' name='caption' className='form-control py-3 mb-2' rows="5" placeholder='Caption' onChange={(e)=>{setForm({...form, caption: e.target.value})}}/>
          <button onClick={() => submitHandler()} type='submit' className='h3 light-color my-3 py-3 fullwidth bg-dark-color'>Enter</button>
        </div>
      </div>
    </div>
  )
}

export default AddPost