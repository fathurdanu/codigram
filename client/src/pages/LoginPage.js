import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {login} from '../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
    const{action, status, data} = useSelector(state=>state.userReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access_token") && localStorage.getItem("profile_pic")) navigate('/');
    },[data]);
    

    const [form, setForm] = useState({
        email : "",
        password : "",
    });

    const submitHandler = async ()=>{
        dispatch(login(form));
    }

    return (
        <div className="canvas-login center">
            <div className="centerv login-width mx-auto">
                <div className="center">
                    <div className="row">
                        <div className=" col-lg-7 d-none d-xl-block">
                            <img className="login-img" src="https://previews.123rf.com/images/puhhha/puhhha1802/puhhha180200824/96381596-it-b%C3%BCro-leute-die-am-offenen-arbeitsplatz-arbeiten-gruppe-programmierer-die-zusammen-an-dem-projekt-.jpg" />
                        </div>
                        <div className="col-lg-4 login-card bg-light-color rounded-edge">
                            <div className="center text-center huge-text pdy">Codigram</div>
                            <div className="mx-auto width-80">
                                <hr />
                                <div className="center text-center h4 pdy">Login</div>
                                <input type='text' name='email' className='form-control py-3' placeholder='Email' onChange={(e) => {setForm({...form,email:e.target.value})}}/>
                                <input type='password' name='password' className='form-control py-3 my-2' autoComplete="on" placeholder='password' onChange={(e) => {setForm({...form,password:e.target.value})}}/>
                                <button onClick={() => submitHandler()}type='submit' className='h3 light-color my-3 py-3 fullwidth bg-dark-color'>Enter</button>
                                <hr className="my-5" />
                                <Link to="/register" type='submit' className='h3 fullwidth no-decor dark-color text-align-center'><p>Sign up</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage