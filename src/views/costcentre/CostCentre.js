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
} from '@coreui/react'
import CostCentreTree from '../../components/TreeView/CostCentreTree'
import Equipment from './Equipment'
import Personel from './Personnel'
import Material from './Material'
import Infrastructure from './infrastructure/Infrastructure'

const CostCentre = () => {
  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)
  const [activeKey, setActiveKey] = useState(1)
  const [selectedId, setSelectedId] = useState(0)

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
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 2} onClick={() => setActiveKey(2)}>
              Personnel
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 3} onClick={() => setActiveKey(3)}>
              Materials & Services
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 4} onClick={() => setActiveKey(4)}>
              Infrastructure
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="equipment-tab" visible={activeKey === 1}>
            <Equipment selectedId={selectedId} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="personnel-tab" visible={activeKey === 2}>
            <Personel selectedId={selectedId} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="materials-tab" visible={activeKey === 3}>
            <Material selectedId={selectedId} />
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="infrastructure-tab" visible={activeKey === 4}>
            <Infrastructure selectedId={selectedId} />
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

export default CostCentre
