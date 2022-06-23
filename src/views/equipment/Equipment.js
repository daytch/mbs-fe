/* eslint-disable no-unused-vars */
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
import { cilPencil, cilTrash, cilCheckAlt, cilX } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import {
  getGenericEquipment,
  postGenericEquipment,
  putGenericEquipment,
  deleteGenericEquipment,
  getCurrencies,
  getLevyCategories,
  getEmployeeType,
  getFleets,
  getEquipmentTypes,
  // postFleets,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import MainCost from './MainCost'
import Spares from './Spares'
import './Equipment.css'
import { isEmptyNullOrUndefined, isObjectEmpty } from 'src/functions'
import MaterialOrService from './MaterialOrService'
import MaintenancePersonnel from './MaintenancePersonnel'
import Operators from './Operators'
import TableExistingEquipment from './TableExistingEquipment'
import CreatableSelect from 'react-select/creatable'

const Equipment = () => {
  const [visible, setVisible] = useState(false)
  const [visibleEQType, setVisibleEQType] = useState(false)
  // const [visibleModel, setVisibleModel] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [id, setId] = useState(0)
  const [currency, setCurrency] = useState('')
  const [countryId, setCountryId] = useState('')
  const [spareCostMethod, setSpareCostMethod] = useState('1')
  const [spareCostProportion, setSpareCostProportion] = useState('')
  const [activeKey, setActiveKey] = useState(1)
  const [equipmentModelCosts, setEquipmentModelCosts] = useState([])
  const [equipmentModelSpareParts, setEquipmentModelSpareParts] = useState([])
  const [isNew, setIsNew] = useState(true)
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  const [projects] = useState(JSON.parse(localStorage.getItem('project')))

  // General
  const [fleetName, setFleetName] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [equipmentType, setEquipmentType] = useState('')
  const [equipmentModel, setEquipmentModel] = useState('')

  // Fleet Data
  const [fSpecifications, setFSpecifications] = useState('')
  const [fEquipmentSource, setFEquipmentSource] = useState('')
  const [fLife, setFLife] = useState('')
  const [fAge, setFAge] = useState('')
  const [fFleetSize, setFFleetSize] = useState('')
  const [fAvailability, setFAvailability] = useState('')
  const [fMaxUtilisation, setFMaxUtilisation] = useState('')
  const [fManhourMethod, setFManhourMethod] = useState('1')
  const [fMMR, setFMMR] = useState('')
  const [fTEF, setFTEF] = useState(100)
  const [fDisposalValueMethod, setFDisposalValueMethod] = useState('1')
  const [fDisposalPercentage, setFDisposalPercentage] = useState('')
  const [fDisposalValue, setFDisposalValue] = useState('')
  const [fCurrency, setFCurrency] = useState('')
  const [fNotes, setFNotes] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [selectedModelId, setSelectedModelId] = useState('')
  const [filteredFleets, setFilteredFleets] = useState([])
  const [selectedFleet, setSelectedFleet] = useState({})
  const [tefDisabled, setTefDisabled] = useState(true)
  const [percenDisabled, setPercenDisabled] = useState(true)

  const [dataMaterialService, setDataMaterialService] = useState([])
  const [dataMaintenancePersonnel, setDataMaintenancePersonnel] = useState([])
  const [dataOperators, setDataOperators] = useState([])
  const [dataMaterial, setDataMaterial] = useState([
    { value: 'Material', label: 'Material' },
    { value: 'Service', label: 'Service' },
  ])
  const [dataQuantityMethod, setDataQuantityMethod] = useState([
    { value: 'Scheduled Values', label: 'Scheduled Values' },
    { value: 'Constant Value', label: 'Constant Value' },
  ])
  // let EquipmentTypes = []

  const onChangeDisposalValueMethod = (e) => {
    if (e.currentTarget.checked && e.currentTarget.value === '1') {
      // money value
      setPercenDisabled(true)
    } else {
      setPercenDisabled(false)
    }
    setFDisposalValueMethod(e.target.value)
  }
  const onChangeManhourMethod = (e) => {
    if (e.currentTarget.checked && e.currentTarget.value === '1') {
      setTefDisabled(true)
      setFTEF(100)
    } else {
      setTefDisabled(false)
    }
    setFManhourMethod(e.target.value)
  }
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  const loading = useSelector((state) => state.GenericEquipment.loading)

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
    dispatch(getLevyCategories(projectRepresentation.projectRepresentationId))
    dispatch(getEmployeeType(projectRepresentation.projectRepresentationId))
    dispatch(getFleets({ projectRepresentationId: projectRepresentation.projectRepresentationId }))
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
  const updateMaintenancePersonnel = (index, id, isi) => {
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
      setDataMaintenancePersonnel(data)
    } else {
      tempData = []
      dataCost[id] = isi
      tempData.push(dataCost)
      if (data.length > 0) {
        setDataMaintenancePersonnel(data.concat(tempData))
      } else {
        setDataMaintenancePersonnel(tempData)
      }
    }
  }
  const updateOperators = (index, id, isi) => {
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
      setDataOperators(data)
    } else {
      tempData = []
      dataCost[id] = isi
      tempData.push(dataCost)
      if (data.length > 0) {
        setDataOperators(data.concat(tempData))
      } else {
        setDataOperators(tempData)
      }
    }
  }
  const updateMaterialService = (index, id, isi) => {
    let dataCost = {
      rowId: index,
      equipmentModelCostComponentId: 0,
      costComponentName: '',
      units: '',
      quantity: 0,
    }
    let data = [...dataMaterialService]
    let tempData = data[index]
    if (tempData) {
      tempData[id] = isi
      setDataMaterialService(data)
    } else {
      tempData = []
      dataCost[id] = isi
      tempData.push(dataCost)
      if (data.length > 0) {
        setDataMaterialService(data.concat(tempData))
      } else {
        setDataMaterialService(tempData)
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

  const currencies = useSelector((state) => state.Country.dataCurrencies)
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
  const employee = useSelector((state) => {
    let arrEmployees = []
    if (state.ResourcesEmployeeType.data) {
      if (state.ResourcesEmployeeType.data.length > 0) {
        arrEmployees.push({ value: -1, label: 'Select Employee' })
        state.ResourcesEmployeeType.data.forEach((item) => {
          arrEmployees.push({
            value: item.employeeTypeId,
            label: item.employeeTypeName,
          })
        })
      }
    }
    return arrEmployees
  })
  const dataFleets = useSelector((state) => {
    if (state.Equipment.dataFleets.length > 0) {
      let arrFleets = state.Equipment.dataFleets
      arrFleets.forEach((item) => {
        switch (item.source) {
          case '1':
            item.source = 'Owned Already'
            break
          case '2':
            item.source = 'Available New'
            break
          case '3':
            item.source = 'Available Used'
            break

          default:
            break
        }

        item.projectName = projects.projectName
      })
      return arrFleets
    }
  })
  const EquipmentTypes = useSelector((state) => state.Equipment.dataEquipmentTypes)

  const onCloseResetAll = () => {
    setId('')
    setFleetName('')
    setEquipmentType('')
    setFSpecifications('')
    setFLife('')
    setFAvailability('')
    setFMaxUtilisation('')
    setFManhourMethod('')
    setFMMR('')
    setFTEF('')
    setFDisposalValueMethod('')
    setCountryId('')
    setCurrency('')
    setFDisposalValue('')
    setFDisposalPercentage('')
    setSpareCostMethod('')
    setSpareCostProportion('')
    setEquipmentModelCosts([])
    setEquipmentModelSpareParts([])
  }

  const onClickEdit = (row) => {
    setValidated(false)
    setIsNew(false)
    setId(row.equipmentModelId)
    setFleetName(row.equipmentModelName)
    setEquipmentType(row.equipmentTypeName)
    setFSpecifications(row.specifications)
    setFLife(row.lifeEstimated)
    setFAvailability(row.paEstimated)
    setFMaxUtilisation(row.muEstimated)
    setFManhourMethod(row.mmm)
    setFDisposalValueMethod(Number(row.disposalValueMethod))
    setSpareCostMethod(Number(row.spareCostMethod))
    setEquipmentModelCosts(row.equipmentModelCosts)
    setEquipmentModelSpareParts(row.equipmentModelSpareParts)
    setFMMR(row.mmrEstimated)
    if (row.tefEstimated) {
      setFTEF(row.tefEstimated)
    }
    setCountryId(row.countryId)
    setCurrency(row.currencyAbbr)
    setFDisposalValue(row.disposalValue ? Number(row.disposalValue) : '')
    if (row.disposalValueRatio > 0) {
      setFDisposalPercentage(row.disposalValueRatio)
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
      selector: (row) => row.from,
      sortable: false,
    },
    {
      name: 'Action',
      selector: (row) => renderButtonAction(row),
      sortable: false,
    },
  ]

  const getMainCostComponent = () => {
    let dataMC = []
    equipmentModelCosts.forEach((item) => {
      if (item.componentCost && item.quantity) {
        let mcObj = {
          fleetCostComponentId: 0,
          fleetId: 0,
          costComponentName: item.costComponentName,
          units: item.units,
          quantity: Number(item.quantity),
          countryId: Number(item.countryId),
          componentCost: Number(item.componentCost),
          levyCategoryId: Number(item.levyCategoryId),
        }
        dataMC.push(mcObj)
      }
      if (item.countryId <= 0) {
        delete dataMC.countryId
      }
    })

    return dataMC
  }
  const getSparePart = () => {
    let dataSP = []
    equipmentModelSpareParts.forEach((item) => {
      if (item.sparePartCost && item.quantity) {
        let spObj = {
          fleetSparePartId: item.fleetSparePartId,
          fleetId: item.fleetId,
          sparePartName: item.sparePartName,
          units: item.units,
          quantity: Number(item.quantity),
          countryId: Number(item.countryId),
          sparePartCost: Number(item.sparePartCost),
          levyCategoryId: Number(item.levyCategoryId),
        }
        if (Number(spObj.countryId) <= 0) {
          delete spObj.countryId
        }
        dataSP.push(spObj)
      }
    })
    return dataSP
  }
  const getMaterialService = () => {
    let dataMS = []

    dataMaterialService.forEach((item) => {
      if (item.materialServiceCost && item.quantity) {
        let msObj = {
          fleetResourceId: Number(item.fleetResourceId),
          fleetId: Number(item.fleetId),
          resourceId: Number(item.resourceId),
          quantityPerOh: Number(item.quantityPerOh),
          quantityType: Number(item.quantityType),
        }
        dataMS.push(msObj)
      }
    })

    return dataMS
  }
  const getMaintenancePersonnel = () => {
    let dataMP = []
    dataMaintenancePersonnel.forEach((item) => {
      if (item.maintenancePersonnelCost && item.quantity) {
        let mpObj = {
          fleetServicerId: Number(item.fleetServicerId),
          fleetId: Number(item.fleetId),
          employeeTypeId: Number(item.employeeTypeId),
          rosterId: Number(item.rosterId),
          proportion: Number(item.proportion),
        }
        dataMP.push(mpObj)
      }
    })
    return dataMP
  }
  const getOperators = () => {
    let dataOP = []
    dataOperators.forEach((item) => {
      if (item.operatorCost && item.quantity) {
        let opObj = {
          fleetOperatorId: Number(item.fleetOperatorId),
          fleetId: Number(item.fleetId),
          employeeTypeId: Number(item.employeeTypeId),
          numEmployees: Number(item.numEmployees),
        }
        dataOP.push(opObj)
      }
    })
    return dataOP
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(false)
    }
    setValidated(true)

    if (
      !isEmptyNullOrUndefined(fleetName) &&
      !isEmptyNullOrUndefined(equipmentType) &&
      !isEmptyNullOrUndefined(equipmentModel)
    ) {
      if (form.checkValidity() === true) {
        let payload = {
          from: 'string',
          fleetId: 0,
          projectRepresentationId: projectRepresentation.projectRepresentationId,
          projectRepresentationName: projectRepresentation.projectRepresentationName,
          fleetName: fleetName,
          equipmentModelName: equipmentModel,
          equipmentTypeName: equipmentType,
          disposalValueMethod: fDisposalValueMethod,
          countryId: countryId,
          currencyAbbr: currency,
          disposalValue: fDisposalValue,
          disposalValueRatio: fDisposalPercentage,
          specifications: fSpecifications,
          source: fEquipmentSource,
          fleetSize: fFleetSize,
          lifeEstimated: fLife,
          averageAge: fAge,
          paEstimated: fAvailability,
          muEstimated: fMaxUtilisation,
          mmm: fManhourMethod,
          mmrEstimated: fMMR,
          tefEstimated: fTEF,
          notes: fNotes,
          sparesCostMethod: spareCostMethod,
          sparesCostRatio: spareCostProportion,
          fleetLife: fLife,
          ohusedProject: 0,
          mainCostComponent: getMainCostComponent(),
          spares: getSparePart(),
          materialConsumtion: getMaterialService(),
          maintenancePersonel: getMaintenancePersonnel(),
          operators: getOperators(),
        }

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

  const onChangeEquipmentSource = (event) => {
    setFEquipmentSource(event.target.value)
  }

  const renderFleetData = () => {
    return (
      <>
        <CRow className="mb-1">
          <CFormLabel htmlFor="fSpecifications" className="col-sm-2 col-form-label">
            Specifications
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput
              size="sm"
              placeholder="Specifications"
              value={fSpecifications}
              onChange={(e) => setFSpecifications(e.currentTarget.value)}
              required
            ></CFormInput>
          </CCol>
        </CRow>
        <CRow className="mb-1">
          <CFormLabel htmlFor="fEquipmentSource" className="label-sm col-sm-2 col-form-label">
            Equipment Source
          </CFormLabel>
          <CCol sm={9}>
            <CRow>
              <CCol sm={4}>
                <CFormCheck
                  style={{ fontSize: 'smaller' }}
                  value="1"
                  type="radio"
                  name="fEquipmentSource"
                  id="fEquipmentSource1"
                  label="Available New"
                  checked={Number(fEquipmentSource) === 1}
                  onChange={onChangeEquipmentSource}
                  required
                />
              </CCol>
              <CCol sm={4}>
                <CFormCheck
                  style={{ fontSize: 'smaller' }}
                  value="2"
                  type="radio"
                  name="fEquipmentSource"
                  id="fEquipmentSource2"
                  label="Owned Already"
                  checked={Number(fEquipmentSource) === 2}
                  onChange={onChangeEquipmentSource}
                  required
                />
              </CCol>
              <CCol sm={4}>
                <CFormCheck
                  style={{ fontSize: 'smaller' }}
                  value="3"
                  type="radio"
                  name="fEquipmentSource"
                  id="fEquipmentSource1"
                  label="Available Used"
                  checked={Number(fEquipmentSource) === 3}
                  onChange={onChangeEquipmentSource}
                  required
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow className="mb-1">
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fLife" className="label-sm col-sm-6 col-form-label">
                Life (hrs)
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Life (hrs)"
                  value={fLife}
                  onChange={(e) => setFLife(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fAge" className="label-sm col-sm-6 col-form-label">
                Average Age (hrs)
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Average Age (hrs)"
                  value={fAge}
                  onChange={(e) => setFAge(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className="mb-1">
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fFleetSize" className="label-sm col-sm-6 col-form-label">
                Fleet Size
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Fleet Size"
                  value={fFleetSize}
                  onChange={(e) => setFFleetSize(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fAvailability" className="label-sm col-sm-6 col-form-label">
                Physical Availability
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Physical Availability"
                  value={fAvailability}
                  onChange={(e) => setFAvailability(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fMaxUtilisation" className="label-sm col-sm-6 col-form-label">
                Maximum Utilisation
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="Maximum Utilisation"
                  value={fMaxUtilisation}
                  onChange={(e) => setFMaxUtilisation(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className="mb-1">
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fManhourMethod" className="label-sm col-sm-6 col-form-label">
                Maintenance Manhour Method
              </CFormLabel>
              <CCol sm={6}>
                <CRow>
                  <CCol sm={6}>
                    <CFormCheck
                      style={{ fontSize: 'smaller' }}
                      value="1"
                      type="radio"
                      name="fManhourMethod"
                      id="fManhourMethod1"
                      label="Shift Hours"
                      checked={Number(fManhourMethod) === 1}
                      onChange={onChangeManhourMethod}
                      required
                    />
                  </CCol>
                  <CCol sm={6}>
                    <CFormCheck
                      style={{ fontSize: 'smaller' }}
                      value="2"
                      type="radio"
                      name="fManhourMethod"
                      id="fManhourMethod2"
                      label="Work Hours"
                      checked={Number(fManhourMethod) === 2}
                      onChange={onChangeManhourMethod}
                      required
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fMMR" className="label-sm col-sm-6 col-form-label">
                MMR
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="MMR"
                  value={fMMR}
                  onChange={(e) => setFMMR(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={4}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fTEF" className="label-sm col-sm-6 col-form-label">
                TEF
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  placeholder="TEF"
                  value={fTEF}
                  disabled={tefDisabled}
                  onChange={(e) => setFTEF(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className="mb-1">
          <CCol sm={5}>
            <CRow className="mb-1">
              <CFormLabel
                htmlFor="fDisposalValueMethod"
                className="label-sm col-sm-4 col-form-label"
              >
                Disposal Value Method
              </CFormLabel>
              <CCol sm={7} className="ms-4">
                <CRow>
                  <CCol sm={6}>
                    <CFormCheck
                      style={{ fontSize: 'smaller' }}
                      value="1"
                      type="radio"
                      name="fDisposalValueMethod"
                      id="fDisposalValueMethod1"
                      label="Monetary Value"
                      checked={Number(fDisposalValueMethod) === 1}
                      onChange={onChangeDisposalValueMethod}
                      required
                    />
                  </CCol>
                  <CCol sm={6}>
                    <CFormCheck
                      style={{ fontSize: 'smaller' }}
                      value="2"
                      type="radio"
                      name="fDisposalValueMethod"
                      id="fDisposalValueMethod2"
                      label="Percentage"
                      checked={Number(fDisposalValueMethod) === 2}
                      onChange={onChangeDisposalValueMethod}
                      required
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={7}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fCurrency" className="label-sm col-sm-4 col-form-label">
                Currency
              </CFormLabel>
              <CCol sm={8}>
                <CFormSelect
                  aria-label="select Currency"
                  options={currencies}
                  size="sm"
                  onChange={(e) => {
                    setFCurrency(e.currentTarget.value)
                  }}
                  value={fCurrency}
                  disabled={!percenDisabled}
                  required
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className="mb-1">
          <CCol sm={5}>
            <CRow className="mb-1">
              <CFormLabel htmlFor="fDisposalValue" className="label-sm col-sm-4 col-form-label">
                Disposal Value
              </CFormLabel>
              <CCol sm={7} className="ms-4">
                <CFormInput
                  size="sm"
                  type="number"
                  disabled={!percenDisabled}
                  placeholder="Disposal Value"
                  value={fDisposalValue}
                  onChange={(e) => setFDisposalValue(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={7}>
            <CRow className="mb-1">
              <CFormLabel
                htmlFor="fDisposalPercentage"
                className="label-sm col-sm-6 col-form-label"
              >
                Disposal Percentage
              </CFormLabel>
              <CCol sm={6}>
                <CFormInput
                  size="sm"
                  type="number"
                  disabled={percenDisabled}
                  placeholder="Disposal Percentage"
                  value={fDisposalPercentage}
                  onChange={(e) => setFDisposalPercentage(e.currentTarget.value)}
                  required
                ></CFormInput>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className="mb-1">
          <CFormLabel htmlFor="fNotes" className="col-sm-2 col-form-label">
            Notes
          </CFormLabel>
          <CCol sm={9}>
            <CFormTextarea
              size="sm"
              placeholder="Notes"
              value={fNotes}
              onChange={(e) => setFNotes(e.currentTarget.value)}
            ></CFormTextarea>
          </CCol>
        </CRow>
      </>
    )
  }

  const renderTables = () => {
    return (
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Fleet Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 2} onClick={() => setActiveKey(2)}>
              Main Cost Component
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 3} onClick={() => setActiveKey(3)}>
              Spares
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink href="#!" active={activeKey === 4} onClick={() => setActiveKey(4)}>
              Materials/Services Consumption
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 5} onClick={() => setActiveKey(5)}>
              Maintenance Personnel
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 6} onClick={() => setActiveKey(6)}>
              Operators
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="fleet-data-tab" visible={activeKey === 1}>
            <CCard>
              <CCardBody>{renderFleetData()}</CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="main-cost-component" visible={activeKey === 2}>
            <CCard>
              <CCardBody>
                <MainCost
                  equipmentModelCosts={equipmentModelCosts}
                  updateEquipmentModelCosts={updateEquipmentModelCosts}
                  currencies={currencies}
                  levyCategories={levyCategories}
                  isNew={isNew}
                />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="spare" visible={activeKey === 3}>
            <CCard>
              <CCardBody>
                <CRow className="my-1">
                  <CFormLabel htmlFor="subCategory" className="col-sm-3 col-form-label">
                    Spares Cost Method:
                  </CFormLabel>
                  <CCol sm={9}>
                    <CRow>
                      <CCol sm={4}>
                        <CFormCheck
                          style={{ fontSize: 'smaller' }}
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
                          style={{ fontSize: 'smaller' }}
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
                    levyCategories={levyCategories}
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
                        placeholder="Spares Costs Proportion"
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
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="material-consumtion" visible={activeKey === 4}>
            <CCard>
              <CCardBody>
                <MaterialOrService
                  dataMaterialService={dataMaterialService}
                  updateMaterialService={updateMaterialService}
                  currencies={currencies}
                  levyCategories={levyCategories}
                  isNew={isNew}
                />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="maintenance-personnel"
            visible={activeKey === 5}
          >
            <CCard>
              <CCardBody>
                <MaintenancePersonnel
                  dataMaintenancePersonnel={dataMaintenancePersonnel}
                  updateMaintenancePersonnel={updateMaintenancePersonnel}
                  employee={employee}
                  isNew={isNew}
                />
              </CCardBody>
            </CCard>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="operator" visible={activeKey === 6}>
            <CCard>
              <CCardBody>
                <Operators
                  dataOperators={dataOperators}
                  updateOperators={updateOperators}
                  employee={employee}
                  isNew={isNew}
                />
              </CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </>
    )
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

  const onClickOpenModalEquipmentModel = () => {
    if (isEmptyNullOrUndefined(equipmentType)) {
      Swal.fire({
        title: 'Warning',
        text: 'Please select equipment model',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
    } else {
      setVisibleEQType(true)

      let filteredDataFleets = dataFleets.filter((item) => item.equipmentTypeName === equipmentType)
      setFilteredFleets(filteredDataFleets)
    }
  }

  const setFleet = () => {
    setFleetName(selectedFleet.fleetName ? selectedFleet.fleetName : '')
    setEquipmentType(selectedFleet.equipmentTypeName ? selectedFleet.equipmentTypeName : '')
    setEquipmentModel(selectedFleet.equipmentModelName ? selectedFleet.equipmentModelName : '')
    setFSpecifications(selectedFleet.specifications ? selectedFleet.specifications : '')
    setFEquipmentSource(selectedFleet.source ? selectedFleet.source : '')
    setFLife(selectedFleet.lifeEstimated ? selectedFleet.lifeEstimated : '')
    setFAge(selectedFleet.averageAge ? selectedFleet.averageAge : '')
    setFFleetSize(selectedFleet.fleetSize ? selectedFleet.fleetSize : '')
    setFAvailability(selectedFleet.availability ? selectedFleet.availability : '')
    setFMaxUtilisation(selectedFleet.muEstimated ? selectedFleet.muEstimated : '') // ?
    setFManhourMethod(selectedFleet.mmm ? selectedFleet.mmm : '') // ?
    setFMMR(selectedFleet.mmrEstimated ? selectedFleet.mmrEstimated : '')
    setFTEF(selectedFleet.tefEstimated ? selectedFleet.tefEstimated : '')
    setFDisposalValueMethod(
      selectedFleet.disposalValueMethod ? selectedFleet.disposalValueMethod : '',
    )
    setFDisposalPercentage(selectedFleet.disposalValueRatio ? selectedFleet.disposalValueRatio : '')
    setFCurrency(selectedFleet.currencyAbbr ? selectedFleet.currencyAbbr : '')
    setFNotes(selectedFleet.notes ? selectedFleet.notes : '')
  }

  const onClickOkButton = () => {
    if (!isObjectEmpty(selectedFleet)) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to import details data of the selected model into the equipment record being edited?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          setFleet()
          setVisibleEQType(false)
          // Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
    } else {
      Swal.fire({
        title: 'Validation!',
        text: 'Please select Equipment',
        icon: 'warning',
      })
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
              <strong>Equipment</strong>
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

              <CModal size="xl" alignment="center" scrollable visible={visibleEQType}>
                <CModalHeader className="px-5">
                  <CModalTitle>Existing Equipment Model </CModalTitle>
                </CModalHeader>
                <CModalBody className="px-5 overflow-auto">
                  <TableExistingEquipment
                    data={filteredFleets}
                    setSelectedModelId={setSelectedModelId}
                    equipmentModel={equipmentModel}
                    setSelectedFleet={setSelectedFleet}
                  />
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={onClickOkButton} size="sm">
                    Ok
                    <CIcon icon={cilCheckAlt} />
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => setVisibleEQType(false)}
                    type="submit"
                    size="sm"
                  >
                    Cancel
                    <CIcon icon={cilX} />
                  </CButton>
                </CModalFooter>
              </CModal>

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
                      <CFormLabel htmlFor="equipmentType" className="col-sm-2 col-form-label">
                        Equipment Type
                      </CFormLabel>
                      <CCol sm={5}>
                        <CreatableSelect
                          isClearable={true}
                          key={Math.random()}
                          onChange={(e) => {
                            if (
                              EquipmentTypes.filter(
                                (item) => item.label.toLowerCase() === e.label.toLowerCase(),
                              ).length < 1
                            ) {
                              let arrET = EquipmentTypes
                              arrET.push(e)
                              dispatch(getEquipmentTypes(arrET))
                            }
                            setEquipmentType(e.value ? e.value : '')
                          }}
                          required
                          options={EquipmentTypes}
                          value={EquipmentTypes.filter((item) => item.label === equipmentType)}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <CButton color="info" size="sm" onClick={onClickOpenModalEquipmentModel}>
                          Select Model
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="fleetName" className="col-sm-2 col-form-label">
                        Fleet Name
                      </CFormLabel>
                      <CCol sm={5}>
                        <CFormInput
                          size="sm"
                          placeholder="Fleet Name"
                          value={fleetName}
                          required
                          onChange={(e) => setFleetName(e.currentTarget.value)}
                        ></CFormInput>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="equipmentModel" className="col-sm-2 col-form-label">
                        Equipment Model
                      </CFormLabel>
                      <CCol sm={5}>
                        <CFormInput
                          size="sm"
                          placeholder="Equipment Model"
                          value={equipmentModel}
                          onChange={(e) => setEquipmentModel(e.currentTarget.value)}
                          required
                        ></CFormInput>
                      </CCol>
                      <CCol sm={4}>
                        <CButton color="info" size="sm">
                          Copy to Generic
                        </CButton>
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
                  <CButton color="primary" type="submit" onClick={(e) => handleSubmit(e)} size="sm">
                    Save changes
                  </CButton>
                </CModalFooter>
              </CModal>
              {dataFleets && <DataTable columns={columns} data={dataFleets} pagination />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Equipment
