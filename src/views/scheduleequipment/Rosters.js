import React from 'react'
import { CCol, CRow, CCard, CCardBody, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilHistory, cilSave } from '@coreui/icons'
import TableSE from './TableScheduleEquipment'
import './cost.css'
import PropTypes from 'prop-types'

const Rosters = (props) => {
  console.log('props : ', props)
  const {
    dataRosters,
    dataEquipmentRosters,
    arrPeriodData,
    isEdit,
    setDeletedId,
    deletedId,
    onClickEdit,
    onClickSave,
    onClickReset,
  } = props

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <TableSE
              key={dataEquipmentRosters}
              arrPeriodData={arrPeriodData}
              isEdit={isEdit}
              dataScheduleRoster={dataEquipmentRosters}
              setDeletedId={setDeletedId}
              deletedId={deletedId}
              data={dataEquipmentRosters}
              dataRosters={dataRosters}
              tipe={'roster'}
            />
            <CButton
              size="sm"
              color="info"
              variant="outline"
              onClick={onClickEdit}
              className="mx-1"
            >
              <CIcon icon={cilPencil} />
              <span className="ms-2">Edit</span>
            </CButton>
            <CButton
              size="sm"
              color="primary"
              variant="outline"
              onClick={onClickSave}
              className="mx-1"
            >
              <CIcon icon={cilSave} />
              <span className="ms-2">Save</span>
            </CButton>
            <CButton
              size="sm"
              color="warning"
              variant="outline"
              onClick={onClickReset}
              className="mx-1"
            >
              <CIcon icon={cilHistory} />
              <span className="ms-2">Reset</span>
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Rosters.propTypes = {
  dataRosters: PropTypes.array,
  dataEquipmentRosters: PropTypes.array,
  arrPeriodData: PropTypes.array,
  isEdit: PropTypes.bool,
  setDeletedId: PropTypes.func,
  getColumn: PropTypes.func,
  deletedId: PropTypes.array,
  onClickEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  onClickReset: PropTypes.func,
}

export default Rosters
