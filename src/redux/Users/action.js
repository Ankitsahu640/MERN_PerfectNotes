import { BASE_URL } from "../baseURL";
import { LOADING_SPINNER_OFF, LOADING_SPINNER_ON, LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from "../type";


export const loginUser = (user)=>{
    return async (dispatch)=>{
      try{
        dispatch({type:LOADING_SPINNER_ON,payload:true})
          const data = await fetch(`${BASE_URL}/api/auth/login`,
          {
              method:"POST",
              headers:{
                  'Content-Type': "application/json"
              },
              body: JSON.stringify(user)
          });
          const token = await data.json();
          dispatch({type:LOADING_SPINNER_OFF,payload:false})
          dispatch({type:LOGIN_USER, payload:token})
      }
      catch(error){
        console.log('Error while calling loginUser API', error);
      }
    }
  }


  export const signUpUser = (user)=>{
    return async (dispatch)=>{
      try{
        dispatch({type:LOADING_SPINNER_ON,payload:true})
          const data = await fetch(`${BASE_URL}/api/auth/createUser`,
          {
              method:"POST",
              headers:{
                  'Content-Type': "application/json"
              },
              body: JSON.stringify(user)
          });
          const token = await data.json();
          dispatch({type:LOADING_SPINNER_OFF,payload:false})
          dispatch({type:SIGNUP_USER, payload:token})
      }
      catch(error){
        console.log('Error while calling SignUpUser API', error);
      }
    }
  }


  export const logOutUser = ()=>{
    return (dispatch)=>{
        dispatch({type:LOGOUT_USER})
    }
  }
