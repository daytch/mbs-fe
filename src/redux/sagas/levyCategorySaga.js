import {
  GET_LEVYCATEGORY,
  POST_LEVYCATEGORY,
  PUT_LEVYCATEGORY,
  DELETE_LEVYCATEGORY,
  ERROR_LEVYCATEGORY,
  SUCCESS_LEVYCATEGORY,
  GET_LEVYCATEGORY_OPTION,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getLevyCategories(action) {
  try {
    const res = yield call(GET, URL.LEVY_CATEGORIES + `?projectrepresentationid=${action.payload}`)

    yield put({
      type: SUCCESS_LEVYCATEGORY,
      data: res.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_LEVYCATEGORY,
      error: err.message,
    })
  }
}

export function* getLevyCategoriesOption(action) {
  try {
    const res = yield call(GET, URL.LEVY_CATEGORIES + `?projectrepresentationid=${action.payload}`)
    console.log('res', res)
    var dataType = ['Please Select Levy Category']
    if (res.value) {
      for (let index = 0; index < res.value.length; index++) {
        dataType.push({
          label: res.value[index].levyCategoryName,
          value: res.value[index].levyCategoryId,
        })
      }
    }

    console.log('dataType', dataType)
    yield put({
      type: SUCCESS_LEVYCATEGORY,
      dataType: dataType,
      message: 'Load Success',
    })
  } catch (err) {
    console.log(err)
    yield put({
      type: ERROR_LEVYCATEGORY,
      error: err.message,
    })
  }
}

export function* postLevyCategory(action) {
  try {
    const res = yield call(POSTWithMessage, URL.LEVY_CATEGORIES, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_LEVYCATEGORY,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_LEVYCATEGORY,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_LEVYCATEGORY,
      error: err.message,
    })
  }
}
export function* putLevyCategory(action) {
  try {
    const res = yield call(
      PUT,
      URL.LEVY_CATEGORIES + '/' + action.payload.levyCategoryId,
      action.payload,
    )

    if (!res.isError) {
      yield put({
        type: SUCCESS_LEVYCATEGORY,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_LEVYCATEGORY,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_LEVYCATEGORY,
      error: err.message,
    })
  }
}
export function* deleteLevyCategory(action) {
  try {
    const res = yield call(DELETE, URL.LEVY_CATEGORIES + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_LEVYCATEGORY,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_LEVYCATEGORY,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_LEVYCATEGORY,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_LEVYCATEGORY, getLevyCategories),
    takeLatest(POST_LEVYCATEGORY, postLevyCategory),
    takeLatest(PUT_LEVYCATEGORY, putLevyCategory),
    takeLatest(DELETE_LEVYCATEGORY, deleteLevyCategory),
    takeLatest(GET_LEVYCATEGORY_OPTION, getLevyCategoriesOption),
  ])
}
