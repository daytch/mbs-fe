import React, { useState, useRef, useEffect, useCallback } from 'react'
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
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CToastBody,
  CToastClose,
  CToaster,
  CForm,
  CFormFeedback,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import {
  getProjectCategories,
  getProjectSubCategories,
  getProjectCountry,
  postProject,
  getProjects,
  putProject,
  deleteProject,
  getListProjectSubCategories,
  setProject,
  setProjectRepresentation,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const CurrentProject = (props) => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const pageType = props ? props.pageType : ''
  const dispatch = useDispatch()
  const [projectId, setProjectId] = useState(0)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [subcategory, setSubcategory] = useState(0)
  const [subcategoryName, setSubcategoryName] = useState('')
  const [country, setCountry] = useState(0)
  // eslint-disable-next-line
  const [countryName, setCountryName] = useState('')
  const [currencyAbbr, setCurrencyAbbr] = useState('')
  const [note, setNote] = useState('')
  const [validated, setValidated] = useState(false)

  const proj = useSelector((state) => state.Navigation.project)
  // eslint-disable-next-line no-unused-vars
  const [selectedRows, setSelectedRows] = useState([proj])
  const handleChange = useCallback(
    (state) => {
      if (state) {
        localStorage.setItem('projectState', JSON.stringify(state))
        state.allSelected = false
        if (state.selectedRows.length === 2) {
          dispatch(setProjectRepresentation({}))
          state.selectedRows.pop()
          dispatch(setProject(state.selectedRows[0]))
          setSelectedRows(state.selectedRows)
          window.location.reload()
        } else if (state.selectedRows.length < 2) {
          dispatch(setProjectRepresentation({}))
          dispatch(setProject(state.selectedRows[0]))
          setSelectedRows(state.selectedRows)
          window.location.reload()
        }
      } else {
        let lastState = JSON.parse(localStorage.getItem('projectState'))
        if (lastState) {
          setSelectedRows(lastState.selectedRows)
        }
      }
    },
    [dispatch],
  )

  // const rowSelectCritera = (row) => row.projectId === 17

  const loading = useSelector((state) => state.Project.loading)

  const err = useSelector((state) => state.Project.error)
  const msg = useSelector((state) => state.Project.message)
  const isDeleted = useSelector((state) => state.Project.isDeleted)
  const onCloseResetAll = () => {
    setProjectId('')
    setName('')
    setCategory('')
    setCategoryName('')
    setSubcategory('')
    setSubcategoryName('')
    setCountry('')
    setCountryName('')
    setCurrencyAbbr('')
    setNote('')
    setValidated(false)
  }

  const setMessageProcess = () => {
    if (err) {
      addToast(ToastError(err))
    } else if (msg && isDeleted) {
      addToast(ToastSuccessDelete)
    } else if (msg && !isDeleted) {
      addToast(ToastSuccess)
    }
  }

  // const rowSelectCritera = (row) => row.projectId === 17

  useEffect(() => {
    setMessageProcess()
    dispatch(getProjects())
    dispatch(getProjectCountry())
    dispatch(getProjectCategories())
    dispatch(getProjectSubCategories())
    dispatch(getProjectCountry())
    handleChange()
    // eslint-disable-next-line
  }, [msg, err])

  const projects = useSelector((state) => {
    return state.Project.dataProjects
  })
  const categories = useSelector((state) => {
    return state.Project.dataCategory
  })
  const subcategories = useSelector((state) => state.ProjectCategories.dataSubcategories)
  const countries = useSelector((state) => state.Country.dataCountry)
  const countriez = useSelector((state) => state.Country.dataCountries)

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

  const onClickEdit = (row) => {
    setProjectId(row.projectId)
    setName(row.projectName)

    if (row.projectCategoryID) {
      setCategory(row.projectCategoryID)
    }
    if (row.projectSubCategoryID) {
      setSubcategory(row.projectSubCategoryID)
    }
    if (row.countryId) {
      setCountry(row.countryId)
    }
    setNote(row.notes)
    setVisible(!visible)
  }

  const onClickDelete = (id) => {
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
        let param = { projectId: id }
        dispatch(deleteProject(param))
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
          onClick={() => onClickDelete(row.projectId)}
          className="mx-1"
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </>
    )
  }

  const columns = [
    {
      name: 'Project Name',
      selector: (row) => row.projectName,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.projectCategoryName,
      sortable: true,
    },
    {
      name: 'Sub-category',
      selector: (row) => row.projectSubCategoryName,
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
      let isValid = true
      if (category <= 0) {
        isValid = false
      }
      if (subcategory <= 0) {
        isValid = false
      }
      if (country <= 0) {
        isValid = false
      }
      if (!isValid) {
        addToast(ToastValidate)
      } else {
        let payload = {
          projectId: Number(projectId),
          projectName: name,
          projectCategoryID: category,
          projectSubCategoryID: subcategory,
          projectCategoryName: categoryName,
          projectSubCategoryName: subcategoryName,
          countryId: country,
          countryName: countryName,
          currencyAbbr: currencyAbbr,
          notes: note,
        }

        if (projectId > 0) {
          dispatch(putProject(payload))
          setVisible(!visible)
        } else {
          dispatch(postProject(payload))
          setVisible(!visible)
        }
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

  const ToastValidate = (
    <CToast className="align-items-center" color="warning">
      <div className="d-flex">
        <CToastBody>Please Fill Mandatory Field</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const onChangeDropdown = (e) => {
    let id = Number(e.target.value)
    let name = e.currentTarget[e.currentTarget.options.selectedIndex].text
    switch (e.currentTarget.id) {
      case 'category':
        dispatch(getListProjectSubCategories(id))
        setCategory(id)
        setCategoryName(name)
        break
      case 'subcategory':
        setSubcategory(id)
        setSubcategoryName(name)
        break
      case 'country':
        let arrCountry = countriez.filter((item) => item.countryId === id)
        if (arrCountry.length > 0) {
          setCurrencyAbbr(arrCountry[0].currencyAbbr)
        }
        setCountry(id)
        setCountryName(name)
        break
      default:
        break
    }
  }

  return (
    <>
      <Spinner loading={loading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            {!pageType && (
              <CCardHeader>
                <strong>Current Project</strong>
              </CCardHeader>
            )}
            <CCardBody>
              {!pageType && (
                <CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
                  Create New
                </CButton>
              )}

              <CModal
                size="lg"
                alignment="center"
                scrollable
                visible={visible}
                onClose={() => onCloseResetAll()}
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
                      <CFormLabel htmlFor="projectName" className="col-sm-3 col-form-label">
                        Name
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          value={name}
                          placeholder="Please input project name"
                          onInput={(e) => setName(e.currentTarget.value)}
                          required
                        />
                        <CFormFeedback invalid>Project Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="category" className="col-sm-3 col-form-label">
                        Category
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Category"
                          options={categories}
                          size="sm"
                          required
                          id="category"
                          onChange={onChangeDropdown}
                          value={category}
                        />
                        <CFormFeedback invalid>Category is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="subCategory" className="col-sm-3 col-form-label">
                        Sub-Category
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Sub-Category"
                          options={subcategories}
                          size="sm"
                          required
                          value={subcategory}
                          id="subcategory"
                          onChange={onChangeDropdown}
                        />
                        <CFormFeedback invalid>Sub-Category is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="country" className="col-sm-3 col-form-label">
                        Country
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Country"
                          options={countries}
                          size="sm"
                          required
                          value={country}
                          id="country"
                          onChange={onChangeDropdown}
                        />
                      </CCol>
                      <CFormFeedback invalid>Country is required.</CFormFeedback>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="notes" className="col-sm-3 col-form-label">
                        Notes
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormTextarea
                          size="sm"
                          rows="3"
                          placeholder="Please input Notes"
                          value={note}
                          onChange={(e) => setNote(e.currentTarget.value)}
                          required
                        ></CFormTextarea>
                        <CFormFeedback invalid>Notes is required.</CFormFeedback>
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
              {projects.length > 0 ? (
                <DataTable
                  columns={columns}
                  data={projects}
                  selectableRows
                  onSelectedRowsChange={handleChange}
                  selectableRowsNoSelectAll={true}
                  pagination
                />
              ) : (
                <h1>Loading. . .</h1>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CurrentProject

CurrentProject.propTypes = {
  pageType: PropTypes.string,
}
