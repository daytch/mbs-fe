import { GET_CONSTANT, POST_CONSTANT, PUT_CONSTANT, DELETE_CONSTANT } from '../../constants'

export function getConstant(payload) {
    return {
        type: GET_CONSTANT,
        payload: payload
    }
}

export function postConstant(payload) {
    return {
        type: POST_CONSTANT,
        payload: payload
    }
}


export function putConstant(payload) {
    return {
        type: PUT_CONSTANT,
        payload: payload
    }
}

export function deleteConstant(payload) {
    return {
        type: DELETE_CONSTANT,
        payload: payload
    }
}