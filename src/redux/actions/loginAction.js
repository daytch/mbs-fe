import { HANDLE_LOGIN } from '../../constants'

export function doLogin(data) {
  return {
    type: HANDLE_LOGIN,
    payload: data,
  }
}

export function doRegister(data) {
  return {
    type: 'HANDLE_REGISTER',
    payload: data,
  }
}

export function message(data) {
  return {
    type: 'MESSAGE',
    payload: data,
  }
}

/*
export function getUser(data) {
  return {
    type: 'GET_USER',
    payload: data,
  }
}
*/
