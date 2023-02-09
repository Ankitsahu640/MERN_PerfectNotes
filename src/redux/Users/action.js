import { BASE_URL } from "../baseURL";
import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from "../type";


export const loginUser = (user)=>{
    return async (dispatch)=>{
      try{
          const data = await fetch(`${BASE_URL}/api/auth/login`,
          {
              method:"POST",
              headers:{
                  'Content-Type': "application/json"
              },
              body: JSON.stringify(user)
          });
          const token = await data.json();
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
          const data = await fetch(`${BASE_URL}/api/auth/createUser`,
          {
              method:"POST",
              headers:{
                  'Content-Type': "application/json"
              },
              body: JSON.stringify(user)
          });
          const token = await data.json();
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