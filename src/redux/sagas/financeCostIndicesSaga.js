import {
  GET_COST_INDICES,
  GET_COST_INDICES_SUCCESS,
  GET_COST_INDICES_ERROR,
  POST_COST_INDICES,
  POST_COST_INDICES_SUCCESS,
  POST_COST_INDICES_ERROR,
  PUT_COST_INDICES,
  PUT_COST_INDICES_SUCCESS,
  PUT_COST_INDICES_ERROR,
  DELETE_COST_INDICES,
  DELETE_COST_INDICES_SUCCESS,
  DELETE_COST_INDICES_ERROR,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'

export function* getCostIndices(action) {
  try {
    const res = yield call(
      GET,
      URL.COST_INDICES + '?projectRepresentationId=' + action.payload.projectRepresentationId,
    )

    yield put({
      type: GET_COST_INDICES_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_COST_INDICES_ERROR,
      error: err.message,
    })
  }
}
export function* postCostIndices(action) {
  try {
    let data = action.payload.map((item) => item)
    const res = yield call(POST, URL.COST_INDICES, data)

    if (res && res.status === 200) {
      yield put({
        type: POST_COST_INDICES_SUCCESS,
        data: res,
      })
    } else if (res.isSuccess) {
      yield put({
        type: POST_COST_INDICES_SUCCESS,
        data: res,
      })
    } else if (!res.isSuccess) {
      yield put({
        type: POST_COST_INDICES_ERROR,
        data: res.error,
      })
    } else {
      yield put({
        type: POST_COST_INDICES_ERROR,
        error: res.response.data.errors.$[0],
      })
    }
  } catch (err) {
    yield put({
      type: POST_COST_INDICES_ERROR,
      error: err.message,
    })
  }
}
export function* putCostIndices(action) {
  try {
    const res = yield call(PUT, URL.COST_INDICES, action.payload)

    if (res) {
      yield put({
        type: PUT_COST_INDICES_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_COST_INDICES_ERROR,
      error: err.message,
    })
  }
}
export function* deleteCostIndices(action) {
  try {
    const res = yield call(DELETE, URL.COST_INDICES, action.payload)

    if (res) {
      yield put({
        type: DELETE_COST_INDICES_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_COST_INDICES_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_COST_INDICES, getCostIndices),
    takeLatest(POST_COST_INDICES, postCostIndices),
    takeLatest(PUT_COST_INDICES, putCostIndices),
    takeLatest(DELETE_COST_INDICES, deleteCostIndices),
  ])
}
