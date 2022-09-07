import { combineReducers } from 'redux'
import userReducer from './user'

const RootReducer = combineReducers({
  user: userReducer, //user
})

const rootReducer = (state, action) =>
  RootReducer(action.type === 'Logout' ? undefined : state, action)
export default rootReducer
