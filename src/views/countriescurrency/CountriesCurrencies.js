import React, { useState, useRef, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CModal,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CToastBody,
  CToastClose,
  CToaster,
  CForm,
  CFormInput,
  CFormFeedback,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { getCountriesCurrencies } from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import { deleteCurrencies, postCurrencies, putCurrencies } from 'src/redux/actions/countryAction'

const CountriesCurrencies = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [countryId, setCountryId] = useState(0)
  const [countryName, setCountryName] = useState('')
  const [currencyAbbr, setCurrencyAbbr] = useState('')
  const [currencyName, setCurrencyName] = useState('')
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  // const loading = useSelector((state) => state.InfraChecklist.loading)
  const isLoading = useSelector((state) => state.Country.loading)
  const onProcessData = useSelector((state) => state.Country.onProcessData)
  const errorData = useSelector((state) => state.Country.error)
  const successMessage = useSelector((state) => state.Country.successMessage)
  const setMessageProcess = (isOnProcess) => {
    if (isOnProcess === false) {
      if (successMessage !== '') {
        addToast(ToastSuccessDelete)
      } else if (errorData !== '') {
        addToast(ToastError(errorData))
      } else {
        setVisible(false)
        addToast(ToastSuccess)
      }
    }
  }

  useEffect(() => {
    // dispatch(getInfraChecklist())
    dispatch(getCountriesCurrencies())
    setMessageProcess(onProcessData)
    // eslint-disable-next-line
  }, [onProcessData])

  const datas = useSelector((state) => state.Country.datas)
  const onCloseResetAll = () => {
    setCountryId(0)
    setCountryName('')
    setCurrencyAbbr('')
    setCurrencyName('')
  }

  const onClickEdit = (row) => {
    setCountryId(row.countryId)
    setCountryName(row.countryName)
    setCurrencyAbbr(row.currencyAbbr)
    setCurrencyName(row.currencyName)
    setVisible(!visible)
  }

  const onClickDelete = (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let param = { id: row.countryId }
        dispatch(deleteCurrencies(param))

        // setTimeout(() => {
        //   addToast(ToastSuccessDelete)
        // }, 1500)
      }
    })
  }

  const renderButtonAction = (row) => {
    return (
      <>
        <CButton
          color="warning"
          variant="outline"
          onClick={() => onClickEdit(row)}
          className="mx-1"
        >
          <CIcon icon={cilPencil} />
        </CButton>
        <CButton
          color="danger"
          variant="outline"
          onClick={() => onClickDelete(row)}
          className="mx-1"
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </>
    )
  }

  const columns = [
    {
      name: 'Currency Abbrevation',
      selector: (row) => row.currencyAbbr,
      sortable: true,
    },
    {
      name: 'Country Name',
      selector: (row) => row.countryName,
      sortable: true,
    },
    {
      name: 'Currency Name',
      selector: (row) => row.currencyName,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => renderButtonAction(row),
      sortable: false,
    },
  ]

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(true)

      return
    }

    if (form.checkValidity() === true) {
      let payload = {
        countryId: countryId,
        countryName: countryName,
        currencyAbbr: currencyAbbr,
        currencyName: currencyName,
      }
      if (countryId > 0) {
        dispatch(putCurrencies(payload))
      } else {
        dispatch(postCurrencies(payload))
      }
    }
    // setVisible(!visible)
    // setTimeout(() => {
    //   addToast(ToastSuccess)
    // }, 1500)
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

  return (
    <>
      <Spinner loading={isLoading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>Countries & Currencies</strong>
            </CCardHeader>
            <CCardBody>
              <CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
                Create New
              </CButton>

              <CModal
                size="lg"
                alignment="center"
                scrollable
                backdrop="static"
                visible={visible}
                onClose={onCloseResetAll}
              >
                <CForm
                  className="g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CModalHeader className="px-5">
                    <CModalTitle>{countryId > 0 ? 'Update Data' : 'Add Data'}</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-3 col-form-label">
                        Currency Abbrevation
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input currency abbrevation"
                          maxLength={3}
                          minLength={3}
                          onInput={(e) => setCurrencyAbbr(e.currentTarget.value)}
                          value={currencyAbbr}
                          required
                        />
                        <CFormFeedback invalid>Currency Abbrevation is required.</CFormFeedback>
                        <CFormFeedback invalid>
                          Currency Abbrevation must be filled with 3 digits
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-3 col-form-label">
                        Country Name
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input  country name"
                          onInput={(e) => setCountryName(e.currentTarget.value)}
                          required
                          value={countryName}
                        />
                        <CFormFeedback invalid>Country Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-3 col-form-label">
                        Currency Name
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input currency name"
                          onInput={(e) => setCurrencyName(e.currentTarget.value)}
                          required
                          value={currencyName}
                        />
                        <CFormFeedback invalid>Currency Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)} size="sm">
                      Close
                    </CButton>
                    <CButton color="primary" type="submit" size="sm">
                      Save changes
                    </CButton>
                  </CModalFooter>
                </CForm>
              </CModal>
              {datas && <DataTable columns={columns} data={datas} pagination />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CountriesCurrencies
