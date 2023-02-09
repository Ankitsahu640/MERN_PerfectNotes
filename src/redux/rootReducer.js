import { combineReducers } from 'redux'
import reducer from './Notes/reduce'
import shareReducer from './ShareNotes/reduce'
import userReducer from './Users/reducer'

const rootReducer = combineReducers({
  notes: reducer,
  user: userReducer,
  share: shareReducer
})

export default rootReducer
