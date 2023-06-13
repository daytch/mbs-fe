import { all, call, put, takeLatest } from 'redux-saga/effects'
import { POST_ANALYSIS_SUCCESS, POST_ANALYSIS_ERROR, URL, POST_ANALYSIS } from '../../constants'

import { POST } from '../../services'

export function* postAnalysis(action) {
  try {
    const res = yield call(POST, URL.POST_ANALYSIS, action.payload)

    if (res.isSuccess) {
      yield put({
        type: POST_ANALYSIS_SUCCESS,
        data: { res },
      })
    }
  } catch (err) {
    yield put({
      type: POST_ANALYSIS_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([takeLatest(POST_ANALYSIS, postAnalysis)])
}
