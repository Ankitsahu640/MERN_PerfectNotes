import { DEL_SHARE_NOTE, GET_SHARE_NOTE, SHARING_NOTE } from "../type"


const shareReducer = (state = [], action) => {
    switch (action.type) {
      case GET_SHARE_NOTE:
        return action.payload
      case SHARING_NOTE:
        return [action.payload,...state]
      case DEL_SHARE_NOTE:
        return state.filter(notes=>{return(notes._id !== action.payload._id)})
      default:
        return state;
    }
  }
  
  export default shareReducer