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
import CostCentreTree from './../../components/TreeView/CostCentreTree' // './CostCentreTree'
import Availability from './Availability'
import Rosters from './Rosters'
import OHFunction from './OHFunction'
import {
  getRoster,
  getEquipmentRoster,
  postEquipmentRoster,
  getEquipmentScheduleOH,
  postEquipmentScheduleOH,
  getEquipmentSchedulePA,
  postEquipmentSchedulePA,
} from 'src/redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { isEmptyNullOrUndefined, merge, returnFlattenObject } from 'src/functions'
import Swal from 'sweetalert2'
import Spinner from '../../components/Spinner'

const ScheduleEquipment = () => {
  const [projectRep] = useState(JSON.parse(localStorage.getItem('projectRepresentation')))
  const [arrPeriodData, setArrPeriodData] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [selectedId, setSelectedId] = useState(1)
  const toaster = useRef()
  const [toast, addToast] = useState(0)
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)

  const setMessageProcess = (isSuccess) => {
    if (!isEmptyNullOrUndefined(isSuccess)) {
      if (isSuccess) {
        addToast(ToastSuccess(msg))
      } else {
        addToast(ToastError(msg))
      }
    }
  }
  const renderTabs = () => {
    return (
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink
              active={activeKey === 1}
              onClick={() => {
                getColumn(1)
                setActiveKey(1)
              }}
            >
              Equipment Rosters
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeKey === 2}
              onClick={() => {
                getColumn(2)
                setActiveKey(2)
              }}
            >
              Equipment OH Functions
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeKey === 3}
              onClick={() => {
                getColumn(3)
                setActiveKey(3)
              }}
            >
              Optional Availability (%)
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="roster-tab" visible={activeKey === 1}>
            {activeKey === 1 && typeof dataEquipmentRosters !== undefined && projectRep?.periods ? (
              <Rosters
                isEdit={isEdit}
                arrPeriodData={arrPeriodData}
                onClickEdit={onClickEdit}
                onClickReset={onClickReset}
                onClickSave={onClickSave}
                dataRosters={dataRosters}
                dataEquipmentRosters={dataEquipmentRosters}
              />
            ) : (
              <CAlert color="warning" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>Please Insert Periods in Project Representation first.</div>
              </CAlert>
            )}
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="oh-tab" visible={activeKey === 2}>
            {activeKey === 2 && typeof dataEquipmentOH !== undefined && projectRep?.periods ? (
              <OHFunction
                isEdit={isEdit}
                arrPeriodData={arrPeriodData}
                onClickEdit={onClickEdit}
                onClickReset={onClickReset}
                onClickSave={onClickSave}
                dataEquipmentOH={dataEquipmentOH}
              />
            ) : (
              <CAlert color="warning" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>Please Insert Periods in Project Representation first.</div>
              </CAlert>
            )}
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="pa-tab" visible={activeKey === 3}>
            {activeKey === 3 && typeof dataEquipmentPA !== undefined && projectRep?.periods ? (
              <Availability
                isEdit={isEdit}
                arrPeriodData={arrPeriodData}
                onClickEdit={onClickEdit}
                onClickReset={onClickReset}
                onClickSave={onClickSave}
                dataEquipmentPA={dataEquipmentPA}
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
    getData[activeKey]()
    getColumn(activeKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, activeKey])

  const getData = {
    1: () => dispatch(getEquipmentRoster({ costcentreId: selectedId })),
    2: () => dispatch(getEquipmentScheduleOH({ costcentreId: selectedId })),
    3: () => dispatch(getEquipmentSchedulePA({ costcentreId: selectedId })),
  }

  useEffect(() => {
    getData[activeKey]()
    getColumn(1)
    dispatch(getRoster(projectRep.projectRepresentationId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getPrefix = {
    1: 'R',
    2: 'O',
    3: 'P',
  }
  const getColumn = (act) => {
    let dataRepresentation = projectRep

    let arrData = [
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

  const getDataRosterHeader = () => {
    let idx = 0
    let dataPeriods = projectRep.periods
    let dataRoster = []
    let isError = false

    while (document.getElementById('indexname' + getPrefix[activeKey] + idx + '')) {
      let ccFleetRosterID = document
        .getElementById('indexname' + getPrefix[activeKey] + idx)
        .getAttribute('data-id')

      let fleetName = document.getElementById('indexname' + getPrefix[activeKey] + idx).value
      let datas = getDataRosterDetail(idx, dataPeriods)
      // console.log('datas: ', datas)
      if (!isEmptyNullOrUndefined(fleetName) && datas.length > 0) {
        dataRoster.push({
          ccFleetRosterID: Number(ccFleetRosterID),
          ccFleetID: Number(selectedId),
          fleetName: fleetName,
          equipmentSchedulePeriodDtos: datas,
        })
      } else if (datas.length > 0 && isEmptyNullOrUndefined(fleetName)) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Equipment field.',
          icon: 'warning',
        })
      }
      idx++
    }
    return { data: dataRoster, isError: isError }
  }
  const getDataRosterDetail = (idx, periods) => {
    let rosterData = []

    for (let index = 0; index < periods.length; index++) {
      let CostIndexId = document.getElementById('indexname' + getPrefix[activeKey] + idx)
        ? document.getElementById('indexname' + getPrefix[activeKey] + idx).getAttribute('data-id')
        : 0
      let id = periods[index].periodName + idx // .replace('P', getPrefix[activeKey]).replace(' ', '_') + idx
      //.replace(/.$/, idx)

      let CostIndexValueId = document.getElementById(id)
        ? document.getElementById(id).getAttribute('data-valueid')
        : 0

      var e = document.getElementById(id)
      var rosterValue = 0
      var rosterText = ''
      if (document.getElementById(id) && !isEmptyNullOrUndefined(e.value)) {
        rosterValue = e.selectedOptions[0].value
        rosterText = e.options[e.selectedIndex].text

        rosterData.push({
          ccFleetRosterPeriodID: CostIndexValueId === 'undefined' ? null : Number(CostIndexValueId),
          periodId: periods[index].periodId,
          ccFleetRosterID: Number(CostIndexId),
          positionN: periods[index].positionN,
          rosterID: Number(rosterValue),
          rosterName: rosterText,
        })
      }
    }

    return rosterData
  }

  const getDataOHHeader = () => {
    let idx = 0
    let dataPeriods = projectRep.periods
    let dataOH = []
    let isError = false
    while (document.getElementById('indexname' + getPrefix[activeKey] + idx + '')) {
      let ccFleetOHID = document
        .getElementById('indexname' + getPrefix[activeKey] + idx)
        .getAttribute('data-id')

      let CostIndexName = document.getElementById('indexname' + getPrefix[activeKey] + idx).value
      let datas = getDataOHDetail(idx, dataPeriods)

      if (!isEmptyNullOrUndefined(CostIndexName)) {
        dataOH.push({
          ccFleetOHID: ccFleetOHID === 'undefined' ? 0 : Number(ccFleetOHID),
          ccFleetID: Number(selectedId),
          fleetName: CostIndexName,
          equipmentSchedulePeriodDtos: datas,
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
  const getDataOHDetail = (idx, periods) => {
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
  const getDataPAHeader = () => {
    let idx = 0
    let dataPeriods = projectRep.periods
    let dataPA = []
    let isError = false
    while (document.getElementById('indexname' + getPrefix[activeKey] + idx + '')) {
      let CostIndexId = document
        .getElementById('indexname' + getPrefix[activeKey] + idx)
        .getAttribute('data-id')
      let CostIndexName = document.getElementById('indexname' + getPrefix[activeKey] + idx).value
      let datas = getDataPADetail(idx, dataPeriods)

      if (!isEmptyNullOrUndefined(CostIndexName)) {
        dataPA.push({
          ccFleetPAID: Number(CostIndexId),
          ccFleetID: Number(selectedId),
          fleetName: CostIndexName,
          equipmentSchedulePAPeriodDtos: datas,
        })
      } else if (dataPA.length > 0 && isEmptyNullOrUndefined(CostIndexName)) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Cost Index Name field.',
          icon: 'warning',
        })
      }
      idx++
    }
    return { data: dataPA, isError: isError }
  }
  const getDataPADetail = (idx, periods) => {
    let dataPA = []

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
        dataPA.push({
          ccFleetPAPeriodID: CostIndexValueId === 'undefined' ? 0 : Number(CostIndexValueId),
          periodId: periods[index].periodId,
          ccFleetPAID: CostIndexId === 'undefined' ? 0 : Number(CostIndexId),
          positionN: periods[index].positionN,
          value: Number(e.value),
        })
      }
    }

    return dataPA
  }
  const populateDataonSubmit = {
    1: () => getDataRosterHeader(),
    2: () => getDataOHHeader(),
    3: () => getDataPAHeader(),
  }
  const onClickSave = () => {
    const { data, isError } = populateDataonSubmit[activeKey]()
    const postData = {
      1: () => dispatch(postEquipmentRoster(data)),
      2: () => dispatch(postEquipmentScheduleOH(data)),
      3: () => dispatch(postEquipmentSchedulePA(data)),
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
  const loading = useSelector((state) => {
    const getLoading = {
      1: state.EquipmentScheduleRoster.loading,
      2: state.EquipmentScheduleOH.loading,
      3: state.EquipmentSchedulePA.loading,
    }
    return getLoading[activeKey]
  })
  const msg = useSelector((state) => {
    const getMsg = {
      1: state.EquipmentScheduleRoster.message,
      2: state.EquipmentScheduleOH.message,
      3: state.EquipmentSchedulePA.message,
    }
    return getMsg[activeKey]
  })
  const err = useSelector((state) => {
    const getErr = {
      1: state.EquipmentScheduleRoster.error,
      2: state.EquipmentScheduleOH.error,
      3: state.EquipmentSchedulePA.error,
    }
    return getErr[activeKey]
  })
  const isSuccess = useSelector((state) => {
    const getStatus = {
      1: state.EquipmentScheduleRoster.isSuccess,
      2: state.EquipmentScheduleOH.isSuccess,
      3: state.EquipmentSchedulePA.isSuccess,
    }
    return getStatus[activeKey]
  })
  const dataEquipmentRosters = useSelector((state) => {
    if (state.EquipmentScheduleRoster.data.length > 0) {
      let transformData = []
      let currentData = state.EquipmentScheduleRoster.data

      for (let index = 0; index < currentData.length; index++) {
        if (currentData[index].equipmentSchedulePeriodDtos.length > 0) {
          let periods = projectRep.periods

          if (periods) {
            let mergedArr = merge(periods, currentData[index].equipmentSchedulePeriodDtos)
            let total = 0
            localStorage.removeItem('totalArrayPerioScheduleRoster')
            mergedArr = mergedArr.map((item) => {
              total++
              return {
                periodId: item.periodId,
                positionN: item.positionN,
                fleetName: currentData[index].fleetName,
                periodName: item.periodName,
                indexnameR: currentData[index].fleetName,
                ccFleetRosterID: item.ccFleetRosterID,
                // ccFleetID: item.ccFleetID,
                rosterID: item.rosterID,
              }
            })
            localStorage.setItem('totalArrayPeriodScheduleOH', total)

            let fixData = returnFlattenObject(mergedArr)

            transformData.push(fixData)
          } else {
            if (projectRep.periods.length > 0) {
              let objData = { indexname: currentData[index].fleetName }
              objData[projectRep.periods[0].periodName] = null
              objData['costIndexId'] = currentData[index].ccFleetOHID
              // objData['periodId'] = 0
              objData['positionN'] = index
              objData['costIndexValueId'] = 0
              transformData.push(objData)
            }
          }
        }

        return transformData
      }
    } else {
      return null
    }
  })
  const dataEquipmentOH = useSelector((state) => {
    if (state.EquipmentScheduleOH?.data?.length > 0) {
      let transformData = []
      let currentData = state.EquipmentScheduleOH.data

      for (let index = 0; index < currentData.length; index++) {
        if (
          currentData[index].equipmentSchedulePeriodDtos.length > 0 ||
          currentData[index].fleetName
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
              currentData[index].equipmentSchedulePeriodDtos.length > 0
                ? currentData[index].equipmentSchedulePeriodDtos
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
                fleetName: currentData[index].fleetName,
                periodName: item.periodName,
                indexnameO: currentData[index].fleetName,
                ccFleetOHID: currentData[index].ccFleetOHID,
                value: item.value,
              }
            })
            localStorage.setItem('totalArrayPeriodScheduleOH', total)

            let fixData = returnFlattenObject(mergedArr)

            transformData.push(fixData)
          } else {
            if (projectRep.periods.length > 0) {
              let objData = { indexname: currentData[index].fleetName }
              objData[projectRep.periods[0].periodName] = null
              objData['costIndexId'] = currentData[index].ccFleetOHID
              // objData['periodId'] = 0
              objData['positionN'] = index
              objData['costIndexValueId'] = 0
              transformData.push(objData)
            }
          }
        }

        return transformData
      }
    } else {
      return null
    }
  })
  const dataEquipmentPA = useSelector((state) => {
    // state.EquipmentSchedulePA.data
    if (state.EquipmentSchedulePA?.data?.length > 0) {
      let transformData = []
      let currentData = state.EquipmentSchedulePA?.data

      for (let index = 0; index < currentData.length; index++) {
        if (
          currentData[index].equipmentSchedulePeriodDtos?.length > 0 ||
          currentData[index].fleetName
        ) {
          let periods = projectRep.periods
          let emptyPeriods = [
            {
              ccFleetPAPeriodID: 0,
              ccFleetPAID: 0,
              value: '',
              periodId: 0,
              positionN: 0,
            },
          ]
          if (periods) {
            let mergedArr = merge(
              periods,
              currentData[index].equipmentSchedulePeriodDtos?.length > 0
                ? currentData[index].equipmentSchedulePeriodDtos
                : emptyPeriods,
            )

            mergedArr.sort((a, b) => a.positionN - b.positionN)
            let total = 0
            localStorage.removeItem('totalArrayPerioSchedulePA')
            mergedArr = mergedArr.map((item) => {
              total++
              return {
                periodId: item.periodId,
                positionN: item.positionN,
                fleetName: currentData[index].fleetName,
                periodName: item.periodName,
                indexnameP: currentData[index].fleetName,
                ccFleetPAID: currentData[index].ccFleetPAID,
                value: item.value,
              }
            })
            localStorage.setItem('totalArrayPeriodScheduleOH', total)

            let fixData = returnFlattenObject(mergedArr)

            transformData.push(fixData)
          } else {
            if (projectRep.periods.length > 0) {
              let objData = { indexname: currentData[index].fleetName }
              objData[projectRep.periods[0].periodName] = null
              objData['costIndexId'] = currentData[index].ccFleetOHID
              // objData['periodId'] = 0
              objData['positionN'] = index
              objData['costIndexValueId'] = 0
              transformData.push(objData)
            }
          }
        }

        return transformData
      }
    } else {
      return null
    }
  })
  const dataRosters = useSelector((state) => {
    if (state.Roster.data?.length > 0) {
      let data = state.Roster.data
      let dropdown = [{ id: '', name: 'Please Select' }]
      data.map((item) => dropdown.push({ id: item.rosterId, name: item.rosterName }))
      return dropdown
    } else {
      return null
    }
  })
  useEffect(() => {
    setMessageProcess(isSuccess)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, err])

  // console.log('dataRosters : ', dataRosters)
  return (
    <CRow>
      <Spinner loading={loading} />
      <CToaster ref={toaster} push={toast} placement="bottom-end" />
      <CCol xs={4}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cost Centre Structure</strong>
          </CCardHeader>
          <CCardBody>
            <CostCentreTree
              canInput={false}
              setSelectedId={setSelectedId}
              // getData={getData}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={8}>
        <CCard className="mb-4">
          <CCardBody>{renderTabs()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ScheduleEquipment
