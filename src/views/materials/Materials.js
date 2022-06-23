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
  CFormInput,
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
  getMaterials,
  putMaterials,
  postMaterials,
  deleteMaterials,
  getLevyCategories,
  getCurrencies,
  getCostIndices,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import { isEmptyNullOrUndefined } from 'src/functions'

const Materials = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [resourceId, setResourceId] = useState(0)
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [countryId, setCountryId] = useState(0)
  // eslint-disable-next-line
  const [countryName, setCountryName] = useState('')
  const [currencyAbbr, setCurrencyAbbr] = useState('')
  const [cost, setCost] = useState('')
  const [resourcesTypes] = useState([
    { value: -1, label: 'Please select Resource Type' },
    { value: 1, label: 'Material' },
    { value: 2, label: 'Service' },
  ])
  const [resourceType, setResourceType] = useState('')
  const [resourceTypeId, setResourceTypeId] = useState(0)
  const [levyCategoryId, setLevyCategoryId] = useState(0)
  const [costIndexId, setCostIndexId] = useState(0)
  const [validated, setValidated] = useState(false)
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )

  const proj = useSelector((state) => state.Navigation.project)
  const costIndexs = useSelector((state) => {
    if (state.FinanceCostIndices.dataCostIndices) {
      let arrLevies = [{ value: -1, label: 'Please select Cost Index' }]
      state.FinanceCostIndices.dataCostIndices.map((item) =>
        arrLevies.push({
          value: item.costIndexId,
          label: item.costIndexName,
        }),
      )
      return arrLevies
    }
  })
  // eslint-disable-next-line no-unused-vars
  const [selectedRows, setSelectedRows] = useState([proj])

  const loading = useSelector((state) => state.ResourcesMaterials.loading)

  const err = useSelector((state) => state.ResourcesMaterials.error)
  const msg = useSelector((state) => state.ResourcesMaterials.message)
  const isDeleted = useSelector((state) => state.ResourcesMaterials.isDeleted)
  const onCloseResetAll = () => {
    setResourceId('')
    setName('')
    setLevyCategoryId('')
    setCostIndexId('')
    setCountryId('')
    setCost('')
    setResourceType('')
    setResourceTypeId('')
    setUnit('')
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

  const currencies = useSelector((state) => state.Country.dataCurrencies)
  const levyCategory = useSelector((state) => {
    if (state.LevyCategory.data) {
      let arrLevies = [{ value: -1, label: 'Please select Levy Category' }]
      state.LevyCategory.data.map((item) =>
        arrLevies.push({
          value: item.levyCategoryId,
          label: item.levyCategoryName,
        }),
      )
      return arrLevies
    }
  })

  useEffect(() => {
    setMessageProcess()
    dispatch(
      getMaterials({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
    )
    dispatch(
      getCostIndices({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
    )
    dispatch(getLevyCategories(projectRepresentation.projectRepresentationId))
    dispatch(getCurrencies())

    // eslint-disable-next-line
  }, [msg, err])

  const materials = useSelector((state) => state.ResourcesMaterials.data)

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
    setResourceId(row.resourceId ? row.resourceId : null)
    setName(row.resourceName)
    setLevyCategoryId(row.levyCategoryId)
    setCostIndexId(row.costIndexId)
    setCountryId(row.countryId)
    setCost(row.resourceCost)
    setResourceType(row.resourceType)
    setResourceTypeId(row.resourceType.toLowerCase() === 'material' ? 1 : 2)
    setUnit(row.units)
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
        let param = { resourceId: id }
        dispatch(deleteMaterials(param))
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
          onClick={() => onClickDelete(row.resourceId)}
          className="mx-1"
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </>
    )
  }

  const columns = [
    {
      name: 'Material / Service Name',
      selector: (row) => row.resourceName,
      sortable: true,
      width: '13rem',
    },
    {
      name: 'Units',
      selector: (row) => row.units,
      sortable: true,
    },
    {
      name: 'Currency',
      selector: (row) => row.currencyAbbr,
      sortable: true,
    },
    {
      name: 'Cost',
      selector: (row) => row.resourceCost,
      sortable: true,
    },
    {
      name: 'Resource Type',
      selector: (row) => row.resourceType,
      sortable: true,
    },
    {
      name: 'Levy Category',
      selector: (row) => row.levyCategoryName,
      sortable: true,
    },
    {
      name: 'Cost Index',
      selector: (row) => row.costIndexName,
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
      if (isEmptyNullOrUndefined(name)) {
        isValid = false
      }
      // if (costIndexId <= 0) {
      //   isValid = false
      // }
      // if (levyCategoryId <= 0) {
      //   isValid = false
      // }
      // if (countryId <= 0) {
      //   isValid = false
      // }
      // if (levyCategoryId <= 0) {
      //   isValid = false
      // }
      if (!isValid) {
        addToast(ToastValidate)
      } else {
        let payload = {
          resourceId: resourceId ? resourceId : null,
          projectRepresentationId: projectRepresentation.projectRepresentationId,
          resourceName: name,
          units: unit,
          countryId: countryId,
          currencyAbbr: currencyAbbr,
          resourceCost: Number(cost),
          resourceType: resourceType,
          costIndexId: costIndexId,
          levyCategoryId: levyCategoryId,
        }

        if (Number(payload.resourceId) > 0) {
          dispatch(putMaterials(payload))
          setVisible(!visible)
        } else {
          dispatch(postMaterials(payload))
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
      case 'currency':
        setCurrencyAbbr(name)
        setCountryId(id)
        break

      case 'resourcetype':
        setResourceType(name)
        setResourceTypeId(id)
        break

      case 'levy':
        setLevyCategoryId(id)
        break

      case 'costindex':
        setCostIndexId(id)
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
              <strong>Materials</strong>
            </CCardHeader>
            <CCardBody>
              <CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
                Create New
              </CButton>

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
                    <CRow className="mb-4">
                      <CFormLabel htmlFor="projectName" className="col-sm-4 col-form-label">
                        Material/Service Name
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          value={name}
                          placeholder="Please input material / service name"
                          onInput={(e) => setName(e.currentTarget.value)}
                          required
                        />
                        <CFormFeedback invalid>Material Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="category" className="col-sm-4 col-form-label">
                        Units
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          value={unit}
                          placeholder="Please input units"
                          onInput={(e) => setUnit(e.currentTarget.value)}
                          required
                        />
                        <CFormFeedback invalid>Unit is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="currency" className="col-sm-4 col-form-label">
                        Currency
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select currency"
                          options={currencies}
                          size="sm"
                          required
                          value={countryId}
                          id="currency"
                          onChange={onChangeDropdown}
                        />
                        <CFormFeedback invalid>Currency is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="cost" className="col-sm-4 col-form-label">
                        Cost
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          id="cost"
                          type="number"
                          min="0"
                          value={cost}
                          placeholder="Please input Cost"
                          onInput={(e) => {
                            if (Number(e.currentTarget.value) < 0) {
                              e.currentTarget.value = 0
                            } else {
                              setCost(e.currentTarget.value)
                            }
                          }}
                          required
                        />
                        <CFormFeedback invalid>Cost is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                        Resource Type
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select Resource type"
                          options={resourcesTypes}
                          size="sm"
                          required
                          value={resourceTypeId}
                          id="resourcetype"
                          onChange={onChangeDropdown}
                        />
                        <CFormFeedback invalid>Notes is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="country" className="col-sm-4 col-form-label">
                        Levy Category
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select Levy Category"
                          options={levyCategory}
                          size="sm"
                          required
                          value={levyCategoryId}
                          id="levy"
                          onChange={onChangeDropdown}
                        />
                      </CCol>
                      <CFormFeedback invalid>Levy Category is required.</CFormFeedback>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="costindex" className="col-sm-4 col-form-label">
                        Cost Index
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select Cost Index"
                          options={costIndexs}
                          size="sm"
                          required
                          value={costIndexId}
                          id="costindex"
                          onChange={onChangeDropdown}
                        />
                      </CCol>
                      <CFormFeedback invalid>Cost Index is required.</CFormFeedback>
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
              {materials.length > 0 ? (
                <DataTable columns={columns} data={materials} pagination />
              ) : (
                <h1>No Data.</h1>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Materials
