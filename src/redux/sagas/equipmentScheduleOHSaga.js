import {
  GET_EQUIPMENTSCHEDULE_OH,
  POST_EQUIPMENTSCHEDULE_OH,
  POST_EQUIPMENTSCHEDULE_OH_ERROR,
  POST_EQUIPMENTSCHEDULE_OH_SUCCESS,
  GET_EQUIPMENTSCHEDULE_OH_ERROR,
  GET_EQUIPMENTSCHEDULE_OH_SUCCESS,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST } from '../../services'

export function* getEquipmentScheduleOH(action) {
  try {
    
    const res = yield call(
      GET,
      URL.EQUIPMENTSCHEDULEOH + `?costcentreId=${action.payload.costcentreId}`,
    )
    
    // const equipmentCC = yield call(
    //   GET,
    //   URL.EQUIPMENTCC + `?costCentreId=${action.payload.costcentreId}`,
    // )

    yield put({
      type: GET_EQUIPMENTSCHEDULE_OH_SUCCESS,
      data: res.value,
      // dataOption: equipmentCC.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: GET_EQUIPMENTSCHEDULE_OH_ERROR,
      error: err.message,
    })
  }
}

export function* postEquipmentScheduleOH(action) {
  try {
    const res = yield call(POST, URL.EQUIPMENTSCHEDULEOH, action.payload)

    if (!res.isError) {
      yield put({
        type: POST_EQUIPMENTSCHEDULE_OH_SUCCESS,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: POST_EQUIPMENTSCHEDULE_OH_ERROR,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: GET_EQUIPMENTSCHEDULE_OH_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_EQUIPMENTSCHEDULE_OH, getEquipmentScheduleOH),
    takeLatest(POST_EQUIPMENTSCHEDULE_OH, postEquipmentScheduleOH),
  ])
}
