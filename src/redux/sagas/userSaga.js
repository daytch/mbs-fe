import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  POST_USER,
  POST_USER_SUCCESS,
  POST_USER_ERROR,
  PUT_USER,
  PUT_USER_SUCCESS,
  PUT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  URL,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  GET_ROLE,
  GET_ROLE_SUCCESS,
  GET_ROLE_ERROR,
} from '../../constants'

import { GET, PUT, POSTWithMessage, POST } from '../../services'

export function* getRole() {
  try {
    const res = yield call(GET, URL.ACCOUNT + '/GetRoles')

    yield put({
      type: GET_ROLE_SUCCESS,
      data: res,
    })
  } catch (err) {
    yield put({
      type: GET_ROLE_ERROR,
      error: err.message,
    })
  }
}

export function* forgotPassword(payload) {
  try {
    const res = yield call(POST, URL.ACCOUNT + '/forgotPassword', payload.payload)

    if (res) {
      yield put({
        type: FORGOT_PASSWORD_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: FORGOT_PASSWORD_ERROR,
      error: err.message,
    })
  }
}

export function* uploadFile(payload) {
  try {
    const res = yield call(POST, URL.ACCOUNT + '/uploadfile', payload.payload, null, 'file')

    if (res) {
      let user = JSON.parse(localStorage.getItem('user'))
      user.image = res.url
      localStorage.setItem('user', JSON.stringify(user))
      yield put({
        type: UPLOAD_FILE_SUCCESS,
        data: res.url,
      })
    }
  } catch (err) {
    yield put({
      type: UPLOAD_FILE_ERROR,
      error: err.message,
    })
  }
}

export function* getUser() {
  try {
    const res = yield call(POST, URL.USERS + '/GetAllUser')

    yield put({
      type: GET_USER_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_USER_ERROR,
      error: err.message,
    })
  }
}

export function* postUser(action) {
  try {
    const res = yield call(POSTWithMessage, URL.ACCOUNT + '/Register', action.payload)

    if (res) {
      yield put({
        type: POST_USER_SUCCESS,
        data: {},
      })
    }
  } catch (err) {
    yield put({
      type: POST_USER_ERROR,
      error: err.message,
    })
  }
}

export function* putUser(action) {
  try {
    const res = yield call(PUT, URL.ACCOUNT + '/update', action.payload)

    if (res) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.email === action.payload.email) {
        localStorage.setItem('user', JSON.stringify(res))
      }
      yield put({
        type: PUT_USER_SUCCESS,
        data: res,
        message: 'Update user success',
      })
    }
  } catch (err) {
    yield put({
      type: PUT_USER_ERROR,
      error: err.message,
    })
  }
}

export function* updatePassword(action) {
  try {
    const res = yield call(PUT, URL.ACCOUNT + '/updatePassword', action.payload)

    if (!res.isError) {
      yield put({
        type: UPDATE_PASSWORD_SUCCESS,
        data: res,
      })
    } else {
      yield put({
        type: UPDATE_PASSWORD_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: UPDATE_PASSWORD_ERROR,
      error: err.message,
    })
  }
}

export function* updateRole(action) {
  try {
    const res = yield call(POST, URL.ACCOUNT + '/assignRole', action.payload)

    if (res.isSucess) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.email === action.payload.email) {
        user.role = action.payload.roleId
        localStorage.setItem('user', JSON.stringify(user))
      }
      yield put({
        type: UPDATE_ROLE_SUCCESS,
        data: res,
      })
    } else {
      yield put({
        type: UPDATE_ROLE_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: UPDATE_ROLE_ERROR,
      error: err.message,
    })
  }
}

export function* deleteUser(action) {
  try {
    const res = yield call(POST, URL.USERS + '/DeleteUser?email=' + action.payload.email)

    if (res) {
      yield put({
        type: DELETE_USER_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_USER_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_USER, getUser),
    takeLatest(POST_USER, postUser),
    takeLatest(PUT_USER, putUser),
    takeLatest(DELETE_USER, deleteUser),
    takeLatest(UPLOAD_FILE, uploadFile),
    takeLatest(UPDATE_PASSWORD, updatePassword),
    takeLatest(UPDATE_ROLE, updateRole),
    takeLatest(FORGOT_PASSWORD, forgotPassword),
    takeLatest(GET_ROLE, getRole),
  ])
}
