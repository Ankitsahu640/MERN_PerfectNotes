import { DELETE_NOTE, GETALL_NOTES, UPDATE_NOTE } from "../type";
import { ADD_NOTE } from "../type";

const reducer = (state = [], action) => {
    switch (action.type) {
      case GETALL_NOTES:
        return action.payload
      case ADD_NOTE:
        return [action.payload,...state]
      case DELETE_NOTE:
        return state.filter(notes=>{return(notes._id !== action.payload._id)})
      case UPDATE_NOTE:
        {
          state = state.filter(notes=>{return(notes._id !== action.prevNote)});
          return [action.payload,...state]
        }
      default:
        return state;
    }
  }
  
  export default reducer
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //  const initialState = {
//     loading: false,
//     users: [],
//     error: ''
//   }
  
//   const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case "FETCH_USERS_REQUEST":
//         return {
//           ...state,
//           loading: true
//         }
//       case "FETCH_USERS_SUCCESS":
//         return {
//           loading: false,
//           users: action.payload,
//           error: ''
//         }
//       case "FETCH_USERS_FAILURE":
//         return {
//           loading: false,
//           users: [],
//           error: action.payload
//         }
//       default: return state
//     }
//   }

  
  