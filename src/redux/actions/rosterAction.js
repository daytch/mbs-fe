import { GET_ROSTER, POST_ROSTER, PUT_ROSTER, DELETE_ROSTER } from '../../constants'

export function getRoster(payload) {
    return {
        type: GET_ROSTER,
        payload: payload
    }
}

export function postRoster(payload) {
    return {
        type: POST_ROSTER,
        payload: payload
    }
}


export function putRoster(payload) {
    return {
        type: PUT_ROSTER,
        payload: payload
    }
}

export function deleteRoster(payload) {
    return {
        type: DELETE_ROSTER,
        payload: payload
    }
}