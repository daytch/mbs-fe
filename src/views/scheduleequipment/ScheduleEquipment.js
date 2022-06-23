import React from 'react'
import { CCol, CRow } from '@coreui/react'
import { DocsCallout } from 'src/components'

const ScheduleEquipment = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <h1>Schedule Equipment</h1>
        <DocsCallout name="Button" href="components/buttons" />
      </CCol>
    </CRow>
  )
}

export default ScheduleEquipment
