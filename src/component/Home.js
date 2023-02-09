import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Home() {
  const [Log,setLog]=useState(null);
  const auth = useSelector(state=>state.user);

  useEffect(()=>{
    setLog(true)
  },[auth])

  return (
    <>
    <div className='homeImg'>
      <div className="container home">
        <h1>
            Welcome to Perfect Notes 
        </h1>
        <hr/>
        <p>"Capture every idea, access them anytime, anywhere with our perfect note app"</p>
        <div className={(localStorage.getItem("token"))?"hidden":"homeBtn-container"}>
          <Link to="/Login"><button type="button" className="homeBtn btn">Sign In</button></Link>
          <Link to="/Signup"><button type="button" className="homeBtn btn">Register</button></Link>
        </div>
        <div className={(localStorage.getItem("token"))?"homeBtn-container":"hidden"}>
          <Link to="/Notes"><button type="button" className="homeBtn btn">My Notes</button></Link>
          <Link to="/shareNotes"><button type="button" className="homeBtn btn">Share Notes</button></Link>
        </div>
      </div>
      </div>
  </>
  )
}

export default Home
