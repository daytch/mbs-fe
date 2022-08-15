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

import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import {
  getConstant,
  deleteConstant,
  postConstant,
  putConstant,
} from 'src/redux/actions/constantsAction'

const CountriesCurrencies = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()

  const [constantId, setConstantId] = useState(0)
  const [constantName, setConstantName] = useState('')
  const [units, setUnits] = useState('')
  const [constantValue, setConstantValue] = useState('')

  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  // const loading = useSelector((state) => state.InfraChecklist.loading)
  const isLoading = useSelector((state) => state.Constant.loading)
  const datas = useSelector((state) => state.Constant.data)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)
  const isSuccess = useSelector((state) => state.Constant.isSuccess)
  const message = useSelector((state) => state.Constant.message)

  const setMessageProcess = (isSuccess) => {
    if (isSuccess) {
      // console.log(isSuccess)
      // console.log(message)
      if (message === '') {
        return
      }
      setVisible(false)
      addToast(ToastSuccess(message))
    } else {
      addToast(ToastError(message))
    }
  }

  useEffect(() => {
    // dispatch(getInfraChecklist())
    setMessageProcess(isSuccess)
    // dispatch(getRoster(projectRep.projectRepresentationId))
    dispatch(getConstant(projectRep.projectRepresentationId))

    // eslint-disable-next-line
  }, [projectRep, message])

  const onCloseResetAll = () => {
    setConstantId(0)
    setConstantName('')
    setUnits('')
    setConstantValue(0)
  }

  const onClickEdit = (row) => {
    setConstantId(row.constantId)
    setConstantName(row.constantName)
    setUnits(row.units)
    setConstantValue(row.constantValue)

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
        let param = { id: row.constantId }
        dispatch(deleteConstant(param))

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
      name: 'Constant Name',
      selector: (row) => row.constantName,
      sortable: true,
    },
    {
      name: 'Units',
      selector: (row) => row.units,
      sortable: true,
    },
    {
      name: 'Value',
      selector: (row) => row.constantValue,
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
        constantId: constantId,
        constantName: constantName,
        units: units,
        constantValue: constantValue,
        projectRepresentationId: projectRep.projectRepresentationId,
      }
      console.log(payload)
      if (constantId > 0) {
        dispatch(putConstant(payload))
      } else {
        dispatch(postConstant(payload))
      }
    }
  }
  const ToastSuccess = (message) => {
    return (
      <CToast className="align-items-center" color="success">
        <div className="d-flex">
          <CToastBody>{message}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    )
  }

  //   const ToastSuccessDelete = (
  //     <CToast className="align-items-center" color="success">
  //       <div className="d-flex">
  //         <CToastBody>Data has been deleted!</CToastBody>
  //         <CToastClose className="me-2 m-auto" />
  //       </div>
  //     </CToast>
  //   )

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
              <strong>Constants</strong>
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
                    <CModalTitle>{constantId > 0 ? 'Update Data' : 'Add Data'}</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Costant Name
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input constant name"
                          onInput={(e) => setConstantName(e.currentTarget.value)}
                          value={constantName}
                          required
                        />
                        <CFormFeedback invalid>Constant Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Units
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input units"
                          onInput={(e) => setUnits(e.currentTarget.value)}
                          required
                          value={units}
                        />
                        <CFormFeedback invalid>Units is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Value
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input value"
                          onInput={(e) => setConstantValue(e.currentTarget.value)}
                          required
                          value={constantValue}
                        />
                        <CFormFeedback invalid>Value is required.</CFormFeedback>
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
