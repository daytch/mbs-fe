import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  EQUIPMENT_REQUIRED_BY_COST_CENTRE,
  EQUIPMENT_REQUIRED_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_REQUIRED_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_REQUIRED_SUMMARY,
  EQUIPMENT_REQUIRED_SUMMARY_SUCCESS,
  EQUIPMENT_REQUIRED_SUMMARY_FAILURE,
  EQUIPMENT_REPLACEMENT_BY_COST_CENTRE,
  EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_REPLACEMENT_SUMMARY,
  EQUIPMENT_REPLACEMENT_SUMMARY_SUCCESS,
  EQUIPMENT_REPLACEMENT_SUMMARY_FAILURE,
  EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE,
  EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY,
  EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_FAILURE,
  EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_SUCCESS,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_FAILURE,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_SUCCESS,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_FAILURE,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_SUCCESS,
  EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE,
  EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_TOTAL_DISPOSAL_SUMMARY,
  EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_SUCCESS,
  EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_FAILURE,
  EQUIPMENT_FLEET_BY_COST_CENTRE,
  EQUIPMENT_FLEET_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_FLEET_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_FLEET_SUMMARY,
  EQUIPMENT_FLEET_SUMMARY_SUCCESS,
  EQUIPMENT_FLEET_SUMMARY_FAILURE,
  EQUIPMENT_UTILISATION_BY_COST_CENTRE,
  EQUIPMENT_UTILISATION_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_UTILISATION_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_UTILISATION_SUMMARY,
  EQUIPMENT_UTILISATION_SUMMARY_SUCCESS,
  EQUIPMENT_UTILISATION_SUMMARY_FAILURE,
  MATERIALS_SERVICES_BY_COST_CENTRE,
  MATERIALS_SERVICES_BY_COST_CENTRE_FAILURE,
  MATERIALS_SERVICES_BY_COST_CENTRE_SUCCESS,
  MATERIALS_BY_COST_CENTRE,
  MATERIALS_BY_COST_CENTRE_FAILURE,
  MATERIALS_BY_COST_CENTRE_SUCCESS,
  SERVICES_BY_COST_CENTRE,
  SERVICES_BY_COST_CENTRE_FAILURE,
  SERVICES_BY_COST_CENTRE_SUCCESS,
  MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_FAILURE,
  MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_SUCCESS,
  MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_FAILURE,
  MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS,
  MATERIALS_SERVICES_SUMMARY,
  MATERIALS_SERVICES_SUMMARY_SUCCESS,
  MATERIALS_SERVICES_SUMMARY_FAILURE,
  EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE,
  EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_SUCCESS,
  EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_FAILURE,
  EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE,
  EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_SUCCESS,
  EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_FAILURE,
  EMPLOYEE_EXCLUDING_RELIEF_SUMMARY,
  EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_SUCCESS,
  EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_FAILURE,
  EMPLOYEE_REQUIRED_RELIEF_SUMMARY,
  EMPLOYEE_REQUIRED_RELIEF_SUMMARY_SUCCESS,
  EMPLOYEE_REQUIRED_RELIEF_SUMMARY_FAILURE,
  EMPLOYEE_TOTAL_BY_COST_CENTRE,
  EMPLOYEE_TOTAL_BY_COST_CENTRE_SUCCESS,
  EMPLOYEE_TOTAL_BY_COST_CENTRE_FAILURE,
  EMPLOYEE_TOTAL_SUMMARY,
  EMPLOYEE_TOTAL_SUMMARY_SUCCESS,
  EMPLOYEE_TOTAL_SUMMARY_FAILURE,
  GENERAL_FUNCTION,
  GENERAL_FUNCTION_SUCCESS,
  GENERAL_FUNCTION_FAILURE,
  URL,
} from '../../constants'
import { GET } from '../../services'

