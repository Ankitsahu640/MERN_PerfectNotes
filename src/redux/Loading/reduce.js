import { LOADING_SPINNER_OFF, LOADING_SPINNER_ON } from "../type";

const loadReducer = (state = false, action) => {
    switch (action.type) {
      case LOADING_SPINNER_OFF:
        return action.payload;
      case LOADING_SPINNER_ON:
        return action.payload;
      default:
        return state;
    }
  }
  
  export default loadReducer