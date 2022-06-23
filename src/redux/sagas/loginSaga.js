import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  HANDLE_LOGIN,
  HANDLE_REGISTER,
  HANDLE_LOGIN_SUCCESS,
  HANDLE_LOGIN_ERROR,
  URL,
} from '../../constants'

import { POST, POSTLogin } from '../../services'
import { createBrowserHistory } from 'history'

export function* doLogin(action) {
  try {
    const data = action.payload
    const res = yield call(POSTLogin, URL.LOGIN, data)

    if (!res?.token) {
      yield put({
        type: HANDLE_LOGIN_ERROR,
        payload: {
          isError: 1,
          message: res.message ? res.message : res.statusText,
        },
      })
    } else {
      localStorage.setItem('idToken', res.token)
      localStorage.setItem('user', JSON.stringify(res))
      /* localStorage.setItem('name', res.name)
      localStorage.setItem('email', res.email)
      localStorage.setItem('image', res.image)
      */
      yield put({
        type: HANDLE_LOGIN_SUCCESS,
        payload: {
          isError: 0,
          message: '',
        },
      })

      const dd = createBrowserHistory({ forceRefresh: true })
      yield call(dd.push('/dashboard'))
    }
  } catch (err) {
    yield put({
      type: HANDLE_LOGIN_ERROR,
      error: 'Unauthorize user',
    })
  }
}

export function* doRegister(action) {
  try {
    const data = action.payload
    // console.log(data)
    const res = yield call(POST, URL.REGISTER, data)
    if (res.isError === 1) {
      yield put({
        type: 'MESSAGE',
        payload: {
          isError: 1,
          message: res.message,
        },
      })
    } else {
      yield put({
        type: 'MESSAGE',
        payload: {
          isError: 0,
          message: res.message,
          isRegister: true,
        },
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  yield all([takeLatest(HANDLE_LOGIN, doLogin), takeLatest(HANDLE_REGISTER, doRegister)])
}
