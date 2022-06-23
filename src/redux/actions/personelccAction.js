import { GET_PERSONELCC, POST_PERSONELCC, PUT_PERSONELCC, DELETE_PERSONELCC } from '../../constants'

export function getPersonelcc(payload) {
    return {
        type: GET_PERSONELCC,
        payload: payload,
    }
}

export function postPersonelcc(payload) {
    return {
        type: POST_PERSONELCC,
        payload: payload,
    }
}

export function putPersonelcc(payload) {
    return {
        type: PUT_PERSONELCC,
        payload: payload,
    }
}

export function deletePersonelcc(payload) {
    return {
        type: DELETE_PERSONELCC,
        payload: payload,
    }
}
