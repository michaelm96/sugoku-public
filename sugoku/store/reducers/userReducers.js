import { SET_NAME, SET_STATUS } from "../actionType"

const initialState = {
    user: "",
    status: "",
}

export default UserReducers = (state=initialState, action) => {
    switch(action.type){
        case SET_NAME:
            return { ...state, user: action.payload }
        case SET_STATUS:
            return { ...state, status: action.payload }
        default:
            return state
    }
}