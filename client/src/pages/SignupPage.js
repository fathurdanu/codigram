import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {register} from '../actions/userActions';
import {Link} from 'react-router-dom';

function SignupPage() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email : "",
        username : "",
        name: "",
        image: null,
        password: "",
    });


    const submitHandler = () => {
        let formData = new FormData();
        formData.append("email",form.email);
        formData.append("username",form.username);
        formData.append("name",form.name);
        formData.append("image",form.image);
        formData.append("password",form.password);
        dispatch(register(formData));
    };

    return (
        <div className="canvas-login center">
            <div className="centerv width-600 bg-light-color mini-rounded-edge">
                <div className="center text-center huge-text pdy">Codigram</div>
                <div className="center width-80 mb-5">
                    <hr />
                    <div className="center text-center h4 pdy">Sign up</div>
                    <input type='text' name='email' className='form-control py-3 mb-2' placeholder='Email' onChange={(e) => {setForm({...form,email:e.target.value})}}/>
                    <input type='text' name='username' className='form-control py-3 mb-2' placeholder='Username' onChange={(e) => {setForm({...form,username:e.target.value})}}/>
                    <input type='text' name='name' className='form-control py-3 mb-2' placeholder='Name' onChange={(e) => {setForm({...form,name:e.target.value})}}/>
                    <input type='file' name='image' accept="image" className='custom-file-input py-2' id="input-pic" onChange={(e) => {setForm({...form, image:e.target.files[0]})}}/>
                    <input type='password' name='password' className='form-control py-3 my-2' placeholder='Password' autoComplete="on" onChange={(e) => {setForm({...form,password:e.target.value})}}/>
                    <button onClick={(e) => submitHandler()} type='submit' className='h3 light-color my-3 py-3 fullwidth bg-dark-color'>Enter</button>
                    <hr />
                    <Link to="/login" type='submit' className='h3 fullwidth no-decor dark-color text-align-right'><p>Login</p></Link>
                </div>
            </div>

        </div>
    )
}

export default SignupPage