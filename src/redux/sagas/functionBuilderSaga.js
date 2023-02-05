import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TEST_FORMULA, TEST_FORMULA_FAILURE, TEST_FORMULA_SUCCESS, URL } from '../../constants'

import { GET } from '../../services'

export function* testFormula(payload) {
  try {
    const res = yield call(
      GET,
      URL.FORMULA +
        '?formula=' +
        payload.payload.formula +
        '&projectRepresentationId=' +
        payload.payload.projectRepresentationId,
    )
    yield put({
      type: TEST_FORMULA_SUCCESS,
      data: res,
    })
  } catch (err) {
    yield put({
      type: TEST_FORMULA_FAILURE,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([takeLatest(TEST_FORMULA, testFormula)])
}
