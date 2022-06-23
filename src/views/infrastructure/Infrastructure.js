/* eslint-disable react/no-unescaped-entities */
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
  CFormCheck,
  CFormTextarea,
  CFormFeedback,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import {
  getResourcesInfra,
  postResourcesInfra,
  putResourcesInfra,
  deleteResourcesInfra,
  getCurrencies,
  getInfraChecklist,
  getLevyCategories,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import MainCost from './MainCost'
import './Infrastructure.css'
import { isEmptyNullOrUndefined } from 'src/functions'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

const Infrastructure = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [id, setId] = useState(0)
  const [eqtype, setEqtype] = useState('')
  const [currency, setCurrency] = useState('')
  const [countryId, setCountryId] = useState('')
  const [disposalValueMethod, setDisposalValueMethod] = useState(1)
  const [disposalPercentage, setDisposalPercentage] = useState('')
  const [disposalValue, setDisposalValue] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [spareCostMethod, setSpareCostMethod] = useState(1)
  const [equipmentModelCosts, setEquipmentModelCosts] = useState([])
  const [isNew, setIsNew] = useState(true)
  const [units, setUnits] = useState('')
  const [note, setNote] = useState('')

  const [infraName, setInfraName] = useState('')
  const [infraType] = useState([
    { value: 'Building', label: 'Building' },
    { value: 'Road', label: 'Road' },
  ])

  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )

  const loading = useSelector((state) => state.ResourcesInfrastructure.loading)
  const err = useSelector((state) => state.ResourcesInfrastructure.error)
  const msg = useSelector((state) => state.ResourcesInfrastructure.message)
  const isDeleted = useSelector((state) => state.ResourcesInfrastructure.isDeleted)

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
    setMessageProcess()

    dispatch(getResourcesInfra(projectRepresentation.projectRepresentationId))
    dispatch(getCurrencies())
    dispatch(getInfraChecklist())
    dispatch(getLevyCategories(projectRepresentation.projectRepresentationId))
    // eslint-disable-next-line
  }, [msg, err])

  const updateEquipmentModelCosts = (index, id, isi) => {
    let dataCost = {
      rowId: index,
      equipmentModelCostComponentId: 0,
      costComponentName: '',
      units: '',
      quantity: 0,
      countryId: 0,
      componentCost: 0,
      levyCategoryID: 0,
    }
    let data = [...equipmentModelCosts]
    let tempData = data[index]
    if (tempData) {
      tempData[id] = isi
      setEquipmentModelCosts(data)
    } else {
      tempData = []
      dataCost[id] = isi
      tempData.push(dataCost)
      if (data.length > 0) {
        setEquipmentModelCosts(data.concat(tempData))
      } else {
        setEquipmentModelCosts(tempData)
      }
    }
  }

  const data = useSelector((state) => state.ResourcesInfrastructure.dataInfra)
  const currencies = useSelector((state) => state.Country.dataCurrencies)
  const InfraChecklist = useSelector((state) => {
    if (state.InfraChecklist.dataInfra) {
      let arrInfra = [] //[{ value: -1, label: 'Please select Cost Index' }]
      state.InfraChecklist.dataInfra.forEach((item) => {
        arrInfra.push({
          value: item.infrastructureName,
          label: item.infrastructureName,
        })
      })
      return arrInfra
    }
  })
  const levyCategories = useSelector((state) => {
    let arrLexyCategories = []
    if (state.LevyCategory.data) {
      if (state.LevyCategory.data.length > 0) {
        arrLexyCategories.push({ value: -1, label: 'Select Levy Category' })
        state.LevyCategory.data.forEach((item) => {
          arrLexyCategories.push({
            value: item.levyCategoryId,
            label: item.levyCategoryName,
          })
        })
      }
    }
    return arrLexyCategories
  })

  const onCloseResetAll = () => {
    setId('')
    setInfraName('')
    setEqtype('')
    setDisposalValueMethod('')
    setCountryId('')
    setUnits('')
    setNote('')
    setCurrency('')
    setDisposalValue('')
    setDisposalPercentage('')
    setEquipmentModelCosts([])
  }

  const onClickEdit = (row) => {
    setValidated(false)
    setIsNew(false)
    setId(row.infraStructureId)
    setInfraName(row.infrastructureName)
    setNote(row.notes)
    setDisposalValueMethod(Number(row.disposalValueMethod))
    setUnits(row.units)
    setSpareCostMethod(Number(row.spareCostMethod))
    setEqtype(row.infrastructureTypeName)
    setEquipmentModelCosts(row.infrastructureCostComponents)
    setCountryId(row.countryId)
    setCurrency(row.currencyAbbr)
    setDisposalValue(row.disposalValue ? Number(row.disposalValue) : '')
    if (row.disposalValueRatio > 0) {
      setDisposalPercentage(row.disposalValueRatio)
    }
    setSpareCostMethod(row.sparesCostMethod)
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
        let param = { id: row.infraStructureId }
        dispatch(deleteResourcesInfra(param))

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
  const caseInsensitiveSort = (rowA, rowB) => {
    const a = rowA.infrastructureName.toLowerCase()
    const b = rowB.infrastructureName.toLowerCase()

    if (a > b) {
      return 1
    }

    if (b > a) {
      return -1
    }

    return 0
  }

  const columns = [
    {
      name: 'Infrastructure Name',
      selector: (row) => row.infrastructureName,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Currency',
      selector: (row) => row.currencyAbbr,
      sortable: false,
    },
    {
      name: 'Type',
      selector: (row) => row.infrastructureTypeName,
      sortable: false,
    },
    {
      name: 'Notes',
      selector: (row) => row.notes,
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

    if (!isEmptyNullOrUndefined(infraName) && !isEmptyNullOrUndefined(eqtype)) {
      if (form.checkValidity() === true) {
        let payload = {}
        let dataMC = []

        equipmentModelCosts.forEach((item) => {
          if (item.componentCost && item.quantity) {
            let mcObj = {
              infraStructureCostComponentId: item.infraStructureCostComponentId,
              infrastructureId: id > 0 ? id : null,
              costComponentName: item.costComponentName,
              units: item.units,
              quantity: Number(item.quantity),
              countryId: Number(item.countryId),
              componentCost: Number(item.componentCost),
              levyCategoryID: item.levyCategoryId
                ? Number(item.levyCategoryId)
                : Number(item.levyCategoryID),
            }

            dataMC.push(mcObj)
          }
          if (item.countryId <= 0) {
            delete dataMC.countryId
          }
        })
        if (Number(id) < 1) {
          payload = {
            // infraStructureId: Number(id),
            projectRepresentationId: projectRepresentation.projectRepresentationId,
            infrastructureName: infraName,
            infrastructureTypeName: eqtype,
            units: units,
            disposalValueMethod: disposalValueMethod + '',
            countryId: countryId < 0 ? '' : Number(countryId),
            currencyAbbr: currency.toLowerCase().indexOf('select') > -1 ? '' : currency,
            disposalValue: Number(disposalValue),
            disposalValueRatio: Number(disposalPercentage),
            notes: note,
            infrastructureCostComponents: dataMC,
          }
        } else {
          payload = {
            infraStructureId: Number(id),
            projectRepresentationId: projectRepresentation.projectRepresentationId,
            infrastructureName: infraName,
            infrastructureTypeName: eqtype,
            units: units,
            disposalValueMethod: disposalValueMethod + '',
            countryId: countryId < 0 ? '' : Number(countryId),
            currencyAbbr:
              isEmptyNullOrUndefined(currency) && currency !== ''
                ? currencies.filter((item) => item.value === Number(countryId))[0].label
                : currency.toLowerCase().indexOf('select') > -1
                ? ''
                : currency,
            disposalValue: Number(disposalValue),
            disposalValueRatio: Number(disposalPercentage),
            notes: note,
            infrastructureCostComponents: dataMC,
          }
        }

        if (Number(countryId) <= 0) {
          delete payload.countryId
          delete payload.countryAbbr
        }
        if (id > 0) {
          dispatch(putResourcesInfra(payload))
        } else {
          dispatch(postResourcesInfra(payload))
        }
      }
      setVisible(!visible)
      // setTimeout(() => {
      //   addToast(ToastSuccess)
      // }, 1500)
    } else {
      setVisible(!visible)
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

  const renderTables = () => {
    return (
      <MainCost
        equipmentModelCosts={equipmentModelCosts}
        updateEquipmentModelCosts={updateEquipmentModelCosts}
        currencies={currencies}
        levyCategories={levyCategories}
        isNew={isNew}
      />
    )
  }

  const onChangeDisposalMethod = (e) => {
    let val = Number(e.target.value)
    Swal.fire({
      title: 'Are you sure?',
      text:
        val === 1
          ? 'Disposal Percentage will be set to empty'
          : 'Do you want to delete currency and disposal value ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        setDisposalValueMethod(val)
        if (val === 1) {
          setDisposalPercentage('')
        } else {
          setDisposalValue('')
          setCountryId(-1)
        }
      }
    })
  }

  const onChangeInfraName = (e) => {
    setInfraName(e.value)
  }

  return (
    <>
      <Spinner loading={loading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>Infrastructure</strong>
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
                        Infrastructure Name
                      </CFormLabel>
                      <CCol sm={8}>
                        <CreatableSelect
                          isClearable
                          onChange={onChangeInfraName}
                          options={InfraChecklist}
                          value={InfraChecklist.filter((item) => item.label === infraName)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Infrastructure Type
                      </CFormLabel>
                      <CCol sm={8}>
                        <Select
                          options={infraType}
                          onChange={(e) => setEqtype(e.value)}
                          isClearable={true}
                          value={infraType.filter((item) => item.value === eqtype)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="units" className="col-sm-4 col-form-label">
                        Units
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input Units"
                          value={units}
                          onChange={(e) => setUnits(e.currentTarget.value)}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Disposal Value Method
                      </CFormLabel>
                      <CCol sm={8}>
                        <CRow>
                          <CCol sm={4}>
                            <CFormCheck
                              type="radio"
                              value="1"
                              name="disposalValueMethod"
                              id="disposalValueMethod1"
                              label="Monetary Value"
                              checked={Number(disposalValueMethod) === 1}
                              onChange={onChangeDisposalMethod}
                            />
                          </CCol>
                          <CCol sm={8}>
                            <CFormCheck
                              type="radio"
                              value="2"
                              name="disposalValueMethod"
                              id="disposalValueMethod2"
                              label="Percentage"
                              checked={Number(disposalValueMethod) === 2}
                              onChange={onChangeDisposalMethod}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Currency
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormSelect
                          aria-label="Please select Country"
                          options={currencies}
                          size="sm"
                          value={countryId}
                          id="curency"
                          onChange={(e) => {
                            setCountryId(e.currentTarget.value)
                            setCurrency(e.target.options[e.target.selectedIndex].text)
                          }}
                          disabled={disposalValueMethod === 2 ? true : false}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Disposal Value
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Disposal Value"
                          value={disposalValue}
                          onChange={(e) => setDisposalValue(e.currentTarget.value)}
                          disabled={Number(disposalValueMethod) === 2 ? true : false}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Disposal Percentage
                      </CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            type="number"
                            size="sm"
                            placeholder="Please input Disposal Percentage"
                            value={disposalPercentage}
                            onChange={(e) =>
                              setDisposalPercentage(
                                e.currentTarget.value > 100 ? 100 : e.currentTarget.value,
                              )
                            }
                            disabled={Number(disposalValueMethod) === 1 ? true : false}
                          ></CFormInput>
                          <CInputGroupText id="basic-addon2">%</CInputGroupText>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                        Notes
                      </CFormLabel>
                      <CCol sm={8}>
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

                    <CRow>
                      <CCol sm={12}>{renderTables()}</CCol>
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
              {data && <DataTable columns={columns} data={data} pagination />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Infrastructure
