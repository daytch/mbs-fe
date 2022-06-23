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
  CFormTextarea,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'

import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
// import { deleteCurrencies, postCurrencies, putCurrencies } from 'src/redux/actions/countryAction'
import { deleteRoster, getRoster, postRoster, putRoster } from '../../redux/actions'

const CountriesCurrencies = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()

  const [rosterId, setRosterId] = useState(0)
  const [rosterName, setRosterName] = useState('')
  const [hoursPerShift, setHourPerShift] = useState(0)
  const [shiftsPerDay, setShiftPerDay] = useState(0)
  const [employeeRelativeTimeOn, setEmployeeRelativeTimeOn] = useState(0)
  const [employeeRelativeTimeOff, setEmployeeRelativeTimeOff] = useState(0)
  const [relativeProductionTime, setRelativeProductionTime] = useState(0)
  const [relativeNonProductionTime, setRelativeNonProductionTime] = useState(0)

  const [notes, setNotes] = useState('')
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  // const loading = useSelector((state) => state.InfraChecklist.loading)
  const isLoading = useSelector((state) => state.Roster.loading)
  const datas = useSelector((state) => state.Roster.data)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)
  const isSuccess = useSelector((state) => state.Roster.isSuccess)
  const message = useSelector((state) => state.Roster.message)

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
    // dispatch(getInfraChecklist())
    setMessageProcess(isSuccess)
    dispatch(getRoster(projectRep.projectRepresentationId))

    // eslint-disable-next-line
  }, [projectRep, message])

  const onCloseResetAll = () => {
    setRosterId(0)
    setRosterName('')

    setHourPerShift(0)
    setShiftPerDay(0)
    setEmployeeRelativeTimeOn(0)
    setEmployeeRelativeTimeOff(0)
    setRelativeProductionTime(0)
    setRelativeNonProductionTime(0)
    setNotes('')
  }

  const onClickEdit = (row) => {
    setRosterId(row.rosterId)
    setRosterName(row.rosterName)

    setHourPerShift(row.hoursPerShift)
    setShiftPerDay(row.numShiftsPerDay)
    setEmployeeRelativeTimeOn(row.timeOn)
    setEmployeeRelativeTimeOff(row.timeOff)
    setRelativeProductionTime(row.relProdTime)
    setRelativeNonProductionTime(row.relNonProdTime)
    setNotes(row.notes)
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
        let param = { id: row.rosterId }
        dispatch(deleteRoster(param))

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
      name: 'Roster Name',
      selector: (row) => row.rosterName,
      sortable: true,
    },
    {
      name: 'Hours per Shift',
      selector: (row) => row.hoursPerShift,
      sortable: true,
    },
    {
      name: 'Shifst per Day',
      selector: (row) => row.numShiftsPerDay,
      sortable: true,
    },
    {
      name: 'Employee Relative Time On',
      selector: (row) => row.timeOn,
      sortable: true,
    },
    {
      name: 'Employee Relative Time Off',
      selector: (row) => row.timeOff,
      sortable: true,
    },
    {
      name: 'Relative Production Time',
      selector: (row) => row.relProdTime,
      sortable: true,
    },
    {
      name: 'Relative Non Production Time',
      selector: (row) => row.relNonProdTime,
      sortable: true,
    },
    {
      name: 'Notes',
      selector: (row) => row.notes,
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
    if (hoursPerShift === 0 || shiftsPerDay === 0) {
      return
    }

    if (form.checkValidity() === true) {
      let payload = {
        rosterId: rosterId,

        projectRepresentationId: projectRep.projectRepresentationId,
        rosterName: rosterName,
        hoursPerShift: Number(hoursPerShift),
        numShiftsPerDay: Number(shiftsPerDay),
        timeOn: Number(employeeRelativeTimeOn),
        timeOff: Number(employeeRelativeTimeOff),
        notes: notes,
        relProdTime: Number(relativeProductionTime),
        relNonProdTime: Number(relativeNonProductionTime),
      }

      if (rosterId > 0) {
        dispatch(putRoster(payload))
      } else {
        dispatch(postRoster(payload))
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
  // const ToastSuccess = (
  //   <CToast className="align-items-center" color="success">
  //     <div className="d-flex">
  //       <CToastBody>Data has been saved!</CToastBody>
  //       <CToastClose className="me-2 m-auto" />
  //     </div>
  //   </CToast>
  // )

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

  return (
    <>
      <Spinner loading={isLoading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>Roster</strong>
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
                    <CModalTitle>{rosterId > 0 ? 'Update Data' : 'Add Data'}</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Roster Name
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input roster name"
                          onInput={(e) => setRosterName(e.currentTarget.value)}
                          value={rosterName}
                          required
                        />
                        <CFormFeedback invalid>Roster Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Hour per Shift
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input hour per shift"
                          onInput={(e) => setHourPerShift(e.currentTarget.value)}
                          required
                          value={hoursPerShift}
                          className={Number(hoursPerShift) === 0 ? 'is-invalid' : ''}
                        />
                        <CFormFeedback invalid>Hours per Shift is required.</CFormFeedback>
                        <CFormFeedback invalid className={hoursPerShift === 0 ? 'd-block' : ''}>
                          Hours per Shift must be not 0.
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Shift per Day
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input shift per day"
                          onInput={(e) => setShiftPerDay(Math.round(e.currentTarget.value))}
                          required
                          value={shiftsPerDay}
                          className={Number(shiftsPerDay) === 0 ? 'is-invalid' : ''}
                        />
                        <CFormFeedback invalid>Shifts per Day is required.</CFormFeedback>
                        <CFormFeedback invalid className={shiftsPerDay < 0 ? 'd-block' : ''}>
                          Shifts per Day must be not 0.
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Employee Relative Time On
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Employee Relative time On"
                          onInput={(e) => setEmployeeRelativeTimeOn(e.currentTarget.value)}
                          required
                          value={employeeRelativeTimeOn}
                        />
                        <CFormFeedback invalid>
                          Employee Relative time On is required.
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Employee Relative Time Off
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Employee Relative Time Off"
                          onInput={(e) => setEmployeeRelativeTimeOff(e.currentTarget.value)}
                          required
                          value={employeeRelativeTimeOff}
                        />
                        <CFormFeedback invalid>
                          Employee Relative Time Off is required.
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Relative Production Time
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Relative Production Time"
                          onInput={(e) => setRelativeProductionTime(e.currentTarget.value)}
                          required
                          value={relativeProductionTime}
                        />
                        <CFormFeedback invalid>Relative Production Time is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Relative Non Production Time
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Relative Non Production Time"
                          onInput={(e) => setRelativeNonProductionTime(e.currentTarget.value)}
                          required
                          value={relativeNonProductionTime}
                        />
                        <CFormFeedback invalid>
                          Relative Non Production Time is required.
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                        Notes
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormTextarea
                          size="sm"
                          rows="3"
                          placeholder="Please input Notes"
                          value={notes}
                          onChange={(e) => setNotes(e.currentTarget.value)}
                        ></CFormTextarea>
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
