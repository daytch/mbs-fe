/* eslint-disable eqeqeq */
import React, { useState, useRef, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
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
import { getMaterialcc, putMaterialcc, postMaterialcc, deleteMaterialcc } from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'

const MaterialCC = (params) => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [costCentreResourceId, setCostCentreResourceId] = useState(0)
  const [resourceId, setResourceId] = useState(0)
  const [units, setUnits] = useState('')

  const [validated, setValidated] = useState(false)
  const isLoading = useSelector((state) => state.Materialcc.loading)
  const datas = useSelector((state) => state.Materialcc.data)

  const materialOptions = useSelector((state) =>
    populateMaterialOptions(state.Materialcc.materialServices),
  )

  const materialServices = useSelector((state) => state.Materialcc.materialServices)
  function populateMaterialOptions(materials) {
    var currentMaterials = ['Please select Employee Type']

    if (materials) {
      for (let index = 0; index < materials.length; index++) {
        currentMaterials.push({
          label: materials[index].resourceName,
          value: materials[index].resourceId,
        })
      }
    }
    return currentMaterials
  }
  // const empTypeOptions = useSelector((state) => {
  //   return populateEmployeeTypeOption(state.Personelcc.employeeTypes)
  // })
  // function populateEmployeeTypeOption(employeeTypes) {
  //   var employeeTypesOption = ['Please select Employee Type']

  //   if (employeeTypes) {
  //     for (let index = 0; index < employeeTypes.length; index++) {
  //       employeeTypesOption.push({
  //         label: employeeTypes[index].employeeTypeName,
  //         value: employeeTypes[index].employeeTypeId,
  //       })
  //     }
  //   }
  //   return employeeTypesOption
  // }

  const isSuccess = useSelector((state) => state.Materialcc.isSuccess)
  const message = useSelector((state) => state.Materialcc.message)
  const projectRep = useSelector((state) => state.Navigation.projectRepresentation)

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

  useEffect(() => {
    if (params.selectedId != 0) {
      setMessageProcess(isSuccess)
      // dispatch(getLevyCategoryOption(projectRep.projectRepresentationId))
      dispatch(
        getMaterialcc({
          costCentreId: params.selectedId,
          projectRepresentationId: projectRep.projectRepresentationId,
        }),
      )
    }

    // eslint-disable-next-line
  }, [message, projectRep, params.selectedId])

  const onCloseResetAll = () => {
    setCostCentreResourceId(0)
    setResourceId(0)
  }

  const onClickEdit = (row) => {
    setCostCentreResourceId(row.costCentreResourceId)

    setResourceId(row.resourceId)
    setUnits(row.units)
    setVisible(!visible)
  }

  function onChangeMaterials(item) {
    setUnits('')
    setResourceId(item)
    console.log(item)
    var selectedMaterial = materialServices.filter((currentItem) => {
      if (currentItem.resourceId == item) {
        return currentItem
      } else {
        return null
      }
    })
    if (selectedMaterial) {
      console.log('selectedMaterial', selectedMaterial)
      if (selectedMaterial[0].units) {
        setUnits(selectedMaterial[0].units)
      }
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
        let param = { id: row.costCentreResourceId }
        console.log(param)
        dispatch(deleteMaterialcc(param))
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
      name: 'Material/Service',
      selector: (row) => row.resourceName,
      sortable: true,
    },
    {
      name: 'Units',
      selector: (row) => row.units,
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
    if (isNaN(resourceId) || resourceId < 1) {
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
        costCentreResourceId: costCentreResourceId,
        resourceId: resourceId,
      }
      if (costCentreResourceId > 0) {
        dispatch(putMaterialcc(payload))
      } else {
        dispatch(postMaterialcc(payload))
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
            {/* <CCardHeader>
              <strong>Material & Service</strong>
            </CCardHeader> */}
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
                      {costCentreResourceId > 0 ? 'Update Data' : 'Add Data'}
                    </CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="Equipment" className="col-sm-3 col-form-label">
                        Material Service
                      </CFormLabel>

                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Employee Type"
                          options={materialOptions}
                          size="sm"
                          onChange={(e) => onChangeMaterials(e.currentTarget.value)}
                          value={resourceId}
                          required
                          className={resourceId < 1 || isNaN(resourceId) ? 'is-invalid' : ''}
                        />
                        <CFormFeedback
                          invalid
                          className={resourceId < 1 || isNaN(resourceId) ? 'd-block' : ''}
                        >
                          Please select an Material/Services
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
                          placeholder="Units"
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

export default MaterialCC
