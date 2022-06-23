import {
  POST_PROJECT_REPRESENTATION,
  POST_PROJECT_REPRESENTATION_SUCCESS,
  POST_PROJECT_REPRESENTATION_ERROR,
  GET_PROJECT_REPRESENTATION,
  GET_PROJECT_REPRESENTATION_SUCCESS,
  GET_PROJECT_REPRESENTATION_ERROR,
  PUT_PROJECT_REPRESENTATION,
  PUT_PROJECT_REPRESENTATION_SUCCESS,
  PUT_PROJECT_REPRESENTATION_ERROR,
  DELETE_PROJECT_REPRESENTATION,
  DELETE_PROJECT_REPRESENTATION_SUCCESS,
  DELETE_PROJECT_REPRESENTATION_ERROR,
  PUT_PROJECT_REPRESENTATION_CALENDAR,
  PUT_PROJECT_REPRESENTATION_CALENDAR_SUCCESS,
  PUT_PROJECT_REPRESENTATION_CALENDAR_ERROR,
  DELETE_PROJECT_REPRESENTATION_CALENDAR,
  DELETE_PROJECT_REPRESENTATION_CALENDAR_SUCCESS,
  DELETE_PROJECT_REPRESENTATION_CALENDAR_ERROR,
  PUT_PERIOD_EXTEND,
  PUT_PERIOD_EXTEND_SUCCESS,
  PUT_PERIOD_EXTEND_ERROR,
  PUT_PERIOD_EDIT_DATE,
  PUT_PERIOD_EDIT_DATE_SUCCESS,
  PUT_PERIOD_EDIT_DATE_ERROR,
  PUT_PERIOD_SHORTEN,
  PUT_PERIOD_SHORTEN_SUCCESS,
  PUT_PERIOD_SHORTEN_ERROR,
  PUT_PERIOD_CUSTOM,
  PUT_PERIOD_CUSTOM_SUCCESS,
  PUT_PERIOD_CUSTOM_ERROR,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'

export function* postProjectRepresentation(action) {
  try {
    const res = yield call(POST, URL.PROJECT_REPRESENTATION, action.payload)
    if (res) {
      yield put({
        type: POST_PROJECT_REPRESENTATION_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: POST_PROJECT_REPRESENTATION_ERROR,
      error: err.message,
    })
  }
}

export function* putProjectRepresentation(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_REPRESENTATION + '/' + action.payload.projectRepresentationId,
      action.payload,
    )

    if (res.isSuccess) {
      yield put({
        type: PUT_PROJECT_REPRESENTATION_SUCCESS,
        data: res.value,
      })

      let dataRepresentation = JSON.parse(localStorage.getItem('projectRepresentation'))
      if (dataRepresentation.projectRepresentationId === res.value.projectRepresentationId) {
        localStorage.setItem('projectRepresentation', JSON.stringify(res.value))
      }
    } else {
      yield put({
        type: DELETE_PROJECT_REPRESENTATION_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PROJECT_REPRESENTATION_ERROR,
      error: err.message,
    })
  }
}

export function* deleteProjectRepresentation(action) {
  try {
    const res = yield call(DELETE, URL.PROJECT_REPRESENTATION + '/' + action.payload.id)

    if (res) {
      yield put({
        type: DELETE_PROJECT_REPRESENTATION_SUCCESS,
        data: res,
      })
      let dataRepresentation = JSON.parse(localStorage.getItem('projectRepresentation'))
      if (dataRepresentation.projectRepresentationId === action.payload.id) {
        localStorage.removeItem('projectRepresentation')
      }
    }
  } catch (err) {
    yield put({
      type: DELETE_PROJECT_REPRESENTATION_ERROR,
      error: err.message,
    })
  }
}

export function* getProjectRepresentation(action) {
  try {
    let url = URL.PROJECT_REPRESENTATION + '/projectId?projectId=' + action.payload.projectId
    const res = yield call(GET, url)

    if (res.isSuccess && res.value.length > 0) {
      yield put({
        type: GET_PROJECT_REPRESENTATION_SUCCESS,
        data: res.value,
      })
    }
  } catch (err) {
    yield put({
      type: GET_PROJECT_REPRESENTATION_ERROR,
      error: err.message,
    })
  }
}

export function* putProjectRepresentationCalendar(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_REPRESENTATION + '/' + action.payload.projectRepresentationId + '/Period',
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_PROJECT_REPRESENTATION_CALENDAR_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PROJECT_REPRESENTATION_CALENDAR_ERROR,
      error: err.message,
    })
  }
}

export function* deleteProjectRepresentationCalendar(action) {
  try {
    const res = yield call(DELETE, URL.PROJECT_REPRESENTATION + '/' + action.payload.id + '/Period')

    if (res) {
      yield put({
        type: DELETE_PROJECT_REPRESENTATION_CALENDAR_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_PROJECT_REPRESENTATION_CALENDAR_ERROR,
      error: err.message,
    })
  }
}

export function* putPeriodShorten(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_REPRESENTATION +
        '/PeriodShorten/' +
        action.payload.id +
        '/' +
        action.payload.shortStartPeriod +
        '/' +
        action.payload.shortEndPeriod,
    )

    if (res && (res.isSuccess || !res.isError)) {
      yield put({
        type: PUT_PERIOD_SHORTEN_SUCCESS,
        data: res,
      })
    } else {
      console.log('error', res)
      yield put({
        type: PUT_PERIOD_SHORTEN_ERROR,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PERIOD_SHORTEN_ERROR,
      error: err.error,
    })
  }
}

export function* putPeriodExtend(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_REPRESENTATION +
        '/PeriodExtend/' +
        action.payload.id +
        '/' +
        action.payload.addStartPeriod +
        '/' +
        action.payload.addEndPeriod,
    )

    if (res) {
      yield put({
        type: PUT_PERIOD_EXTEND_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PERIOD_EXTEND_ERROR,
      error: err.message,
    })
  }
}

export function* putPeriodCustom(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_REPRESENTATION +
        '/PeriodCustom/' +
        action.payload.id +
        '/' +
        action.payload.positionN +
        '/' +
        action.payload.startDate +
        '/' +
        action.payload.endDate,
    )

    if (res) {
      yield put({
        type: PUT_PERIOD_CUSTOM_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PERIOD_CUSTOM_ERROR,
      error: err.message,
    })
  }
}

export function* putPeriodEditDate(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_REPRESENTATION +
        '/EditDate/' +
        action.payload.id +
        '/' +
        action.payload.opsStartDate +
        '/' +
        action.payload.yearStartOn,
    )

    if (res) {
      yield put({
        type: PUT_PERIOD_EDIT_DATE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PERIOD_EDIT_DATE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(POST_PROJECT_REPRESENTATION, postProjectRepresentation),
    takeLatest(GET_PROJECT_REPRESENTATION, getProjectRepresentation),
    takeLatest(PUT_PROJECT_REPRESENTATION, putProjectRepresentation),
    takeLatest(DELETE_PROJECT_REPRESENTATION, deleteProjectRepresentation),
    takeLatest(PUT_PROJECT_REPRESENTATION_CALENDAR, putProjectRepresentationCalendar),
    takeLatest(DELETE_PROJECT_REPRESENTATION_CALENDAR, deleteProjectRepresentationCalendar),
    takeLatest(PUT_PERIOD_EXTEND, putPeriodExtend),
    takeLatest(PUT_PERIOD_EDIT_DATE, putPeriodEditDate),
    takeLatest(PUT_PERIOD_SHORTEN, putPeriodShorten),
    takeLatest(PUT_PERIOD_CUSTOM, putPeriodCustom),
  ])
}
