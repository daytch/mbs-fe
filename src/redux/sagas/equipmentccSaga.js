import {
  GET_EQUIPMENTCC,
  POST_EQUIPMENTCC,
  PUT_EQUIPMENTCC,
  DELETE_EQUIPMENTCC,
  ERROR_EQUIPMENTCC,
  SUCCESS_EQUIPMENTCC,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getEquipmentcc(action) {
  try {
    const res = yield call(GET, URL.EQUIPMENTCC + `?costCentreId=${action.payload.costCentreId}`)

    const fleets = yield call(
      GET,
      URL.FLEETS + `?projectRepresentationId=${action.payload.projectRepresentationId}`,
    )
    var currentDataOption = ['Please Select']
    if (fleets.value) {
      for (let index = 0; index < fleets.value.length; index++) {
        currentDataOption.push({
          label: fleets.value[index].fleetName,
          value: fleets.value[index].fleetId,
        })
      }
    }
    yield put({
      type: SUCCESS_EQUIPMENTCC,
      data: res.value,
      dataOption: currentDataOption,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTCC,
      error: err.message,
    })
  }
}

export function* postEquipmentcc(action) {
  try {
    const res = yield call(POSTWithMessage, URL.EQUIPMENTCC, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_EQUIPMENTCC,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_EQUIPMENTCC,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTCC,
      error: err.message,
    })
  }
}
export function* putEquipmentcc(action) {
  try {
    console.log('action', action)
    const res = yield call(
      PUT,
      URL.EQUIPMENTCC + '/' + action.payload.costCentreFleetId,
      action.payload,
    )

    if (!res.isError) {
      yield put({
        type: SUCCESS_EQUIPMENTCC,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_EQUIPMENTCC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTCC,
      error: err.message,
    })
  }
}
export function* deleteEquipmentcc(action) {
  try {
    const res = yield call(DELETE, URL.EQUIPMENTCC + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_EQUIPMENTCC,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_EQUIPMENTCC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_EQUIPMENTCC,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_EQUIPMENTCC, getEquipmentcc),
    takeLatest(POST_EQUIPMENTCC, postEquipmentcc),
    takeLatest(PUT_EQUIPMENTCC, putEquipmentcc),
    takeLatest(DELETE_EQUIPMENTCC, deleteEquipmentcc),
  ])
}
