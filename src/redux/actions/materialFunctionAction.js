import { GET_MATERIAL_FUNCTION_REPORT, GET_MATERIAL_INFRA_REPORT } from '../../constants'

export function getMaterialFunctionReport(data) {
  return {
    type: GET_MATERIAL_FUNCTION_REPORT,
    payload: data,
  }
}

export function getMaterialInfraReport(data) {
  return {
    type: GET_MATERIAL_INFRA_REPORT,
    payload: data,
  }
}
