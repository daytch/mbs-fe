import {
  GET_MATERIALS,
  GET_MATERIALS_SUCCESS,
  GET_MATERIALS_ERROR,
  POST_MATERIALS,
  POST_MATERIALS_SUCCESS,
  POST_MATERIALS_ERROR,
  PUT_MATERIALS,
  PUT_MATERIALS_SUCCESS,
  PUT_MATERIALS_ERROR,
  DELETE_MATERIALS,
  DELETE_MATERIALS_SUCCESS,
  DELETE_MATERIALS_ERROR,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'

export function* getMaterials(action) {
  try {
    const res = yield call(
      GET,
      URL.MATERIALS + '?projectRepresentationId=' + action.payload.projectRepresentationId,
    )

    // console.log('action.payload.projectRepresentationId: ', action.payload.projectRepresentationId)
    yield put({
      type: GET_MATERIALS_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_MATERIALS_ERROR,
      error: err.message,
    })
  }
}
export function* postMaterials(action) {
  try {
    const res = yield call(POST, URL.MATERIALS, action.payload)

    if (res && res.status === 200) {
      yield put({
        type: POST_MATERIALS_SUCCESS,
        data: res,
      })
    } else if (res.isSuccess) {
      yield put({
        type: POST_MATERIALS_SUCCESS,
        data: res,
      })
    } else if (!res.isSuccess) {
      yield put({
        type: POST_MATERIALS_ERROR,
        data: res.error,
      })
    } else {
      yield put({
        type: POST_MATERIALS_ERROR,
        error: res.response.data.errors.$[0],
      })
    }
  } catch (err) {
    yield put({
      type: POST_MATERIALS_ERROR,
      error: err.message,
    })
  }
}
export function* putMaterials(action) {
  try {
    const res = yield call(PUT, URL.MATERIALS + '/' + action.payload.resourceId, action.payload)

    if (res) {
      yield put({
        type: PUT_MATERIALS_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_MATERIALS_ERROR,
      error: err.message,
    })
  }
}
export function* deleteMaterials(action) {
  try {
    const res = yield call(DELETE, URL.MATERIALS + '/' + action.payload.resourceId, action.payload)

    if (res) {
      yield put({
        type: DELETE_MATERIALS_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_MATERIALS_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_MATERIALS, getMaterials),
    takeLatest(POST_MATERIALS, postMaterials),
    takeLatest(PUT_MATERIALS, putMaterials),
    takeLatest(DELETE_MATERIALS, deleteMaterials),
  ])
}
