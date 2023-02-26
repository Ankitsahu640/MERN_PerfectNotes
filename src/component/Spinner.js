import React from 'react'

function Spinner() {
  return (
    <div>
      <div className="d-flex justify-content-center fixed-top" style={{marginTop:"58px"}}>
            <div className="spinner-border m-2" role="status" style={{ padding:"20px", color:"rgb(95, 164, 166)", fontSize:"16px"}}>
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default Spinner
