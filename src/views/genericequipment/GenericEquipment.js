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
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import {
  getGenericEquipment,
  postGenericEquipment,
  putGenericEquipment,
  deleteGenericEquipment,
  getCurrencies,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import MainCost from './MainCost'
import Spares from './Spares'
import './GenericEquipment.css'
import { isEmptyNullOrUndefined } from 'src/functions'
import CreatableSelect from 'react-select/creatable'
import { updateEquipmentType } from '../../redux/actions/genericEquipmentAction'

const GenericEquipment = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [eqtype, setEqtype] = useState('')
  const [spesification, setSpesification] = useState('')
  const [maintenanceManhourMethod, setMaintenanceManhourMethod] = useState(1)
  const [mmr, setMmr] = useState('')
  const [tef, setTef] = useState('')
  const [physicalAvailability, setPhysicalAvailability] = useState('')
  const [life, setLife] = useState('')
  const [currency, setCurrency] = useState('')
  const [countryId, setCountryId] = useState('')
  const [maxUtilisation, setMaxUtilisation] = useState('')
  const [disposalValueMethod, setDisposalValueMethod] = useState(1)
  const [disposalPercentage, setDisposalPercentage] = useState('')
  const [disposalValue, setDisposalValue] = useState('')
  const [spareCostMethod, setSpareCostMethod] = useState(1)
  const [spareCostProportion, setSpareCostProportion] = useState('')
  const [activeKey, setActiveKey] = useState(1)
  const [equipmentModelCosts, setEquipmentModelCosts] = useState([])
  const [equipmentModelSpareParts, setEquipmentModelSpareParts] = useState([])
  const [isNew, setIsNew] = useState(true)
  // let equipmentTypes = []
  const [equipmentTypes /* , setEquipmentTypes */] = useState([])

  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  const loading = useSelector((state) => state.GenericEquipment.loading)
  const dataType = useSelector((state) => state.GenericEquipment.dataType)

  const err = useSelector((state) => state.GenericEquipment.error)
  const msg = useSelector((state) => state.GenericEquipment.message)
  const isDeleted = useSelector((state) => state.GenericEquipment.isDeleted)

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
    dispatch(getGenericEquipment())
    dispatch(getCurrencies())
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

  const updateSpare = (index, id, isi) => {
    let dataCost = {
      rowId: index,
      equipmentModelSparepartId: 0,
      sparePartName: '',
      units: '',
      quantity: 0,
      countryId: 0,
      sparePartCost: 0,
    }
    let data = [...equipmentModelSpareParts]
    let tempData = data[index]
    if (tempData) {
      tempData[id] = isi
      setEquipmentModelSpareParts(data)
    } else {
      tempData = []
      dataCost[id] = isi
      tempData.push(dataCost)
      if (data.length > 0) {
        setEquipmentModelSpareParts(data.concat(tempData))
      } else {
        setEquipmentModelSpareParts(tempData)
      }
    }
  }
  const dataEqp = useSelector((state) => state.GenericEquipment.dataEqp)
  const currencies = useSelector((state) => state.Country.dataCurrencies)

  const onCloseResetAll = () => {
    setId('')
    setName('')
    setEqtype('')
    setSpesification('')
    setLife('')
    setPhysicalAvailability('')
    setMaxUtilisation('')
    setMaintenanceManhourMethod('')
    setMmr('')
    setTef('')
    setDisposalValueMethod('')
    setCountryId('')
    setCurrency('')
    setDisposalValue('')
    setDisposalPercentage('')
    setSpareCostMethod('')
    setSpareCostProportion('')
    setEquipmentModelCosts([])
    setEquipmentModelSpareParts([])
  }

  const onClickEdit = (row) => {
    setValidated(false)
    setIsNew(false)
    setId(row.equipmentModelId)
    setName(row.equipmentModelName)
    setEqtype(row.equipmentTypeName)
    setSpesification(row.specifications)
    setLife(row.lifeEstimated)
    setPhysicalAvailability(row.paEstimated)
    setMaxUtilisation(row.muEstimated)
    setMaintenanceManhourMethod(row.mmm)
    setDisposalValueMethod(Number(row.disposalValueMethod))
    setSpareCostMethod(Number(row.spareCostMethod))
    setEquipmentModelCosts(row.equipmentModelCosts)
    setEquipmentModelSpareParts(row.equipmentModelSpareParts)
    setMmr(row.mmrEstimated)
    if (row.tefEstimated) {
      setTef(row.tefEstimated)
    }
    setCountryId(row.countryId)
    setCurrency(row.currencyAbbr)
    setDisposalValue(row.disposalValue ? Number(row.disposalValue) : '')
    if (row.disposalValueRatio > 0) {
      setDisposalPercentage(row.disposalValueRatio)
    }
    if (row.sparesCostRatio) {
      setSpareCostProportion(row.sparesCostRatio)
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
        let param = { id: row.equipmentModelId }
        dispatch(deleteGenericEquipment(param))

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
    const a = rowA.equipmentModelName.toLowerCase()
    const b = rowB.equipmentModelName.toLowerCase()

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
      name: 'Equipment Model Name',
      selector: (row) => row.equipmentModelName,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Currency',
      selector: (row) => row.currencyAbbr,
      sortable: false,
    },
    {
      name: 'Spesification',
      selector: (row) => row.specifications,
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

    if (
      !isEmptyNullOrUndefined(name) &&
      !isEmptyNullOrUndefined(eqtype) &&
      !isEmptyNullOrUndefined(spesification) &&
      !isEmptyNullOrUndefined(life) &&
      !isEmptyNullOrUndefined(physicalAvailability) &&
      !isEmptyNullOrUndefined(maxUtilisation) &&
      !isEmptyNullOrUndefined(mmr)
    ) {
      if (form.checkValidity() === true) {
        let payload = {}
        let dataMC = []
        equipmentModelCosts.forEach((item) => {
          if (item.componentCost && item.quantity) {
            let mcObj = {
              costComponentName: item.costComponentName,
              units: item.units,
              quantity: Number(item.quantity),
              countryId: Number(item.countryId),
              componentCost: Number(item.componentCost),
            }
            dataMC.push(mcObj)
          }
          if (item.countryId <= 0) {
            delete dataMC.countryId
          }
        })
        let dataSP = []
        equipmentModelSpareParts.forEach((item) => {
          if (item.sparePartCost && item.quantity) {
            let spObj = {
              sparePartName: item.sparePartName,
              units: item.units,
              quantity: Number(item.quantity),
              countryId: Number(item.countryId),
              sparePartCost: Number(item.sparePartCost),
            }
            if (Number(spObj.countryId) <= 0) {
              delete spObj.countryId
            }
            dataSP.push(spObj)
          }
        })
        if (Number(spareCostMethod) === 2) {
          payload = {
            equipmentModelId: Number(id),
            equipmentModelName: name,
            equipmentTypeName: eqtype,
            specifications: spesification,
            lifeEstimated: Number(life),
            paEstimated: Number(physicalAvailability),
            muEstimated: Number(maxUtilisation),
            mmm: maintenanceManhourMethod + '',
            mmrEstimated: Number(mmr),
            tefEstimated: tef ? Number(tef) : null,
            disposalValueMethod: disposalValueMethod + '',
            countryId: countryId < 0 ? '' : Number(countryId),
            currencyAbbr: currency,
            disposalValue: Number(disposalValue),
            disposalValueRatio: Number(disposalPercentage),
            sparesCostMethod: spareCostMethod + '',
            sparesCostRatio: spareCostProportion ? Number(spareCostProportion) : null,
            equipmentModelCosts: dataMC,
            equipmentModelSpareParts: dataSP,
          }
        } else {
          payload = {
            equipmentModelId: Number(id),
            equipmentModelName: name,
            equipmentTypeName: eqtype,
            specifications: spesification,
            lifeEstimated: Number(life),
            paEstimated: Number(physicalAvailability),
            muEstimated: Number(maxUtilisation),
            mmm: maintenanceManhourMethod + '',
            mmrEstimated: Number(mmr),
            tefEstimated: tef ? Number(tef) : null,
            disposalValueMethod: disposalValueMethod + '',
            countryId: countryId < 0 ? '' : Number(countryId),
            currencyAbbr: currency,
            disposalValue: Number(disposalValue),
            disposalValueRatio: Number(disposalPercentage),
            sparesCostMethod: spareCostMethod + '',
            sparesCostRatio: spareCostProportion ? Number(spareCostProportion) : null,
            equipmentModelCosts: dataMC,
            equipmentModelSpareParts: dataSP,
          }
        }
        // console.log('payload', payload)
        if (Number(countryId) <= 0) {
          delete payload.countryId
        }
        if (id > 0) {
          dispatch(putGenericEquipment(payload))
        } else {
          dispatch(postGenericEquipment(payload))
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
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Main Cost Component
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 2} onClick={() => setActiveKey(2)}>
              Spares
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
            <MainCost
              equipmentModelCosts={equipmentModelCosts}
              updateEquipmentModelCosts={updateEquipmentModelCosts}
              currencies={currencies}
              isNew={isNew}
            />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
            <CRow className="my-1">
              <CFormLabel htmlFor="subCategory" className="col-sm-3 col-form-label">
                Spares Cost Method:
              </CFormLabel>
              <CCol sm={9}>
                <CRow>
                  <CCol sm={4}>
                    <CFormCheck
                      value="1"
                      type="radio"
                      name="spareCostMethod"
                      id="spareCostMethod1"
                      label="Monetary Value"
                      checked={Number(spareCostMethod) === 1}
                      onChange={onChangeSpareCostMethod}
                    />
                  </CCol>
                  <CCol sm={8}>
                    <CFormCheck
                      value="2"
                      type="radio"
                      name="spareCostMethod"
                      id="spareCostMethod2"
                      label="Percentage"
                      checked={Number(spareCostMethod) === 2}
                      onChange={onChangeSpareCostMethod}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            {Number(spareCostMethod) === 1 ? (
              <Spares
                equipmentModelSpareParts={equipmentModelSpareParts}
                updateSpare={updateSpare}
                currencies={currencies}
                isNew={isNew}
              />
            ) : (
              <CRow className="mb-1">
                <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                  Spares Costs Proportion
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="number"
                    size="sm"
                    placeholder="Please input Spares Costs Proportion"
                    value={spareCostProportion}
                    onChange={(e) =>
                      Number(e.currentTarget.value) > 100
                        ? setSpareCostProportion(100)
                        : setSpareCostProportion(e.currentTarget.value)
                    }
                  ></CFormInput>
                </CCol>
              </CRow>
            )}
          </CTabPane>
        </CTabContent>
      </>
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
        setSpareCostProportion('')
        if (val === 1) {
          setDisposalPercentage('')
        } else {
          setDisposalValue('')
          setCountryId(-1)
        }
      }
    })
  }

  const onChangeSpareCostMethod = (e) => {
    let val = Number(e.target.value)
    Swal.fire({
      title: 'Are you sure?',
      text:
        val === 1
          ? 'Spare Costs Proportion will be set to empty'
          : 'Do you want to delete the spares cost detail ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        setSpareCostMethod(val)
        setSpareCostProportion('')
      }
    })
  }
  return (
    <>
      <Spinner loading={loading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>Generic Equipment</strong>
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
                size="lg"
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
                        Equipment Model Name
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="sm"
                          value={name}
                          placeholder="Please input Equipment Model Name"
                          onInput={(e) => setName(e.currentTarget.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Equipment Type
                      </CFormLabel>
                      <CCol sm={8}>
                        <CreatableSelect
                          options={dataType}
                          onChange={(selectedOption, triggeredAction) => {
                            if (triggeredAction.action === 'clear') {
                              setEqtype('')
                            } else {
                              let availData = equipmentTypes.filter(
                                (item) =>
                                  item.value.toLowerCase() === selectedOption.value.toLowerCase(),
                              )
                              if (availData.length < 1) {
                                let existData = equipmentTypes
                                existData.push({
                                  value: selectedOption.value,
                                  label: selectedOption.value,
                                })
                                dispatch(updateEquipmentType(existData))
                              }
                              setEqtype(selectedOption.value)
                            }
                          }}
                          isClearable={true}
                          value={equipmentTypes.filter(
                            (item) => item.value.toLowerCase() === eqtype.toLowerCase(),
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Specifications
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormTextarea
                          size="sm"
                          rows="3"
                          placeholder="Please input Specifications"
                          value={spesification}
                          onChange={(e) => setSpesification(e.currentTarget.value)}
                        ></CFormTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Maintenance Manhour Method
                      </CFormLabel>
                      <CCol sm={8}>
                        <CRow>
                          <CCol sm={4}>
                            <CFormCheck
                              type="radio"
                              name="maintenanceManhourMethod"
                              id="maintenanceManhourMethod1"
                              label="Shift Hours"
                              checked={Number(maintenanceManhourMethod) === 1}
                              onChange={() => setMaintenanceManhourMethod(1)}
                            />
                          </CCol>
                          <CCol sm={8}>
                            <CFormCheck
                              type="radio"
                              name="maintenanceManhourMethod"
                              id="maintenanceManhourMethod2"
                              label="Work Hours"
                              checked={Number(maintenanceManhourMethod) === 2}
                              onChange={() => setMaintenanceManhourMethod(2)}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        MMR
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          rows="3"
                          placeholder="Please input MMR"
                          value={mmr}
                          onChange={(e) => setMmr(e.currentTarget.value)}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        TEF
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          rows="3"
                          placeholder="Please input TEF"
                          value={tef}
                          onChange={(e) =>
                            Number(e.currentTarget.value) > 100
                              ? setTef(100)
                              : setTef(e.currentTarget.value)
                          }
                          disabled={Number(maintenanceManhourMethod) === 1}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Physical Availability
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Physical Availability"
                          value={physicalAvailability}
                          onChange={(e) => setPhysicalAvailability(e.currentTarget.value)}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Life (hrs)
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Life (hrs)"
                          value={life}
                          onChange={(e) => setLife(e.currentTarget.value.replace(/[^0-9]/g, ''))}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-4 col-form-label">
                        Maximum Utilisation
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Maximum Utilisation"
                          value={maxUtilisation}
                          onChange={(e) => setMaxUtilisation(e.currentTarget.value)}
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
              {dataEqp && <DataTable columns={columns} data={dataEqp} pagination />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default GenericEquipment
