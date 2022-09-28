import { combineReducers } from 'redux'
import userReducer from './user'
import orderReducer from './order'
import serviceReducer from './service'
const RootReducer = combineReducers({
  user: userReducer, //user
  order: orderReducer, //order
  service: serviceReducer, //service
})

const rootReducer = (state, action) =>
  RootReducer(action.type === 'Logout' ? undefined : state, action)
export default rootReducer
