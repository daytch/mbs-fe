import { POST_ROLE, PUT_ROLE, DELETE_ROLE } from '../../constants'

// export function getRole(data) {
//   return {
//     type: GET_ROLE,
//     payload: data,
//   }
// }

export function postRole(data) {
  return {
    type: POST_ROLE,
    payload: data,
  }
}

export function putRole(data) {
  return {
    type: PUT_ROLE,
    payload: data,
  }
}

export function deleteRole(data) {
  return {
    type: DELETE_ROLE,
    payload: data,
  }
}
