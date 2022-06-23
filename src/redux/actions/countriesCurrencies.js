import { GET_COUNTRIESCURRENCIES } from '../../constants'

// export function fetchCountriesCurrencies(data) {
//   return {
//     type: HANDLE_COUNTRIESCURRENCIES,
//     payload: data,
//   }
// }

export function setEmptyCountriesCurrenciesData() {
  return {
    type: 'SET_EmptyCountriesCurrenciesData',
  }
}

export function getCountriesCurrencies() {
  return {
    type: GET_COUNTRIESCURRENCIES,
  }
}

export function getCountriesCurrenciesByID(CountryID) {
  return {
    type: 'GET_COUNTRIESCURRENCIESBYID',
    CountryId: CountryID,
  }
}

export function enableLoading() {
  return {
    type: 'SET_ENABLELOADING',
  }
}

export function disableLoading() {
  return {
    type: 'SET_DISABLELOADING',
  }
}

export function setCountriesCrrenciesByID(data) {
  return {
    type: 'SET_COUNTRIESCURRENCIESBYID',
    data: data,
  }
}

export function setCountriesCurrencies(data) {
  return {
    type: 'SET_COUNTRIESCURRENCIES',
    data: data,
  }
}

export function addCountriesCurrencies(data) {
  return {
    type: 'ADD_COUNTRIESCURRENCIES',
    data: data,
  }
}
export function setMessageCountriesCurrencies(data) {
  return {
    type: 'SET_MESSAGE',
    data: data,
  }
}

export function updateCountriesCurrenciesByID(data) {
  return {
    type: 'UPDATE_COUNTRIESCURRENCIESBYID',
    data: data,
  }
}

export function setModalShowMessage(data) {
  return {
    type: 'SET_COUNTRIESMODALSHOWMESSAGE',
    data: data,
  }
}
export function setCurrencyAbbr(data) {
  return {
    type: 'SET_CURRENCYABBR',
    countryAbbr: data,
  }
}

export function setCountryName(data) {
  return {
    type: 'SET_COUNTRYNAME',
    countryName: data,
  }
}

export function setCurrencyName(data) {
  return {
    type: 'SET_CURRENCYNAME',
    countryName: data,
  }
}

export function deleteCountriesCurrencies(data) {
  return {
    type: 'DELETE_COUNTRIESCURRENCIES',
    data: data,
  }
}
