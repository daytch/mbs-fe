import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_COSTCENTRENAME,
  SET_PERIOD_NAME,
  TEST_FORMULA,
  SET_ID_CELL,
} from '../../constants'

export function showModal() {
  return { type: SHOW_MODAL }
}

export function hideModal() {
  return { type: HIDE_MODAL }
}

export function getCostCentreName(data) {
  return { type: SET_COSTCENTRENAME, payload: data }
}

export function getPeriodName(data) {
  return { type: SET_PERIOD_NAME, payload: data }
}

export function testFormula(data) {
  return { type: TEST_FORMULA, payload: data }
}

export function getIdCell(data) {
  return { type: SET_ID_CELL, payload: data }
}
