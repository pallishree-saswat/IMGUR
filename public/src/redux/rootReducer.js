import { combineReducers } from 'redux'
//All reducers
import imageReducer from './reducers/imageReducer'
import userReducer from './reducers/userReducer'
import favReducer from './reducers/favReducer'
import myReducer from './reducers/myReducer'

const rootReducer = combineReducers({
    imageState: imageReducer,
    userState: userReducer,
    favState:favReducer,
    myState:myReducer
})

export default rootReducer;