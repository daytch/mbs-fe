import {
  GET_EQUIPMENT_PA,
  GET_EQUIPMENT_PA_ERROR,
  GET_EQUIPMENT_PA_SUCCESS,
  POST_EQUIPMENT_PA,
  POST_EQUIPMENT_PA_ERROR,
  POST_EQUIPMENT_PA_SUCCESS,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST } from '../../services'

export function* getEquipmentSchedulePA(action) {
  try {
    const res = yield call(
      GET,
      URL.EQUIPMENTSCHEDULEPA + `?costcentreId=${action.payload.costcentreId}`,
    )

    yield put({
      type: GET_EQUIPMENT_PA_SUCCESS,
      data: res.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: GET_EQUIPMENT_PA_ERROR,
      error: err.message,
    })
  }
}

export function* postEquipmentSchedulePA(action) {
  try {
    const res = yield call(POST, URL.EQUIPMENTSCHEDULEPA, action.payload)

    if (!res.isError) {
      yield put({
        type: POST_EQUIPMENT_PA_SUCCESS,
        message: 'Data has been saved!',
      })
    } else {
      yield put({
        type: POST_EQUIPMENT_PA_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: POST_EQUIPMENT_PA_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_EQUIPMENT_PA, getEquipmentSchedulePA),
    takeLatest(POST_EQUIPMENT_PA, postEquipmentSchedulePA),
  ])
}
