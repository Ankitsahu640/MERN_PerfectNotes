import { BASE_URL } from "../baseURL";
import { GETALL_NOTES, UPDATE_NOTE } from "../type";
import { ADD_NOTE } from "../type";
import { DELETE_NOTE } from "../type";

export const fetchNotes = () => {
  return async(dispatch) => {
    try{
      // dispatch(fetchUsersRequest())
        const data = await fetch(`${BASE_URL}/api/notes/fetchNotes`,
        {
            method:"GET",
            headers:{
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem("token")
            }
        });
        const note = await data.json();
        // dispatch(fetchUsersSuccess(data));
        dispatch({type:GETALL_NOTES, payload:note})
    }
    catch(error){
      console.log('Error while calling fetchNote API ', error);
    }
    }
}


export const addNotes = (notes)=>{
  return async (dispatch)=>{
    try{
        const data = await fetch(`${BASE_URL}/api/notes/addNotes`,
        {
            method:"POST",
            headers:{
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(notes)
        });
        const note = await data.json();
        dispatch({type:ADD_NOTE, payload:note})
    }
    catch(error){
      console.log('Error while calling addNote API', error);
    }
  }
}


export const delNotes = (id)=>{
  return async (dispatch)=>{
    try{
        const data = await fetch(`${BASE_URL}/api/notes/deleteNotes/${id}`,
        {
            method:"DELETE",
            headers:{
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem("token")
            }
        });
        const notes = await data.json();
        dispatch({type:DELETE_NOTE,payload:notes})
    }
    catch(error){
      console.log('Error while calling delNote API', error);
    }
  }
}


export const updateNotes = (id,note)=>{
  return async (dispatch)=>{
    try{
        const data = await fetch(`${BASE_URL}/api/notes/updateNotes/${id}`,
        {
            method:"PUT",
            headers:{
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(note)
        });
        const newNote = await data.json();
        dispatch({type:UPDATE_NOTE, payload:newNote, prevNote:id})
    }
    catch(error){
      console.log('Error while calling updateNote API', error);
    }
  }
}




// export const fetchUsersRequest = () => {
//   return {
//     type: "FETCH_USERS_REQUEST"
//   }
// }

// export const fetchUsersSuccess = users => {
//   return {
//     type: "FETCH_USERS_SUCCESS",
//     payload: users
//   }
// }

// export const fetchUsersFailure = error => {
//   return {
//     type: "FETCH_USERS_FAILURE",
//     payload: error
//   }
// }
