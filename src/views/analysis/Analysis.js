import React from 'react'
import { CCol, CRow } from '@coreui/react'
import { DocsCallout } from 'src/components'

const Analysis = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <h1>Analysis</h1>
        <DocsCallout name="Button" href="components/buttons" />
      </CCol>
    </CRow>
  )
}

export default Analysis
