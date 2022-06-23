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
  CFormFeedback,
  CFormSelect,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { deletePersonelcc, getPersonelcc, postPersonelcc, putPersonelcc } from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'

const PersonelCC = (params) => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [costCentreEmployeeId, setCostCentreEmployeeTypeId] = useState(0)
  const [employeeTypeId, setEmployeeTypeId] = useState(0)
  const [rosterId, setRosterId] = useState(0)
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)
  // const loading = useSelector((state) => state.InfraChecklist.loading)
  const isLoading = useSelector((state) => state.Personelcc.loading)
  const datas = useSelector((state) => state.Personelcc.data)
  const employeeTypes = useSelector((state) => state.Personelcc.employeeTypes)
  const [rosterOptions, setRosterOptions] = useState([])
  const empTypeOptions = useSelector((state) => {
    return populateEmployeeTypeOption(state.Personelcc.employeeTypes)
  })
  function populateEmployeeTypeOption(employeeTypes) {
    var employeeTypesOption = ['Please select Employee Type']

    if (employeeTypes) {
      for (let index = 0; index < employeeTypes.length; index++) {
        employeeTypesOption.push({
          label: employeeTypes[index].employeeTypeName,
          value: employeeTypes[index].employeeTypeId,
        })
      }
    }
    return employeeTypesOption
  }

  const isSuccess = useSelector((state) => state.Personelcc.isSuccess)
  const message = useSelector((state) => state.Personelcc.message)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)

  const onChangeEmployeeTypeOptions = (item) => {
    setRosterId(0)
    setEmployeeTypeId(item)
    var populateRosterOptions = ['Please Select Roster']
    console.log('employeeTypes', employeeTypes)
    console.log('currentItem', item)
    var currentEmployeeTypes = employeeTypes.filter((currentItem) => {
      // console.log("currentItem", currentItem)
      // console.log("currentItem.employeeTypeId", currentItem.employeeTypeId)
      // console.log("item", item)
      if (currentItem.employeeTypeId == item) {
        return currentItem
      } else {
        return null
      }
    })
    var childList = currentEmployeeTypes[0]
    console.log(currentEmployeeTypes)
    if (childList) {
      for (let index = 0; index < childList.listEmployeeTypeRostered.length; index++) {
        populateRosterOptions.push({
          label: childList.listEmployeeTypeRostered[index].rosterName,
          value: childList.listEmployeeTypeRostered[index].rosterId,
        })
      }
    }
    setRosterOptions(populateRosterOptions)
  }

  const setMessageProcess = (isSuccess) => {
    if (isSuccess) {
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
    if (params.selectedId != 0) {
      setMessageProcess(isSuccess)
      // dispatch(getLevyCategoryOption(projectRep.projectRepresentationId))
      dispatch(
        getPersonelcc({
          costCentreId: params.selectedId,
          projectRepresentationId: projectRep.projectRepresentationId,
        }),
      )
    }
    // eslint-disable-next-line
  }, [message, projectRep, params.selectedId])

  const onCloseResetAll = () => {
    setCostCentreEmployeeTypeId(0)
    setRosterId(0)
    setEmployeeTypeId(0)
  }

  const onClickEdit = (row) => {
    setCostCentreEmployeeTypeId(row.costCentreEmployeeTypeId)
    setRosterId(row.rosterId)
    setEmployeeTypeId(row.employeeTypeId)
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
        let param = { id: row.costCentreEmployeeTypeId }
        dispatch(deletePersonelcc(param))

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
      name: 'Employee Type',
      selector: (row) => row.employeeTypeName,
      sortable: true,
    },
    {
      name: 'Roster',
      selector: (row) => row.rosterName,
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
    console.log('rosterId', rosterId)
    if (isNaN(rosterId) || rosterId < 1) {
      return
    }
    if (isNaN(employeeTypeId) || employeeTypeId < 1) {
      return
    }
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }

    if (form.checkValidity() === true) {
      let payload = {
        costcentreId: params.selectedId, //will change after tree cost centre created
        rosterId: rosterId,
        costCentreEmployeeTypeId: costCentreEmployeeId,
        employeeTypeId: employeeTypeId,
      }
      if (costCentreEmployeeId > 0) {
        dispatch(putPersonelcc(payload))
      } else {
        dispatch(postPersonelcc(payload))
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
              <strong>Personel</strong>
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
                    <CModalTitle>
                      {costCentreEmployeeId > 0 ? 'Update Data' : 'Add Data'}
                    </CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="Equipment" className="col-sm-3 col-form-label">
                        Employee Type
                      </CFormLabel>

                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Employee Type"
                          options={empTypeOptions}
                          size="sm"
                          onChange={(e) => onChangeEmployeeTypeOptions(e.currentTarget.value)}
                          value={employeeTypeId}
                          required
                          className={
                            employeeTypeId < 1 || isNaN(employeeTypeId) ? 'is-invalid' : ''
                          }
                        />
                        <CFormFeedback
                          invalid
                          className={employeeTypeId < 1 || isNaN(employeeTypeId) ? 'd-block' : ''}
                        >
                          Please select an Option
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="SahreFleetCode" className="col-sm-3 col-form-label">
                        Roster
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Employee Type"
                          options={rosterOptions}
                          size="sm"
                          onChange={(e) => setRosterId(e.currentTarget.value)}
                          value={rosterId}
                          required
                          className={rosterId < 1 || isNaN(rosterId) ? 'is-invalid' : ''}
                        />
                        <CFormFeedback
                          invalid
                          className={rosterId < 1 || isNaN(rosterId) ? 'd-block' : ''}
                        >
                          Please select an Option
                        </CFormFeedback>
                      </CCol>
                      {/* <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input currency abbrevation"
                          maxLength={128}
                          onInput={(e) => setShareFleetCode(e.currentTarget.value)}
                          value={shareFleetCode}
                          className={shareFleetCode.length > 128 ? 'is-invalid' : ''}
                        />
                        <CFormFeedback invalid className={shareFleetCode.length > 128 ? 'd-block' : ''}>
                          Max character should be less than 128
                        </CFormFeedback>
                      </CCol> */}
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

export default PersonelCC
