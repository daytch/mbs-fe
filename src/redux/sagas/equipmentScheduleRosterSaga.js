import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_EQUIPMENT_ROSTER,
  GET_EQUIPMENT_ROSTER_SUCCESS,
  GET_EQUIPMENT_ROSTER_ERROR,
  POST_EQUIPMENT_ROSTER,
  POST_EQUIPMENT_ROSTER_SUCCESS,
  POST_EQUIPMENT_ROSTER_ERROR,
  URL,
} from '../../constants'

import { GET, POST } from '../../services'

export function* getEquipmentRoster(payload) {
  try {
    const res = yield call(
      GET,
      URL.EQUIPMENTROSTER + '?costcentreId=' + payload.payload.costcentreId,
    )

    yield put({
      type: GET_EQUIPMENT_ROSTER_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_EQUIPMENT_ROSTER_ERROR,
      error: err.message,
    })
  }
}

export function* postEquipmentRoster(action) {
  try {
    const res = yield call(POST, URL.EQUIPMENTROSTER, action.payload)

    if (res) {
      yield put({
        type: POST_EQUIPMENT_ROSTER_SUCCESS,
        data: {},
      })
      // yield call(getEquipmentRoster)
    }
  } catch (err) {
    yield put({
      type: POST_EQUIPMENT_ROSTER_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_EQUIPMENT_ROSTER, getEquipmentRoster),
    takeLatest(POST_EQUIPMENT_ROSTER, postEquipmentRoster),
  ])
}
