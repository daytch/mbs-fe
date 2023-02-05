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
import { cilPencil, cilHistory, cilSave, cilWarning } from '@coreui/icons'
import TableExchangeRate from './TableExchangeRate'
import './cost.css'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import { getExchangeRate, getProjectCountry, postExchangeRate } from '../../redux/actions'
import { isEmptyNullOrUndefined } from 'src/functions'

const ExchangeRateSchedules = () => {
  const [arrPeriodData, setArrPeriodData] = useState([])
  const toaster = useRef()
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [toast, addToast] = useState(0)
  const [rendomKey, setRendomKey] = useState(0)
  const [currencyName] = useState(
    JSON.parse(localStorage.getItem('project')).currencyAbbr +
      ' - ' +
      JSON.parse(localStorage.getItem('project')).countryName,
  )
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  const [listCountries] = useState(JSON.parse(localStorage.getItem('country')))

  const loading = useSelector((state) => state.FinanceExchangeRate.loading)
  const err = useSelector((state) => state.FinanceExchangeRate.error)
  const msg = useSelector((state) => state.FinanceExchangeRate.message)
  const isDeleted = useSelector((state) => state.FinanceExchangeRate.isDeleted)

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
    // dispatch(getProjectCountry())

    let arrData = [
      {
        Header: 'Currency',
        accessor: 'currency',
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

  const onClickSave = () => {
    let idx = 0
    let dataRepresentation = projectRepresentation // JSON.parse(localStorage.getItem('projectRepresentation'))
    let dataExchangeRate = []
    let dataPeriods = dataRepresentation.periods

    while (document.getElementById('currency' + idx)) {
      if (!isEmptyNullOrUndefined(document.getElementById('currency' + idx).value)) {
        let dataVal = getCostIndexValue(idx, dataPeriods)
        if (dataVal.length > 0) {
          dataVal.forEach((element) => {
            dataExchangeRate.push(element)
          })
        }
      }
      idx++
    }

    dispatch(postExchangeRate(dataExchangeRate))
  }
  const getCostIndexValue = (idx, periods) => {
    let data = []
    let CountryId = document.getElementById('currency' + idx)
      ? document.getElementById('currency' + idx).getAttribute('data-countryid')
      : 0
    for (let index = 0; index < periods.length; index++) {
      let ExchRateId = document
        .getElementById(periods[index].periodName.replace(' ', '_') + idx)
        .getAttribute('data-id')
      let periodId = document
        .getElementById(periods[index].periodName.replace(' ', '_') + idx)
        .getAttribute('data-periodId')
      let excRate = document.getElementById(periods[index].periodName.replace(' ', '_') + idx).value

      if (!isEmptyNullOrUndefined(ExchRateId) || !isEmptyNullOrUndefined(excRate)) {
        data.push({
          projectRepresentationId: projectRepresentation.projectRepresentationId,
          exchRateId: Number(ExchRateId),
          periodId: periodId ? Number(periodId) : periods[index].periodId,
          countryId: Number(CountryId),
          positionN: periods[index].positionN,
          exchRate: excRate ? Number(excRate) : null,
        })

        if (!isEmptyNullOrUndefined(ExchRateId)) {
          delete data.exchRateId
        }

        if (!isEmptyNullOrUndefined(periodId)) {
          delete data.periodId
        }
      }
    }
    return data
  }
  const onClickReset = () => {
    setRendomKey(Math.random())
  }
  const onClickEdit = () => {
    setIsEdit(true)
  }

  useEffect(() => {
    dispatch(getProjectCountry())
    getColumns()
    dispatch(
      getExchangeRate({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
    )
    // setExchangeRate(dataExchangeRate)
    setMessageProcess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, err])

  const dataCountries = useSelector((state) => {
    if (
      state.Country.dataCountries?.length > 0 &&
      state.Country.dataCountries?.length !== listCountries?.length
    ) {
      let listCount = listCountries ? listCountries : state.Country.dataCountries
      localStorage.setItem('country', JSON.stringify(listCount))
      return listCount
    } else {
      return listCountries
    }
  })
  const dataExchangeRate = useSelector((state) => state.FinanceExchangeRate.dataExchangeRate)

  return (
    <CRow>
      <Spinner loading={loading} />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CToaster ref={toaster} push={toast} placement="bottom-end" />

          <CCardHeader>
            <strong>Exchange Rate Schedules</strong>
          </CCardHeader>
          <CCardBody>
            {dataExchangeRate && dataCountries && projectRepresentation.periods.length > 0 ? (
              <TableExchangeRate
                key={rendomKey === 0 ? Math.random() : rendomKey}
                arrPeriodData={arrPeriodData}
                isEdit={isEdit}
                dataExchangeRate={dataExchangeRate}
                dataCountries={dataCountries}
                periods={projectRepresentation.periods}
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
              className="ms-1 me-3"
            >
              <CIcon icon={cilHistory} />
              <span className="ms-2">Reset</span>
            </CButton>
            Project Currency : {currencyName}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExchangeRateSchedules
