import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET_COUNTRIESCURRENCIES, URL } from '../../constants'

import { GET, PUT, POSTWithMessage, DELETE } from '../../services'
// import { createBrowserHistory } from 'history'

export function* handleGetCountriesCurrencies(action) {
  try {
    yield put({
      type: 'SET_ENABLELOADING',
    })

    const response = yield call(GET, URL.COUNTRY)

    if (response.isSuccess && response.value.length > 0) {
      localStorage.setItem('country', JSON.stringify(response.value))
      yield put({
        type: 'SET_COUNTRIESCURRENCIES',
        data: response.value,
      })
    }
    yield put({
      type: 'SET_DISABLELOADING',
    })
  } catch (err) {
    console.log(err)
  }
}

export function* handlePostCountriesCurrencies(action) {
  try {
    yield put({
      type: 'SET_ENABLELOADING',
    })
    const response = yield call(POSTWithMessage, URL.COUNTRY, action.data)

    yield put({
      type: 'SET_MESSAGE',
      message: response,
    })
    yield put({
      type: 'SET_MODALSHOWMESSAGE',
      data: true,
    })
    yield put({
      type: 'SET_DISABLELOADING',
    })
  } catch (err) {
    console.log(err)
  }
}

export function* handleGetCountriesCurrenciesByID(action) {
  try {
    yield put({
      type: 'SET_ENABLELOADING',
    })
    const response = yield call(GET, URL.COUNTRY + '/' + action.CountryId)
    yield put({
      type: 'SET_COUNTRIESCURRENCIESBYID',
      data: response.value,
    })

    yield put({
      type: 'SET_DISABLELOADING',
    })
  } catch (err) {
    console.log(err)
  }
}

export function* handleUpdateCountriesCurrenciesBYID(action) {
  try {
    yield put({
      type: 'SET_ENABLELOADING',
    })
    const response = yield call(PUT, URL.COUNTRY + '/' + action.data.countryId, action.data)
    yield put({
      type: 'SET_MESSAGE',
      message: response,
    })
    yield put({
      type: 'SET_MODALSHOWMESSAGE',
      data: true,
    })

    yield put({
      type: 'SET_DISABLELOADING',
    })
  } catch (err) {
    console.log(err)
  }
}

export function* handleSetModalShowMessage(action) {
  yield put({
    type: 'SET_MODALSHOWMESSAGE',
    data: action.data,
  })
}

export function* handleSetCurrencyAbbr(data) {
  yield put({
    type: 'SET_CURRENCYABBR',
    currencyAbbr: data.currencyAbbr,
  })
}

export function* handleSetCurrencyName(data) {
  yield put({
    type: 'SET_CURRENCYNAME',
    currencyName: data.currencyName,
  })
}

export function* handleSetCountryName(data) {
  yield put({
    type: 'SET_COUNTRYNAME',
    countryName: data.countryName,
  })
}

export function* handletSetEmptyCountriesCurrenciesData() {
  yield put({
    type: 'SET_EMPTYCURRENCTCOUNRIESCURRENCIESDATA',
  })
}

export function* handleDeleteCountriesCurrenciesData(action) {
  try {
    yield put({
      type: 'SET_ENABLELOADING',
    })
    const response = yield call(DELETE, URL.COUNTRY + '/' + action.data)

    yield put({
      type: 'SET_MESSAGE',
      message: response,
    })
    yield put({
      type: 'SET_MODALSHOWMESSAGE',
      data: true,
    })
    yield put({
      type: 'SET_DISABLELOADING',
    })
  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_COUNTRIESCURRENCIES, handleGetCountriesCurrencies),
    takeLatest('ADD_COUNTRIESCURRENCIES', handlePostCountriesCurrencies),
    takeLatest('GET_COUNTRIESCURRENCIESBYID', handleGetCountriesCurrenciesByID),
    takeLatest('SET_CURRENCYABBR', handleSetCurrencyAbbr),
    takeLatest('SET_CURRENCYNAME', handleSetCurrencyName),
    takeLatest('SET_COUNTRYNAME', handleSetCountryName),
    takeLatest('UPDATE_COUNTRIESCURRENCIESBYID', handleUpdateCountriesCurrenciesBYID),
    takeLatest('SET_COUNTRIESMODALSHOWMESSAGE', handleSetModalShowMessage),
    takeLatest('SET_EMPTYCOUNTRIESCURRENCIESDATA', handletSetEmptyCountriesCurrenciesData),
    takeLatest('DELETE_COUNTRIESCURRENCIES', handleDeleteCountriesCurrenciesData),
  ])
}
