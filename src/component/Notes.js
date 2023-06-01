import React, { useRef, useState } from 'react'
import {AiFillDelete} from "react-icons/ai";
import {FaShare} from "react-icons/fa";
import {FaEdit} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { delNotes } from '../redux/Notes/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sharingNotes } from '../redux/ShareNotes/action';
import { BASE_URL } from '../redux/baseURL';

function Notes(props){
  const {note,UpdateNote,ShowNotes} = props;
  let date = new Date(note.date).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  const [email,setEmail] = useState({email:""});
  const shareRef = useRef(null);
  const closeRef = useRef(null);
  const dispatch = useDispatch();

  const findUser=async(mail)=>{
    try{
      const data = await fetch(`${BASE_URL}/api/auth/findUser`,
          {
              method:"POST",
              headers:{
                  'Content-Type': "application/json"
              },
              body: JSON.stringify(mail)
          });
          const bol = await data.json();
          // console.log(bol);
          return(bol);
    }
    catch(error){
      console.log("error occured in findUser function",error.message);
    }
  }

  const handleDelNote=(e)=>{
    e.stopPropagation();
    if(window.confirm("you want to delete the note")){
      // console.log(note._id);
      dispatch(delNotes(note._id));
      toast.info("Note Deleted", {
        position: "top-center",
        autoClose: 1500});
    }
  }


  const handleShareNote=(e)=>{
      e.preventDefault();
      findUser(email).then((ele)=>{
        if(ele){
          dispatch(sharingNotes(email,note._id));
          // console.log(note._id,email);
          toast.success("Note Shared Successfully", {
            position: "top-center",
            autoClose: 1500});
        }
        else{
          toast.error("Email does not exist", {
            position: "top-center",
            autoClose: 1500});
        }
      })
      setEmail({email:""});
      closeRef.current.click();
  }

  return (
    <div>
      <div className="card col card-body" onClick={(e)=>{ShowNotes(note)}}>
      <span className="position-absolute translate-middle  bg-secondary badge rounded-pill text-bg-secondary" style={{top:"0.4rem",right:"-1.8rem"}}>{note.tag}</span>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text"><i>{note.discription}</i></p>
          <hr/>
          <p className="cardDate">
            <div><small className="text-muted">{date}</small></div>
            <div className='del_edit'>
              <span className="delIcon" onClick={handleDelNote}><AiFillDelete/></span>
              <span className="editIcon" onClick={(e)=>{e.stopPropagation();UpdateNote(note)}}><FaEdit/></span>
              <span className="delIcon" onClick={(e)=>{shareRef.current.click();e.stopPropagation();}}><FaShare/></span>
            </div>
          </p>
      </div>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#shareModal" style={{display:"none"}} ref={shareRef}/>
      <div className="modal fade" id="shareModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{backgroundColor:"rgb(216, 230, 233)"}}>
            <div className="modal-header navcolor">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Share Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleShareNote}>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value={email.email} onChange={(e)=>{setEmail({email:e.target.value})}}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                <button type="Submit" className="btn btn-info">Share</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Notes
