import React from 'react'
import CreatableSelect from 'react-select/creatable'
import PropTypes from 'prop-types'

const CostCentreType = (props) => {
  const {
    setCostCentreType,
    costCentreType,
    costCentreName,
    dataDropdown,
    dropdownLabel,
    setDropdownLabel,
  } = props
  return (
    <>
      <div style={{ fontSize: '15px' }}>Selected Cost Centre : {costCentreName}</div>
      <div className="border border-dark rounded mb-4 p-1" style={{ fontSize: '15px' }}>
        <span>Show Material & Service for : </span>
        <input
          onChange={(e) => setCostCentreType(e.target.value)}
          className="ms-2"
          type="radio"
          value="CostCentre"
          name="costcentre"
          checked={costCentreType === 'CostCentre'}
        />
        Cost Centre
        <input
          onChange={(e) => setCostCentreType(e.target.value)}
          className="ms-2"
          type="radio"
          value="CostCentreInfrastructure"
          name="costcentre"
          checked={costCentreType === 'CostCentreInfrastructure'}
        />
        Cost Centre Infrastructure
        <CreatableSelect
          options={dataDropdown}
          onChange={(selectedOption, triggeredAction) => {
            if (triggeredAction.action === 'clear') {
              setDropdownLabel('')
            } else {
              setDropdownLabel(selectedOption.label)
            }
          }}
          isClearable={true}
          value={dataDropdown ? dataDropdown.filter((item) => item.label === dropdownLabel) : ''}
        />
      </div>
    </>
  )
}

CostCentreType.propTypes = {
  setCostCentreType: PropTypes.func,
  costCentreType: PropTypes.string,
  costCentreName: PropTypes.string,
  dataDropdown: PropTypes.array,
  dropdownLabel: PropTypes.string,
  setDropdownLabel: PropTypes.func,
}

export default CostCentreType
