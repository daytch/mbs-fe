import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CCol,
  CRow,
  CTabPane,
  CButton,
} from '@coreui/react'
import CostCentreTree from './../../components/TreeView/CostCentreTree'
import Equipment from './Equipment'
// import Infrastructure from './Infrastructure'

const CapitalCostSpreading = () => {
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)
  const [activeKey, setActiveKey] = useState(1)
  const [selectedId, setSelectedId] = useState(0)
  const [isEditEQ, setIsEditEQ] = useState(false)

  // const loading = useSelector((state) => state.InfraChecklist.loading)

  const renderTabs = () => {
    return (
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Equipment
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#!" active={activeKey === 4} onClick={() => setActiveKey(4)}>
              Infrastructure
            </CNavLink>
          </CNavItem> */}
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="equipment-tab" visible={activeKey === 1}>
            <div className="overflow-auto">
              <Equipment isEdit={isEditEQ} />
            </div>
            <div>
              <CButton color="info" onClick={() => setIsEditEQ(!isEditEQ)} size="sm">
                Edit
              </CButton>
              <CButton color="primary" className="mx-3" type="button" size="sm">
                Save
              </CButton>
              <CButton color="warning" type="button" size="sm">
                Reset
              </CButton>
            </div>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="infrastructure-tab" visible={activeKey === 4}>
            {/* <Infrastructure selectedId={selectedId} /> */}
          </CTabPane>
        </CTabContent>
      </>
    )
  }

  return (
    <CRow>
      <CCol xs={4}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cost Centre Structure</strong>
          </CCardHeader>
          <CCardBody>
            <CostCentreTree canInput={true} selectedId={selectedId} setSelectedId={setSelectedId} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={8}>
        <CCard className="mb-4">
          <CCardBody>{renderTabs()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CapitalCostSpreading
