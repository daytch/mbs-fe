/* eslint-disable eqeqeq */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  // CCardHeader,
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
  CFormSelect,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import {
  getInfrastructrecc,
  deleteInfrastructurecc,
  putInfrastructurecc,
  postInfrastructurecc,
  getEmployeeType,
  getMaterials,
  getRoster,
} from '../../../redux/actions'
import Spinner from '../../../components/Spinner'
import Swal from 'sweetalert2'
import InfrastructureResource from './InfrastructureResource'
import InfrastructureMaterial from './InfrastructureMaterial'
import { useEffectOnce } from './../../../functions'

const Infrastructurecc = (params) => {
  const [visible, setVisible] = useState(false)
  const [visibleSecond, setVisibleSecond] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  const [costCentreInfrastructureId, setCostCentreInfrastructureId] = useState(0)

  const [units, setUnits] = useState('')
  const [infrastructureId, setInfrastructureId] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [selectedInfra, setSelectedInfra] = useState({ id: 0, name: '' })

  const [validated, setValidated] = useState(false)
  const isLoading = useSelector((state) => state.Infrastructurecc.loading)
  const datas = useSelector((state) => state.Infrastructurecc.data)

  const resourceColumns = [
    {
      Header: 'Employee Type',
      accessor: 'employeeType',
      align: 'center',
    },
    {
      Header: 'Roster',
      accessor: 'roster',
      align: 'center',
    },
  ]

  const materialColumns = [
    {
      Header: 'Material/Service',
      accessor: 'material',
      align: 'center',
    },
    {
      Header: 'Units',
      accessor: 'unit',
      align: 'center',
    },
  ]

  const infrastructureOptions = useSelector((state) =>
    populateOptions(state.Infrastructurecc.infrastructures),
  )

  const infrastrutures = useSelector((state) => state.Infrastructurecc.infrastructures)
  function populateOptions(items) {
    var currentItems = ['Please select Employee Type']
    if (items) {
      for (let index = 0; index < items.length; index++) {
        currentItems.push({
          label: items[index].infrastructureName,
          value: items[index].infraStructureId,
        })
      }
    }
    return currentItems
  }

  const isSuccess = useSelector((state) => state.Infrastructurecc.isSuccess)
  const message = useSelector((state) => state.Infrastructurecc.message)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)

  const dataInfrastructureResource = useSelector((state) => state.Infrastructurecc.dataResource)
  const dataInfrastructureMaterial = useSelector((state) => state.Infrastructurecc.dataMaterial)

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

  const handleChange = useCallback((state) => {
    if (state) {
      setSelectedInfra({
        id: state.selectedRows[0].infrastructureId,
        name: state.selectedRows[0].infraStructureName,
      })
    } else {
      // let lastState = JSON.parse(localStorage.getItem('projectState'))
      // if (lastState) {
      //   setSelectedRows(lastState.selectedRows)
      // }
    }
  }, [])

  useEffectOnce(() => {
    if (projectRepresentation.projectRepresentationId) {
      dispatch(getEmployeeType(projectRepresentation.projectRepresentationId))
      dispatch(getRoster(projectRepresentation.projectRepresentationId))

      dispatch(
        getMaterials({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
      )
    }
  })

  const employeeTypes = useSelector((state) => state.ResourcesEmployeeType.data)
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
  const materials = useSelector((state) => state.ResourcesMaterials.data)
  console.log('materials : ', materials)
  useEffect(() => {
    if (params.selectedId != 0) {
      setMessageProcess(isSuccess)
      // dispatch(getLevyCategoryOption(projectRep.projectRepresentationId))
      dispatch(
        getInfrastructrecc({
          costCentreId: params.selectedId,
          projectRepresentationId: projectRep.projectRepresentationId,
        }),
      )
    }
    // eslint-disable-next-line
  }, [message, projectRep, params.selectedId])

  const onCloseResetAll = () => {
    setCostCentreInfrastructureId(0)
    setInfrastructureId(0)
    setUnits('')
    setQuantity(0)
  }

  const onClickEdit = (row) => {
    setCostCentreInfrastructureId(row.costCentreInfrastructureId)

    setInfrastructureId(row.infrastructureId)
    setUnits(row.units)
    setQuantity(row.quantity)
    setVisible(!visible)
  }

  function onChangeOptions(item) {
    setUnits('')
    setInfrastructureId(item)
    console.log(item)
    var selectedOptions = infrastrutures.filter((currentItem) => {
      if (currentItem.infraStructureId == item) {
        return currentItem
      } else {
        return null
      }
    })
    console.log('changeOptions', selectedOptions)
    if (selectedOptions) {
      setUnits(selectedOptions[0].units)
    }
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
        console.log(row)
        let param = { id: row.costCentreInfrastructureId }
        console.log(param)
        dispatch(deleteInfrastructurecc(param))
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
      name: 'Infrastructure',
      selector: (row) => row.infraStructureName,
      sortable: true,
    },
    {
      name: 'Units',
      selector: (row) => row.units,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => renderButtonAction(row),
      sortable: false,
    },
  ]

  const columnsModal = [
    {
      name: 'Infrastructure',
      selector: (row) => row.infraStructureName,
      sortable: true,
    },
    {
      name: 'Units',
      selector: (row) => row.units,
      sortable: true,
    },
  ]

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (isNaN(infrastructureId) || infrastructureId < 1) {
      return
    }

    // if (isNaN(rosterId) || rosterId < 1) {
    //   return
    // }
    // if (isNaN(employeeTypeId) || employeeTypeId < 1) {
    //   return
    // }
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }

    if (form.checkValidity() === true) {
      let payload = {
        costcentreId: params.selectedId, //will change after tree cost centre created
        costCentreInfrastructureId: costCentreInfrastructureId,
        infrastructureId: infrastructureId,
        quantity: quantity,
        costindexType: 0,
      }
      if (costCentreInfrastructureId > 0) {
        dispatch(putInfrastructurecc(payload))
      } else {
        dispatch(postInfrastructurecc(payload))
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
                      {costCentreInfrastructureId > 0 ? 'Update Data' : 'Add Data'}
                    </CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="Equipment" className="col-sm-3 col-form-label">
                        Infrastructure
                      </CFormLabel>

                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Infrastructure"
                          options={infrastructureOptions}
                          size="sm"
                          onChange={(e) => onChangeOptions(e.currentTarget.value)}
                          value={infrastructureId}
                          required
                          className={
                            infrastructureId < 1 || isNaN(infrastructureId) ? 'is-invalid' : ''
                          }
                        />
                        <CFormFeedback
                          invalid
                          className={
                            infrastructureId < 1 || isNaN(infrastructureId) ? 'd-block' : ''
                          }
                        >
                          Please select an Infrastructure
                        </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="SahreFleetCode" className="col-sm-3 col-form-label">
                        Units
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          placeholder="Please input levy name"
                          disabled={true}
                          value={units}
                          required
                        />
                        <CFormFeedback invalid>Levy Name is required.</CFormFeedback>
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
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="SahreFleetCode" className="col-sm-3 col-form-label">
                        Quantity
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          type="number"
                          size="sm"
                          placeholder="Please input Quantity"
                          onInput={(e) => setQuantity(e.currentTarget.value)}
                          // value={levyRate}
                          value={quantity}
                          step=".001"
                          required
                        />
                        <CFormFeedback invalid>Quantity is required.</CFormFeedback>
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

              <CModal
                size="xl"
                alignment="center"
                scrollable
                backdrop="static"
                visible={visibleSecond}
                onClose={onCloseResetAll}
              >
                <CForm
                  className="g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CModalHeader className="px-3">
                    <CModalTitle>Cost Centre Infrastructure Resources</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-3">
                    <CRow>
                      <CCol xs={4}>
                        <CCard className="mb-4">
                          <CCardBody>
                            {datas && (
                              <DataTable
                                selectableRows
                                onSelectedRowsChange={handleChange}
                                selectableRowsNoSelectAll={true}
                                columns={columnsModal}
                                data={datas}
                              />
                            )}
                          </CCardBody>
                        </CCard>
                      </CCol>
                      <CCol xs={8}>
                        {/* <CCard className="mb-4"> */}
                        <span>Resource(s) allocated to : {selectedInfra.name}</span>
                        {/* <CCardBody> */}
                        <InfrastructureResource
                          arrPeriodData={resourceColumns}
                          dataInfrastructureResource={dataInfrastructureResource}
                          employeeTypes={employeeTypes}
                          rosters={rosters}
                        />
                        <InfrastructureMaterial
                          arrPeriodData={materialColumns}
                          dataInfrastructureMaterial={dataInfrastructureMaterial}
                          materials={materials}
                        />
                        {/* </CCardBody> */}
                        {/* </CCard> */}
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
              <CButton
                color="info float-end"
                size="sm"
                onClick={() => setVisibleSecond(!visibleSecond)}
              >
                Resources
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Infrastructurecc
