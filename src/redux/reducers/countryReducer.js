import {
  GET_PROJECT_COUNTRY,
  GET_PROJECT_COUNTRY_SUCCESS,
  GET_PROJECT_COUNTRY_ERROR,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  POST_CURRENCIES,
  POST_CURRENCIES_ERROR,
  GET_COUNTRIESCURRENCIES,
  GET_COUNTRIESCURRENCIES_SUCCESS,
  GET_COUNTRIESCURRENCIES_ERROR,
  POST_CURRENCIES_SUCCESS,
  PUT_CURRENCIES,
  PUT_CURRENCIES_SUCCESS,
  PUT_CURRENCIES_ERROR,
  DELETE_CURRENCIES,
  DELETE_CURRENCIES_SUCCESS,
  DELETE_CURRENCIES_ERROR,
} from '../../constants'

const INIT_STATE = {
  dataCountry: [
    { label: 'Australia', value: '1' },
    { label: 'Indonesia', value: '2' },
    { label: 'Japan', value: '3' },
    { label: 'USA', value: '4' },
  ],
  dataCountries: [
    // {
    //   countryId: 1,
    //   countryName: 'Indonesia',
    //   currencyAbbr: 'IDR',
    //   currencyName: 'Indonesia Rupiah',
    // },
  ],
  dataCurrencies: [
    // { label: 'Australia', value: '1' },
    // { label: 'Indonesia', value: '2' },
    // { label: 'Japan', value: '3' },
    // { label: 'USA', value: '4' },
  ],
  data: [],
  datas: [],
  loading: false,
  error: '',
  onProcessData: true,
  successMessage: '',
}

export const Country = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_COUNTRY: {
      return {
        ...state,
        dataCountry: action.data,
        dataCountries: action.countries,
        successMessage: '',
      }
    }
    case GET_PROJECT_COUNTRY_SUCCESS: {
      return {
        ...state,
        dataCountry: action.data,
        dataCountries: action.countries,
        loading: false,
      }
    }
    case GET_PROJECT_COUNTRY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_CURRENCIES: {
      return {
        ...state,
        dataCurrencies: action.data,
        loading: true,
        successMessage: '',
      }
    }
    case GET_CURRENCIES_SUCCESS: {
      return {
        ...state,
        dataCurrencies: action.data,
        loading: false,
      }
    }
    case GET_CURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case GET_COUNTRIESCURRENCIES: {
      return {
        ...state,
        datas: action.data,
        successMessage: '',
      }
    }
    case GET_COUNTRIESCURRENCIES_SUCCESS: {
      return {
        ...state,
        datas: action.data,
        loading: false,
      }
    }
    case GET_COUNTRIESCURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case POST_CURRENCIES: {
      return {
        ...state,
        data: action.payload,
        onProcessData: true,
        loading: true,
        successMessage: '',
      }
    }
    case POST_CURRENCIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        onProcessData: false,
        error: '',
      }
    }
    case POST_CURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        onProcessData: false,
      }
    }
    case PUT_CURRENCIES: {
      return {
        ...state,
        // data: action.payload,
        onProcessData: true,
        loading: true,
        error: '',
        successMessage: '',
      }
    }
    case PUT_CURRENCIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        onProcessData: false,
      }
    }
    case PUT_CURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        onProcessData: false,
        error: action.error,
      }
    }
    case DELETE_CURRENCIES: {
      return {
        ...state,
        onProcessData: true,
        loading: true,
        error: '',
        successMessage: '',
      }
    }
    case DELETE_CURRENCIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        onProcessData: false,
        successMessage: 'Data has been deleted!',
      }
    }
    case DELETE_CURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        onProcessData: false,
        error: action.error,
      }
    }
    default:
      return state
  }
}
