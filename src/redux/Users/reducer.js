import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from "../type";


const userReducer = (state = "", action) => {
    switch (action.type) {
      case SIGNUP_USER:
        {
          if(action.payload.success){
              localStorage.setItem('token', action.payload.token);
              return "login";
          }
          else{
              return "wr_signup"
          }
        }
      case LOGIN_USER : 
        {
            if(action.payload.success){
                // Save the auth token and redirect
                localStorage.setItem('token', action.payload.token); 
                return "login"
            }
            else{
                return "wr_login"
            }
        }
      case LOGOUT_USER : 
        {
            localStorage.removeItem("token");
            return "logout"
        }
      default:
        return state;
    }
  }
  
  export default userReducer