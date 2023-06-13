import { POST_ANALYSIS } from '../../constants'

export function postAnalysis(data) {
  return {
    type: POST_ANALYSIS,
    payload: data,
  }
}
