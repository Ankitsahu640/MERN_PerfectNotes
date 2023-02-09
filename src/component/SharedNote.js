import React,{useRef} from 'react'
import {AiFillDelete} from "react-icons/ai";
import {AiOutlineShareAlt} from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { delShareNotes } from '../redux/ShareNotes/action';

function SharedNote(props){
  const {note,ShowNotes} = props;
  let date = new Date(note.date).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  const noteRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelNote=()=>{
    if(window.confirm("you want to delete the note")){
      // console.log(note._id);
      dispatch(delShareNotes(note._id));
      toast.info("Note Deleted", {
        position: "top-center",
        autoClose: 1500});
    }
  }

  return (
    <div>
      <div className="card col card-body" onClick={(e)=>{ShowNotes(note)}}>
      <span className="position-absolute translate-middle  bg-secondary badge rounded-pill text-bg-secondary" style={{top:"0.4rem",right:"-1.8rem"}}>{note.tag}</span>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.discription}</p>
          <hr/>
          <p className="cardDate">
            <div><small className="text-muted">{date} - (<AiOutlineShareAlt/>  {note.friendEmail})</small>
            </div>
            <div className='del_edit'>
              <span className="delIcon" onClick={(e)=>{e.stopPropagation();handleDelNote()}}><AiFillDelete/></span>
            </div>
          </p>
      </div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#openNote"style={{display:"none"}} ref={noteRef}/>
      <ToastContainer/>
    </div>
  )
}

export default SharedNote