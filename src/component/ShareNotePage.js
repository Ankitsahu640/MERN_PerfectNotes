import React,{useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SharedNote from './SharedNote';
import {FaUserLock} from "react-icons/fa"
import { fetchShareNotes } from '../redux/ShareNotes/action';

function ShareNotePage() {

  const notes = useSelector(state=>state.share);
  let notee = notes

  const [load,setLoad]=useState(null);
  const [search,setSearch] = useState("");
  const [searchNote, setSearchNote] = useState(notes);
  const [filter,setFilter]= useState({tag:"",date:""})
  const dispatch = useDispatch();


  const noteRef = useRef(null);
  const [showNote,setShowNote]=useState({title:"",discription:""});

  const ShowNotes = (curNote) =>{
    setShowNote({title:curNote.title ,discription:curNote.discription })
    noteRef.current.click();
  }


  const handleSearch=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      setSearch(e.target.value.toLowerCase().trim());
      notee = notes.filter((ele)=>ele.title.toLowerCase().includes(search));
      // console.log(search);
    }
  }
  
  const handleFilter=(e)=>{
    e.preventDefault();
    const filterDate = document.getElementById("filter-date").value.replace(/-/g,"/");
    const filterTag = document.getElementById("filter-tag").value;
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


  useEffect(() => {
    setLoad(true);
    if(localStorage.getItem("token")){
      dispatch(fetchShareNotes());
    }
    SearchNoteFill();
    // let notee = notes.filter((ele)=>ele.title.toLowerCase().includes(search));
    // if(filter.tag!==""){
    //   notee = notee.filter((ele)=>{return((ele.tag===filter.tag))});
    // }
    // if(filter.date!==""){
    //   notee = notee.filter((ele)=>{return((ele.date===filter.date))});
    // }
    // setSearchNote(notee);
  }, [notes])

  return (
    <div className="containerN">
      {(function(){
          if(localStorage.getItem("token")){
            return<>

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
                  <h2>Share Notes</h2>
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
                                <select className="form-select" aria-label="Default select example" id="filter-tag" name="tag" >
                                  <option value="" selected >Select Tag</option>
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
                {(function(){
                    if(notes.length===0){
                    return<>
                        <div className="noteContainer">
                            <i className="NoShare">
                                Sorry, You don't have any shared note to display
                            </i>
                        </div>
                        </>
                    }
                    else{
                        return<>
                            <div className="noteContainer grid-container">
                            {searchNote.slice(0).reverse().map((note)=>{
                                    return(<SharedNote key={note._id} note={note} ShowNotes={ShowNotes}/>) 
                                })
                            }
                            </div>
                        </>
                    }
                }).call(this)}
            </>
          }
          else{
            return<>
               <div className="not-allowed">
                    <div><FaUserLock size={"12.5rem"} color='rgb(175, 175, 175)'/></div>
                    <div style={{diaplay:"flex"}}>
                      <div className="mb-0 me-2 no-access">You don't have access to this page </div>
                      <div style={{textAlign:"center"}}><Link to="/Login">please Sign In</Link></div>
                    </div>
                </div>
            </>
          }
      }).call(this)}
    </div>
  )
}

export default ShareNotePage
