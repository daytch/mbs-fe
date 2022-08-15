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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilHistory, cilSave, cilWarning /*cilTrash*/ } from '@coreui/icons'
import TableProductionFactor from './TableProductionFactor'
import TableProductionSchedule from './TableProductionSchedule'
import './cost.css'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import {
  getProjectCountry,
  getProductionSchedule,
  postProductionSchedule,
  getProductionFactor,
  postProductionFactor,
} from '../../redux/actions'
import { isEmptyNullOrUndefined } from '../../functions/index'
import Swal from 'sweetalert2'

const Production = () => {
  const [arrPeriodData, setArrPeriodData] = useState([])
  const toaster = useRef()
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [toast, addToast] = useState(0)
  const [activeKey, setActiveKey] = useState(1)
  const [loading, setLoading] = useState(true)
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
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

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const getProductionScheduleData = (idx, periods) => {
    let editData = []

    for (let index = 0; index < periods.length; index++) {
      let productScheduleId = document.getElementById('indexname' + idx)
        ? document.getElementById('indexname' + idx).getAttribute('data-id')
        : 0
      let id = periods[index].periodName.replace(' ', '_') + idx

      let productScheduleValueId = document.getElementById(id)
        ? document.getElementById(id).getAttribute('data-valueid')
        : 0
      let productScheduleValue = document.getElementById(id)
        ? document.getElementById(id).value
        : ''

      editData.push({
        productScheduleValueId: Number(productScheduleValueId),
        periodId: periods[index].periodId,
        productScheduleId: Number(productScheduleId),
        positionN: periods[index].positionN,
        productScheduleValue: !isEmptyNullOrUndefined(productScheduleValue)
          ? Number(productScheduleValue)
          : null,
      })
    }

    return editData
  }
  const submitProductionSchedule = () => {
    let idx = 0
    let dataRepresentation = projectRepresentation
    let dataPeriods = dataRepresentation.periods
    let dataProductionNew = []
    let isError = false

    while (document.getElementById('indexname' + idx + '')) {
      let ProductID = document.getElementById('indexname' + idx).getAttribute('data-id')
      let ProductName = document.getElementById('indexname' + idx).value
      let unitz = document.getElementById('units' + idx).value
      let datas = getProductionScheduleData(idx, dataPeriods)
      let dataIsi = datas.filter((x) => !isEmptyNullOrUndefined(x.productScheduleValue))

      if (datas.length < 1) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must at least 1 data.',
          icon: 'warning',
        })
      } else if (!isEmptyNullOrUndefined(ProductName)) {
        dataProductionNew.push({
          productId: ProductID,
          productName: ProductName,
          units: unitz,
          projectRepresentationId: Number(projectRepresentation.projectRepresentationId),
          productScheduleValueDtos: datas,
        })
      } else if (dataIsi.length > 0 && isEmptyNullOrUndefined(ProductName)) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Product Name field.',
          icon: 'warning',
        })
      }
      idx++
    }

    if (!isError && dataProductionNew.length > 0) {
      dispatch(postProductionSchedule(JSON.stringify(dataProductionNew)))
    }
  }

  const getProductionFactorData = (idx, periods) => {
    let editData = []

    for (let index = 0; index < periods.length; index++) {
      let productFactorId = document.getElementById('factor').querySelector('#indexname' + idx)
        ? document
            .getElementById('factor')
            .querySelector('#indexname' + idx)
            .getAttribute('data-id')
        : 0
      let id = '#' + periods[index].periodName.replace(' ', '_') + idx

      let productFactorValueId = document.getElementById('factor').querySelector(id)
        ? document.getElementById('factor').querySelector(id).getAttribute('data-valueid')
        : 0
      let productFactorValue = document.getElementById('factor').querySelector(id)
        ? document.getElementById('factor').querySelector(id).value
        : ''

      editData.push({
        productFactorValueId: Number(productFactorValueId),
        periodId: periods[index].periodId,
        productFactorId: Number(productFactorId),
        positionN: periods[index].positionN,
        productFactorValue: !isEmptyNullOrUndefined(productFactorValue)
          ? Number(productFactorValue)
          : null,
      })
    }

    return editData
  }
  const submitProductionFactor = () => {
    let idx = 0
    let dataRepresentation = projectRepresentation
    let dataPeriods = dataRepresentation.periods
    let dataProductionNew = []
    let isError = false

    while (document.getElementById('factor').querySelector('#indexname' + idx + '')) {
      let ProductID = document
        .getElementById('factor')
        .querySelector('#indexname' + idx)
        .getAttribute('data-id')
      let ProductName = document.getElementById('factor').querySelector('#indexname' + idx).value
      let unitz = document.getElementById('factor').querySelector('#units' + idx).value
      let datas = getProductionFactorData(idx, dataPeriods)
      let dataIsi = datas.filter((x) => !isEmptyNullOrUndefined(x.productFactorValue))

      if (datas.length < 1) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must at least 1 data.',
          icon: 'warning',
        })
      } else if (!isEmptyNullOrUndefined(ProductName)) {
        dataProductionNew.push({
          productId: ProductID,
          productName: ProductName,
          units: unitz,
          projectRepresentationId: Number(projectRepresentation.projectRepresentationId),
          productFactorValueDtos: datas,
        })
      } else if (dataIsi.length > 0 && isEmptyNullOrUndefined(ProductName)) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Product Name field.',
          icon: 'warning',
        })
      }
      idx++
    }

    if (!isError && dataProductionNew.length > 0) {
      dispatch(postProductionFactor(JSON.stringify(dataProductionNew)))
    }
  }

  const getColumns = (tipe) => {
    let dataRepresentation = projectRepresentation
    dispatch(getProjectCountry())

    let arrData = [
      {
        Header: 'Product Name',
        accessor: 'indexname',
        align: 'center',
      },
      {
        Header: 'Units',
        accessor: 'units',
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
            if (tipe === 'schedule') {
              arrData.push({
                Header: dataPeriods[i].periodName,
                accessor: dataPeriods[i].periodName + '_',
                align: 'center',
              })
            } else {
              arrData.push({
                Header: dataPeriods[i].periodName,
                accessor: dataPeriods[i].periodName,
                align: 'center',
              })
            }
          }
        }
      }

      setArrPeriodData(arrData)
    } else {
      return null
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
      getProductionSchedule({
        projectRepresentationId: projectRepresentation.projectRepresentationId,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const merge = (...arrays) => {
    const merged = {}

    arrays.forEach((data) => {
      data.forEach((o) => Object.assign((merged[o.periodId] ??= {}), o))
    })

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

  let arrDetail = []
  const dataSchedule = useSelector((state) => {
    if (state.ProductionSchedule.data.length > 0) {
      let trueDataCostIndices = []
      let datProdSchedule = state.ProductionSchedule.data

      for (let index = 0; index < datProdSchedule.length; index++) {
        if (datProdSchedule[index].productScheduleValueDtos.length > 0) {
          let periods = projectRepresentation.periods

          if (periods) {
            var objectPeriod = periods.reduce(
              (obj, item) => ((obj[item.periodName] = item.periodId), obj),
              {},
            )
            let mergedArr = merge(periods, datProdSchedule[index].productScheduleValueDtos)

            let total = 0
            localStorage.removeItem('totalArrayPeriodProdSchedule')
            mergedArr = mergedArr.map((item) => {
              total++
              let detail = {
                productScheduleValueId: item.productScheduleValueId,
                periodId: item.periodId,
                productScheduleId: datProdSchedule[index].productId,
                positionN: item.positionN,
                productScheduleValue: item.productScheduleValue ? item.productScheduleValue : '',
              }
              if (
                !arrDetail.find((x) => x.periodId === item.periodId) &&
                !isEmptyNullOrUndefined(detail.productScheduleValueId) &&
                !isEmptyNullOrUndefined(detail.productScheduleValue)
              ) {
                arrDetail.push(detail)
              }
              return {
                periodId: item.periodId,
                periodName: item.periodName,
                positionN: item.positionN,
                productId: datProdSchedule[index].productId,
                productName: datProdSchedule[index].productName,
                units: datProdSchedule[index].units,
                productScheduleValue: item.productScheduleValue ? item.productScheduleValue : '',
                productScheduleValueId: item.productScheduleValueId,
              }
            })
            localStorage.setItem('totalArrayPeriodProdSchedule', total)

            let fixData = returnFlattenObject(mergedArr)

            objectPeriod['indexname'] = datProdSchedule[index].productName
            objectPeriod['productId'] = datProdSchedule[index].productId
            objectPeriod['units'] = datProdSchedule[index].units

            trueDataCostIndices.push(fixData)
          }
        } else {
          if (projectRepresentation.periods.length > 0) {
            let objData = { indexname: datProdSchedule[index].costIndexName }
            objData[projectRepresentation.periods[0].periodName] = null
            objData['costIndexId'] = datProdSchedule[index].costIndexId
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
  const dataFactor = useSelector((state) => {
    if (state.ProductionFactor.data.length > 0) {
      let trueDataCostIndices = []
      let datProdFactor = state.ProductionFactor.data

      for (let index = 0; index < datProdFactor.length; index++) {
        if (datProdFactor[index].productFactorValueDtos.length > 0) {
          let periods = projectRepresentation.periods

          if (periods) {
            var objectPeriod = periods.reduce(
              (obj, item) => ((obj[item.periodName] = item.periodId), obj),
              {},
            )
            let mergedArr = merge(periods, datProdFactor[index].productFactorValueDtos)

            let total = 0
            localStorage.removeItem('totalArrayPeriodProdFactor')
            mergedArr = mergedArr.map((item) => {
              total++
              let detail = {
                productFactorValueId: item.productFactorValueId,
                periodId: item.periodId,
                productFactorId: datProdFactor[index].productFactorId,
                positionN: item.positionN,
                productFactorValue: item.productFactorValue ? item.productFactorValue : '',
              }
              if (
                !arrDetail.find((x) => x.periodId === item.periodId) &&
                !isEmptyNullOrUndefined(detail.productFactorValueId) &&
                !isEmptyNullOrUndefined(detail.productFactorValue)
              ) {
                arrDetail.push(detail)
              }
              return {
                periodId: item.periodId,
                periodName: item.periodName,
                positionN: item.positionN,
                productId: datProdFactor[index].productId,
                productName: datProdFactor[index].productName,
                units: datProdFactor[index].units,
                productFactorValue: item.productFactorValue ? item.productFactorValue : '',
                productFactorValueId: item.productFactorValueId,
              }
            })
            localStorage.setItem('totalArrayPeriodProdFactor', total)

            let fixData = returnFlattenObject(mergedArr)

            objectPeriod['indexname'] = datProdFactor[index].productName
            objectPeriod['productId'] = datProdFactor[index].productId
            objectPeriod['units'] = datProdFactor[index].units

            trueDataCostIndices.push(fixData)
          }
        } else {
          if (projectRepresentation.periods.length > 0) {
            let objData = { indexname: datProdFactor[index].costIndexName }
            objData[projectRepresentation.periods[0].periodName] = null
            objData['costIndexId'] = datProdFactor[index].costIndexId
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

  const loadingSchedule = useSelector((state) => state.ProductionSchedule.loading)
  const errSchedule = useSelector((state) => state.ProductionSchedule.error)
  const msgSchedule = useSelector((state) => state.ProductionSchedule.message)
  const isDeletedSchedule = useSelector((state) => state.ProductionSchedule.isDeleted)

  const loadingFactor = useSelector((state) => state.ProductionFactor.loading)
  const errFactor = useSelector((state) => state.ProductionFactor.error)
  const msgFactor = useSelector((state) => state.ProductionFactor.message)
  const isDeletedFactor = useSelector((state) => state.ProductionFactor.isDeleted)

  const setMessageSchedule = () => {
    if (errSchedule) {
      addToast(ToastError(errSchedule))
    } else if (msgSchedule && isDeletedSchedule) {
      addToast(ToastSuccessDelete)
    } else if (msgSchedule && !isDeletedSchedule) {
      addToast(ToastSuccess)
    }
  }

  const setMessageProcessFactor = () => {
    if (errFactor) {
      addToast(ToastError(errFactor))
    } else if (msgFactor && isDeletedFactor) {
      addToast(ToastSuccessDelete)
    } else if (msgFactor && !isDeletedFactor) {
      addToast(ToastSuccess)
    }
  }

  useEffect(() => {
    setMessageSchedule()
    dispatch(
      getProductionSchedule({
        projectRepresentationId: projectRepresentation.projectRepresentationId,
      }),
    )
    // eslint-disable-next-line
  }, [msgSchedule, errSchedule])

  useEffect(() => {
    setMessageProcessFactor()
    dispatch(
      getProductionFactor({
        projectRepresentationId: projectRepresentation.projectRepresentationId,
      }),
    )
    // eslint-disable-next-line
  }, [msgFactor, errFactor])

  useEffect(() => {
    if (!loadingFactor && !loadingSchedule) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [loadingFactor, loadingSchedule])

  return (
    <CRow>
      <Spinner loading={loading} />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CToaster ref={toaster} push={toast} placement="bottom-end" />

          <CCardHeader>
            <strong>Production</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink href="#!" active={activeKey === 1} onClick={() => setActiveKey(1)}>
                  Production Schedules
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#!" active={activeKey === 2} onClick={() => setActiveKey(2)}>
                  Production Factors
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="fleet-data-tab" visible={activeKey === 1}>
                <CCard>
                  <CCardBody>
                    {projectRepresentation.periods ? (
                      <TableProductionSchedule
                        dataSchedule={dataSchedule}
                        key={dataSchedule}
                        arrPeriodData={arrPeriodData}
                        isEdit={isEdit}
                        submitProductionSchedule={submitProductionSchedule}
                      />
                    ) : (
                      <CAlert color="warning" className="d-flex align-items-center">
                        <CIcon
                          icon={cilWarning}
                          className="flex-shrink-0 me-2"
                          width={24}
                          height={24}
                        />
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
                      onClick={submitProductionSchedule}
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
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="main-cost-component"
                visible={activeKey === 2}
              >
                <CCard>
                  <CCardBody>
                    {projectRepresentation.periods ? (
                      <TableProductionFactor
                        key={dataFactor}
                        arrPeriodData={arrPeriodData}
                        isEdit={isEdit}
                        dataFactor={dataFactor}
                        submitProductionFactor={submitProductionSchedule}
                      />
                    ) : (
                      <CAlert color="warning" className="d-flex align-items-center">
                        <CIcon
                          icon={cilWarning}
                          className="flex-shrink-0 me-2"
                          width={24}
                          height={24}
                        />
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
                      onClick={submitProductionFactor}
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
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Production
