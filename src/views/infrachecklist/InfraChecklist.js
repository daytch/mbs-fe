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
import {
  getInfraChecklist,
  postInfraChecklist,
  putInfraChecklist,
  deleteInfraChecklist,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'

const InfraChecklist = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [infraId, setInfraId] = useState(0)
  const [infraName, setInfraName] = useState('')
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  const loading = useSelector((state) => state.InfraChecklist.loading)

  useEffect(() => {
    dispatch(getInfraChecklist())
    // eslint-disable-next-line
  }, [])

  const infras = useSelector((state) => state.InfraChecklist.dataInfra)

  const onCloseResetAll = () => {
    setInfraId(0)
    setInfraName('')
    setValidated(false)
  }

  const onClickEdit = (row) => {
    setInfraId(row.infrastructureId)
    setInfraName(row.infrastructureName)
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
        let param = { id: row.infrastructureId }
        dispatch(deleteInfraChecklist(param))

        setTimeout(() => {
          addToast(ToastSuccessDelete)
        }, 1500)
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
      name: 'Infrastructure Name',
      selector: (row) => row.infrastructureName,
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
      setValidated(false)
    }
    setValidated(true)

    if (form.checkValidity() === true) {
      let payload = {
        infrastructureId: infraId,
        infrastructureName: infraName,
      }
      if (infraId > 0) {
        dispatch(putInfraChecklist(payload))
        setVisible(!visible)
        setTimeout(() => {
          addToast(ToastSuccess)
        }, 1500)
      } else {
        dispatch(postInfraChecklist(payload))
        setVisible(!visible)
        setTimeout(() => {
          addToast(ToastSuccess)
        }, 1500)
      }
    }
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
              <strong>Infrastructure Checklist</strong>
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
                    <CModalTitle>Add Data</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Infrastructure Checklist
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          value={infraName}
                          placeholder="Please input infrastructure name"
                          onInput={(e) => setInfraName(e.currentTarget.value)}
                          required
                        />
                        <CFormFeedback invalid>Category Name is required.</CFormFeedback>
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
              {infras && <DataTable columns={columns} data={infras} pagination />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default InfraChecklist
