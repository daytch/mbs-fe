import {
  GET_ROLE,
  GET_USER,
  POST_USER,
  PUT_USER,
  DELETE_USER,
  UPLOAD_FILE,
  UPDATE_ROLE,
  UPDATE_PASSWORD,
  FORGOT_PASSWORD,
} from '../../constants'

export function getUser(data) {
  return {
    type: GET_USER,
    payload: data,
  }
}

export function postUser(data) {
  return {
    type: POST_USER,
    payload: data,
  }
}

export function putUser(data) {
  return {
    type: PUT_USER,
    payload: data,
  }
}

export function deleteUser(data) {
  return {
    type: DELETE_USER,
    payload: data,
  }
}

export function uploadFile(data) {
  return {
    type: UPLOAD_FILE,
    payload: data,
  }
}

export function updatePassword(data) {
  return {
    type: UPDATE_PASSWORD,
    payload: data,
  }
}

export function updateRole(data) {
  return {
    type: UPDATE_ROLE,
    payload: data,
  }
}

export function forgotPassword(data) {
  return {
    type: FORGOT_PASSWORD,
    payload: data,
  }
}

export function getRole(data) {
  return {
    type: GET_ROLE,
    payload: data,
  }
}
