import React from 'react'
import { CCol, CRow } from '@coreui/react'
import { DocsCallout } from 'src/components'

const FinancialData = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <h1>Financial Data</h1>
        <DocsCallout name="Button" href="components/buttons" />
      </CCol>
    </CRow>
  )
}

export default FinancialData
