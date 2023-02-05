/* eslint-disable no-loop-func */
/* eslint-disable no-sequences */
import React, { useEffect, useState, useRef } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
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
import TabelCostIndices from './TabelCostIndices'
import './cost.css'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import {
  getCostIndices,
  getProjectCountry,
  postCostIndices,
  putCostIndices,
  // deleteCostIndices,
} from '../../redux/actions'
import { isEmptyNullOrUndefined } from 'src/functions'
import Swal from 'sweetalert2'

const CostIndicesSchedules = () => {
  const [arrPeriodData, setArrPeriodData] = useState([])
  const toaster = useRef()
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [toast, addToast] = useState(0)
  const [deletedId, setDeletedId] = useState([])
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  // const [costIndices, setCostIndices] = useState([])

  const loading = useSelector((state) => state.FinanceCostIndices.loading)
  const err = useSelector((state) => state.FinanceCostIndices.error)
  const msg = useSelector((state) => state.FinanceCostIndices.message)
  const isDeleted = useSelector((state) => state.FinanceCostIndices.isDeleted)

  const setMessageProcess = () => {
    if (err) {
      addToast(ToastError(err))
    } else if (msg && isDeleted) {
      addToast(ToastSuccessDelete)
    } else if (msg && !isDeleted) {
      addToast(ToastSuccess)
    }
  }

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

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
    dispatch(getProjectCountry())

    let arrData = [
      {
        Header: 'Cost Index Name',
        accessor: 'indexname',
        align: 'center',
      },
    ]
    if (dataRepresentation) {
      if (dataRepresentation) {
        let dataPeriods = dataRepresentation.periods
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
          costIndexValueId: Number(CostIndexValueId),
          periodId: periods[index].periodId,
          costIndexId: Number(CostIndexId),
          positionN: periods[index].positionN,
          costIndexValue: !isEmptyNullOrUndefined(costIndexValue) ? Number(costIndexValue) : null,
        })
      } else {
        // New data
        newData.push({
          periodId: periods[index].periodId,
          positionN: periods[index].positionN,
          costIndexId: Number(CostIndexId),
          costIndexValue: !isEmptyNullOrUndefined(costIndexValue) ? Number(costIndexValue) : null,
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
        if (CostIndexId) {
          // Edit Data
          dataCostIndicesEdit.push({
            costIndexId: Number(CostIndexId),
            projectRepresentationId: dataRepresentation.projectRepresentationId,
            costIndexName: CostIndexName,
            costIndexValues: datas.editData,
          })
        } else {
          dataCostIndicesNew.push({
            costIndexName: CostIndexName,
            projectRepresentationId: dataRepresentation.projectRepresentationId,
            costIndexValues: datas.newData,
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
      dispatch(postCostIndices(dataCostIndicesNew))
    }
    if (!isError && dataCostIndicesEdit.length > 0) {
      dispatch(putCostIndices(dataCostIndicesEdit))
    }
  }
  const onClickReset = () => {
    window.location.reload()
  }
  const onClickEdit = () => {
    setIsEdit(true)
  }

  useEffect(() => {
    getColumns()
    dispatch(
      getCostIndices({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
    )
    setMessageProcess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, err])

  const merge = (...arrays) => {
    const merged = {}

    arrays.forEach((data) => data.forEach((o) => Object.assign((merged[o.periodId] ??= {}), o)))

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
  const dataPureCostIndices = useSelector((state) => state.FinanceCostIndices.dataCostIndices)
  const dataCostIndices = useSelector((state) => {
    if (state.FinanceCostIndices.dataCostIndices) {
      let trueDataCostIndices = []
      let datCostIndices = state.FinanceCostIndices.dataCostIndices

      for (let index = 0; index < datCostIndices.length; index++) {
        if (datCostIndices[index].costIndexValues.length > 0) {
          let periods = projectRepresentation.periods

          if (periods) {
            var objectPeriod = periods.reduce(
              (obj, item) => ((obj[item.periodName] = item.periodId), obj),
              {},
            )

            let mergedArr = merge(periods, datCostIndices[index].costIndexValues)
            let total = 0
            localStorage.removeItem('totalArrayPeriod')
            mergedArr = mergedArr.map((item) => {
              total++
              return {
                periodId: item.periodId,
                periodName: item.periodName,
                positionN: item.positionN,
                costIndexId: datCostIndices[index].costIndexId, // item.costIndexId,
                costIndexName: datCostIndices[index].costIndexName,
                costIndexValue: item.costIndexValue,
                costIndexValueId: item.costIndexValueId,
              }
            })
            localStorage.setItem('totalArrayPeriod', total)

            let fixData = returnFlattenObject(mergedArr)

            objectPeriod['indexname'] = datCostIndices[index].costIndexName
            objectPeriod['costIndexId'] = datCostIndices[index].costIndexId

            trueDataCostIndices.push(fixData)
          }
        } else {
          if (projectRepresentation.periods.length > 0) {
            let objData = { indexname: datCostIndices[index].costIndexName }
            objData[projectRepresentation.periods[0].periodName] = null
            objData['costIndexId'] = datCostIndices[index].costIndexId
            // objData['periodId'] = 0
            objData['positionN'] = index
            objData['costIndexValueId'] = 0
            trueDataCostIndices.push(objData)
          }
        }
      }

      return trueDataCostIndices
    }
  })
  // console.log('arrPeriodData', arrPeriodData)
  return (
    <CRow>
      <Spinner loading={loading} />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CToaster ref={toaster} push={toast} placement="bottom-end" />

          <CCardHeader>
            <strong>Cost Indices Schedules</strong>
          </CCardHeader>
          <CCardBody>
            {dataCostIndices && projectRepresentation.periods ? (
              <TabelCostIndices
                key={dataCostIndices}
                arrPeriodData={arrPeriodData}
                isEdit={isEdit}
                dataCostIndices={dataCostIndices}
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

export default CostIndicesSchedules
