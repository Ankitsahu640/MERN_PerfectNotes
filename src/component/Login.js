import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {RxCross2} from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/Users/action';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Spinner'
import 'react-toastify/dist/ReactToastify.css';


function Login() {

  const loading = useSelector(state=>state.load);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user,setUser] = useState({email:"",password:""});

  const UserChanges=(e)=>{
    setUser({...user,[e.target.name]: e.target.value});
  }

  const handleLogIN=(e)=>{
    e.preventDefault();
    dispatch(loginUser(user)).then(()=>{
      setUser({email:"",password:""});
    if(localStorage.getItem("token")){
      navigate('/Notes');
      toast.success("successfully Loged In", {
        position: "top-center",
        autoClose: 2000,
        });
      }
    else{
      toast.error("Invalid Cradintial", {
        position: "top-center",
        autoClose: 2500,
        });
      }

    })
  }

  return (
    <div className="editor">
      {loading && <Spinner/>}
      <div className="loginContainer">
        <div className="loginImage">
          <img src={require("./image/loginImg.png")} id="loginImg" alt="planningImage" />
        </div>
        <div className="signin_card">
                <div className='crossIcon' onClick={()=>{navigate(-1)}}><RxCross2 size={"30px"}/></div>
                <h1>Log In </h1>
                <form onSubmit={handleLogIN}>
                  {/* <p>Please login to your account</p> */}
                  <div className="form-outline mb-4 loginEnter">
                    <label className="form-label" htmlFor="form2Example11" style={{width:"10rem",marginTop:"0.3rem"}}>User email</label>
                    <input type="email" id="form2Example11" className="form-control" name='email' value={user.email} onChange={UserChanges} placeholder="email address"  required/>
                  </div>

                  <div className="form-outline mb-4 loginEnter">
                    <label className="form-label" htmlFor="form2Example22" style={{width:"10rem",marginTop:"0.3rem"}}>Password</label>
                    <input type="password" id="form2Example22" className="form-control" name='password' value={user.password} onChange={UserChanges} placeholder='Password' minLength={3} required/>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block loginSubmit mb-3"  type="Submit">Log In</button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <Link to="/Signup"> create new</Link>
                  </div>
                </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Login;
