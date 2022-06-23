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
  CFormSwitch,
  CFormSelect,
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
  getProjectCategories,
  getListProjectCategories,
  putProjectCategory,
  postProjectCategory,
  deleteProjectCategory,
  putProjectSubCategory,
  postProjectSubCategory,
  deleteProjectSubCategory,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'

const ProjectCategories = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [category, setCategory] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [subCategory, setSubCategory] = useState(0)
  const [subCategoryName, setSubCategoryName] = useState('')
  const [isSubCategory, setIsSubCategory] = useState(false)
  // eslint-disable-next-line
  const [countryName, setCountryName] = useState('')
  const [validated, setValidated] = useState(false)

  const loading = useSelector((state) => state.ProjectCategories.loading)
  const onProcessData = useSelector((state) => state.ProjectCategories.onProcessData)
  const errorData = useSelector((state) => state.ProjectCategories.error)
  const successMessage = useSelector((state) => state.ProjectCategories.successMessage)
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
    dispatch(getListProjectCategories())
    dispatch(getProjectCategories())
    setMessageProcess(onProcessData)
    // eslint-disable-next-line
  }, [onProcessData])

  const categories = useSelector((state) => {
    return state.Project.dataCategory
  })
  const listcategories = useSelector((state) => state.ProjectCategories.datas)
  const onCloseResetAll = () => {
    setCategory(0)
    setCategoryName('')
    setSubCategory(0)
    setSubCategoryName('')
    setIsSubCategory(false)
  }

  const onClickEdit = (row) => {
    setIsSubCategory(row.projectSubCategoryId === 0 ? false : true)
    setCategory(row.projectCategoryId)
    setCategoryName(row.projectCategoryName)
    setSubCategory(row.projectSubCategoryId)
    setSubCategoryName(row.projectSubCategoryName)
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
        let param = {}
        if (row.projectSubCategoryId === 0) {
          param = { id: row.projectCategoryId }
          dispatch(deleteProjectCategory(param))
        } else {
          param = { id: row.projectSubCategoryId }
          dispatch(deleteProjectSubCategory(param))
        }
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
      setValidated(true)
      return
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      let isValid = true
      let payload = {}
      if (isSubCategory) {
        // sub category
        if (category < 1) {
          isValid = false
          return
        }
        if (categoryName === '') {
          isValid = false
          addToast(
            // show toast
            <CToast
              showIcon
              title="Error"
              icon={<CIcon name="cil-ban" />}
              variant="danger"
              autohide
            >
              <CToastBody>Please select category</CToastBody>
            </CToast>,
          )
          setValidated(true)
          return
        }
        if (subCategoryName === '') {
          isValid = false
          addToast(
            // show toast
            <CToast
              showIcon
              title="Error"
              icon={<CIcon name="cil-ban" />}
              variant="danger"
              autohide
            >
              <CToastBody>Please enter sub-category</CToastBody>
            </CToast>,
          )
          return
        }

        if (isValid) {
          payload = {
            projectSubCategoryId: subCategory,
            projectCategoryID: category,
            projectSubCategoryName: subCategoryName,
          }
          if (subCategory > 0) {
            dispatch(putProjectSubCategory(payload))
          } else {
            dispatch(postProjectSubCategory(payload))
          }
        }
      } else {
        if (categoryName === '') {
          isValid = false
          addToast(
            // show toast
            <CToast
              showIcon
              title="Error"
              icon={<CIcon name="cil-ban" />}
              variant="danger"
              autohide
            >
              <CToastBody>Please fill category name</CToastBody>
            </CToast>,
          )
          return
        } else {
          payload = {
            projectCategoryId: category,
            projectCategoryName: categoryName,
            projectSubCategories: [],
          }
          if (category > 0) {
            dispatch(putProjectCategory(payload))
          } else {
            dispatch(postProjectCategory(payload))
          }
        }
      }
      // setVisible(!visible)
      // setTimeout(() => {
      //   addToast(ToastSuccess)
      // }, 1500)
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
  const onChangeDropdown = (e) => {
    let id = Number(e.target.value)
    let name = e.currentTarget[e.currentTarget.options.selectedIndex].text
    switch (e.currentTarget.id) {
      case 'category':
        setCategory(id)
        setCategoryName(name)
        break
      case 'subcategory':
        setSubCategoryName(name)
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
            <CCardHeader>
              <strong>Project Categories</strong>
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
                    {isSubCategory ? (
                      <>
                        <CRow className="mb-3">
                          <CFormLabel htmlFor="category" className="col-sm-2 col-form-label">
                            Category
                          </CFormLabel>
                          <CCol sm={10}>
                            <CFormSelect
                              aria-label="Please select Category"
                              options={categories}
                              size="sm"
                              required
                              id="category"
                              onChange={onChangeDropdown}
                              value={category}
                              className={Number(category) < 1 ? 'is-invalid' : ''}
                            />
                            <CFormFeedback invalid className={category < 1 ? 'd-block' : ''}>
                              Category is required.
                            </CFormFeedback>
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CFormLabel htmlFor="subCategory" className="col-sm-2 col-form-label">
                            Sub-Category
                          </CFormLabel>
                          <CCol sm={10}>
                            <CFormInput
                              size="sm"
                              value={subCategoryName}
                              placeholder="Please input Sub-Category name"
                              onInput={(e) => setSubCategoryName(e.currentTarget.value)}
                              required
                            />
                            <CFormFeedback invalid>Category Name is required.</CFormFeedback>
                          </CCol>
                        </CRow>
                      </>
                    ) : (
                      <CRow className="mb-3">
                        <CFormLabel htmlFor="subCategory" className="col-sm-2 col-form-label">
                          Category
                        </CFormLabel>
                        <CCol sm={10}>
                          <CFormInput
                            size="sm"
                            value={categoryName}
                            placeholder="Please input project name"
                            onInput={(e) => setCategoryName(e.currentTarget.value)}
                            required
                          />
                          <CFormFeedback invalid>Category Name is required.</CFormFeedback>
                        </CCol>
                      </CRow>
                    )}

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="projectName" className="col-sm-2 col-form-label">
                        is Sub-Category ?
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormSwitch
                          label="Sub-Category"
                          id="formSwitchCheckDefault"
                          onChange={() => setIsSubCategory(!isSubCategory)}
                          checked={isSubCategory}
                        />
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

              <DataTable columns={columns} data={listcategories} pagination />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectCategories
