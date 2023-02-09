import React, { useState } from 'react'
import {RxCross2} from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../redux/Users/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user,setUser] = useState({name:"",email:"",password:""});
  // const auth = useSelector(state=>state.user);

  const UserChanges=(e)=>{
    setUser({...user,[e.target.name]: e.target.value});
  }

  const handleSignUP=(e)=>{
    e.preventDefault();
    dispatch(signUpUser(user)).then(()=>{
      if(localStorage.getItem("token")){
        navigate('/Notes');
        toast.success("Successfully Register", {
          position: "top-center",
          autoClose: 2000,
          });
      }
      else{
        toast.error("This email is already exist", {
          position: "top-center",
          autoClose: 2500,
          });
      }
      setUser({name:"",email:"",password:""});
    });
  }

  // useEffect(()=>{
  //   setUser({name:"",email:"",password:""});
  //   console.log("signup : ",auth);
  //   if(auth==="login"){
  //     navigate('/Notes');
  //   }
  // },[auth])

  return (
    <div className="editor">
      <div className="loginContainer">
        <div className="loginImage">
          <img src={require("./image/loginImg.png")} id="loginImg" alt="planningImage" />
        </div>
        <div className="signin_card">
                <div className='crossIcon' onClick={()=>{navigate(-1)}}><RxCross2 size={"30px"}/></div>
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUP}>
                  <div className="form-outline mb-4 loginEnter">
                    <label className="form-label" htmlFor="form2Example11" style={{width:"10rem",marginTop:"0.3rem"}}>User Name</label>
                    <input type="text" id="form2Example11" className="form-control" name="name" value={user.name} onChange={UserChanges} placeholder="Enter Name" minLength={3} required/>
                  </div>

                  <div className="form-outline mb-4 loginEnter">
                    <label className="form-label" htmlFor="form2Example11" style={{width:"10rem",marginTop:"0.3rem"}}>User email</label>
                    <input type="email" id="form2Example11" className="form-control" name="email" value={user.email} onChange={UserChanges} placeholder="email address"  required/>
                  </div>

                  <div className="form-outline mb-4 loginEnter">
                    <label className="form-label" htmlFor="form2Example22" style={{width:"10rem",marginTop:"0.3rem"}}>Password</label>
                    <input type="password" id="form2Example22" className="form-control" name="password" value={user.password} onChange={UserChanges} placeholder='Enter Password' minLength={3} required/>
                  </div>
                  <div className="text-center pt-1 mb-3 pb-1">
                    <button className="btn btn-primary btn-block loginSubmit mb-3" type="Submit">Register</button>
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Already have an account?</p>
                    <Link to="/Login"> Log In</Link>
                  </div>
                </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default SignUp
