import {
  SET_PROJECT,
  SET_PROJECT_ERROR,
  SET_PROJECT_REPRESENTATION,
  SET_PROJECT_REPRESENTATION_ERROR,
  RESET_PROJECT_REPRESENTATION,
  RESET_PROJECT_REPRESENTATION_ERROR,
} from '../../constants'
import { all, put, takeLatest } from 'redux-saga/effects'

export function* setProject(data) {
  try {
    if (data.payload) {
      localStorage.setItem('project', JSON.stringify(data.payload))
      yield put({ type: SET_PROJECT, data: data.payload })
    }
  } catch (err) {
    yield put({
      type: SET_PROJECT_ERROR,
      error: err.message,
    })
  }
}

export function* setProjectRepresentation(data) {
  try {
    console.log('navigationSaga', data.payload)
    if (data.payload) {
      localStorage.setItem('projectRepresentation', JSON.stringify(data.payload))
      yield put({ type: SET_PROJECT_REPRESENTATION, data: data.payload })
    }
  } catch (err) {
    yield put({
      type: SET_PROJECT_REPRESENTATION_ERROR,
      error: err.message,
    })
  }
}

export function* resetProjectRepresentation(data) {
  try {
    localStorage.removeItem('projectRepresentation')
    yield put({ type: RESET_PROJECT_REPRESENTATION, data: {} })
  } catch (err) {
    yield put({
      type: RESET_PROJECT_REPRESENTATION_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(SET_PROJECT, setProject),
    takeLatest(SET_PROJECT_REPRESENTATION, setProjectRepresentation),
    takeLatest(RESET_PROJECT_REPRESENTATION, resetProjectRepresentation),
  ])
}
