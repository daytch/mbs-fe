import React, { useState, useEffect } from 'react'
import { CCol, CRow, CCard } from '@coreui/react'
import InputData from './InputData'
import PyshicalOutput from './PyshicalOutput'
import CostOutput from './CostOutput'
import { getCurrencies } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import datas from '../../assets/doc/inputdata.json'
import dataPhysicalOutput from '../../assets/doc/physicaloutput.json'
import dataCostOutput from '../../assets/doc/costoutput.json'

const Report = () => {
  const dispatch = useDispatch()
  const am = localStorage.getItem('actMenu')
  const [equipmentModelCosts, setEquipmentModelCosts] = useState([])
  const [isNew, setIsNew] = useState(true)
  const [actMenu, setActMenu] = useState(am ? am : '1')
  const paperSize = [
    // { label: 'Please select', value: -1 },
    { label: 'A4', value: 'A4' },
    { label: 'Letter', value: 'LETTER' },
    { label: 'Legal', value: 'LEGAL' },
  ]
  const decimalPoint = [
    // { label: 'Please select', value: -1 },
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '10', value: 9 },
    { label: '11', value: 10 },
    { label: '12', value: 11 },
    { label: '13', value: 12 },
    { label: '14', value: 13 },
    { label: '15', value: 14 },
  ]
  const lastCol = [
    // { label: 'Please select', value: -1 },
    { value: 'max', label: 'Max' },
    { value: 'min', label: 'Min' },
    { value: 'avg', label: 'Avg' },
    { value: 'total', label: 'Total' },
  ]

  useEffect(() => {
    dispatch(getCurrencies())
    setIsNew(false)
    // eslint-disable-next-line
  }, [])
  const updateEquipmentModelCosts = (index, id, isi) => {
    let dataCost = {
      rowId: index,
      equipmentModelCostComponentId: 0,
      costComponentName: '',
      units: '',
      quantity: 0,
      countryId: 0,
      componentCost: 0,
    }
    let data = [...equipmentModelCosts]
    let tempData = data[index]
    if (tempData) {
      tempData[id] = isi
      setEquipmentModelCosts(data)
    } else {
      tempData = []
      dataCost[id] = isi
      tempData.push(dataCost)
      if (data.length > 0) {
        setEquipmentModelCosts(data.concat(tempData))
      } else {
        setEquipmentModelCosts(tempData)
      }
    }
  }
  const renderTable = {
    1: () => {
      return (
        <InputData
          dataSource={datas}
          updateEquipmentModelCosts={updateEquipmentModelCosts}
          isNew={isNew}
        />
      )
    },
    2: () => {
      return (
        <PyshicalOutput
          dataSource={dataPhysicalOutput}
          updateEquipmentModelCosts={updateEquipmentModelCosts}
          isNew={isNew}
          paperSize={paperSize}
          decimalPoint={decimalPoint}
          lastCol={lastCol}
        />
      )
    },
    3: () => {
      return (
        <CostOutput
          dataSource={dataCostOutput}
          updateEquipmentModelCosts={updateEquipmentModelCosts}
          isNew={isNew}
          paperSize={paperSize}
          decimalPoint={decimalPoint}
          lastCol={lastCol}
        />
      )
    },
  }
  // console.log('decimal Point (Report.js):', decimalPoint)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="p-4">
          <div className="container">
            <div className="row">
              <div className="col-2 my-auto">Show report&apos;s group</div>
              <div className="col-7 container">
                <div className="row border border-dark p-2 ">
                  <div className="col-3 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="reportType"
                      id="reportType1"
                      value={actMenu}
                      checked={actMenu === '1'}
                      onChange={() => {
                        localStorage.setItem('actMenu', '1')
                        setActMenu('1')
                      }}
                    />
                    <label className="form-check-label" htmlFor="reportType1">
                      Input Data
                    </label>
                  </div>
                  <div className="col-5 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="reportType"
                      id="reportType2"
                      value={actMenu}
                      checked={actMenu === '2'}
                      onChange={() => {
                        localStorage.setItem('actMenu', '2')
                        setActMenu('2')
                      }}
                    />
                    <label className="form-check-label" htmlFor="reportType2">
                      Pyshical Output Schedules
                    </label>
                  </div>
                  <div className="col-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="reportType"
                      id="reportType3"
                      value={actMenu}
                      onChange={() => {
                        localStorage.setItem('actMenu', '3')
                        setActMenu('3')
                      }}
                      checked={actMenu === '3'}
                    />
                    <label className="form-check-label" htmlFor="reportType3">
                      Cost Output Schedules
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-2"></div>
            </div>
            <p className="mt-4 mb-n1">Select Reports to be processed:</p>
          </div>
          {}
          {renderTable[actMenu]()}
          {/* <InputData
            dataSource={datas}
            updateEquipmentModelCosts={updateEquipmentModelCosts}
            currencies={currencies}
            isNew={isNew}
          /> */}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Report
