import {
  GET_FLEETS,
  GET_FLEETS_SUCCESS,
  GET_FLEETS_ERROR,
  POST_FLEETS,
  POST_FLEETS_SUCCESS,
  POST_FLEETS_ERROR,
  PUT_FLEETS,
  PUT_FLEETS_SUCCESS,
  PUT_FLEETS_ERROR,
  DELETE_FLEETS,
  DELETE_FLEETS_SUCCESS,
  DELETE_FLEETS_ERROR,
  GET_EQUIPMENT_TYPES,
  GET_FLEET_MATERIAL_SERVICE,
  GET_FLEET_MATERIAL_SERVICE_ERROR,
  GET_FLEET_MATERIAL_SERVICE_SUCCESS,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'
import { isEmptyNullOrUndefined } from '../../functions'

export function* getFleets(action) {
  try {
    const res = yield call(
      GET,
      URL.FLEETS + '?projectRepresentationId=' + action.payload.projectRepresentationId,
    )

    yield put({
      type: GET_FLEETS_SUCCESS,
      data: res.value,
    })
    // GET_EQUIPMENT_TYPES
    var data = res.value
    var arrEquipmentTypes = []
    data.forEach((item) => {
      arrEquipmentTypes.push({
        value: item.equipmentTypeName,
        label: item.equipmentTypeName,
      })
    })
    yield put({
      type: GET_EQUIPMENT_TYPES,
      data: arrEquipmentTypes,
    })
  } catch (err) {
    yield put({
      type: GET_FLEETS_ERROR,
      error: err.message,
    })
  }
}
export function* postFleets(action) {
  try {
    if (action?.payload) {
      const res = yield call(POST, URL.FLEETS, action.payload)

      if (res && res.status === 200) {
        yield put({
          type: POST_FLEETS_SUCCESS,
          data: res,
        })
      } else if (res.isSuccess) {
        yield put({
          type: POST_FLEETS_SUCCESS,
          data: res,
        })
      } else if (!res.isSuccess) {
        yield put({
          type: POST_FLEETS_ERROR,
          data: res.error,
        })
      } else {
        yield put({
          type: POST_FLEETS_ERROR,
          error: res.response.data.errors.$[0],
        })
      }
    } else {
      yield put({
        type: POST_FLEETS_ERROR,
        error: 'Something wrong in our system, please contact Administrator!',
      })
    }
  } catch (err) {
    yield put({
      type: POST_FLEETS_ERROR,
      error: err.message,
    })
  }
}
export function* putFleets(action) {
  try {
    if (action?.payload && action.payload?.fleetId) {
      const res = yield call(PUT, URL.FLEETS + '/' + action.payload.fleetId, action.payload)

      if (res && res.status === 200) {
        yield put({
          type: PUT_FLEETS_SUCCESS,
          data: res,
        })
      } else if (res.isSuccess) {
        yield put({
          type: PUT_FLEETS_SUCCESS,
          data: res,
        })
      } else if (!isEmptyNullOrUndefined(res.isSuccess) && res?.isSuccess === false) {
        yield put({
          type: PUT_FLEETS_ERROR,
          data: res.error,
        })
      } else {
        yield put({
          type: PUT_FLEETS_ERROR,
          error: res.response.data.errors.$[0],
        })
      }
    } else {
      yield put({
        type: POST_FLEETS_ERROR,
        error: 'Something wrong in our system, please contact Administrator!',
      })
    }
  } catch (err) {
    yield put({
      type: PUT_FLEETS_ERROR,
      error: err.message,
    })
  }
}
export function* deleteFleets(action) {
  try {
    const res = yield call(DELETE, URL.FLEETS + '/' + action.payload.resourceId, action.payload)

    if (res) {
      yield put({
        type: DELETE_FLEETS_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_FLEETS_ERROR,
      error: err.message,
    })
  }
}
export function* getEquipmentTypes(action) {
  yield put({
    type: GET_EQUIPMENT_TYPES,
    data: action.data,
  })
}
export function* getFleetMaterialService(action) {
  try {
    let url = action?.payload?.projectRepresentationId
      ? URL.FLEETMATERIALSERVICESCHEDULETS +
        '?fleetResourceId=' +
        action.payload.projectRepresentationId
      : URL.FLEETMATERIALSERVICESCHEDULETS
    const res = yield call(GET, url)

    yield put({
      type: GET_FLEET_MATERIAL_SERVICE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_FLEET_MATERIAL_SERVICE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_FLEETS, getFleets),
    takeLatest(POST_FLEETS, postFleets),
    takeLatest(PUT_FLEETS, putFleets),
    takeLatest(DELETE_FLEETS, deleteFleets),
    // takeLatest(GET_EQUIPMENT_TYPES, getEquipmentTypes),
    takeLatest(GET_FLEET_MATERIAL_SERVICE, getFleetMaterialService),
  ])
}
