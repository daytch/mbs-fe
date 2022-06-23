import {
  GET_INFRASTRUCTURE,
  GET_INFRASTRUCTURE_SUCCESS,
  GET_INFRASTRUCTURE_ERROR,
  POST_INFRASTRUCTURE,
  POST_INFRASTRUCTURE_SUCCESS,
  POST_INFRASTRUCTURE_ERROR,
  PUT_INFRASTRUCTURE,
  PUT_INFRASTRUCTURE_SUCCESS,
  PUT_INFRASTRUCTURE_ERROR,
  DELETE_INFRASTRUCTURE,
  DELETE_INFRASTRUCTURE_SUCCESS,
  DELETE_INFRASTRUCTURE_ERROR,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'

export function* getResourcesInfra(action) {
  try {
    const res = yield call(GET, URL.RESOURCES_INFRA + '?projectRepresentationId=' + action.payload)

    yield put({
      type: GET_INFRASTRUCTURE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_INFRASTRUCTURE_ERROR,
      error: err.message,
    })
  }
}
export function* postResourcesInfra(action) {
  try {
    const res = yield call(POST, URL.RESOURCES_INFRA, action.payload)

    if (res && res.status === 200) {
      yield put({
        type: POST_INFRASTRUCTURE_SUCCESS,
        data: res,
      })
    } else if (res && res.response.status === 400) {
      yield put({
        type: POST_INFRASTRUCTURE_ERROR,
        data: res.response.data.error,
      })
    } else if (res.isSuccess) {
      yield put({
        type: POST_INFRASTRUCTURE_SUCCESS,
        data: res,
      })
    } else if (!res.isSuccess) {
      yield put({
        type: POST_INFRASTRUCTURE_ERROR,
        data: res.error,
      })
    } else {
      yield put({
        type: POST_INFRASTRUCTURE_ERROR,
        error: res.response.data.errors.$[0],
      })
    }
  } catch (err) {
    yield put({
      type: POST_INFRASTRUCTURE_ERROR,
      error: err.message,
    })
  }
}
export function* putResourcesInfra(action) {
  try {
    const res = yield call(
      PUT,
      URL.RESOURCES_INFRA + '/' + action.payload.infraStructureId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_INFRASTRUCTURE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_INFRASTRUCTURE_ERROR,
      error: err.message,
    })
  }
}
export function* deleteResourcesInfra(action) {
  try {
    const res = yield call(DELETE, URL.RESOURCES_INFRA + '/' + action.payload.id)

    if (res) {
      yield put({
        type: DELETE_INFRASTRUCTURE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_INFRASTRUCTURE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_INFRASTRUCTURE, getResourcesInfra),
    takeLatest(POST_INFRASTRUCTURE, postResourcesInfra),
    takeLatest(PUT_INFRASTRUCTURE, putResourcesInfra),
    takeLatest(DELETE_INFRASTRUCTURE, deleteResourcesInfra),
  ])
}
