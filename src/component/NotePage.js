import React,{useEffect,useRef, useState} from 'react';
import Notes from './Notes';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes } from '../redux/Notes/action';
import {FaUserLock} from "react-icons/fa";
import AddModal from './AddModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateNotes } from '../redux/Notes/action';


function NotePage() {
  const notes = useSelector(state=>state.notes);
  let notee = notes ;

  const [load,setLoad]=useState(null);
  const [search,setSearch] = useState("");
  const [searchNote, setSearchNote] = useState(notes);
  const [filter,setFilter]= useState({tag:"",date:""})
  const dispatch = useDispatch();


  //showing note modal
  const noteRef = useRef(null);
  const [showNote,setShowNote]=useState({title:"",discription:""});

  const ShowNotes = (curNote) =>{
    setShowNote({title:curNote.title ,discription:curNote.discription })
    noteRef.current.click();
  }


//Updating note
    const updateRef = useRef(null);
    const refClose = useRef(null);
    const [noteVal,setNoteVal] = useState({id:"" ,title:"" ,discription:"" ,tag:"" });

    const UpdateNoteChanges=(e)=>{
        setNoteVal({...noteVal,[e.target.name]: e.target.value});
    }

    const UpdateNote = (curNote)=>{
      setNoteVal({id:curNote._id ,title:curNote.title ,discription:curNote.discription ,tag:curNote.tag })
      updateRef.current.click();
    }

    const handleUpdateNote = (e) =>{
        e.preventDefault();
        dispatch(updateNotes(noteVal.id,noteVal));
        refClose.current.click();
        toast.info("Note Updated", {
          position: "top-center",
          autoClose: 1500});
    }
  

//Applying Filter

    const handleSearch=(e)=>{
      if(e.key==="Enter"){
        e.preventDefault();
        setSearch(e.target.value.toLowerCase().trim());
        // console.log(search);
      }
    }    

    const handleFilter=(e)=>{
      e.preventDefault();
      let filterDate = document.getElementById("filter-date").value.replace(/-/g,"/");
      let filterTag = document.getElementById("filter-tag").value;
      setFilter({tag: filterTag , date: filterDate});
      // console.log(filter);
    }
  
    const handleReset=()=>{
      setFilter({tag:"" , date:"" });
      setSearch("");
    }

    const SearchNoteFill=()=>{
      notee = notes.filter((ele)=>ele.title.toLowerCase().includes(search));
      if(filter.tag!==""){
        notee = notee.filter((ele)=>{return((ele.tag===filter.tag))});
      }
      if(filter.date!==""){
        notee = notee.filter((ele)=>{let date = new Date(ele.date).toISOString().replace('-', '/').split('T')[0].replace('-', '/');return((date===filter.date))});
      }
        setSearchNote(notee);
    }

//useEffect
  useEffect(() => {
    // setLoad(true);
    if(localStorage.getItem("token")){
      dispatch(fetchNotes());
    }
    SearchNoteFill();
  }, [notes])


  return (
    <div className=" containerN">
      {(function(){
          if(localStorage.getItem("token")){
            return<>

                  {/* Update Modal */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={updateRef} data-bs-target="#updateModal" style={{display:"none"}}/>
                <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabe2" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor:"rgb(216, 230, 233)"}}>
                      <div className="modal-header navcolor">
                        <h1 className="modal-title fs-5" id="exampleModalLabe2">Update Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form onSubmit={handleUpdateNote}>
                      <div className="modal-body">
                        <div className="title">
                            <label htmlFor="validationDefault01" className="form-label">Title</label>
                            <input type="text" className="form-control" id="validationDefault01" name="title" value={noteVal.title} onChange={UpdateNoteChanges} minLength={3} required/>
                        </div><div className="col-md-3">
                          <select className="form-select" aria-label="Default select example" style={{width:"20rem",margin:"1rem 0rem"}} name="tag" defaultValue={""} value={noteVal.tag} onChange={UpdateNoteChanges} required>
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
                            <textarea className="form-control" id="validationDefault01" resize="none" style={{height:"20rem"}} name="discription" value={noteVal.discription} onChange={UpdateNoteChanges} minLength={5} required/>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancel</button>
                        <button type="Submit" className="btn btn-info" >Update</button>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* showing Note Modal */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#openNote"style={{display:"none"}} ref={noteRef}/>
                <div className="modal fade" id="openNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content" style={{backgroundColor:"rgb(216, 230, 233)"}}>
                    <div className="modal-header navcolor">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"/>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body open-note container">
                        <h3 className='card-title'>{showNote.title}</h3>
                        <h5 className='card-discription'>{showNote.discription}</h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>


                <div className="yourNotes">
                  <h2>My Notes</h2>
                  <hr/>
                </div>
                <div className="searchBar my-3">
                    <div><input type="search" id="search" onKeyDown={handleSearch} placeholder='Search Your Notes'/></div>
                    <div className="dropdown filter-btn">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Search Filter
                      </button>
                      <ul className="dropdown-menu filter-form">
                        <form onSubmit={handleFilter}>
                              <div className='mb-3'>
                                <label htmlFor="filter-tag" className="form-label">Tag</label>
                                <select className="form-select" aria-label="Default select example" id="filter-tag" name="tag" defaultValue={""} >
                                  <option value="" disabled >Select Tag</option>
                                  <option value="General">General</option>
                                  <option value="Business">Business</option>
                                  <option value="Study">Study</option>
                                  <option value="Game">Game</option>
                                  <option value="Travel">Travel</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                              <div className='mb-3'>
                                <label htmlFor="filter-date" className="form-label">Date</label>
                                <input type="date" id="filter-date" name="date" min="2018/01/01" max="2023/12/31" />
                              </div>
                              <div className="filter-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="Submit" className="btn btn-info" >Apply</button>
                              </div>
                          </form>
                      </ul>
                    </div>
                    <div>
                      <button type="button" className="btn btn-info" onClick={handleReset}>Reset</button>
                    </div>
                </div>

                <div className="noteContainer grid-container">
                <AddModal/>
                  {searchNote.slice(0).reverse().map((note)=>{
                          return(<Notes key={note._id} note={note} UpdateNote={UpdateNote} ShowNotes={ShowNotes}/>) 
                      })
                  }
                </div>
            </>
          }
          else{
            return<>
               <div className="not-allowed">
                    <div><FaUserLock size={"12.5rem"} color='rgb(175, 175, 175)'/></div>
                    <div style={{diaplay:"flex"}}>
                      <div className=" mb-0 me-2 no-access">You don't have access to this page </div>
                      <div style={{textAlign:"center"}}><Link to="/Login">please Sign In</Link></div>
                    </div>
                </div>
            </>
          }
      }).call(this)}
      <ToastContainer/>
    </div>
  )
}

export default NotePage
