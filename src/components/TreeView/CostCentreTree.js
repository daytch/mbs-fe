import React, { useState, useRef, useEffect } from 'react'
import Tree from './Tree'
import {
  getCostCentre,
  postCostCentre,
  putCostCentre,
  deleteCostCentre,
  getCostCentreName,
} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CToastBody,
  CToastClose,
  CToast,
  CForm,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSave, /* cilHistory,cilWarning */ cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const CostCentreTree = (props) => {
  // console.log('props', props)
  const { canInput, getData, setSelectedId, selectedId, setCostCentreName } = props
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [CCCode, setCCCode] = useState('')
  const [CCName, setCCName] = useState('')
  const [titleModal, setTitleModal] = useState('Add Cost Centre Structure')
  let rawData = []
  let loadedData = {}
  // eslint-disable-next-line no-unused-vars
  // const [selectedId, setSelectedId] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isSelectedChange, setIsSelectedChange] = useState(false)
  const [costCentreTreeData] = useState({})
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const err = useSelector((state) => state.CostCentre.error)
  const msg = useSelector((state) => state.CostCentre.message)
  const isDeleted = useSelector((state) => state.CostCentre.isDeleted)

  useEffect(() => {
    dispatch(
      getCostCentre({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
    )
    setMessageProcess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const dataCostCentre = useSelector((state) => state.CostCentre.data)

  useEffect(() => {
    dispatch(
      getCostCentre({ projectRepresentationId: projectRepresentation.projectRepresentationId }),
    )
    setMessageProcess()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [err, msg])
  //   const loading = useSelector((state) => state.CostCentre.loading)

  const setActiveTree = (id, objTree) => {
    if (objTree.children.length > 0 && objTree.id !== id) {
      objTree.children.forEach((item) => {
        setActiveTree(id, item)
      })
    } else {
      objTree.state.selected = objTree.id === id ? true : false
    }
    return objTree
  }

  const findChildTree = (parentId, ListTree) => {
    let childs = ListTree.map((x) => {
      return {
        id: x.costCentreId,
        text: x.costCentreCode + '-' + x.costCentreName,
        parentId: x.parentCostCentreN,
        state: {
          opened: true,
          selected: false,
        },
      }
    }).filter((item) => item.parentId === parentId)

    if (childs.length > 0) {
      childs.forEach((item) => {
        let grandChilds = findChildTree(item.id, ListTree)
        if (grandChilds.length > 0) {
          grandChilds.forEach((i) => {
            let ggChilds = findChildTree(i.id, ListTree)
            i.children = ggChilds.length > 0 ? ggChilds : []
            i.state = {
              opened: true,
              selected: false,
            }
          })
          item.children = grandChilds
          item.state = {
            opened: true,
            selected: false,
          }
        } else {
          item.children = []
        }
      })
    } else {
      childs = []
    }
    return childs
  }

  const data = useSelector((state) => {
    if (state.CostCentre.data && state.CostCentre.data.length > 0) {
      const dataCostCentre = state.CostCentre.data

      rawData = dataCostCentre
      let parents = []
      let dataTree = { core: { data: [] } }
      let idx = 0
      dataCostCentre.forEach((item) => {
        if (item.parentCostCentreN === null) {
          parents.push({
            id: item.costCentreId,
            text: item.costCentreCode + '-' + item.costCentreName,
            state: {
              opened: true,
              selected: idx < 1 && !isSelectedChange ? true : false,
            },
            children: findChildTree(item.costCentreId, dataCostCentre),
          })
        }
        idx++
      })
      dataTree.core.data = parents
      // dataTree.selected = [parents[0].id + '']
      loadedData = dataTree

      return loadedData
    } else {
      return costCentreTreeData
    }
  })

  const setMessageProcess = () => {
    if (err) {
      addToast(ToastError(err))
    } else if (msg && isDeleted) {
      addToast(ToastSuccessDelete)
    } else if (msg && !isDeleted) {
      addToast(ToastSuccess)
      setIsSelectedChange(true)
    }
  }

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

  const ToastSuccess = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been saved!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const onChange = (e, data) => {
    if (data.selected[0]) {
      if (getData) {
        getData(data.selected[0])
      }
      setIsSelectedChange(true)
      setSelectedId(data.selected[0])
      // setSelectedId(data.selected[0])

      let selectedCC = rawData.filter((x) => x.costCentreId === Number(data.selected[0]))
      if (selectedCC.length > 0) {
        dispatch(getCostCentreName({ costCentreName: selectedCC[0].costCentreName }))
        if (setCostCentreName) {
          setCostCentreName(selectedCC[0].costCentreName)
        }
      }

      loadedData?.core?.data?.forEach((item) => {
        setActiveTree(Number(data.selected[0]), item)
        item.state.selected = Number(data.selected[0]) === item.id ? true : false
        if (item.state.selected) {
          return
        }
      })
      data = loadedData
    }
  }

  const onClickEdit = () => {
    if (selectedId) {
      let selectedData = rawData.filter((x) => x.costCentreId === Number(selectedId))
      setCCCode(selectedData[0].costCentreCode)
      setCCName(selectedData[0].costCentreName)

      dispatch(getCostCentreName({ costCentreName: selectedData[0].costCentreName }))
      setTitleModal('Edit Cost Centre Structure')
      setVisible(true)
      setIsEdit(true)
    } else {
      Swal.fire({
        title: 'Nothing Selected',
        text: 'You must select cost centre structure!.',
        icon: 'warning',
      })
    }
  }
  const onClickSave = () => {
    console.log('onClickSave')
    let param = {}
    if (isEdit) {
      // edit
      let dt = rawData.filter((x) => x.costCentreId === Number(selectedId))
      param = {
        costCentreId: selectedId,
        projectRepresentationId: projectRepresentation.projectRepresentationId,
        costCentreCode: CCCode,
        costCentreName: CCName,
        parentCostCentreN: dt[0].parentCostCentreN ? Number(dt[0].parentCostCentreN) : null,
      }
      dispatch(putCostCentre(param))
    } else {
      // add
      param = {
        projectRepresentationId: projectRepresentation.projectRepresentationId,
        costCentreCode: CCCode,
        costCentreName: CCName,
        parentCostCentreN: selectedId ? Number(selectedId) : null,
      }
      dispatch(postCostCentre(param))
      onCloseResetAll()
    }
    setVisible(false)
  }

  const onClickDelete = () => {
    console.log('onClickDelete')
    dispatch(deleteCostCentre(selectedId))
    setSelectedId(-99)
    setSelectedId(-99)
  }

  const onCloseResetAll = () => {
    console.log('onCloseResetAll')
    setCCCode('')
    setCCName('')
    //  setSelectedId('')
  }
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="bottom-end" />
      <div style={{ overflowX: 'auto' }}>
        <Tree treeData={data} onChange={(e, data) => onChange(e, data)} treeSearchData={{}} />
      </div>
      <br />
      <br />

      <CModal alignment="center" scrollable visible={visible}>
        <CModalHeader>
          <CModalTitle>{titleModal}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="g-3 needs-validation"
            noValidate
            // validated={validated}
            // onSubmit={handleSubmit}
          >
            <CRow className="mb-1">
              <CFormLabel htmlFor="CCCode" className="col-sm-4 col-form-label">
                Cost Centre Code
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  size="sm"
                  value={CCCode}
                  placeholder="Please input Code"
                  onInput={(e) => setCCCode(e.currentTarget.value)}
                  required
                />
                <CFormFeedback invalid>Cost Centre Code is required.</CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="CCName" className="col-sm-4 col-form-label">
                Cost Centre Name
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  size="sm"
                  value={CCName}
                  placeholder="Please input Name"
                  onInput={(e) => setCCName(e.currentTarget.value)}
                  required
                />
                <CFormFeedback invalid>Cost Centre Code is required.</CFormFeedback>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)} size="sm">
            Close
          </CButton>
          <CButton color="primary" onClick={onClickSave} type="submit" size="sm">
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
      {canInput && (
        <CRow>
          <CCol xs="12" sm="12" md="12" lg="12">
            <CButton
              color="primary"
              variant="outline"
              size="sm"
              onClick={() => {
                onCloseResetAll()
                setIsEdit(false)
                setTitleModal('Add Cost Centre Structure')
                setVisible(true)
              }}
            >
              <CIcon icon={cilSave} />
              <span className="ms-2">Add</span>
            </CButton>
            <CButton
              color="info"
              variant="outline"
              size="sm"
              className="mx-2"
              onClick={() => onClickEdit()}
            >
              <CIcon icon={cilPencil} />
              <span className="ms-2">Edit</span>
            </CButton>
            <CButton color="danger" variant="outline" size="sm" onClick={() => onClickDelete()}>
              <CIcon icon={cilTrash} />
              <span className="ms-2">Delete</span>
            </CButton>
          </CCol>
        </CRow>
      )}
    </>
  )
}

CostCentreTree.propTypes = {
  canInput: PropTypes.bool,
  getData: PropTypes.func,
  setSelectedId: PropTypes.func,
  selectedId: PropTypes.any,
  setCostCentreName: PropTypes.func,
}

export default CostCentreTree
