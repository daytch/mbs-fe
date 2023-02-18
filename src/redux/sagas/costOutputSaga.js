import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
    EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_SUCCESS,
    EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_FAILURE,
    EQUIPMENT_COMMISSIONING_SUMMARY,
    EQUIPMENT_COMMISSIONING_SUMMARY_FAILURE,
    EQUIPMENT_COMMISSIONING_SUMMARY_SUCCESS,
    EQUIPMENT_DISPOSAL_VALUE_SUMMARY,
    EQUIPMENT_DISPOSAL_VALUE_SUMMARY_SUCCESS,
    EQUIPMENT_DISPOSAL_VALUE_SUMMARY_FAILURE,
    EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE,
    EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_FAILURE,
    EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_SUCCESS,

    MATERIALS_SERVICES_COST_BY_COST_CENTRE,
    MATERIALS_SERVICES_COST_BY_COST_CENTRE_SUCCESS,
    MATERIALS_SERVICES_COST_BY_COST_CENTRE_FAILURE,

    MATERIALS_COST_BY_COST_CENTRE,
    MATERIALS_COST_BY_COST_CENTRE_SUCCESS,
    MATERIALS_COST_BY_COST_CENTRE_FAILURE,

    SERVICES_COST_BY_COST_CENTRE,
    SERVICES_COST_BY_COST_CENTRE_SUCCESS,
    SERVICES_COST_BY_COST_CENTRE_FAILURE,

    MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT,
    MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_SUCCESS,
    MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_FAILURE,

    MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT,
    MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS,
    MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_FAILURE,

    MATERIALS_SERVICES_COST_SUMMARY,
    MATERIALS_SERVICES_COST_SUMMARY_SUCCESS,
    MATERIALS_SERVICES_COST_SUMMARY_FAILURE,

    EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE,
    EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_SUCCESS,
    EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_FAILURE,

    EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY,
    EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_SUCCESS,
    EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_FAILURE,

    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_SUCCESS,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_FAILURE,

    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_SUCCESS,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_FAILURE,

    EMPLOYEE_TOTAL_COST_BY_COST_CENTRE,
    EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_SUCCESS,
    EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_FAILURE,

    EMPLOYEE_TOTAL_COST_SUMMARY,
    EMPLOYEE_TOTAL_COST_SUMMARY_SUCCESS,
    EMPLOYEE_TOTAL_COST_SUMMARY_FAILURE,

    INFRASTRUCTURE_COST_BY_COST_CENTRE,
    INFRASTRUCTURE_COST_BY_COST_CENTRE_SUCCESS,
    INFRASTRUCTURE_COST_BY_COST_CENTRE_FAILURE,

    INFRASTRUCTURE_COST_SUMMARY,
    INFRASTRUCTURE_COST_SUMMARY_SUCCESS,
    INFRASTRUCTURE_COST_SUMMARY_FAILURE,

    TOTAL_CAPITAL_COSTS,
    TOTAL_CAPITAL_COSTS_SUCCESS,
    TOTAL_CAPITAL_COSTS_FAILURE,

    TOTAL_OPERATING_COSTS,
    TOTAL_OPERATING_COSTS_SUCCESS,
    TOTAL_OPERATING_COSTS_FAILURE,

    TOTAL_PROJECT_COST,
    TOTAL_PROJECT_COST_SUCCESS,
    TOTAL_PROJECT_COST_FAILURE,
    URL,
} from '../../constants'
import { GET } from '../../services'

export function* getEquipmentCommissioningByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.EQP_COM_BY_COST_CENTRE + '/' + payload.payload)

        yield put({
            type: EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getEquipmentCommissioningSummary(payload) {
    try {
        const res = yield call(GET, URL.EQP_COM_SUMMARY + '/' + payload.payload)

        yield put({
            type: EQUIPMENT_COMMISSIONING_SUMMARY_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EQUIPMENT_COMMISSIONING_SUMMARY_FAILURE,
            error: err.message,
        })
    }
}

export function* getEquipmentDisposalValueByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.EQUIPMENT_DISPOSAL_BY_COST_CENTRE + '/' + payload.payload)

        yield put({
            type: EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getEquipmentDisposalValueSummary(payload) {
    try {
        const res = yield call(GET, URL.EQUIPMENT_DISPOSAL_SUMMARY + '/' + payload.payload)

        yield put({
            type: EQUIPMENT_DISPOSAL_VALUE_SUMMARY_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EQUIPMENT_DISPOSAL_VALUE_SUMMARY_FAILURE,
            error: err.message,
        })
    }
}

export function* getMaterialsServicesCostByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.MATERIALS_SERVICES_COST_BY_COST_CENTRE + '/' + payload.payload)
        yield put({
            type: MATERIALS_SERVICES_COST_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: MATERIALS_SERVICES_COST_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getMaterialsCostByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.MATERIALS_COST_BY_COST_CENTRE + '/' + payload.payload)
        yield put({
            type: MATERIALS_COST_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: MATERIALS_COST_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getServicesCostByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.SERVICES_COST_BY_COST_CENTRE + '/' + payload.payload)
        yield put({
            type: SERVICES_COST_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: SERVICES_COST_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getMaterialsServicesCostConsumedByEquipment(payload) {
    try {
        const res = yield call(GET, URL.MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT + '/' + payload.payload)
        yield put({
            type: MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_FAILURE,
            error: err.message,
        })
    }
}

export function* getMaterialsServicesCostNotConsumedByEquipment(payload) {
    try {
        const res = yield call(GET, URL.MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT + '/' + payload.payload)
        yield put({
            type: MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_FAILURE,
            error: err.message,
        })
    }
}

export function* getMaterialsServicesCostSummary(payload) {
    try {
        const res = yield call(GET, URL.MATERIALS_SERVICES_COST_SUMMARY + '/' + payload.payload)
        yield put({
            type: MATERIALS_SERVICES_COST_SUMMARY_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: MATERIALS_SERVICES_COST_SUMMARY_FAILURE,
            error: err.message,
        })
    }
}

export function* getEmployeeExcludingReliefCostByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE + '/' + payload.payload)
        yield put({
            type: EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getEmployeeExcludingReliefCostSummary(payload) {
    try {
        const res = yield call(GET, URL.EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY + '/' + payload.payload)
        yield put({
            type: EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_FAILURE,
            error: err.message,
        })
    }
}

export function* getEmployeeRequiredForReliefCostByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE + '/' + payload.payload)
        yield put({
            type: EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getEmployeeRequiredForReliefCostSummary(payload) {
    try {
        const res = yield call(GET, URL.EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY + '/' + payload.payload)
        yield put({
            type: EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_FAILURE,
            error: err.message,
        })
    }
}

export function* getEmployeeTotalCostByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.EMPLOYEE_TOTAL_COST_BY_COST_CENTRE + '/' + payload.payload)
        yield put({
            type: EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getEmployeeTotalCostSummary(payload) {
    try {
        const res = yield call(GET, URL.EMPLOYEE_TOTAL_COST_SUMMARY + '/' + payload.payload)
        yield put({
            type: EMPLOYEE_TOTAL_COST_SUMMARY_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: EMPLOYEE_TOTAL_COST_SUMMARY_FAILURE,
            error: err.message,
        })
    }
}

export function* getInfrastructureCostByCostCentre(payload) {
    try {
        const res = yield call(GET, URL.INFRASTRUCTURE_COST_BY_COST_CENTRE + '/' + payload.payload)
        yield put({
            type: INFRASTRUCTURE_COST_BY_COST_CENTRE_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: INFRASTRUCTURE_COST_BY_COST_CENTRE_FAILURE,
            error: err.message,
        })
    }
}

export function* getInfrastructureCostSummary(payload) {
    try {
        const res = yield call(GET, URL.INFRASTRUCTURE_COST_SUMMARY + '/' + payload.payload)
        yield put({
            type: INFRASTRUCTURE_COST_SUMMARY_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: INFRASTRUCTURE_COST_SUMMARY_FAILURE,
            error: err.message,
        })
    }
}

export function* getTotalCapitalCosts(payload) {
    try {
        const res = yield call(GET, URL.TOTAL_CAPITAL_COSTS + '/' + payload.payload)
        yield put({
            type: TOTAL_CAPITAL_COSTS_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: TOTAL_CAPITAL_COSTS_FAILURE,
            error: err.message,
        })
    }
}

export function* getTotalOperatingCosts(payload) {
    try {
        const res = yield call(GET, URL.TOTAL_OPERATING_COSTS + '/' + payload.payload)
        yield put({
            type: TOTAL_OPERATING_COSTS_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: TOTAL_OPERATING_COSTS_FAILURE,
            error: err.message,
        })
    }
}

export function* getTotalProjectCosts(payload) {
    try {
        const res = yield call(GET, URL.TOTAL_PROJECT_COST + '/' + payload.payload)
        yield put({
            type: TOTAL_PROJECT_COST_SUCCESS,
            data: res.value,
        })
    } catch (err) {
        yield put({
            type: TOTAL_PROJECT_COST_FAILURE,
            error: err.message,
        })
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(EQUIPMENT_COMMISSIONING_BY_COST_CENTRE, getEquipmentCommissioningByCostCentre),
        takeLatest(EQUIPMENT_COMMISSIONING_SUMMARY, getEquipmentCommissioningSummary),
        takeLatest(EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE, getEquipmentDisposalValueByCostCentre),
        takeLatest(EQUIPMENT_DISPOSAL_VALUE_SUMMARY, getEquipmentDisposalValueSummary),
        takeLatest(MATERIALS_SERVICES_COST_BY_COST_CENTRE, getMaterialsServicesCostByCostCentre),
        takeLatest(MATERIALS_COST_BY_COST_CENTRE, getMaterialsCostByCostCentre),
        takeLatest(SERVICES_COST_BY_COST_CENTRE, getServicesCostByCostCentre),
        takeLatest(MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT, getMaterialsServicesCostConsumedByEquipment),
        takeLatest(MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT, getMaterialsServicesCostNotConsumedByEquipment),
        takeLatest(MATERIALS_SERVICES_COST_SUMMARY, getMaterialsServicesCostSummary),
        takeLatest(EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE, getEmployeeExcludingReliefCostByCostCentre),
        takeLatest(EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY, getEmployeeExcludingReliefCostSummary),
        takeLatest(EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE, getEmployeeRequiredForReliefCostByCostCentre),
        takeLatest(EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY, getEmployeeRequiredForReliefCostSummary),
        takeLatest(EMPLOYEE_TOTAL_COST_BY_COST_CENTRE, getEmployeeTotalCostByCostCentre),
        takeLatest(EMPLOYEE_TOTAL_COST_SUMMARY, getEmployeeTotalCostSummary),
        takeLatest(INFRASTRUCTURE_COST_BY_COST_CENTRE, getInfrastructureCostByCostCentre),
        takeLatest(INFRASTRUCTURE_COST_SUMMARY, getInfrastructureCostSummary),
        takeLatest(TOTAL_CAPITAL_COSTS, getTotalCapitalCosts),
        takeLatest(TOTAL_OPERATING_COSTS, getTotalOperatingCosts),
        takeLatest(TOTAL_PROJECT_COST, getTotalProjectCosts),
    ])
}
