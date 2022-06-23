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
import TabelCostIndices from './TabelCostIndices'
import TableProductionSchedule from './TableProdcutionSchedule'
import './cost.css'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import {
  getProjectCountry,
  getEquipmentScheduleOH,
  getProductionSchedule,
  postProductionSchedule,
  putProductionSchedule,
} from '../../redux/actions'
import { isEmptyNullOrUndefined } from 'src/functions'
import Swal from 'sweetalert2'

const Production = () => {
  const [arrPeriodData, setArrPeriodData] = useState([])
  const toaster = useRef()
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [toast, addToast] = useState(0)
  const [deletedId, setDeletedId] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )

  const loading = false //useSelector((state) => state.EquipmentScheduleOH.loading)
  const message = useSelector((state) => state.EquipmentScheduleOH.message)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)
  const isSuccess = useSelector((state) => state.EquipmentScheduleOH.isSuccess)

  const setMessageProcess = (isSuccess) => {
    if (isSuccess) {
      console.log(isSuccess)
      console.log(message)
      if (message === '') {
        return
      }
      // setVisible(false)
      addToast(ToastSuccess(message))
    } else {
      addToast(ToastError(message))
    }
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

  const getProductionScheduleData = (idx, periods, existingData) => {
    let arrCostIndices = {}
    let newData = []
    let editData = []
debugger
    existingData[0].costIndexValues.forEach((element) => {})
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

      if (productScheduleValueId) {
        // Edit data
        editData.push({
          productScheduleValueId: productScheduleValueId,
          periodId: periods[index].periodId,
          productScheduleId: Number(productScheduleId),
          positionN: periods[index].positionN,
          productScheduleValue: !isEmptyNullOrUndefined(productScheduleValue)
            ? Number(productScheduleValue)
            : null,
        })
      } else {
        // New data
        newData.push({
          // productScheduleValueId: productScheduleValueId,
          periodId: periods[index].periodId,
          productScheduleId: Number(productScheduleId),
          positionN: periods[index].positionN,
          productScheduleValue: !isEmptyNullOrUndefined(productScheduleValue)
            ? Number(productScheduleValue)
            : null,
        })
      }
    }

    arrCostIndices['newData'] = newData
    arrCostIndices['editData'] = editData
    return arrCostIndices
  }
  const submitProductionSchedule = () => {
    let idx = 0
    let dataRepresentation = projectRepresentation
    let dataPeriods = dataRepresentation.periods
    let dataProductionNew = [],
      dataProductionEdit = []
    let isError = false
    while (document.getElementById('indexname' + idx + '')) {
      let ProductID = document.getElementById('indexname' + idx).getAttribute('data-id')
      let ProductName = document.getElementById('indexname' + idx).value
      let datas = getProductionScheduleData(idx, dataPeriods, dataSchedule)

      let dataPeriodNotEmpty =
        datas.newData.length > 0
          ? datas.newData.filter((x) => !isEmptyNullOrUndefined(x.productScheduleValue))
          : datas.editData.filter((x) => !isEmptyNullOrUndefined(x.productScheduleValue))

      if (!isEmptyNullOrUndefined(ProductName)) {
        if (ProductID) {
          // Edit Data
          dataProductionEdit.push({
            productId: ProductID,
            productName: ProductName,
            units: 'string',
            projectRepresentationId: projectRepresentation.projectRepresentationId,
            productScheduleValueDtos: datas.editData,
          })
        } else {
          dataProductionNew.push({
            productId: ProductID,
            productName: ProductName,
            units: 'string',
            projectRepresentationId: projectRepresentation.projectRepresentationId,
            productScheduleValueDtos: datas.newData,
          })
        }
      } else if (dataPeriodNotEmpty.length > 0 && isEmptyNullOrUndefined(ProductID)) {
        isError = true
        Swal.fire({
          title: 'Empty Validation',
          text: 'You must enter value in the Cost Index Name field.',
          icon: 'warning',
        })
      }
      idx++
    }

    if (!isError && dataProductionNew.length > 0) {
      dispatch(postProductionSchedule(dataProductionNew))
    }
    if (!isError && dataProductionEdit.length > 0) {
      dispatch(putProductionSchedule(dataProductionEdit))
    }
    // const data = []
    // listDataProductionSchedule.forEach((item) => {
    //   let child = []
    //   for (const key in item) {
    //     if (key.toLowerCase().includes('p0')) {
    //       let period = projectRepresentation.periods.find((x) => x.periodName === key)

    //       if (!isEmptyNullOrUndefined(item[key])) {
    //         child.push({
    //           productScheduleValueId: 0,
    //           periodId: period.periodId,
    //           productScheduleId: 0,
    //           positionN: period.positionN,
    //           productScheduleValue: Number(item[key]),
    //         })
    //       }
    //     }
    //     console.log(`${key}: ${item[key]}`)
    //   }
    //   data.push({
    //     // productId: 0,
    //     productName: item.indexname,
    //     units: '',
    //     projectRepresentationId: projectRepresentation.projectRepresentationId,
    //     productScheduleValueDtos: child,
    //   })
    // })
    // dispatch(postProductionSchedule(data[0]))
  }

  const getColumns = () => {
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

  // const getCostIndexValue = (idx, periods, existingData) => {
  //   let arrCostIndices = {}
  //   let newData = []
  //   let editData = []

  //   existingData[0].costIndexValues.forEach((element) => {})
  //   for (let index = 0; index < periods.length; index++) {
  //     let CostIndexId = document.getElementById('indexname' + idx)
  //       ? document.getElementById('indexname' + idx).getAttribute('data-id')
  //       : 0
  //     let id = periods[index].periodName.replace(' ', '_') + idx

  //     let CostIndexValueId = document.getElementById(id)
  //       ? document.getElementById(id).getAttribute('data-valueid')
  //       : 0
  //     let costIndexValue = document.getElementById(id) ? document.getElementById(id).value : ''

  //     if (CostIndexValueId) {
  //       // Edit data

  //       editData.push({
  //         ccFleetOHPeriodID: CostIndexValueId === 'undefined' ? null : Number(CostIndexValueId),
  //         periodId: periods[index].periodId,
  //         ccFleetOHID: Number(CostIndexId),
  //         positionN: periods[index].positionN,
  //         value: costIndexValue,
  //       })
  //     } else {
  //       // New data
  //       newData.push({
  //         periodId: periods[index].periodId,
  //         positionN: periods[index].positionN,
  //         ccFleetOHID: Number(CostIndexId),
  //         value: costIndexValue,
  //         ccFleetOHPeriodID: 0,
  //       })
  //     }
  //   }

  //   arrCostIndices['newData'] = newData
  //   arrCostIndices['editData'] = editData
  //   return arrCostIndices
  // }

  const onClickReset = () => {
    window.location.reload()
  }
  const onClickEdit = () => {
    setIsEdit(true)
  }

  useEffect(() => {
    getColumns()
    dispatch(
      getEquipmentScheduleOH({
        projectRepresentationId: projectRepresentation.projectRepresentationId,
        costCentreId: 1,
      }),
    )
    dispatch(
      getProductionSchedule({
        projectRepresentationId: projectRepresentation.projectRepresentationId,
      }),
    )
    setMessageProcess(isSuccess)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, projectRep])

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
                productScheduleValue: item.productScheduleValue,
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
                productScheduleValue: item.productScheduleValue,
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
  // const dataFactor = useSelector((state) => state.ProductionFactor.data)

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
                    {dataSchedule && projectRepresentation.periods ? (
                      <TableProductionSchedule
                        dataSchedule={dataSchedule}
                        arrPeriodData={arrPeriodData}
                        isEdit={isEdit}
                        submitProductionSchedule={submitProductionSchedule}
                      />
                    ) : (
                      //
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
                      // onClick={onClickSave}
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
