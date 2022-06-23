import React from 'react'
import { CCol, CRow } from '@coreui/react'
import { DocsCallout } from 'src/components'

const BaseData = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <h1>Base Data</h1>
        <DocsCallout name="Button" href="components/buttons" />
      </CCol>
    </CRow>
  )
}

export default BaseData
