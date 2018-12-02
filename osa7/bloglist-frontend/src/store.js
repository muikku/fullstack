import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import toggleReducer from './reducers/toggleReducer'
import userBlogsReducer from './reducers/userBlogsReducer';


const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    userBlogs: userBlogsReducer,
    toggle: toggleReducer
})

const store = createStore(
    reducer,
    (applyMiddleware(thunk))
)

export default store