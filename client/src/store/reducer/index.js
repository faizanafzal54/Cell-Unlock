import { combineReducers } from 'redux'
import userReducer from './user'
import orderReducer from './order'
import serviceReducer from './service'
import creditsReducer from './credits'
import categoryReducer from './category'
const RootReducer = combineReducers({
  user: userReducer, //user
  order: orderReducer, //order
  service: serviceReducer, //service
  credits: creditsReducer, //credits
  category: categoryReducer, // category
})

const rootReducer = (state, action) =>
  RootReducer(action.type === 'Logout' ? undefined : state, action)
export default rootReducer
