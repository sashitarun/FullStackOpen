import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import usernameReducer from './reducers/usernameReducer'
import passwordReducer from './reducers/passwordReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'


const reducer = combineReducers({ 
  blogs : blogReducer,
  username : usernameReducer,
  password : passwordReducer,
  user : userReducer,
  loginUser : loginReducer
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store