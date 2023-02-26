import { combineReducers } from 'redux'
import loadReducer from './Loading/reduce'
import reducer from './Notes/reduce'
import shareReducer from './ShareNotes/reduce'
import userReducer from './Users/reducer'

const rootReducer = combineReducers({
  notes: reducer,
  user: userReducer,
  share: shareReducer,
  load : loadReducer
})

export default rootReducer
