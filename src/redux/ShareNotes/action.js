import { BASE_URL } from "../baseURL";
import { DEL_SHARE_NOTE, GET_SHARE_NOTE, SHARING_NOTE } from "../type";


export const sharingNotes = (email,id)=>{
    return async (dispatch)=>{
      try{
          const data = await fetch(`${BASE_URL}/api/notes/sharingNote/${id}`,
          {
              method:"POST",
              headers:{
                  'Content-Type': "application/json",
                  'auth-token': localStorage.getItem("token")
              },
              body: JSON.stringify(email)
          });
          const shareNote = await data.json();
          dispatch({type:SHARING_NOTE, payload:shareNote})
      }
      catch(error){
        console.log('Error while calling sharingNotes API', error);
      }
    }
  }


export const fetchShareNotes = () => {
    return async(dispatch) => {
      try{
          const data = await fetch(`${BASE_URL}/api/notes/fetchSharedNotes`,
          {
              method:"GET",
              headers:{
                  'Content-Type': "application/json",
                  'auth-token': localStorage.getItem("token")
              }
          });
          const shareNote = await data.json();
          dispatch({type:GET_SHARE_NOTE, payload:shareNote})
      }
      catch(error){
        console.log('Error while calling fetchShareNote API ', error);
      }
    }
}


export const delShareNotes = (id)=>{
  return async (dispatch)=>{
    try{
        const data = await fetch(`${BASE_URL}/api/notes/delShareNotes/${id}`,
        {
            method:"DELETE",
            headers:{
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem("token")
            }
        });
        const notes = await data.json();
        dispatch({type:DEL_SHARE_NOTE,payload:notes})
    }
    catch(error){
      console.log('Error while calling delShareNote API', error);
    }
  }
}