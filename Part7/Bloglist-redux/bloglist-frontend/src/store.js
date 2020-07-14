import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import createDetails from './reducers/createDetails'
import loginDetails from './reducers/loginDetails'


const reducer = combineReducers({ 
  blogs : blogReducer,
  user : userReducer,
  users : usersReducer,
  createDetails : createDetails,
  loginDetails : loginDetails
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store