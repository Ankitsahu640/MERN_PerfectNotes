import React,{useRef,useState} from 'react';
import { useDispatch } from 'react-redux';
import { addNotes } from '../redux/Notes/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddModal() {
  const dispatch = useDispatch();
  const ref = useRef(null)
  const refClose = useRef(null);
  const [noteVal,setNoteVal] = useState({title:"",discription:"",tag:""});

  const AddNoteChanges=(e)=>{
    setNoteVal({...noteVal,[e.target.name]: e.target.value});
  }
    
  const handleAddNote=(e)=>{
    e.preventDefault();
    dispatch(addNotes(noteVal));
    setNoteVal({title:"",discription:"",tag:""});
    refClose.current.click();
    toast.info("Note Added", {
      position: "top-center",
      autoClose: 1500});
  } 


  return (
    <div>
        <div className="card col card-body add-note" onClick={()=>{ref.current.click()}}>
            <div className='icon-plus'>+</div>
            <div>Add new notes</div>
        </div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" style={{display:"none"}}>
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content" style={{backgroundColor:"rgb(216, 230, 233)"}}>
              <div className="modal-header navcolor">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleAddNote}>
              <div className="modal-body">
                <div className="title">
                    <label htmlFor="validationDefault01" className="form-label">Title</label>
                    <input type="text" className="form-control" id="validationDefault01" name="title" value={noteVal.title} onChange={AddNoteChanges} minLength={3} required/>
                </div><div className="col-md-3">
                  <select className="form-select" aria-label="Default select example" style={{width:"20rem",margin:"1rem 0rem"}} defaultValue={""} name="tag" value={noteVal.tag} onChange={AddNoteChanges} required>
                    <option value="" disabled>Select Tag</option>
                    <option value="General">General</option>
                    <option value="Business">Business</option>
                    <option value="Study">Study</option>
                    <option value="Game">Game</option>
                    <option value="Travel">Travel</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="discription">
                    <label htmlFor="validationDefault01" className="form-label">Discription</label>
                    <textarea className="form-control" id="validationDefault01" resize="none" style={{height:"20rem"}} name="discription" value={noteVal.discription} onChange={AddNoteChanges} minLength={5} required/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancel</button>
                <button type="Submit" className="btn btn-info" >Add</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default AddModal;
