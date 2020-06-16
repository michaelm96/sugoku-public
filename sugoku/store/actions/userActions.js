import { SET_NAME, SET_STATUS } from "../actionType"

export function setName(name) {
    return {
        type: SET_NAME,
        payload: name
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status
    }
}