export function* getEquipmentRequiredByCostCentre(payload) {
  try {
    const res = yield call(
      GET,
      URL.PHYSICAL_OUTPUT + '/EquipmentRequiredByCostCentre/' + payload.payload,
    )

    yield put({
      type: EQUIPMENT_REQUIRED_BY_COST_CENTRE_SUCCESS,
      data: res.value.equipmentRequiredByCostCentreDtos,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_REQUIRED_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentRequiredSummary(payload) {
  try {
    const res = yield call(
      GET,
      URL.PHYSICAL_OUTPUT + '/EquipmentRequiredByCostCentreSummary/' + payload.payload,
    )

    yield put({
      type: EQUIPMENT_REQUIRED_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_REQUIRED_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentReplacementByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.REPLACEMENT_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentReplacementSummary(payload) {
  try {
    const res = yield call(GET, URL.REPLACEMENT_SUMMARY + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_REPLACEMENT_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_REPLACEMENT_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentDisposalExpiredByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.DISPOSAL_EXPIRED_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentDisposalExpiredSummary(payload) {
  try {
    const res = yield call(GET, URL.DISPOSAL_EXPIRED_SUMMARY + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentDisposalNotRequiredCostCentre(payload) {
  try {
    const res = yield call(GET, URL.DISPOSAL_NOT_REQUIRED_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentDisposalNotRequiredSummary(payload) {
  try {
    const res = yield call(GET, URL.TOTAL_DISPOSAL_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentTotalDisposalByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.TOTAL_DISPOSAL_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentTotalDisposalSummary(payload) {
  try {
    const res = yield call(GET, URL.TOTAL_DISPOSAL_SUMMARY + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentFleetByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.FLEET_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_FLEET_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_FLEET_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentFleetSummary(payload) {
  try {
    const res = yield call(GET, URL.FLEET_SUMMARY + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_FLEET_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_FLEET_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentUtilisationByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.UTILISATION_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_UTILISATION_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_UTILISATION_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentUtilisationSummary(payload) {
  try {
    const res = yield call(GET, URL.UTILISATION_SUMMARY + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_UTILISATION_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_UTILISATION_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getMaterialsServicesByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.MATERIALS_SERVICES_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: MATERIALS_SERVICES_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: MATERIALS_SERVICES_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getMaterialsByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.MATERIALS_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: MATERIALS_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: MATERIALS_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getServicesByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.SERVICES_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: SERVICES_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: SERVICES_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getMaterialsServicesConsumedByEquipment(payload) {
  try {
    const res = yield call(GET, URL.MATERIALS_CONSUMED_BY_EQUIPMENT + '/' + payload.payload)

    yield put({
      type: MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_FAILURE,
      error: err.message,
    })
  }
}

export function* getMaterialsServicesNotCunsumedByEquipment(payload) {
  try {
    const res = yield call(GET, URL.MATERIALS_NOT_CONSUMED_BY_EQUIPMENT + '/' + payload.payload)

    yield put({
      type: MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_FAILURE,
      error: err.message,
    })
  }
}

export function* getMaterialsServicesSummary(payload) {
  try {
    const res = yield call(GET, URL.MATERIALS_SERVICES_SUMMARY + '/' + payload.payload)

    yield put({
      type: MATERIALS_SERVICES_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: MATERIALS_SERVICES_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEmployeeExcludingReliefByCostCentre(payload) {
  try {
    const res = yield call(
      GET,
      URL.EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE + '/' + payload.payload,
    )

    yield put({
      type: EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEmployeeRequiredReliefByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEmployeeExcludingReliefSummary(payload) {
  try {
    const res = yield call(GET, URL.EMPLOYEE_EXCLUDING_RELIEF_SUMMARY + '/' + payload.payload)

    yield put({
      type: EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEmployeeRequiredReliefSummary(payload) {
  try {
    const res = yield call(GET, URL.EMPLOYEE_REQUIRED_RELIEF_SUMMARY + '/' + payload.payload)

    yield put({
      type: EMPLOYEE_REQUIRED_RELIEF_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EMPLOYEE_REQUIRED_RELIEF_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEmployeeTotalByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.EMP_TOTAL_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EMPLOYEE_TOTAL_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EMPLOYEE_TOTAL_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEmployeeTotalSummary(payload) {
  try {
    const res = yield call(GET, URL.EMP_TOTAL_SUMMARY + '/' + payload.payload)

    yield put({
      type: EMPLOYEE_TOTAL_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EMPLOYEE_TOTAL_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getGeneralFunction(payload) {
  try {
    const res = yield call(GET, URL.GEN_FUNCTION + '/' + payload.payload)

    yield put({
      type: GENERAL_FUNCTION_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GENERAL_FUNCTION_FAILURE,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(EQUIPMENT_REQUIRED_BY_COST_CENTRE, getEquipmentRequiredByCostCentre),
    takeLatest(EQUIPMENT_REQUIRED_SUMMARY, getEquipmentRequiredSummary),
    takeLatest(EQUIPMENT_REPLACEMENT_BY_COST_CENTRE, getEquipmentReplacementByCostCentre),
    takeLatest(EQUIPMENT_REPLACEMENT_SUMMARY, getEquipmentReplacementSummary),
    takeLatest(EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE, getEquipmentDisposalExpiredByCostCentre),
    takeLatest(EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY, getEquipmentDisposalExpiredSummary),
    takeLatest(
      EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE,
      getEquipmentDisposalNotRequiredCostCentre,
    ),
    takeLatest(EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY, getEquipmentDisposalNotRequiredSummary),

    takeLatest(EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE, getEquipmentTotalDisposalByCostCentre),
    takeLatest(EQUIPMENT_TOTAL_DISPOSAL_SUMMARY, getEquipmentTotalDisposalSummary),
    takeLatest(EQUIPMENT_FLEET_BY_COST_CENTRE, getEquipmentFleetByCostCentre),
    takeLatest(EQUIPMENT_FLEET_SUMMARY, getEquipmentFleetSummary),
    takeLatest(EQUIPMENT_UTILISATION_BY_COST_CENTRE, getEquipmentUtilisationByCostCentre),
    takeLatest(EQUIPMENT_UTILISATION_SUMMARY, getEquipmentUtilisationSummary),
    takeLatest(MATERIALS_SERVICES_BY_COST_CENTRE, getMaterialsServicesByCostCentre),
    takeLatest(MATERIALS_BY_COST_CENTRE, getMaterialsByCostCentre),
    takeLatest(SERVICES_BY_COST_CENTRE, getServicesByCostCentre),
    takeLatest(MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT, getMaterialsServicesConsumedByEquipment),
    takeLatest(
      MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT,
      getMaterialsServicesNotCunsumedByEquipment,
    ),

    takeLatest(MATERIALS_SERVICES_SUMMARY, getMaterialsServicesSummary),
    takeLatest(EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE, getEmployeeExcludingReliefByCostCentre),
    takeLatest(EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE, getEmployeeRequiredReliefByCostCentre),
    takeLatest(EMPLOYEE_EXCLUDING_RELIEF_SUMMARY, getEmployeeExcludingReliefSummary),
    takeLatest(EMPLOYEE_REQUIRED_RELIEF_SUMMARY, getEmployeeRequiredReliefSummary),
    takeLatest(EMPLOYEE_TOTAL_BY_COST_CENTRE, getEmployeeTotalByCostCentre),
    takeLatest(EMPLOYEE_TOTAL_SUMMARY, getEmployeeTotalSummary),
    takeLatest(GENERAL_FUNCTION, getGeneralFunction),
  ])
}
