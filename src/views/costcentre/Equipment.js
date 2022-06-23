/* eslint-disable eqeqeq */
import React, { useState, useRef, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
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
  CFormSelect,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import {
  deleteEquipmentcc,
  getEquipmentcc,
  postEquipmentcc,
  putEquipmentcc,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'

const EquipmentCC = (params) => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [costCentreFleetId, setCostCentreFleetId] = useState(0)
  const [resourceEquipmentId, setResourceEquipmentId] = useState(0)
  const [shareFleetCode, setShareFleetCode] = useState('')
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  // const loading = useSelector((state) => state.InfraChecklist.loading)
  const isLoading = useSelector((state) => state.Equipmentcc.loading)
  const datas = useSelector((state) => state.Equipmentcc.data)
  const equipmentOption = useSelector((state) => state.Equipmentcc.dataOption)
  const isSuccess = useSelector((state) => state.Equipmentcc.isSuccess)
  const message = useSelector((state) => state.Equipmentcc.message)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)

  const setMessageProcess = (isSuccess) => {
    if (isSuccess) {
      console.log(isSuccess)
      console.log(message)
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
    // console.log("Selected Id", selectedId.selectedId)
    if (params.selectedId != 0) {
      setMessageProcess(isSuccess)
      // dispatch(getLevyCategoryOption(projectRep.projectRepresentationId))
      dispatch(
        getEquipmentcc({
          costCentreId: params.selectedId,
          projectRepresentationId: projectRep.projectRepresentationId,
        }),
      )
    }
    // eslint-disable-next-line
  }, [message, projectRep, params.selectedId])

  const onCloseResetAll = () => {
    setCostCentreFleetId(0)
    setResourceEquipmentId(0)
    setShareFleetCode('')
  }

  const onClickEdit = (row) => {
    setCostCentreFleetId(row.costCentreFleetId)
    setResourceEquipmentId(row.fleetId)
    setShareFleetCode(row.fleetGroupName)
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
        let param = { id: row.costCentreFleetId }
        dispatch(deleteEquipmentcc(param))

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
      name: 'Equipment',
      selector: (row) => row.fleetName,
      sortable: true,
    },
    {
      name: 'Shared Fleet Code',
      selector: (row) => row.fleetGroupName,
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
    if (resourceEquipmentId < 1) {
      return
    }

    if (form.checkValidity() === true) {
      let payload = {
        costcentreId: params.selectedId, //will change after tree cost centre created
        fleetGroupName: shareFleetCode,
        fleetId: resourceEquipmentId,
        costCentreFleetId: costCentreFleetId,
      }
      if (costCentreFleetId > 0) {
        dispatch(putEquipmentcc(payload))
      } else {
        dispatch(postEquipmentcc(payload))
      }
    }
    // setVisible(!visible)
    // setTimeout(() => {
    //   addToast(ToastSuccess)
    // }, 1500)
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
            {/* <CCardHeader>
              <strong>Equipment</strong>
            </CCardHeader> */}
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
                  <CModalHeader closeButton={false} className="px-5">
                    <CModalTitle>{costCentreFleetId > 0 ? 'Update Data' : 'Add Data'}</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="Equipment" className="col-sm-3 col-form-label">
                        Equipment
                      </CFormLabel>

                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Levy Category"
                          options={equipmentOption}
                          size="sm"
                          onChange={(e) => setResourceEquipmentId(e.currentTarget.value)}
                          value={resourceEquipmentId}
                          required
                          className={resourceEquipmentId < 1 ? 'is-invalid' : ''}
                        />
                        <CFormFeedback invalid className={resourceEquipmentId < 1 ? 'd-block' : ''}>
                          Please select an Option
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="SahreFleetCode" className="col-sm-3 col-form-label">
                        Shared Fleet Code
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input currency abbrevation"
                          maxLength={128}
                          onInput={(e) => setShareFleetCode(e.currentTarget.value)}
                          value={shareFleetCode}
                          className={shareFleetCode.length > 128 ? 'is-invalid' : ''}
                        />
                        <CFormFeedback
                          invalid
                          className={shareFleetCode.length > 128 ? 'd-block' : ''}
                        >
                          Max character should be less than 128
                        </CFormFeedback>
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

export default EquipmentCC
