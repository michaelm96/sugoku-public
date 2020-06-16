import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sugokuReducers from "../store/reducers/sugokuReducers"
import UserReducers from './reducers/userReducers'

const rootReducers = combineReducers({
    sugoku: sugokuReducers,
    user: UserReducers
})


const store = createStore(rootReducers, applyMiddleware(thunk))

export default store