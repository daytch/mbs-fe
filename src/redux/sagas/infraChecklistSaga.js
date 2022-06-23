import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_INFRA_CHECKLIST,
  GET_INFRA_CHECKLIST_SUCCESS,
  GET_INFRA_CHECKLIST_ERROR,
  POST_INFRA_CHECKLIST,
  POST_INFRA_CHECKLIST_SUCCESS,
  POST_INFRA_CHECKLIST_ERROR,
  PUT_INFRA_CHECKLIST,
  PUT_INFRA_CHECKLIST_SUCCESS,
  PUT_INFRA_CHECKLIST_ERROR,
  DELETE_INFRA_CHECKLIST,
  DELETE_INFRA_CHECKLIST_SUCCESS,
  DELETE_INFRA_CHECKLIST_ERROR,
  URL,
} from '../../constants'

import { GET, PUT, POSTWithMessage, DELETE } from '../../services'

export function* getInfraChecklist() {
  try {
    const res = yield call(GET, URL.INFRA_CHECKLIST)

    yield put({
      type: GET_INFRA_CHECKLIST_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_INFRA_CHECKLIST_ERROR,
      error: err.message,
    })
  }
}

export function* postInfraChecklist(action) {
  try {
    const res = yield call(POSTWithMessage, URL.INFRA_CHECKLIST, action.payload)

    if (res) {
      yield put({
        type: POST_INFRA_CHECKLIST_SUCCESS,
        data: {},
      })
      yield call(getInfraChecklist)
    }
  } catch (err) {
    yield put({
      type: POST_INFRA_CHECKLIST_ERROR,
      error: err.message,
    })
  }
}

export function* putInfraChecklist(action) {
  try {
    const res = yield call(
      PUT,
      URL.INFRA_CHECKLIST + '/' + action.payload.infrastructureId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_INFRA_CHECKLIST_SUCCESS,
        data: res,
      })
      yield call(getInfraChecklist)
    }
  } catch (err) {
    yield put({
      type: PUT_INFRA_CHECKLIST_ERROR,
      error: err.message,
    })
  }
}

export function* deleteInfraChecklist(action) {
  try {
    const res = yield call(DELETE, URL.INFRA_CHECKLIST + '/' + action.payload.id)

    if (res) {
      yield put({
        type: DELETE_INFRA_CHECKLIST_SUCCESS,
        data: res,
      })
      yield call(getInfraChecklist)
    }
  } catch (err) {
    yield put({
      type: DELETE_INFRA_CHECKLIST_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_INFRA_CHECKLIST, getInfraChecklist),
    takeLatest(POST_INFRA_CHECKLIST, postInfraChecklist),
    takeLatest(PUT_INFRA_CHECKLIST, putInfraChecklist),
    takeLatest(DELETE_INFRA_CHECKLIST, deleteInfraChecklist),
  ])
}
