import {
  GET_PROJECT_COUNTRY,
  GET_PROJECT_COUNTRY_SUCCESS,
  GET_PROJECT_COUNTRY_ERROR,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  URL,
  POST_CURRENCIES,
  PUT_CURRENCIES,
  DELETE_CURRENCIES,
  POST_CURRENCIES_ERROR,
  GET_COUNTRIESCURRENCIES,
  GET_COUNTRIESCURRENCIES_ERROR,
  GET_COUNTRIESCURRENCIES_SUCCESS,
  POST_CURRENCIES_SUCCESS,
  PUT_CURRENCIES_SUCCESS,
  PUT_CURRENCIES_ERROR,
  DELETE_CURRENCIES_SUCCESS,
  DELETE_CURRENCIES_ERROR,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getProjectCountry() {
  try {
    const res = yield call(GET, URL.COUNTRY)
    let dataDropdown = [{ value: -1, label: 'Please Select Country' }]

    if (res.isSuccess && res.value.length > 0) {
      res.value.forEach((x) => dataDropdown.push({ value: x.countryId, label: x.countryName }))
    }
    yield put({
      type: GET_PROJECT_COUNTRY_SUCCESS,
      data: dataDropdown,
      countries: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_PROJECT_COUNTRY_ERROR,
      error: err.message,
    })
  }
}
export function* getCurrencies() {
  try {
    const res = yield call(GET, URL.COUNTRY)
    let dataDropdown = [{ value: -1, label: 'Please Select Currency' }]
    if (res.isSuccess && res.value.length > 0) {
      res.value.forEach((x) => dataDropdown.push({ value: x.countryId, label: x.currencyAbbr }))
    }
    yield put({
      type: GET_CURRENCIES_SUCCESS,
      data: dataDropdown,
    })
  } catch (err) {
    yield put({
      type: GET_CURRENCIES_ERROR,
      error: err.message,
    })
  }
}

export function* getCountriesCurrencies() {
  try {
    const res = yield call(GET, URL.COUNTRY)

    yield put({
      type: GET_COUNTRIESCURRENCIES_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_COUNTRIESCURRENCIES_ERROR,
      error: err.message,
    })
  }
}

export function* postCurrencies(action) {
  try {
    const res = yield call(POSTWithMessage, URL.COUNTRY, action.payload)

    if (!res.isError) {
      yield put({
        type: POST_CURRENCIES_SUCCESS,
        data: {},
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: POST_CURRENCIES_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: POST_CURRENCIES_ERROR,
      error: err.message,
    })
  }
}
export function* putCurrencies(action) {
  try {
    const res = yield call(
      PUT,
      URL.COUNTRY + '/' + action.payload.countryId,
      action.payload,
    )
    console.log(res);
    if (!res.isError) {
      yield put({
        type: PUT_CURRENCIES_SUCCESS,
        data: res,
      })
      // yield call(getInfraChecklist)
    } else {

      yield put({
        type: PUT_CURRENCIES_ERROR,
        error: res.message
      })
    }
  } catch (err) {
    yield put({
      type: PUT_CURRENCIES_ERROR,
      error: err.message,
    })
  }
}
export function* deleteCurrencies(action) {
  try {
    const res = yield call(DELETE, URL.COUNTRY + '/' + action.payload.id)
    console.log(res);
    if (!res.isError) {
      yield put({
        type: DELETE_CURRENCIES_SUCCESS,
        data: res,
      })
      // yield call(getInfraChecklist)
    }
    else {
      yield put({
        type: DELETE_CURRENCIES_ERROR,
        error: res.message
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_CURRENCIES_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_PROJECT_COUNTRY, getProjectCountry),
    takeLatest(GET_CURRENCIES, getCurrencies),
    takeLatest(POST_CURRENCIES, postCurrencies),
    takeLatest(PUT_CURRENCIES, putCurrencies),
    takeLatest(DELETE_CURRENCIES, deleteCurrencies),
    takeLatest(GET_COUNTRIESCURRENCIES, getCountriesCurrencies)
  ])
}
