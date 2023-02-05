import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_COSTCENTRENAME,
  SET_PERIOD_NAME,
  TEST_FORMULA,
  TEST_FORMULA_FAILURE,
  TEST_FORMULA_SUCCESS,
  SET_ID_CELL,
} from '../../constants'

const INIT_STATE = {
  visible: false,
  costCentreName: '',
  periodName: '',
  result: '',
  error: '',
  message: '',
  loading: false,
  activeCell: '',
}

export const FunctionBuilder = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return { ...state, visible: true }
    }
    case HIDE_MODAL: {
      return { ...state, visible: false }
    }
    case SET_COSTCENTRENAME: {
      return { ...state, costCentreName: action?.payload?.costCentreName }
    }
    case SET_PERIOD_NAME: {
      return { ...state, periodName: action?.payload?.periodName }
    }
    case SET_ID_CELL: {
      return { ...state, activeCell: action?.payload?.id }
    }
    // activeCell getIdCell

    case TEST_FORMULA: {
      return { ...state, loading: true }
    }
    case TEST_FORMULA_SUCCESS: {
      return { ...state, loading: false, result: action.data }
    }
    case TEST_FORMULA_FAILURE: {
      return { ...state, loading: false, error: 'Failed' }
    }

    default:
      return state
  }
}
