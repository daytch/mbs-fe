/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CCardFooter,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getResourcesInfra,
  getCurrencies,
  getInfraChecklist,
  getLevyCategories,
  getCostIndices,
  putIndexAllocation,
  getProjectRepresentationDetail,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import './Indexcontingency.css'
import Select from 'react-select'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { isObjectEmpty } from 'src/functions'

const Infrastructure = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  const [commissioningCapitalCostIndex, setCommissioningCapitalCostIndex] = useState(
    projectRepresentation.costIndexNInitialCapital
      ? projectRepresentation.costIndexNInitialCapital
      : '',
  )
  const [commissioningCapitalRate, setCommissioningCapitalRate] = useState(
    projectRepresentation.contingencyRateInitialCapital
      ? projectRepresentation.contingencyRateInitialCapital
      : '',
  )
  const [replacementCapitalCostIndex, setReplacementCapitalCostIndex] = useState(
    projectRepresentation.costIndexNSustainingCapital
      ? projectRepresentation.costIndexNSustainingCapital
      : '',
  )
  const [replacementCapitalRate, setReplacementCapitalRate] = useState(
    projectRepresentation.contingencyRateSustainingCapital
      ? projectRepresentation.contingencyRateSustainingCapital
      : '',
  )
  const [operatingCostsCostIndex, setOperatingCostsCostIndex] = useState(
    projectRepresentation.costIndexNOperatingCosts
      ? projectRepresentation.costIndexNOperatingCosts
      : '',
  )
  const [operatingCostsRate, setOperatingCostsRate] = useState(
    projectRepresentation.contingencyRateOperatingCosts
      ? projectRepresentation.contingencyRateOperatingCosts
      : '',
  )
  const [employeeCostsCostIndex, setEmployeeCostsCostIndex] = useState(
    projectRepresentation.costIndexNEmployeeCosts
      ? projectRepresentation.costIndexNEmployeeCosts
      : '',
  )
  const [employeeCostsRate, setEmployeeCostsRate] = useState(
    projectRepresentation.contingencyRateEmployeeCosts
      ? projectRepresentation.contingencyRateEmployeeCosts
      : '',
  )

  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  const loading = useSelector((state) => state.IndexContingency.loading)
  const err = useSelector((state) => state.IndexContingency.error)
  const msg = useSelector((state) => state.IndexContingency.message)
  const isDeleted = useSelector((state) => state.IndexContingency.isDeleted)

  const setMessageProcess = () => {
    if (err) {
      addToast(ToastError(err))
    } else if (msg && isDeleted) {
      addToast(ToastSuccessDelete)
    } else if (msg && !isDeleted) {
      addToast(ToastSuccess)
    }
  }

  useEffect(() => {
    setMessageProcess()
    dispatch(getResourcesInfra(projectRepresentation.projectRepresentationId))
    dispatch(getProjectRepresentationDetail(projectRepresentation.projectRepresentationId))
    dispatch(getCurrencies())
    dispatch(getInfraChecklist())
    dispatch(getLevyCategories(projectRepresentation.projectRepresentationId))
    dispatch(
      getCostIndices({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
    )
    // eslint-disable-next-line
  }, [msg, err])

  const CostIndexs = useSelector((state) => {
    if (state.FinanceCostIndices.dataCostIndices) {
      return state.FinanceCostIndices.dataCostIndices.map((item) => {
        return {
          value: item.costIndexId,
          label: item.costIndexName,
        }
      })
    }
  })
  // eslint-disable-next-line no-unused-vars
  const PRepresentationDetail = useSelector((state) => {
    if (!isObjectEmpty(state.ProjectRepresentation.dataDetail)) {
      localStorage.setItem(
        'projectRepresentation',
        JSON.stringify(state.ProjectRepresentation.dataDetail),
      )
      return state.ProjectRepresentation.dataDetail
    }
  })

  const handleSubmitData = () => {
    let payload = {
      projectRepresentationId: projectRepresentation.projectRepresentationId,
      ProjectRepresentationName: '',
      costIndexNInitialCapital: commissioningCapitalCostIndex
        ? Number(commissioningCapitalCostIndex)
        : null,
      costIndexNSustainingCapital: replacementCapitalCostIndex
        ? Number(replacementCapitalCostIndex)
        : null,
      costIndexNOperatingCosts: operatingCostsCostIndex ? Number(operatingCostsCostIndex) : null,
      costIndexNEmployeeCosts: employeeCostsCostIndex ? Number(employeeCostsCostIndex) : null,
      contingencyRateInitialCapital: commissioningCapitalRate
        ? Number(commissioningCapitalRate)
        : null,
      contingencyRateSustainingCapital: replacementCapitalRate
        ? Number(replacementCapitalRate)
        : null,
      contingencyRateOperatingCosts: operatingCostsRate ? Number(operatingCostsRate) : null,
      contingencyRateEmployeeCosts: employeeCostsRate ? Number(employeeCostsRate) : null,
    }
    dispatch(putIndexAllocation(payload))
  }

  const ToastError = (errorText) => {
    return (
      <CToast className="align-items-center" color="warning">
        <div className="d-flex">
          <CToastBody>{errorText}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    )
  }

  const ToastSuccess = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been saved!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  return (
    <>
      <Spinner loading={loading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>Index & Contingency</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Cost Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cost Index</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Contingency Rate</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Commissioning Capital</CTableDataCell>
                    <CTableDataCell>
                      <Select
                        options={CostIndexs}
                        onChange={(selectedOption, triggeredAction) => {
                          if (triggeredAction.action === 'clear') {
                            // Clear happened
                            setCommissioningCapitalCostIndex('')
                          } else {
                            setCommissioningCapitalCostIndex(selectedOption.value)
                          }
                        }} //{(e) => setCommissioningCapitalCostIndex(e.value)}
                        isClearable={true}
                        value={CostIndexs.filter(
                          (item) => item.value === commissioningCapitalCostIndex,
                        )}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CInputGroup>
                        <CFormInput
                          size="sm"
                          type="number"
                          value={commissioningCapitalRate}
                          placeholder="Contingency Rate"
                          onInput={(e) => {
                            if (Number(e.currentTarget.value) < 0) {
                              e.currentTarget.value = 0
                              setCommissioningCapitalRate(e.currentTarget.value)
                            } else if (Number(e.currentTarget.value) > 100) {
                              e.currentTarget.value = 100
                              setCommissioningCapitalRate(e.currentTarget.value)
                            } else {
                              setCommissioningCapitalRate(e.currentTarget.value)
                            }
                          }}
                          required
                        />
                        <CInputGroupText id="basic-addon2">%</CInputGroupText>
                      </CInputGroup>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Replacement Capital</CTableDataCell>
                    <CTableDataCell>
                      <Select
                        options={CostIndexs}
                        onChange={(selectedOption, triggeredAction) => {
                          if (triggeredAction.action === 'clear') {
                            // Clear happened
                            setReplacementCapitalCostIndex('')
                          } else {
                            setReplacementCapitalCostIndex(selectedOption.value)
                          }
                        }}
                        isClearable={true}
                        value={CostIndexs.filter(
                          (item) => item.value === replacementCapitalCostIndex,
                        )}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CInputGroup>
                        <CFormInput
                          size="sm"
                          value={replacementCapitalRate}
                          placeholder="Contingency Rate"
                          onInput={(e) => {
                            if (Number(e.currentTarget.value) < 0) {
                              e.currentTarget.value = 0
                              setReplacementCapitalRate(e.currentTarget.value)
                            } else if (Number(e.currentTarget.value) > 100) {
                              e.currentTarget.value = 100
                              setReplacementCapitalRate(e.currentTarget.value)
                            } else {
                              setReplacementCapitalRate(e.currentTarget.value)
                            }
                          }} //{(e) => setReplacementCapitalRate(e.currentTarget.value)}
                          required
                        />
                        <CInputGroupText id="basic-addon2">%</CInputGroupText>
                      </CInputGroup>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Operating Costs</CTableDataCell>
                    <CTableDataCell>
                      <Select
                        options={CostIndexs}
                        onChange={(selectedOption, triggeredAction) => {
                          if (triggeredAction.action === 'clear') {
                            // Clear happened
                            setOperatingCostsCostIndex('')
                          } else {
                            setOperatingCostsCostIndex(selectedOption.value)
                          }
                        }} //{(e) => setOperatingCostsCostIndex(e.value)}
                        isClearable={true}
                        value={CostIndexs.filter((item) => item.value === operatingCostsCostIndex)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CInputGroup>
                        <CFormInput
                          size="sm"
                          value={operatingCostsRate}
                          placeholder="Contingency Rate"
                          onInput={(e) => {
                            if (Number(e.currentTarget.value) < 0) {
                              e.currentTarget.value = 0
                              setOperatingCostsRate(e.currentTarget.value)
                            } else if (Number(e.currentTarget.value) > 100) {
                              e.currentTarget.value = 100
                              setOperatingCostsRate(e.currentTarget.value)
                            } else {
                              setOperatingCostsRate(e.currentTarget.value)
                            }
                          }} //{(e) => setOperatingCostsRate(e.currentTarget.value)}
                          required
                        />
                        <CInputGroupText id="basic-addon2">%</CInputGroupText>
                      </CInputGroup>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Employee Costs</CTableDataCell>
                    <CTableDataCell>
                      <Select
                        options={CostIndexs}
                        onChange={(selectedOption, triggeredAction) => {
                          if (triggeredAction.action === 'clear') {
                            // Clear happened
                            setEmployeeCostsCostIndex('')
                          } else {
                            setEmployeeCostsCostIndex(selectedOption.value)
                          }
                        }} //{(e) => setEmployeeCostsCostIndex(e.value)}
                        isClearable={true}
                        value={CostIndexs.filter((item) => item.value === employeeCostsCostIndex)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CInputGroup>
                        <CFormInput
                          size="sm"
                          value={employeeCostsRate}
                          placeholder="Contingency Rate"
                          onInput={(e) => {
                            if (Number(e.currentTarget.value) < 0) {
                              e.currentTarget.value = 0
                              setEmployeeCostsRate(e.currentTarget.value)
                            } else if (Number(e.currentTarget.value) > 100) {
                              e.currentTarget.value = 100
                              setEmployeeCostsRate(e.currentTarget.value)
                            } else {
                              setEmployeeCostsRate(e.currentTarget.value)
                            }
                          }} //{(e) => setEmployeeCostsRate(e.currentTarget.value)}
                          required
                        />
                        <CInputGroupText id="basic-addon2">%</CInputGroupText>
                      </CInputGroup>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>
              <CButton
                size="sm"
                color="primary"
                variant="outline"
                onClick={handleSubmitData}
                className="mx-1"
              >
                <CIcon icon={cilSave} />
                <span className="ms-2">Save</span>
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Infrastructure
