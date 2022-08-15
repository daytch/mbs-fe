import React, { useEffect, useState, useRef } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CButton,
  CToastBody,
  CToastClose,
  CToast,
  CToaster,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilHistory, cilSave, cilWarning /*cilTrash*/ } from '@coreui/icons'
import TabelCostIndices from './TableScheduleEquipment'
import './cost.css'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
// import {
//   getProjectCountry,
//   getEquipmentScheduleOH,
//   postEquipmentScheduleOH,
// } from '../../redux/actions'
import { isEmptyNullOrUndefined } from 'src/functions'
import Swal from 'sweetalert2'

const OHFunction = () => {
  const [arrPeriodData, setArrPeriodData] = useState([])
  const toaster = useRef()
  // const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [toast, addToast] = useState(0)
  const [deletedId, setDeletedId] = useState([])
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  // const [costIndices, setCostIndices] = useState([])

  const loading = useSelector((state) => state.EquipmentScheduleOH.loading)
  // const err = useSelector((state) => state.FinanceCostIndices.error)
  // const msg = useSelector((state) => state.FinanceCostIndices.message)
  // const isDeleted = useSelector((state) => state.FinanceCostIndices.isDeleted)
  const message = useSelector((state) => state.EquipmentScheduleOH.message)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)
  const isSuccess = useSelector((state) => state.EquipmentScheduleOH.isSuccess)

  const setMessageProcess = (isSuccess) => {
    if (isSuccess) {
      // console.log(isSuccess)
      // console.log(message)
      if (message === '') {
        return
      }
      // setVisible(false)
      addToast(ToastSuccess(message))
    } else {
      addToast(ToastError(message))
    }
  }

  // const ToastSuccessDelete = (
  //   <CToast className="align-items-center" color="success">
  //     <div className="d-flex">
  //       <CToastBody>Data has been deleted!</CToastBody>
  //       <CToastClose className="me-2 m-auto" />
  //     </div>
  //   </CToast>
  // )

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

  const getColumns = () => {
    let dataRepresentation = projectRepresentation
    // dispatch(getProjectCountry())

    let arrData = [
      {
        Header: 'Equipment',
        accessor: 'indexname',
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
              accessor: dataPeriods[i].periodName,
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

  const getCostIndexValue = (idx, periods, existingData) => {
    let arrCostIndices = {}
    let newData = []
    let editData = []

    existingData[0].costIndexValues.forEach((element) => {})
    for (let index = 0; index < periods.length; index++) {
      let CostIndexId = document.getElementById('indexname' + idx)
        ? document.getElementById('indexname' + idx).getAttribute('data-id')
        : 0
      let id = periods[index].periodName.replace(' ', '_') + idx

      let CostIndexValueId = document.getElementById(id)
        ? document.getElementById(id).getAttribute('data-valueid')
        : 0
      let costIndexValue = document.getElementById(id) ? document.getElementById(id).value : ''

      if (CostIndexValueId) {
        // Edit data

        editData.push({
          ccFleetOHPeriodID: CostIndexValueId === 'undefined' ? null : Number(CostIndexValueId),
          periodId: periods[index].periodId,
          ccFleetOHID: Number(CostIndexId),
          positionN: periods[index].positionN,
          value: costIndexValue,
        })
      } else {
        // New data
        newData.push({
          periodId: periods[index].periodId,
          positionN: periods[index].positionN,
          ccFleetOHID: Number(CostIndexId),
          value: costIndexValue,
          ccFleetOHPeriodID: 0,
        })
      }
    }

    arrCostIndices['newData'] = newData
    arrCostIndices['editData'] = editData
    return arrCostIndices
  }
  const onClickSave = () => {
    let idx = 0
    let dataRepresentation = projectRepresentation // JSON.parse(localStorage.getItem('projectRepresentation'))
    let dataCostIndicesNew = [],
      dataCostIndicesEdit = []
    let dataPeriods = dataRepresentation.periods
    let isError = false

    while (document.getElementById('indexname' + idx + '')) {
      let CostIndexId = document.getElementById('indexname' + idx).getAttribute('data-id')
      let CostIndexName = document.getElementById('indexname' + idx).value
      let datas = getCostIndexValue(idx, dataPeriods, dataPureCostIndices)

      let dataPeriodNotEmpty =
        datas.newData.length > 0
          ? datas.newData.filter((x) => !isEmptyNullOrUndefined(x.costIndexValue))
          : datas.editData.filter((x) => !isEmptyNullOrUndefined(x.costIndexValue))

      if (!isEmptyNullOrUndefined(CostIndexName)) {
        // Edit Data
        if (CostIndexId) {
          dataCostIndicesEdit.push({
            ccFleetOHID: Number(CostIndexId),
            ccFleetID: 2,
            fleetName: CostIndexName,
            equipmentSchedulePeriodDtos: datas.editData,
          })
        } else {
          dataCostIndicesNew.push({
            ccFleetOHID: Number(CostIndexId),
            ccFleetID: 2,
            fleetName: CostIndexName,
            equipmentSchedulePeriodDtos: datas.newData,
          })
        }
      } else if (dataPeriodNotEmpty.length > 0 && isEmptyNullOrUndefined(CostIndexName)) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Cost Index Name field.',
          icon: 'warning',
        })
      }
      idx++
    }

    if (!isError && dataCostIndicesNew.length > 0) {
      // dispatch(postEquipmentScheduleOH(dataCostIndicesNew))
    }
    if (!isError && dataCostIndicesEdit.length > 0) {
      // dispatch(putEquipmentScheduleOH(dataCostIndicesEdit))
    }
  }
  // const onClickDelete = () => {
  //   if (deletedId.length > 0) {
  //     dispatch(deleteCostIndices(deletedId))
  //   } else {
  //     Swal.fire({
  //       title: 'Empty Validation',
  //       text: 'You must select at least one Cost Index.',
  //       icon: 'warning',
  //     })
  //   }
  // }
  const onClickReset = () => {
    window.location.reload()
  }
  const onClickEdit = () => {
    setIsEdit(true)
  }

  useEffect(() => {
    getColumns()
    // dispatch(
    //   getEquipmentScheduleOH({
    //     projectRepresentationId: projectRepresentation.projectRepresentationId,
    //     costCentreId: 1,
    //   }),
    // )
    setMessageProcess(isSuccess)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, projectRep])

  const merge = (...arrays) => {
    const merged = {}

    arrays.forEach((data) => data.forEach((o) => Object.assign(merged[o.periodId] ?? {}, o)))

    return Object.values(merged)
  }
  const returnFlattenObject = (arr) => {
    const flatObject = {}
    for (let i = 0; i < arr.length; i++) {
      for (const property in arr[i]) {
        flatObject[`${property}_${i}`] = arr[i][property]
      }
    }
    return flatObject
  }
  // const equipmentScheduleOHData = useSelector((state) => state.EquipmentScheduleOH.data)
  const eqOHScheduleDataTable = useSelector((state) => {
    if (state.EquipmentScheduleOH.data) {
      let transformData = []
      let currentData = state.EquipmentScheduleOH.data

      for (let index = 0; index < currentData.length; index++) {
        if (currentData[index].equipmentSchedulePeriodDtos.length > 0) {
          let periods = projectRepresentation.periods

          if (periods) {
            var objectPeriod = periods.reduce(
              (obj, item) => ((obj[item.periodName] = item.periodId), obj),
              {},
            )

            let mergedArr = merge(periods, currentData[index].equipmentSchedulePeriodDtos)
            let total = 0
            localStorage.removeItem('totalArrayPerioScheduleOH')
            mergedArr = mergedArr.map((item) => {
              total++
              return {
                periodId: item.periodId,
                periodName: item.periodName,
                positionN: item.positionN,
                costIndexId: currentData[index].ccFleetOHID,
                costIndexName: currentData[index].fleetName,
                costIndexValueId: item.ccFleetOHPeriodID,
                costIndexValue: item.value,
              }
            })
            localStorage.setItem('totalArrayPeriodScheduleOH', total)

            let fixData = returnFlattenObject(mergedArr)

            objectPeriod['indexname'] = currentData[index].fleetName
            objectPeriod['costIndexId'] = currentData[index].ccFleetOHID
            transformData.push(fixData)
          } else {
            if (projectRepresentation.periods.length > 0) {
              let objData = { indexname: currentData[index].fleetName }
              objData[projectRepresentation.periods[0].periodName] = null
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
    }
  })

  const dataPureCostIndices = useSelector((state) => state.FinanceCostIndices.dataCostIndices)
  // const dataCostIndices = useSelector((state) => {
  //   if (state.FinanceCostIndices.dataCostIndices) {
  //     let trueDataCostIndices = []
  //     let datCostIndices = state.FinanceCostIndices.dataCostIndices

  //     for (let index = 0; index < datCostIndices.length; index++) {
  //       if (datCostIndices[index].costIndexValues.length > 0) {
  //         let periods = projectRepresentation.periods

  //         if (periods) {
  //           var objectPeriod = periods.reduce(
  //             (obj, item) => ((obj[item.periodName] = item.periodId), obj),
  //             {},
  //           )

  //           let mergedArr = merge(periods, datCostIndices[index].costIndexValues)
  //           let total = 0
  //           localStorage.removeItem('totalArrayPeriod')
  //           mergedArr = mergedArr.map((item) => {
  //             total++
  //             return {
  //               periodId: item.periodId,
  //               periodName: item.periodName,
  //               positionN: item.positionN,
  //               costIndexId: datCostIndices[index].costIndexId, // item.costIndexId,
  //               costIndexName: datCostIndices[index].costIndexName,
  //               costIndexValue: item.costIndexValue,
  //               costIndexValueId: item.costIndexValueId,
  //             }
  //           })
  //           localStorage.setItem('totalArrayPeriod', total)

  //           let fixData = returnFlattenObject(mergedArr)

  //           objectPeriod['indexname'] = datCostIndices[index].costIndexName
  //           objectPeriod['costIndexId'] = datCostIndices[index].costIndexId

  //           trueDataCostIndices.push(fixData)
  //         }
  //       } else {
  //         if (projectRepresentation.periods.length > 0) {
  //           let objData = { indexname: datCostIndices[index].costIndexName }
  //           objData[projectRepresentation.periods[0].periodName] = null
  //           objData['costIndexId'] = datCostIndices[index].costIndexId
  //           // objData['periodId'] = 0
  //           objData['positionN'] = index
  //           objData['costIndexValueId'] = 0
  //           trueDataCostIndices.push(objData)
  //         }
  //       }
  //     }

  //     return trueDataCostIndices
  //   }
  // })
  return (
    <CRow>
      <Spinner loading={loading} />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CToaster ref={toaster} push={toast} placement="bottom-end" />

          <CCardBody>
            {eqOHScheduleDataTable && projectRepresentation.periods ? (
              <TabelCostIndices
                key={eqOHScheduleDataTable}
                arrPeriodData={arrPeriodData}
                isEdit={isEdit}
                dataCostIndices={eqOHScheduleDataTable}
                setDeletedId={setDeletedId}
                deletedId={deletedId}
              />
            ) : (
              <CAlert color="warning" className="d-flex align-items-center">
                <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                <div>Please Insert Periods in Project Representation first.</div>
              </CAlert>
            )}
            <CButton
              size="sm"
              color="info"
              variant="outline"
              onClick={onClickEdit}
              className="mx-1"
            >
              <CIcon icon={cilPencil} />
              <span className="ms-2">Edit</span>
            </CButton>
            <CButton
              size="sm"
              color="primary"
              variant="outline"
              onClick={onClickSave}
              className="mx-1"
            >
              <CIcon icon={cilSave} />
              <span className="ms-2">Save</span>
            </CButton>
            <CButton
              size="sm"
              color="warning"
              variant="outline"
              onClick={onClickReset}
              className="mx-1"
            >
              <CIcon icon={cilHistory} />
              <span className="ms-2">Reset</span>
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OHFunction
