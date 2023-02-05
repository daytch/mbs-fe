import {
  GET_INFRASTRUCTURECC,
  POST_INFRASTRUCTURECC,
  PUT_INFRASTRUCTURECC,
  DELETE_INFRASTRUCTURECC,
  ERROR_INFRASTRUCTURECC,
  SUCCESS_INFRASTRUCTURECC,
  GET_INFRASTRUCTURECC_MATERIAL,
  GET_INFRASTRUCTURECC_MATERIAL_ERROR,
  GET_INFRASTRUCTURECC_MATERIAL_SUCCESS,
  POST_INFRASTRUCTURECC_MATERIAL,
  POST_INFRASTRUCTURECC_MATERIAL_ERROR,
  POST_INFRASTRUCTURECC_MATERIAL_SUCCESS,
  GET_INFRASTRUCTURECC_RESOURCE,
  GET_INFRASTRUCTURECC_RESOURCE_ERROR,
  GET_INFRASTRUCTURECC_RESOURCE_SUCCESS,
  POST_INFRASTRUCTURECC_RESOURCE,
  POST_INFRASTRUCTURECC_RESOURCE_ERROR,
  POST_INFRASTRUCTURECC_RESOURCE_SUCCESS,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, POST, PUT, DELETE } from '../../services'

export function* getInfrastructurecc(action) {
  try {
    const res = yield call(
      GET,
      URL.INFRASTRUCTURECC + `?costCentreId=${action.payload.costCentreId}`,
    )
    const resInfra = yield call(
      GET,
      URL.RESOURCES_INFRA + `?projectRepresentationId=${action.payload.projectRepresentationId}`,
    )

    yield put({
      type: SUCCESS_INFRASTRUCTURECC,
      data: res.value,
      infrastructures: resInfra.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}

export function* postInfrastructurecc(action) {
  try {
    const res = yield call(POSTWithMessage, URL.INFRASTRUCTURECC, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_INFRASTRUCTURECC,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_INFRASTRUCTURECC,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}
export function* putInfrastructurecc(action) {
  try {
    console.log('action', action)
    const res = yield call(
      PUT,
      URL.INFRASTRUCTURECC + '/' + action.payload.costCentreInfrastructureId,
      action.payload,
    )

    if (!res.isError) {
      yield put({
        type: SUCCESS_INFRASTRUCTURECC,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_INFRASTRUCTURECC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}
export function* deleteInfrastructurecc(action) {
  try {
    const res = yield call(DELETE, URL.INFRASTRUCTURECC + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_INFRASTRUCTURECC,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_INFRASTRUCTURECC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}

export function* getInfrastructureccResource(action) {
  try {
    const res = yield call(
      GET,
      URL.CC_INFRA_RESOURCE +
        `?costCentreInfrastructureId=${action.payload.costCentreInfrastructureId}`,
    )
    if (res.isSuccess) {
      yield put({
        type: GET_INFRASTRUCTURECC_RESOURCE_SUCCESS,
        data: res.value,
        message: 'Load Success',
      })
    } else {
      yield put({
        type: GET_INFRASTRUCTURECC_RESOURCE_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: GET_INFRASTRUCTURECC_RESOURCE_ERROR,
      error: err.message,
    })
  }
}
export function* postInfrastructureccResource(action) {
  try {
    const res = yield call(POST, URL.CC_INFRA_RESOURCE, action.payload)

    if (res.isSuccess) {
      yield put({
        type: POST_INFRASTRUCTURECC_RESOURCE_SUCCESS,
        message: 'Data has been saved!',
      })
    } else {
      yield put({
        type: POST_INFRASTRUCTURECC_RESOURCE_ERROR,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: POST_INFRASTRUCTURECC_RESOURCE_ERROR,
      error: err.message,
    })
  }
}
export function* getInfrastructureccMaterial(action) {
  try {
    const res = yield call(
      GET,
      URL.CC_INFRA_RESOURCE_MATERIAL +
        `?costCentreInfrastructureId=${action.payload.costCentreInfrastructureId}`,
    )
    if (res.isSuccess) {
      yield put({
        type: GET_INFRASTRUCTURECC_MATERIAL_SUCCESS,
        data: res.value,
        message: 'Load Success',
      })
    } else {
      yield put({
        type: GET_INFRASTRUCTURECC_MATERIAL_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: GET_INFRASTRUCTURECC_MATERIAL_ERROR,
      error: err.message,
    })
  }
}
export function* postInfrastructureccMaterial(action) {
  try {
    const res = yield call(POST, URL.CC_INFRA_RESOURCE, action.payload)

    if (res.isSuccess) {
      yield put({
        type: POST_INFRASTRUCTURECC_MATERIAL_SUCCESS,
        message: 'Data has been saved!',
      })
    } else {
      yield put({
        type: POST_INFRASTRUCTURECC_MATERIAL_ERROR,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: POST_INFRASTRUCTURECC_MATERIAL_ERROR,
      error: err.message,
    })
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(GET_INFRASTRUCTURECC, getInfrastructurecc),
    takeLatest(POST_INFRASTRUCTURECC, postInfrastructurecc),
    takeLatest(PUT_INFRASTRUCTURECC, putInfrastructurecc),
    takeLatest(DELETE_INFRASTRUCTURECC, deleteInfrastructurecc),
    takeLatest(GET_INFRASTRUCTURECC_MATERIAL, getInfrastructureccMaterial),
    takeLatest(POST_INFRASTRUCTURECC_MATERIAL, postInfrastructureccMaterial),
    takeLatest(GET_INFRASTRUCTURECC_RESOURCE, getInfrastructureccResource),
    takeLatest(POST_INFRASTRUCTURECC_RESOURCE, postInfrastructureccResource),
  ])
}
