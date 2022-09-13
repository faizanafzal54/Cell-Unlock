import { combineReducers } from 'redux'
import userReducer from './user'
import orderReducer from './order'

const RootReducer = combineReducers({
  user: userReducer, //user
  order: orderReducer, //order
})

const rootReducer = (state, action) =>
  RootReducer(action.type === 'Logout' ? undefined : state, action)
export default rootReducer
