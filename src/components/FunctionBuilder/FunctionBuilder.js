/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CContainer,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import PropTypes from 'prop-types'
import './FunctionBuilder.css'
import { useSelector, useDispatch } from 'react-redux'
import Operators from './../../assets/doc/operator.json'
import {
  hideModal,
  getProductionFactor,
  getProductionSchedule,
  getConstant,
  testFormula,
} from './../../redux/actions'

const FunctionBuilder = (props) => {
  const [projectRepresentation] = useState(
    JSON.parse(localStorage.getItem('projectRepresentation')),
  )
  const [descOperator, setDescOperator] = useState('')
  const [formula, setFormula] = useState('')
  const [menuChild, setMenuChild] = useState([])
  const [menuParent, setMenuParent] = useState(Operators)
  // const [costCentreName, setCostCentreName] = useState('')
  const dispatch = useDispatch()

  const dataFactor = useSelector((state) => state.ProductionFactor.data)
  const dataSchedule = useSelector((state) => state.ProductionSchedule.data)
  const dataConstants = useSelector((state) => state.Constant.data)

  useEffect(() => {
    if (dataFactor.length < 1) {
      dispatch(
        getProductionFactor({
          projectRepresentationId: projectRepresentation.projectRepresentationId,
        }),
      )
    }
    if (dataSchedule.length < 1) {
      dispatch(
        getProductionSchedule({
          projectRepresentationId: projectRepresentation.projectRepresentationId,
        }),
      )
    }
    if (dataConstants.length < 1) {
      dispatch(getConstant(projectRepresentation.projectRepresentationId))
    }
  }, [])

  const activateParentMenu = (item) => {
    let tempMenu = [...menuParent]
    tempMenu.forEach((element) => {
      element.isActive = element === item ? true : false
    })
    setMenuParent(tempMenu)
    if (item.id >= 8) {
      // fill child menu
      setMenuChild(getDynamicChildMenu[item.id](item))
    }
  }

  const equipmentOH = useSelector((state) => state.EquipmentScheduleOH?.data)

  const onCloseHideModal = () => {
    dispatch(hideModal())
  }

  const activateChildMenu = (item) => {
    let tempMenu = [...menuChild]
    tempMenu.forEach((element) => {
      element.isActive = element === item ? true : false
    })
    setMenuChild(tempMenu)
  }
  const visible = useSelector((state) => state.FunctionBuilder.visible)
  const costCentreName = useSelector((state) => state.FunctionBuilder.costCentreName)
  const periodName = useSelector((state) => state.FunctionBuilder.periodName)
  const result = useSelector((state) => state.FunctionBuilder.result)
  const idCell = useSelector((state) => state.FunctionBuilder.activeCell)
  // console.log('costCentreName: ', costCentreName)
  // console.log('visible: ', visible)
  // const getFormulaFromChildMenu = {}

  const onClickSave = () => {
    const elmts = document.getElementById(idCell)
    if (elmts && formula) {
      elmts.value = formula
    }
  }
  const onClickChildMenu = (e, item) => {
    // eslint-disable-next-line default-case
    switch (e.detail) {
      case 1:
        setDescOperator(item.desc)
        activateChildMenu(item)
        break
      case 2:
        let newFormula = formula + item.formula
        setFormula(newFormula)
        break
      case 3:
        console.log('triple click')
        break
    }
  }

  const getDynamicChildMenu = {
    8: (item) => {
      return equipmentOH.map((i, idx) => {
        return {
          id: i.ccFleetOHID,
          name: costCentreName ? '"' + i.fleetName + '" in ' + costCentreName : i.fleetName,
          desc: 'EquipOH(Cost Centre, Fleet,Period)',
          formula: 'EquipOH("' + costCentreName + '","' + i.fleetName + ',"' + periodName + '")',
        }
      })
    },
    9: (item) => {
      return dataFactor.map((i, idx) => {
        return {
          id: i.productName,
          name: i.productName,
          desc: 'Factor(Factor Name,Period)',
          formula: 'Factor("' + i.productName + '","' + periodName + '")',
        }
      })
    },
    10: (item) => {
      return dataSchedule.map((i, idx) => {
        return {
          id: i.productName,
          name: i.productName,
          desc: 'ProdQty(Product Name,Period)',
          formula: 'ProdQty("' + i.productName + '","' + periodName + '")',
        }
      })
    },
    11: (item) => {
      return dataConstants.map((i, idx) => {
        return {
          id: i.constantId,
          name: i.constantName,
          desc: 'Constant(Constant Name)',
          formula: 'Constant("' + i.constantName + '")',
        }
      })
    },
    12: (item) => {
      return projectRepresentation.periods.map((i, idx) => {
        return {
          id: i.periodId,
          name: i.periodName,
          desc: 'PeriodDays(Period Name)',
          formula: 'PeriodDays("' + i.periodName + '")',
        }
      })
    },
  }

  const handleTestFormula = () => {
    dispatch(
      testFormula({
        formula: formula,
        projectRepresentationId: projectRepresentation.projectRepresentationId,
      }),
    )
  }
  // console.log('idCell:', idCell)
  return (
    <CModal size="lg" alignment="center" scrollable visible={visible}>
      <CModalHeader>
        <CModalTitle>Function Builder</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer>
          <CRow className="px-3">
            <CCol
              xs={9}
              //  className="bg-secondary text-white overflow-scroll"
            >
              {/* {formula} */}
              <CFormTextarea
                className="bg-secondary text-white overflow-scroll"
                style={{ height: '200px' }}
                value={formula}
                onChange={(e) => setFormula(e.currentTarget.value)}
              >
                {/* {formula} */}
              </CFormTextarea>
            </CCol>
            <CCol xs={3}>
              <div className="d-grid gap-1 col-12 mx-0">
                <CButton color="info" size="sm">
                  Ok
                </CButton>
                <CButton color="danger" size="sm">
                  Cancel
                </CButton>
              </div>
            </CCol>
          </CRow>
          <CRow className="px-3">
            <CContainer className="py-2 my-2">
              <CRow className="align-text-bottom">
                <CCol xs={2} style={{ padding: '0px' }}>
                  <CButton style={{ fontSize: '8px', width: '100%' }} onClick={handleTestFormula}>
                    Test function →
                  </CButton>
                </CCol>
                <CCol xs={4}>
                  <CFormInput type="text" size="sm" value={result} />
                </CCol>
                <CCol xs={6} className="align-self-end">
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="example"
                      style={{ fontSize: '10px', padding: '7px 5px 7px' }}
                      className="col-sm-4 text-end col-form-label"
                    >
                      Decimal places:
                    </CFormLabel>
                    <CCol sm={2} style={{ padding: '0px' }}>
                      <CFormInput type="number" size="sm" id="example" />
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12}>
                  <div style={{ fontSize: '8px', color: 'red', margin: '-0.7rem 0px 0px -0.7rem' }}>
                    Test function button will calculate result based on saved schedule only.
                  </div>
                </CCol>
              </CRow>
            </CContainer>
          </CRow>
          <CRow className="px-3 my-3">
            <CCol xs={12}>
              <CButton size="sm" color="secondary" variant="ghost">
                +
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                -
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                /
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                x
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                =
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                {'\u003E'}
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                {'\u003C'}
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                {'\u003C\u003E'}
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                And
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                Or
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                Not
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                If
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                (
              </CButton>
              <CButton size="sm" color="secondary" variant="ghost">
                )
              </CButton>
            </CCol>
          </CRow>
          <CRow className="px-3">
            <CCol xs={6}>
              <div style={{ height: '325px' }} className="hover-div bg-secondary text-white p-2">
                <ul style={{ listStyleType: 'none' }} className="row">
                  {menuParent.map((item, idx) => {
                    return (
                      <li
                        className="col-12"
                        style={{ margin: '0px 0px 3px 0px', fontSize: '10px' }}
                        key={item.id}
                      >
                        <a
                          onClick={() => {
                            setMenuChild(item.child)
                            activateParentMenu(item)
                          }}
                          style={{
                            backgroundColor: item.isActive ? 'black' : '',
                            color: item.isActive ? 'white' : '',
                          }}
                        >
                          {item.name}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </CCol>
            <CCol xs={6} style={{ height: '325px' }} className="bg-secondary text-white">
              <div className="hover-div bg-secondary text-white p-2">
                <ul style={{ listStyleType: 'none' }} className="row">
                  {menuChild.map((item, idx) => {
                    return (
                      <li
                        className="col-12"
                        style={{ margin: '0px 0px 3px 0px', fontSize: '10px' }}
                        key={idx}
                      >
                        <a
                          onClick={(e) => onClickChildMenu(e, item)}
                          style={{
                            backgroundColor: item.isActive ? 'black' : '',
                            color: item.isActive ? 'white' : '',
                          }}
                        >
                          {item.name}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </CCol>
            <i style={{ fontSize: '10px' }}>{descOperator}</i>
          </CRow>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onCloseHideModal} size="sm">
          Close
        </CButton>
        <CButton color="primary" onClick={onClickSave} type="submit" size="sm">
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

FunctionBuilder.propTypes = {
  // visible: PropTypes.bool,
  selectedId: PropTypes.number,
  // setVisible: PropTypes.func,
}
export default FunctionBuilder
