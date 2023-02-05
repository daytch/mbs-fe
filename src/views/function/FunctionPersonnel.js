import React from 'react'
import { CCol, CRow, CCard, CCardBody, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilHistory, cilSave } from '@coreui/icons'
import TableSE from './TableFunction'
import './cost.css'
import PropTypes from 'prop-types'
import CostCentreType from './../../components/CostCentreType'

const FunctionPersonnel = (props) => {
  console.log('Roster props : ', props)
  const {
    dataFunctionPersonnel,
    arrPeriodData,
    isEdit,
    onClickEdit,
    onClickSave,
    onClickReset,
    setCostCentreType,
    costCentreType,
    costCentreName,
    dataDropdown,
    dropdownLabel,
    setDropdownLabel,
  } = props

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CostCentreType
              setCostCentreType={setCostCentreType}
              costCentreType={costCentreType}
              costCentreName={costCentreName}
              dataDropdown={dataDropdown}
              dropdownLabel={dropdownLabel}
              setDropdownLabel={setDropdownLabel}
            />
            <TableSE
              key={dataFunctionPersonnel}
              arrPeriodData={arrPeriodData}
              isEdit={isEdit}
              dataFunctionPersonnel={dataFunctionPersonnel}
              data={dataFunctionPersonnel}
              // dataRosters={dataRosters}
              tipe={'personnel'}
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

FunctionPersonnel.propTypes = {
  dataFunctionPersonnel: PropTypes.array,
  arrPeriodData: PropTypes.array,
  isEdit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  onClickReset: PropTypes.func,
  setCostCentreType: PropTypes.func,
  costCentreType: PropTypes.string,
  costCentreName: PropTypes.string,
  dataDropdown: PropTypes.array,
  dropdownLabel: PropTypes.string,
  setDropdownLabel: PropTypes.func,
}

export default FunctionPersonnel
