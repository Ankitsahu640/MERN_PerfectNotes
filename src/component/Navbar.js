import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, Outlet} from 'react-router-dom'
import { logOutUser } from '../redux/Users/action';
import { useLocation } from 'react-router-dom';
import {FaUserCircle} from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../redux/baseURL';

function Navbar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const auth = useSelector(state=>state.user);
    const [user,setUser]=useState({name:"",email:""});
    const [logOut,setLogOut] = useState(null);

    const handleLogOut=()=>{
        if(window.confirm("You want to Log Out")){
            dispatch(logOutUser())
            setLogOut(true);
            toast.success('Successfully Log Out', {
                position: "top-center",
                autoClose: 1500,
                });
        } 
    }

    const fetchUser = async() =>{
        if(localStorage.getItem("token")){
            try{
                const data = await fetch(`${BASE_URL}/api/auth/getUser`,
                    {
                        method:"GET",
                        headers:{
                            'Content-Type': "application/json",
                            'auth-token': localStorage.getItem("token")
                        }
                    });
                    const User = await data.json();
                    setUser({name:User.name ,email:User.email})
              }
              catch(error){
                console.log("error occured in findUser function",error.message);
              }
        }
    }

    useEffect(()=>{
        setLogOut(false);
        fetchUser();
    },[auth])

    const pathCheck=(str)=>{
        if(str===location.pathname){
            return "active-link";
        }
        else{
            return "";
        }
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navcolor navShadow fixed-top ">
            <div className="container-fluid ">
                <div className="navBrand " to="#">Perfect Notes</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                        <Link className={`${pathCheck("/")} nav-links`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`${pathCheck("/Notes")} nav-links`} aria-current="page" to="/Notes">My Notes</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`${pathCheck("/shareNotes")} nav-links`} aria-current="page" to="/shareNotes">Share Notes</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`${pathCheck("/about")} nav-links`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    <div className={(localStorage.getItem("token"))?"hidden":"d-flex"} role="search">
                        <Link to="/Login"><button type="button" className="navBtn btn btn-info mx-2 ">Log In </button></Link>
                        <Link to="/Signup"><button type="button" className="navBtn btn btn-info mx-2 ">Sign Up </button></Link>
                    </div>
                    <div className={(localStorage.getItem("token"))?"d-flex":"hidden"} role="search">
                        <div className="btn-group userNav">
                            <div type="button" data-bs-toggle="dropdown" aria-expanded="false"><span>{user.name} </span> <FaUserCircle size={"1.563rem"}/> </div>
                            <ul className="dropdown-menu">
                                <li> {user.email} </li>
                            </ul>
                        </div>
                        <button type="button" className="navBtn btn btn-info mx-2" onClick={handleLogOut}>Log Out</button>
                    </div>
                </div>
            </div>
        </nav>
        <Outlet/>
        <ToastContainer/>
    </div>
  )
}

export default Navbar
