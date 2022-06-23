import {
  PUT_INDEX_ALLOCATION,
  PUT_INDEX_ALLOCATION_SUCCESS,
  PUT_INDEX_ALLOCATION_ERROR,
  GET_PROJECT_REPRESENTATION_DETAIL,
  GET_PROJECT_REPRESENTATION_DETAIL_SUCCESS,
  GET_PROJECT_REPRESENTATION_DETAIL_ERROR,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, PUT } from '../../services'

export function* putIndexAllocation(action) {
  try {
    const res = yield call(PUT, URL.PROJECT_REPRESENTATION + '/IndexAllocation', action.payload)

    if (res) {
      yield put({
        type: PUT_INDEX_ALLOCATION_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_INDEX_ALLOCATION_ERROR,
      error: err.message,
    })
  }
}

export function* getProjectRepresentationDetail(action) {
  try {
    let url = URL.PROJECT_REPRESENTATION + '/' + action.payload
    const res = yield call(GET, url)

    if (res.isSuccess) {
      yield put({
        type: GET_PROJECT_REPRESENTATION_DETAIL_SUCCESS,
        data: res.value,
      })
    }
  } catch (err) {
    yield put({
      type: GET_PROJECT_REPRESENTATION_DETAIL_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(PUT_INDEX_ALLOCATION, putIndexAllocation),
    takeLatest(GET_PROJECT_REPRESENTATION_DETAIL, getProjectRepresentationDetail),
  ])
}
