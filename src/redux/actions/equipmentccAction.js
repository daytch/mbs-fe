import { GET_EQUIPMENTCC, POST_EQUIPMENTCC, PUT_EQUIPMENTCC, DELETE_EQUIPMENTCC } from '../../constants'

export function getEquipmentcc(payload) {
    return {
        type: GET_EQUIPMENTCC,
        payload: payload,
    }
}

export function postEquipmentcc(payload) {
    return {
        type: POST_EQUIPMENTCC,
        payload: payload,
    }
}

export function putEquipmentcc(payload) {
    return {
        type: PUT_EQUIPMENTCC,
        payload: payload,
    }
}

export function deleteEquipmentcc(payload) {
    return {
        type: DELETE_EQUIPMENTCC,
        payload: payload,
    }
}
