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
  // CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'

import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
// import { deleteCurrencies, postCurrencies, putCurrencies } from 'src/redux/actions/countryAction'
import {
  getLevies,
  postLevy,
  deleteLevy,
  putLevy,
  getLevyCategoryOption,
} from '../../redux/actions'

const LevyCategories = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()

  const [levyId, setLevyId] = useState(0)
  const [levyCategoryId, setLevyCategoryId] = useState(0)

  const [levyName, setLevyName] = useState('')
  const [levyType, setLevyType] = useState(0)
  const [levyRate, setLevyRate] = useState(0)

  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  // const loading = useSelector((state) => state.InfraChecklist.loading)
  const isLoading = useSelector((state) => state.Levy.loading)
  const datas = useSelector((state) => state.Levy.data)
  const dataType = useSelector((state) => state.Levy.dataType)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)
  const isSuccess = useSelector((state) => state.Levy.isSuccess)
  const message = useSelector((state) => state.Levy.message)
  const levyCategoryOption = useSelector((state) => state.LevyCategory.dataOption)

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
    dispatch(getLevyCategoryOption(projectRep.projectRepresentationId))
    dispatch(getLevies(projectRep.projectRepresentationId))

    // eslint-disable-next-line
  }, [projectRep, message])

  const onCloseResetAll = () => {
    setLevyId(0)
    setLevyName('')
    setLevyType(0)
    setLevyCategoryId(0)
    setLevyRate(0)
  }

  const onClickEdit = (row) => {
    setLevyId(row.levyId)
    setLevyName(row.levyName)
    setLevyCategoryId(row.levyCategoryId)
    setLevyType(row.levyType)
    setLevyRate(row.levyRate)

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
        let param = { id: row.levyId }
        dispatch(deleteLevy(param))
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
      name: 'Levy Category Name',
      selector: (row) => row.levyCategoryName,
      sortable: true,
    },
    {
      name: 'Levy Name',
      selector: (row) => row.levyName,
      sortable: true,
    },
    {
      name: 'Levy Type',
      selector: (row) => row.levyType,
      sortable: true,
    },
    {
      name: 'Levy Rate(%)',
      selector: (row) => row.levyRate,
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
        levyCategoryId: levyCategoryId,

        projectRepresentationId: projectRep.projectRepresentationId,
        levyName,
        levyType,
        levyRate,
        levyId,
      }

      if (levyId > 0) {
        dispatch(putLevy(payload))
      } else {
        dispatch(postLevy(payload))
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
              <strong>Levies </strong>
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
                    <CModalTitle>{levyCategoryId > 0 ? 'Update Data' : 'Add Data'}</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Levy Category Name
                      </CFormLabel>

                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select Levy Category"
                          options={levyCategoryOption}
                          size="sm"
                          onChange={(e) => setLevyCategoryId(e.currentTarget.value)}
                          value={levyCategoryId}
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Levy Name
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input levy name"
                          onInput={(e) => setLevyName(e.currentTarget.value)}
                          value={levyName}
                          required
                        />
                        <CFormFeedback invalid>Levy Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Levy Type
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select Levy Type"
                          options={dataType}
                          size="sm"
                          onChange={(e) => setLevyType(e.currentTarget.value)}
                          value={levyType}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Levy Rate
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input levy name"
                          onInput={(e) => setLevyRate(e.currentTarget.value)}
                          value={levyRate}
                          min="0"
                          max="100"
                          step=".01"
                          required
                        />
                        <CFormFeedback invalid>Levy Rate is required.</CFormFeedback>
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

export default LevyCategories
