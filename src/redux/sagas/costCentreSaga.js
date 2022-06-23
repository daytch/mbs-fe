import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_COST_CENTRE,
  GET_COST_CENTRE_SUCCESS,
  GET_COST_CENTRE_ERROR,
  POST_COST_CENTRE,
  POST_COST_CENTRE_SUCCESS,
  POST_COST_CENTRE_ERROR,
  PUT_COST_CENTRE,
  PUT_COST_CENTRE_SUCCESS,
  PUT_COST_CENTRE_ERROR,
  DELETE_COST_CENTRE,
  DELETE_COST_CENTRE_SUCCESS,
  DELETE_COST_CENTRE_ERROR,
  URL,
} from '../../constants'

import { GET, PUT, POSTWithMessage, DELETE } from '../../services'

export function* getCostCentre(payload) {
  try {
    const res = yield call(
      GET,
      URL.COSTCENTRE + '?projectRepresentationId=' + payload.payload.projectRepresentationId,
    )

    yield put({
      type: GET_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_COST_CENTRE_ERROR,
      error: err.message,
    })
  }
}

export function* postCostCentre(action) {
  try {
    const res = yield call(POSTWithMessage, URL.COSTCENTRE, action.payload)

    if (res) {
      yield put({
        type: POST_COST_CENTRE_SUCCESS,
        data: {},
      })
      // yield call(getCostCentre)
    }
  } catch (err) {
    yield put({
      type: POST_COST_CENTRE_ERROR,
      error: err.message,
    })
  }
}

export function* putCostCentre(action) {
  try {
    const res = yield call(
      PUT,
      URL.COSTCENTRE + '/' + action.payload.infrastructureId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_COST_CENTRE_SUCCESS,
        data: res,
      })
      // yield call(getCostCentre)
    }
  } catch (err) {
    yield put({
      type: PUT_COST_CENTRE_ERROR,
      error: err.message,
    })
  }
}

export function* deleteCostCentre(action) {
  try {
    const res = yield call(DELETE, URL.COSTCENTRE + '/' + action.payload)

    if (res) {
      yield put({
        type: DELETE_COST_CENTRE_SUCCESS,
        data: res,
      })
      // yield call(getCostCentre)
    }
  } catch (err) {
    yield put({
      type: DELETE_COST_CENTRE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_COST_CENTRE, getCostCentre),
    takeLatest(POST_COST_CENTRE, postCostCentre),
    takeLatest(PUT_COST_CENTRE, putCostCentre),
    takeLatest(DELETE_COST_CENTRE, deleteCostCentre),
  ])
}
