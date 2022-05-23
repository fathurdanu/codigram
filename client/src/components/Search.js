import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs'
import { getPosts } from '../actions/postActions';

function Search() {
  const { action, status, data } = useSelector(state => state.postReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("access_token") && !localStorage.getItem("profile_pic")) navigate('/login');
    dispatch(getPosts());
  }, []);

  const [result, setResult] = useState([])

  const searchHandler = (text) => {
      setResult(data.filter(post => post.caption.includes(text)));
  }


  return (
    <div className="canvas center light-color">

      <div className="center col-sm-12 col-md-12 col-lg-7">

        <input type='text' name='search' className='form-control py-3' placeholder='Search' onChange={(e) => { searchHandler(e.target.value) }} />

      </div>

      <hr />

      {
        (result && action==="GET_ALL_POSTS") ? result.map((post,index) => {
          return (
            <div key={index} className="center col-sm-12 col-md-12 col-lg-7 pdy">
              <div className="row g-0">
                <Link to={"/posts/" + post.id}>
                  <img className="col-12" src={post.image} />
                </Link>
              </div>
              <div className="bg-dark-color light-color pd-15">
                <div className="row">
                  <div className="h2 light-color col-3"><IoIosHeart className="h2" /><p className="letter-size">{post.likescount}</p></div>
                  <div className="offset-4 letter-size right col-5 text-align-right">{(post.User)?post.User.username:""}</div>
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
  )
}

export default Search