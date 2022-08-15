import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_GENERAL_EQUIPMENT,
  GET_GENERAL_EQUIPMENT_SUCCESS,
  GET_GENERAL_EQUIPMENT_ERROR,
  POST_GENERAL_EQUIPMENT,
  POST_GENERAL_EQUIPMENT_SUCCESS,
  POST_GENERAL_EQUIPMENT_ERROR,
  PUT_GENERAL_EQUIPMENT,
  PUT_GENERAL_EQUIPMENT_SUCCESS,
  PUT_GENERAL_EQUIPMENT_ERROR,
  DELETE_GENERAL_EQUIPMENT,
  DELETE_GENERAL_EQUIPMENT_SUCCESS,
  DELETE_GENERAL_EQUIPMENT_ERROR,
  GET_GENERAL_EQUIPMENT_TYPE,
  UPDATE_GENERAL_EQUIPMENT_TYPE,
  URL,
} from '../../constants'

import { GET, PUT, POST, DELETE } from '../../services'

export function* getGenericEquipment() {
  try {
    const res = yield call(GET, URL.GENERAL_EQUIPMENT)

    let arrType = []
    let dataInArr = []
    res.value.forEach((item) => {
      if (dataInArr.indexOf(item.equipmentTypeName) === -1) {
        dataInArr.push(item.equipmentTypeName)
        arrType.push({ value: item.equipmentTypeName, label: item.equipmentTypeName })
      }
    })

    yield put({
      type: GET_GENERAL_EQUIPMENT_SUCCESS,
      data: res.value,
      dataType: arrType,
    })
  } catch (err) {
    yield put({
      type: GET_GENERAL_EQUIPMENT_ERROR,
      error: err.message,
    })
  }
}

export function* postGenericEquipment(action) {
  try {
    const res = yield call(POST, URL.GENERAL_EQUIPMENT, action.payload)

    if (res) {
      yield put({
        type: POST_GENERAL_EQUIPMENT_SUCCESS,
        data: res,
      })
      // yield call(getGenericEquipment)
    }
  } catch (err) {
    yield put({
      type: POST_GENERAL_EQUIPMENT_ERROR,
      error: err.message,
    })
  }
}

export function* updateEquipmentType(action) {
  yield put({
    type: UPDATE_GENERAL_EQUIPMENT_TYPE,
    dataType: action.payload,
  })
}

export function* putGenericEquipment(action) {
  try {
    const res = yield call(
      PUT,
      URL.GENERAL_EQUIPMENT + '/' + action.payload.equipmentModelId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_GENERAL_EQUIPMENT_SUCCESS,
        data: res,
      })
      // yield call(getGenericEquipment)
    }
  } catch (err) {
    yield put({
      type: PUT_GENERAL_EQUIPMENT_ERROR,
      error: err.message,
    })
  }
}

export function* deleteGenericEquipment(action) {
  try {
    const res = yield call(DELETE, URL.GENERAL_EQUIPMENT + '/' + action.payload.id)

    if (res) {
      yield put({
        type: DELETE_GENERAL_EQUIPMENT_SUCCESS,
        data: res,
      })
      // yield call(getGenericEquipment)
    }
  } catch (err) {
    yield put({
      type: DELETE_GENERAL_EQUIPMENT_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_GENERAL_EQUIPMENT, getGenericEquipment),
    takeLatest(POST_GENERAL_EQUIPMENT, postGenericEquipment),
    takeLatest(PUT_GENERAL_EQUIPMENT, putGenericEquipment),
    takeLatest(DELETE_GENERAL_EQUIPMENT, deleteGenericEquipment),
    takeLatest(GET_GENERAL_EQUIPMENT_TYPE, updateEquipmentType),
  ])
}
