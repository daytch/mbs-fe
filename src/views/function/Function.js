/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React, { useState, useEffect, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CCol,
  CRow,
  CTabPane,
  CToastBody,
  CToastClose,
  CToast,
  CToaster,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning } from '@coreui/icons'
import CostCentreTree from '../../components/TreeView/CostCentreTree' // './CostCentreTree'
import FunctionGeneral from './FunctionGeneral'
import FunctionPersonnel from './FunctionPersonnel'
import FunctionMaterial from './FunctionMaterial'
import {
  getFuntionGeneral,
  postFuntionGeneral,
  getFuntionPersonnel,
  postFuntionPersonnel,
  getFuntionCostCentre,
  postFuntionCostCentre,
  getInfrastructrecc,
  getMaterialcc,
} from 'src/redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { isEmptyNullOrUndefined, merge, returnFlattenObject } from 'src/functions'
import Swal from 'sweetalert2'
import Spinner from '../../components/Spinner'

const Function = () => {
  const [projectRep] = useState(JSON.parse(localStorage.getItem('projectRepresentation')))
  const [arrPeriodData, setArrPeriodData] = useState([])
  const [activeKey, setActiveKey] = useState(
    Number(localStorage.getItem('activeFunctionTab')) < 1
      ? 3
      : Number(localStorage.getItem('activeFunctionTab')),
  )
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(1)
  const toaster = useRef()
  const [toast, addToast] = useState(0)
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [costCentreType, setCostCentreType] = useState('CostCentre')
  const [costCentreName, setCostCentreName] = useState('')
  const [dropdownLabel, setDropdownLabel] = useState('')

  const GeneralMemo = React.memo(FunctionGeneral)
  const loadDataAfterSubmit = () => {
    getData[activeKey](true)
    getColumn(activeKey)
  }
  const setMessageProcessRoster = () => {
    if (errPersonnel) {
      addToast(ToastError(errPersonnel))
    } else if (msgPersonnel) {
      loadDataAfterSubmit()
      addToast(ToastSuccess(msgPersonnel))
    }
  }
  const setMessageProcessOH = () => {
    if (errMaterial) {
      addToast(ToastError(errMaterial))
    } else if (msgMaterial) {
      loadDataAfterSubmit()
      addToast(ToastSuccess(msgMaterial))
    }
  }
  const setMessageProcessPA = () => {
    if (errGeneral) {
      addToast(ToastError(errGeneral))
    } else if (msgGeneral) {
      loadDataAfterSubmit()
      addToast(ToastSuccess(msgGeneral))
    }
  }
  const renderTabs = () => {
    // console.log('dataFunctionPersonnel :', dataFunctionPersonnel)
    return (
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink
              active={activeKey === 1}
              onClick={() => {
                getColumn(1)
                setActiveKey(1)
                localStorage.setItem('activeFunctionTab', 1)
              }}
            >
              Personnel Functions
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeKey === 2}
              onClick={() => {
                getColumn(2)
                setActiveKey(2)
                localStorage.setItem('activeFunctionTab', 2)
              }}
            >
              Material & Service Functions
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeKey === 3}
              onClick={() => {
                getColumn(3)
                setActiveKey(3)
                localStorage.setItem('activeFunctionTab', 3)
              }}
            >
              General Functions
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="personnel-tab" visible={activeKey === 1}>
            {activeKey === 1 ? (
              <FunctionPersonnel
                dataFunctionPersonnel={dataFunctionPersonnel}
                onClickSave={onClickSave}
                onClickReset={onClickReset}
                onClickEdit={onClickEdit}
                arrPeriodData={arrPeriodData}
                isEdit={isEdit}
                setCostCentreType={setCostCentreType}
                costCentreType={costCentreType}
                costCentreName={costCentreName}
                dataDropdown={
                  costCentreType === 'CostCentre' ? dataMaterialCC : dataInfrastructureCC
                }
                dropdownLabel={dropdownLabel}
                setDropdownLabel={setDropdownLabel}
              />
            ) : (
              <CAlert color="warning" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>Please Insert Periods in Project Representation first.</div>
              </CAlert>
            )}
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="material-tab" visible={activeKey === 2}>
            {activeKey === 2 ? (
              <FunctionMaterial
                key={costCentreName}
                dataFunctionCostCentre={dataFunctionCostCentre}
                onClickSave={onClickSave}
                onClickReset={onClickReset}
                onClickEdit={onClickEdit}
                arrPeriodData={arrPeriodData}
                isEdit={isEdit}
                setCostCentreType={setCostCentreType}
                costCentreType={costCentreType}
                costCentreName={costCentreName}
                dataDropdown={
                  costCentreType === 'CostCentre' ? dataMaterialCC : dataInfrastructureCC
                }
                dropdownLabel={dropdownLabel}
                setDropdownLabel={setDropdownLabel}
              />
            ) : (
              <CAlert color="warning" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>Please Insert Periods in Project Representation first.</div>
              </CAlert>
            )}
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="general-tab" visible={activeKey === 3}>
            {activeKey === 3 ? (
              <GeneralMemo
                dataFunctionGeneral={dataFunctionGeneral}
                onClickSave={onClickSave}
                onClickReset={onClickReset}
                onClickEdit={onClickEdit}
                arrPeriodData={arrPeriodData}
                isEdit={isEdit}
              />
            ) : (
              <CAlert color="warning" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>Please Insert Periods in Project Representation first.</div>
              </CAlert>
            )}
          </CTabPane>
        </CTabContent>
      </>
    )
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
  const ToastSuccess = (msg) => {
    let mssg = msg ? msg : 'Data has been saved!'
    return (
      <CToast className="align-items-center" color="success">
        <div className="d-flex">
          <CToastBody>{mssg}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    )
  }

  useEffect(() => {
    getData[activeKey](false)
    getColumn(activeKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, activeKey])

  const getData = {
    1: (isLoad) => {
      if (isLoad) {
        console.log('getData 1')
        dispatch(getFuntionPersonnel({ costcentreId: selectedId }))
      }
    },
    2: (isLoad) => {
      if (isLoad) {
        console.log('getData 2')
        dispatch(getFuntionCostCentre({ costcentreId: selectedId }))
      }
    },
    3: (isLoad) => {
      if (isLoad) {
        console.log('getData 3')
        dispatch(getFuntionGeneral({ projectRepresentationId: projectRep.projectRepresentationId }))
      }
    },
  }

  const getDataDropdown = () => {
    dispatch(
      getInfrastructrecc({
        costCentreId: selectedId,
        projectRepresentationId: projectRep.projectRepresentationId,
      }),
    )
    dispatch(
      getMaterialcc({
        costCentreId: selectedId,
        projectRepresentationId: projectRep.projectRepresentationId,
      }),
    )
  }

  useEffect(() => {
    getDataDropdown()
  }, [selectedId])

  useEffect(() => {
    getData[activeKey](true)
    getColumn(activeKey)
    // getDataDropdown()
  }, [])
  const getPrefix = {
    1: 'R',
    2: 'O',
    3: 'P',
  }
  const getColumn = (act) => {
    let dataRepresentation = projectRep

    let arrData =
      act === 1
        ? [
            {
              Header: 'Employee Type',
              accessor: 'indexname' + getPrefix[act],
              align: 'center',
            },
            {
              Header: 'Roster',
              accessor: 'roster_' + getPrefix[act],
              align: 'center',
            },
          ]
        : [
            {
              Header: 'Equipment',
              accessor: 'indexname' + getPrefix[act],
              align: 'center',
            },
          ]
    if (dataRepresentation) {
      if (dataRepresentation) {
        let dataPeriods = dataRepresentation.periods.filter(
          (x) => x.periodStart >= dataRepresentation.opsStartD,
        )
        for (var i in dataPeriods) {
          if (dataPeriods.hasOwnProperty(i)) {
            arrData.push({
              Header: dataPeriods[i].periodName,
              accessor: dataPeriods[i].periodName, // .replace('P', getPrefix[activeKey]),
              align: 'center',
            })
          }
        }
      }

      setArrPeriodData(arrData)
    } else {
      return null
    }
  }

  const getDataPersonnelHeader = () => {
    let idx = 0
    let dataPeriods = projectRep.periods
    let dataPersonnelHeader = []
    let isError = false

    while (document.getElementById('indexname' + getPrefix[activeKey] + idx + '')) {
      let ccEmployeeID = document
        .getElementById('indexname' + getPrefix[activeKey] + idx)
        .getAttribute('data-ccemployeeid')
      let prisCCEmployeeID = document
        .getElementById('indexname' + getPrefix[activeKey] + idx)
        .getAttribute('data-prisccemployeeid')

      let employeeTypeName = document.getElementById('indexname' + getPrefix[activeKey] + idx).value
      let roster = document.getElementById('roster_R' + idx).value
      let datas = getDataPersonnelDetail(idx, dataPeriods)
      // console.log('datas: ', datas)
      if (!isEmptyNullOrUndefined(employeeTypeName) && datas.length > 0) {
        dataPersonnelHeader.push({
          prisCCEmployeeID: Number(prisCCEmployeeID),
          ccEmployeeID: Number(ccEmployeeID),
          employeeTypeName: employeeTypeName,
          rosterName: roster,
          costCentreID: Number(selectedId),
          functionPersonelFunctionPeriodDtos: datas,
        })
      } else if (
        datas.length > 0 &&
        (isEmptyNullOrUndefined(employeeTypeName) || isEmptyNullOrUndefined(roster))
      ) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Employee Type field and Roster field.',
          icon: 'warning',
        })
      }
      idx++
    }
    return { data: dataPersonnelHeader, isError: isError }
  }
  const getDataPersonnelDetail = (idx, periods) => {
    let personnelData = []

    for (let index = 0; index < periods.length; index++) {
      let prisCCEmployeeID = document.getElementById('indexname' + getPrefix[activeKey] + idx)
        ? document
            .getElementById('indexname' + getPrefix[activeKey] + idx)
            .getAttribute('data-prisccemployeeid')
        : 0
      let id = periods[index].periodName + idx

      var e = document.getElementById(id)
      if (document.getElementById(id) && !isEmptyNullOrUndefined(e.value)) {
        let period = periods.filter((x) => id.indexOf(x.periodName) > -1)
        let personnelValue = e.value

        personnelData.push({
          prisCCEmployeeID: Number(prisCCEmployeeID),
          prisCCEmployeePeriodID: Number(0),
          periodId: period.length > 0 ? Number(period[0].periodId) : 0,
          positionN: period.length > 0 ? Number(period[0].positionN) : 0,
          value: personnelValue,
        })
      }
    }

    return personnelData
  }

  const getDataMaterialHeader = () => {
    let idx = 0
    let dataPeriods = projectRep.periods
    let dataOH = []
    let isError = false
    while (document.getElementById('indexname' + getPrefix[activeKey] + idx + '')) {
      let ccFleetOHID = document
        .getElementById('indexname' + getPrefix[activeKey] + idx)
        .getAttribute('data-id')

      let CostIndexName = document.getElementById('indexname' + getPrefix[activeKey] + idx).value
      let datas = getDataMaterialDetail(idx, dataPeriods)

      if (!isEmptyNullOrUndefined(CostIndexName)) {
        dataOH.push({
          ccFleetOHID: ccFleetOHID === 'undefined' ? 0 : Number(ccFleetOHID),
          ccFleetID: Number(selectedId),
          generalFunctionName: CostIndexName,
          functionGeneralFunctionPeriodDtos: datas,
        })
      } else if (dataOH.length > 0 && isEmptyNullOrUndefined(CostIndexName)) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Cost Index Name field.',
          icon: 'warning',
        })
      }
      idx++
    }

    return { data: dataOH, isError: isError }
  }
  const getDataMaterialDetail = (idx, periods) => {
    let dataOH = []

    for (let index = 0; index < periods.length; index++) {
      let CostIndexId = document.getElementById('indexname' + getPrefix[activeKey] + idx)
        ? document.getElementById('indexname' + getPrefix[activeKey] + idx).getAttribute('data-id')
        : 0
      // let id = periods[index].periodName
      //   .replace('P', getPrefix[activeKey])
      //   .replace(' ', '_')
      //   .replace(/.$/, idx)
      let id = periods[index].periodName + idx
      let CostIndexValueId = document.getElementById(id)
        ? document.getElementById(id).getAttribute('data-valueid')
        : 0
      var e = document.getElementById(id)

      if (document.getElementById(id) && !isEmptyNullOrUndefined(e.value)) {
        dataOH.push({
          ccFleetOHPeriodID: CostIndexValueId === 'undefined' ? 0 : Number(CostIndexValueId),
          periodId: periods[index].periodId,
          ccFleetOHID: CostIndexId === 'undefined' ? 0 : Number(CostIndexId),
          positionN: periods[index].positionN,
          value: e.value,
        })
      }
    }

    return dataOH
  }

  const getDataGeneralHeader = () => {
    let idx = 0
    let dataPeriods = projectRep.periods
    let dataGeneral = []
    let isError = false
    while (document.getElementById('indexname' + getPrefix[activeKey] + idx + '')) {
      let CostIndexId = document
        .getElementById('indexname' + getPrefix[activeKey] + idx)
        .getAttribute('data-id')
      let CostIndexName = document.getElementById('indexname' + getPrefix[activeKey] + idx).value
      let datas = getDataGeneralDetail(idx, dataPeriods)

      if (!isEmptyNullOrUndefined(CostIndexName)) {
        dataGeneral.push({
          generalFunctionId: Number(CostIndexId),
          generalFunctionName: CostIndexName,
          projectRepresentationID: projectRep.projectRepresentationId,
          functionGeneralFunctionPeriodDtos: datas,
        })
      }
      //  else if (dataGeneral.length > 0 && isEmptyNullOrUndefined(CostIndexName)) {
      //   isError = true
      //   Swal.fire({
      //     title: 'Empty Validation',
      //     text: 'You must enter value in the Cost Index Name field.',
      //     icon: 'warning',
      //   })
      // }
      idx++
    }
    return { data: dataGeneral, isError: isError }
  }
  const getDataGeneralDetail = (idx, periods) => {
    let dataGeneralDetail = []

    for (let index = 0; index < periods.length; index++) {
      let CostIndexId = document.getElementById('indexname' + getPrefix[activeKey] + idx)
        ? document.getElementById('indexname' + getPrefix[activeKey] + idx).getAttribute('data-id')
        : 0
      // let id = periods[index].periodName
      //   .replace('P', getPrefix[activeKey])
      //   .replace(' ', '_')
      //   .replace(/.$/, idx)
      let id = periods[index].periodName + idx
      let CostIndexValueId = document.getElementById(id)
        ? document.getElementById(id).getAttribute('data-valueid')
        : 0
      var e = document.getElementById(id)
      // if (e) {

      // }
      if (document.getElementById(id) && !isEmptyNullOrUndefined(e.value)) {
        dataGeneralDetail.push({
          generalFunctionId: CostIndexId === 'undefined' ? 0 : Number(CostIndexId),
          generalFunctionPeriodID: CostIndexValueId === 'undefined' ? 0 : Number(CostIndexValueId),
          periodId: periods[index].periodId,
          positionN: periods[index].positionN,
          value: e.value,
        })
      }
    }

    return dataGeneralDetail
  }
  const populateDataonSubmit = {
    1: () => getDataPersonnelHeader(),
    2: () => getDataMaterialHeader(),
    3: () => getDataGeneralHeader(),
  }
  const onClickSave = () => {
    const { data, isError } = populateDataonSubmit[activeKey]()
    const postData = {
      1: () => dispatch(postFuntionPersonnel(data)),
      2: () => dispatch(postFuntionCostCentre(data)),
      3: () => dispatch(postFuntionGeneral(data)),
    }

    if (!isError) {
      postData[activeKey]()
    }
  }
  const onClickReset = () => {
    window.location.reload()
  }
  const onClickEdit = () => {
    setIsEdit(true)
  }
  const dataFunctionPersonnel = useSelector((state) => {
    if (state.FunctionPersonnel.data.length > 0) {
      let transformData = []
      let currentData = state.FunctionPersonnel.data

      for (let index = 0; index < currentData?.length; index++) {
        if (
          currentData[index].functionPersonelFunctionPeriodDtos?.length > 0 ||
          currentData[index].employeeTypeName
        ) {
          let periods = projectRep.periods
          let emptyPeriods = [
            {
              employeeTypeName: '',
              rosterName: '',
              prisCCEmployeeID: 0,
              ccEmployeeID: 0,
              periodId: 0,
              positionN: 0,
            },
          ]
          if (periods) {
            let mergedArr = merge(
              periods,
              currentData[index].functionPersonelFunctionPeriodDtos.length < 1
                ? emptyPeriods
                : currentData[index].functionPersonelFunctionPeriodDtos,
            )

            mergedArr.sort((a, b) => a.positionN - b.positionN)
            let total = 0
            localStorage.removeItem('totalArrayPeriodFunctionPersonnel')

            if (currentData[index].functionPersonelFunctionPeriodDtos?.length > 0) {
              let funcPeriod = currentData[index].functionPersonelFunctionPeriodDtos
              let datArr = []
              for (let i = 0; i < funcPeriod.length; i++) {
                datArr = mergedArr
                  .filter((x) => x.periodId === funcPeriod[i].periodId)
                  .map((item) => {
                    // total++
                    return {
                      periodId: item.periodId,
                      positionN: item.positionN,
                      employeeTypeName: currentData[index].employeeTypeName,
                      rosterName: currentData[index].rosterName,
                      periodName: item.periodName,
                      indexnameR: currentData[index].employeeTypeName,
                      prisCCEmployeeID: currentData[index].prisCCEmployeeID,
                      ccEmployeeID: currentData[index].ccEmployeeID,
                    }
                  })
                if (datArr.length < 1) {
                  datArr = mergedArr.map((item) => {
                    // total++
                    return {
                      periodId: item.periodId,
                      positionN: item.positionN,
                      employeeTypeName: currentData[index].employeeTypeName,
                      rosterName: currentData[index].rosterName,
                      periodName: item.periodName,
                      indexnameR: currentData[index].employeeTypeName,
                      prisCCEmployeeID: currentData[index].prisCCEmployeeID,
                      ccEmployeeID: currentData[index].ccEmployeeID,
                    }
                  })
                  mergedArr.push(datArr)
                } else {
                  mergedArr.push(datArr[0])
                }
              }
            } else {
              mergedArr = mergedArr.map((item) => {
                total++
                return {
                  periodId: item.periodId,
                  positionN: item.positionN,
                  employeeTypeName: currentData[index].employeeTypeName,
                  rosterName: currentData[index].rosterName,
                  periodName: item.periodName,
                  indexnameR: currentData[index].employeeTypeName,
                  prisCCEmployeeID: currentData[index].prisCCEmployeeID,
                  ccEmployeeID: currentData[index].ccEmployeeID,
                }
              })
            }
            localStorage.setItem('totalArrayPeriodFunctionPersonnel', total)
            let fixData = returnFlattenObject(mergedArr)
            transformData.push(fixData)
          } else {
            if (projectRep.periods.length > 0) {
              let objData = { indexname: currentData[index].employeeTypeName }
              objData[projectRep.periods[0].periodName] = null
              objData['prisCCEmployeeID'] = currentData[index].prisCCEmployeeID
              objData['employeeTypeName'] = currentData[index].employeeTypeName
              objData['positionN'] = index
              objData['ccEmployeeID'] = currentData[index].ccEmployeeID
              transformData.push(objData)
            }
          }
        }
      }

      // console.log('transformData:', transformData)
      return transformData
    } else {
      return null
    }
  })
  const dataFunctionCostCentre = useSelector((state) => {
    if (state.FunctionCostCentre?.data?.length > 0) {
      let transformData = []
      let currentData = state.FunctionCostCentre.data

      for (let index = 0; index < currentData.length; index++) {
        if (
          currentData[index].functionGeneralFunctionPeriodDtos.length > 0 ||
          currentData[index].generalFunctionName
        ) {
          let periods = projectRep.periods
          let emptyPeriods = [
            {
              ccFleetOHPeriodID: 0,
              ccFleetOHID: 0,
              value: '',
              periodId: 0,
              positionN: 0,
            },
          ]
          if (periods) {
            let mergedArr = merge(
              periods,
              currentData[index].functionGeneralFunctionPeriodDtos.length > 0
                ? currentData[index].functionGeneralFunctionPeriodDtos
                : emptyPeriods,
            )

            mergedArr.sort((a, b) => a.positionN - b.positionN)
            let total = 0
            localStorage.removeItem('totalArrayPerioScheduleOH')
            mergedArr = mergedArr.map((item) => {
              total++
              return {
                periodId: item.periodId,
                positionN: item.positionN,
                generalFunctionName: currentData[index].generalFunctionName,
                periodName: item.periodName,
                indexnameO: currentData[index].generalFunctionName,
                ccFleetOHID: currentData[index].ccFleetOHID,
                value: item.value,
              }
            })
            localStorage.setItem('totalArrayPeriodScheduleOH', total)

            let fixData = returnFlattenObject(mergedArr)

            transformData.push(fixData)
          } else {
            if (projectRep.periods.length > 0) {
              let objData = { indexname: currentData[index].generalFunctionName }
              objData[projectRep.periods[0].periodName] = null
              objData['costIndexId'] = currentData[index].ccFleetOHID
              // objData['periodId'] = 0
              objData['positionN'] = index
              objData['costIndexValueId'] = 0
              transformData.push(objData)
            }
          }
        }
      }
      return transformData
    } else {
      return null
    }
  })
  const dataFunctionGeneral = useSelector((state) => {
    if (state.FunctionGeneral?.data?.length > 0) {
      let transformData = []
      let currentData = state.FunctionGeneral?.data

      for (let index = 0; index < currentData.length; index++) {
        if (
          currentData[index].functionGeneralFunctionPeriodDtos?.length > 0 ||
          currentData[index].generalFunctionName
        ) {
          let periods = projectRep.periods

          let emptyPeriods = [
            {
              generalFunctionPeriodID: 0,
              generalFunctionId: 0,
              value: '',
              periodId: 0,
              positionN: 0,
            },
          ]
          if (periods) {
            let mergedArr = merge(
              periods,
              currentData[index].functionGeneralFunctionPeriodDtos?.length > 0
                ? currentData[index].functionGeneralFunctionPeriodDtos
                : emptyPeriods,
            )

            mergedArr.sort((a, b) => a.positionN - b.positionN)
            let total = 0
            localStorage.removeItem('totalArrayPeriodFunctionGeneral')
            mergedArr = mergedArr.map((item) => {
              total++
              return {
                periodId: item.periodId,
                positionN: item.positionN,
                generalFunctionName: currentData[index].generalFunctionName,
                periodName: item.periodName,
                indexnameP: currentData[index].generalFunctionName,
                generalFunctionId: currentData[index].generalFunctionId,
                value: item.value,
              }
            })
            mergedArr = mergedArr.filter((x) => x.value)

            localStorage.setItem('totalArrayPeriodFunctionGeneral', total)

            let fixData = returnFlattenObject(mergedArr)

            transformData.push(fixData)
          } else {
            if (projectRep.periods.length > 0) {
              let objData = { indexname: currentData[index].generalFunctionName }
              objData[projectRep.periods[0].periodName] = null
              objData['costIndexId'] = currentData[index].ccFleetOHID
              // objData['periodId'] = 0
              objData['positionN'] = index
              objData['costIndexValueId'] = 0
              transformData.push(objData)
            }
          }
        }
      }
      return transformData
    } else {
      return null
    }
  })

  const dataMaterialCC = useSelector((state) => {
    if (state.Materialcc.data && state.Materialcc.data.length > 0) {
      return state.Materialcc.data.map((x) => {
        return { value: x.resourceId, label: x.resourceName }
      })
    }
  })
  const dataInfrastructureCC = useSelector((state) => {
    if (state.Infrastructurecc.data && state.Infrastructurecc.data.length > 0) {
      return state.Infrastructurecc.data.map((x) => {
        return { value: x.infrastructureId, label: x.infraStructureName }
      })
    }
  })

  const loadingPersonnel = useSelector((state) => state.FunctionPersonnel.loading)
  const loadingMaterial = useSelector((state) => state.FunctionCostCentre.loading)
  const loadingGeneral = useSelector((state) => state.FunctionGeneral.loading)

  const msgPersonnel = useSelector((state) => state.FunctionPersonnel.message)
  const msgMaterial = useSelector((state) => state.FunctionCostCentre.message)
  const msgGeneral = useSelector((state) => state.FunctionGeneral.message)

  const errPersonnel = useSelector((state) => state.FunctionPersonnel.error)
  const errMaterial = useSelector((state) => state.FunctionCostCentre.error)
  const errGeneral = useSelector((state) => state.FunctionGeneral.error)

  useEffect(() => {
    setMessageProcessRoster()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgPersonnel, errPersonnel])
  useEffect(() => {
    setMessageProcessOH()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgMaterial, errMaterial])
  useEffect(() => {
    setMessageProcessPA()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgGeneral, errGeneral])

  useEffect(() => {
    // console.log(
    //   `loadingPersonnel: ${loadingPersonnel}, loadingMaterial: ${loadingMaterial}, loadingGeneral: ${loadingGeneral}`,
    // )
    setLoading(!loadingPersonnel && !loadingMaterial && !loadingGeneral ? false : true)
  }, [loadingPersonnel, loadingMaterial, loadingGeneral])

  return (
    <CRow>
      <Spinner loading={loading} />
      <CToaster ref={toaster} push={toast} placement="bottom-end" />
      {activeKey !== 3 ? (
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Cost Centre Structure</strong>
            </CCardHeader>
            <CCardBody>
              <CostCentreTree
                canInput={false}
                setSelectedId={setSelectedId}
                setCostCentreName={setCostCentreName}
                // getData={getData}
              />
            </CCardBody>
          </CCard>
        </CCol>
      ) : null}
      <CCol xs={activeKey !== 3 ? 8 : 12}>
        <CCard className="mb-4">
          <CCardBody>{renderTabs()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Function
