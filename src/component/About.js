import React from 'react'

function About() {
  return (
    <div className='editor'>
    <div className="row">
       <div className="Dashboard_conatiner">
        
        <h1>Perfect Notes</h1>
        <p className='aboutFont'>
          The Note Maker is a web application made by Ankit Sahu for
          students so that they can make notes faster and can share with their
          friends for helping each other and developing learning enviroment
          among their friends .
        </p>
        <br />

        <h2>Features</h2>
        <ul>
          <li className='aboutFont'> 1. You can share your notes with friends also</li>
          <li className='aboutFont'> 2. Can Make notes and store in a well arrnaged manner.</li>
          <li className='aboutFont'> 3. Facility of updating notes for future and text formating</li>
          <li className='aboutFont'>
            {" "}
            4. Can read notes of yours friends also which are shared to you .
          </li>
        </ul>
        <br />
        <p className='aboutFont'>
          So what are you waiting for <strong>Get Stated !</strong>
        </p>
      </div>
      <img src={require("./image/dashBoard.png")} alt="" className="cartoon_dash" />
    </div>
    <div className='CopyRight'><p>Copyright &copy; of Perfect Notes are reserverd by Ankit Sahu</p></div>
  </div>
  )
}

export default About
