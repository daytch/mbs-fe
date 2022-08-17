import {
  GET_EQUIPMENTSCHEDULEOH,
  POST_EQUIPMENTSCHEDULEOH,
  ERROR_EQUIPMENTSCHEDULEOH,
  SUCCESS_EQUIPMENTSCHEDULEOH,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, PUT, DELETE, POST } from '../../services'

export function* getEquipmentSchedulePA(action) {
  try {
    const res = yield call(
      GET,
      URL.EQUIPMENTSCHEDULEOH + `?costcentreId=${action.payload.costCentreId}`,
    )
    console.log(action)
    const equipmentCC = yield call(
      GET,
      URL.EQUIPMENTCC + `?costCentreId=${action.payload.costCentreId}`,
    )

    yield put({
      type: SUCCESS_EQUIPMENTSCHEDULEOH,
      data: res.value,
      dataOption: equipmentCC.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTSCHEDULEOH,
      error: err.message,
    })
  }
}

export function* postEquipmentSchedulePA(action) {
  console.log('Post', action.payload)
  try {
    const res = yield call(POST, URL.EQUIPMENTSCHEDULEOH, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_EQUIPMENTSCHEDULEOH,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_EQUIPMENTSCHEDULEOH,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTSCHEDULEOH,
      error: err.message,
    })
  }
}
export function* putEquipmentSchedulePA(action) {
  try {
    console.log('PUT', action.payload)

    const res = yield call(PUT, URL.EQUIPMENTSCHEDULEOH, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_EQUIPMENTSCHEDULEOH,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_EQUIPMENTSCHEDULEOH,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTSCHEDULEOH,
      error: err.message,
    })
  }
}
export function* deleteEquipmentSchedulePA(action) {
  try {
    const res = yield call(DELETE, URL.EQUIPMENTSCHEDULEOH + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_EQUIPMENTSCHEDULEOH,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_EQUIPMENTSCHEDULEOH,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTSCHEDULEOH,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_EQUIPMENTSCHEDULEOH, getEquipmentSchedulePA),
    takeLatest(POST_EQUIPMENTSCHEDULEOH, postEquipmentSchedulePA),
  ])
}
