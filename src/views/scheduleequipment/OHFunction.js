import React from 'react'
import { CCol, CRow, CCard, CCardBody, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilHistory, cilSave } from '@coreui/icons'
import TableSE from './TableScheduleEquipment'
import './cost.css'
import PropTypes from 'prop-types'

const OHFunction = (props) => {
  // console.log('OH Function props : ', props)
  const {
    dataEquipmentOH,
    arrPeriodData,
    isEdit,
    onClickEdit,
    onClickSave,
    onClickReset,
  } = props

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            {dataEquipmentOH?.length > 0 && (
              <TableSE
                key={dataEquipmentOH}
                arrPeriodData={arrPeriodData}
                isEdit={isEdit}
                dataScheduleOH={dataEquipmentOH}
                tipe={'oh'}
              />
            )}
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

OHFunction.propTypes = {
  dataEquipmentOH: PropTypes.array,
  arrPeriodData: PropTypes.array,
  isEdit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  onClickReset: PropTypes.func,
}

export default OHFunction
