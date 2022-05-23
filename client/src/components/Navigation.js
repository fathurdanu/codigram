import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Navigation() {

  const navigate = useNavigate()
  const logoutHandler = () =>{
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div className="light-color bg-dark-color">
      <nav className="container">
        <div className="brand">
          <Link className="" to="/">Codigram</Link>
        </div>
        <div className="nav-link">
          <Link className="" to="/">Home</Link>
          <Link className="" to="/search">Search</Link>
          <Link className="" to="/add">Add Post</Link>
          <Link className="" to="/account">Account</Link>
        </div>
        <div className=" col-md-2 col-sm-1">
          <button onClick={()=>{logoutHandler()}} className="font-size-nav" to="/login">Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navigation;