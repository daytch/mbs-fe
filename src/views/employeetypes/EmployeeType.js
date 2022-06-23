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
  CFormSelect,
  CFormFeedback,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import {
  getEmployeeType,
  postEmployeeType,
  putEmployeeType,
  deleteEmployeeType,
  getCurrencies,
  getRoster,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import TableDetail from './TableDetail'
import './EmployeeType.css'
import { isEmptyNullOrUndefined } from 'src/functions'

const EmployeeType = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  // const [currency, setCurrency] = useState('')
  const [dataDetail, setDataDetail] = useState([])
  const [isNew, setIsNew] = useState(true)
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  const [paymentMethod] = useState([
    { value: -1, label: 'Please select Payment Method' },
    { value: 1, label: 'Salaried' },
    { value: 2, label: 'TimeRate' },
  ])
  const [cover, setCover] = useState('')
  const [coverLeave] = useState([
    { value: -1, label: 'Please select Cover Leave' },
    { value: 1, label: 'Yes' },
    { value: 2, label: 'No' },
  ])

  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  const loading = useSelector((state) => state.ResourcesEmployeeType.loading)

  const err = useSelector((state) => state.ResourcesEmployeeType.error)
  const msg = useSelector((state) => state.ResourcesEmployeeType.message)
  const isDeleted = useSelector((state) => state.ResourcesEmployeeType.isDeleted)
  const rosters = useSelector((state) => {
    if (state.Roster.data?.length > 0) {
      let ros = [{ value: -1, label: 'Please select Roster' }]
      state.Roster.data.forEach((item) => {
        ros.push({
          value: item.rosterId,
          label: item.rosterName,
        })
      })
      return ros
    }
  })

  const setMessageProcess = () => {
    if (err) {
      addToast(ToastError(err))
    } else if (msg && isDeleted) {
      addToast(ToastSuccessDelete)
    } else if (msg && !isDeleted) {
      addToast(ToastSuccess)
    }
  }

  useEffect(() => {
    dispatch(getEmployeeType(projectRepresentation.projectRepresentationId))
    dispatch(getCurrencies())
    dispatch(getRoster(projectRepresentation.projectRepresentationId))
    setMessageProcess()
    // eslint-disable-next-line
  }, [msg, err])

  const data = useSelector((state) => state.ResourcesEmployeeType.data)
  const currencies = useSelector((state) => state.Country.dataCurrencies)

  const onCloseResetAll = () => {
    setId('')
    setName('')
    setCover('')
    setDataDetail([])
    setValidated(true)
  }

  const onClickEdit = (row) => {
    setValidated(false)
    setIsNew(false)

    setId(row.employeeTypeId)
    setName(row.employeeTypeName)
    setCover(row.coverLeave ? 1 : 2)
    setDataDetail(row.listEmployeeTypeRostered)
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
        let param = { id: row.employeeTypeId }
        dispatch(deleteEmployeeType(param))

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
      name: 'Employee Name',
      selector: (row) => row.employeeTypeName,
      sortable: true,
      // sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Cover Leave',
      selector: (row) => {
        return row.coverLeave ? 'Yes' : 'No'
      },
      sortable: false,
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

    if (!isEmptyNullOrUndefined(name)) {
      if (form.checkValidity() === true) {
        let payload = {}

        if (!isEmptyNullOrUndefined(id) && id > 0) {
          payload = {
            employeeTypeId: Number(id),
            projectRepresentationId: projectRepresentation.projectRepresentationId,
            employeeTypeName: name,
            coverLeave: cover === '1' ? true : false,
            listEmployeeTypeRostered: dataDetail,
          }
        } else {
          payload = {
            projectRepresentationId: projectRepresentation.projectRepresentationId,
            employeeTypeName: name,
            coverLeave: cover === '1' ? true : false,
            listEmployeeTypeRostered: dataDetail,
          }
        }

        if (id > 0) {
          dispatch(putEmployeeType(payload))
        } else {
          dispatch(postEmployeeType(payload))
        }
      }
      setVisible(!visible)
    } else {
      // setVisible(!visible)
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

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const updateDataDetail = (index, id, isi) => {
    let dataEmpType = {
      employeeTypeRosteredId: 0,
      employeeTypeId: 0,
      rosterId: 0,
      countryId: 0,
      annualCost: 0,
      annualLeave: 0,
      sicknessLeave: 0,
      otherLeave: 0,
      paymentMethod: 0,
    }
    let dataD = [...dataDetail]
    let tempData = dataD[index]
    if (tempData) {
      tempData[id] = isi
      setDataDetail(dataD)
    } else {
      tempData = []
      dataEmpType[id] = isi
      tempData.push(dataEmpType)
      if (dataD.length > 0) {
        setDataDetail(dataD.concat(tempData))
      } else {
        setDataDetail(tempData)
      }
    }
  }

  return (
    <>
      <Spinner loading={loading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>Employee Type</strong>
            </CCardHeader>
            <CCardBody>
              <CButton
                color="primary"
                size="sm"
                onClick={() => {
                  setValidated(false)
                  setIsNew(true)
                  setVisible(!visible)
                }}
              >
                Create New
              </CButton>

              <CModal
                size="xl"
                alignment="center"
                scrollable
                visible={visible}
                onClose={onCloseResetAll}
              >
                <CModalHeader className="px-5">
                  <CModalTitle>Add Data</CModalTitle>
                </CModalHeader>
                <CModalBody className="px-5">
                  <CForm
                    className="g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Employee Name
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          value={name}
                          placeholder="Please input Employee Name"
                          onInput={(e) => setName(e.currentTarget.value)}
                          required
                        />
                        <CFormFeedback invalid>Employee Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Cover Leave
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select cover leave"
                          options={coverLeave}
                          size="sm"
                          onChange={(e) => setCover(e.currentTarget.value)}
                          value={cover}
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={12}>
                        <TableDetail
                          dataDetail={dataDetail}
                          updateDataDetail={updateDataDetail}
                          currencies={currencies}
                          rosters={rosters}
                          paymentMethod={paymentMethod}
                          isNew={isNew}
                        />
                      </CCol>
                    </CRow>
                  </CForm>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)} size="sm">
                    Close
                  </CButton>
                  <CButton color="primary" onClick={handleSubmit} type="submit" size="sm">
                    Save changes
                  </CButton>
                </CModalFooter>
              </CModal>
              {data && <DataTable data={data} columns={columns} pagination />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeeType
