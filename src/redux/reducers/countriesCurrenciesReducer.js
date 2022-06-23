// import { HANDLE_COUNTRIESCURRENCIES } from '../../constants'

const CountriesCurrenciesState = {
  message: {
    isError: false,
    message: '',
  },
  isLoading: false,
  datas: {},
  data: {},
  currencyAbbr: '',
  countryName: '',
  currencyName: '',
  isShowModalMessage: false,

  // isModalLoading: false
}

const INIT_STATE = {
  ...CountriesCurrenciesState,
  action: '',
}

export const CountriesCurrencies = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_COUNTRIESCURRENCIESBYID': {
      return {
        ...state,
        data: action.data,
      }
    }
    case 'SET_COUNTRIESCURRENCIES': {
      return {
        ...state,
        datas: action.data,
      }
    }
    case 'SET_MESSAGE': {
      return {
        ...state,
        message: action.message,
      }
    }
    case 'SET_ENABLELOADING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'SET_DISABLELOADING': {
      return {
        ...state,
        isLoading: false,
      }
    }
    case 'SET_CURRENCYABBR': {
      return {
        ...state,
        currencyAbbr: action.countryAbbr,
      }
    }
    case 'SET_COUNTRYNAME': {
      return {
        ...state,
        countryName: action.countryName,
      }
    }
    case 'SET_CURRENCYNAME': {
      return {
        ...state,
        currencyName: action.currencyName,
      }
    }
    case 'SET_EMPTYCURRENCTCOUNRIESCURRENCIESDATA': {
      return {
        ...state,
        data: {},
      }
    }
    case 'SET_MODALSHOWMESSAGE': {
      return {
        ...state,
        isShowModalMessage: action.data,
      }
    }

    default:
      return state
  }
}
