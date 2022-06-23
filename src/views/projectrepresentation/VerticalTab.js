import React, { useState, useEffect } from 'react'
import './VerticalTab.css'
import PropType from 'prop-types'
import { CCol, CRow, CFormLabel, CFormInput, CFormSelect } from '@coreui/react'
import { formatDate } from 'src/functions'
import Period from './Period'
import { isEmptyNullOrUndefined } from '../../functions'
import { useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilReload } from '@coreui/icons'

// eslint-disable-next-line react/prop-types
const VerticalTab = (props) => {
  const [data] = useState(props.dataCalendar)
  const [ListOpsStartDate, setListOpsStartDate] = useState([
    { value: data[data.length - 1].periodStart, label: data[data.length - 1].periodStart },
  ])
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState([
    {
      id: '0',
      name: 'Current Project',
      info: 'London is the capital city of England.',
      isActive: true,
    },
    { id: '1', name: 'Shorten', info: 'Paris is the capital of France.', isActive: false },
    { id: '2', name: 'Extend', info: 'Tokyo is the capital of Japan.', isActive: false },
    { id: '3', name: 'Customize', info: 'Tokyo is the capital of Japan.', isActive: false },
    { id: '4', name: 'Ops Start Date', info: 'Tokyo is the capital of Japan.', isActive: false },
    { id: '5', name: 'Year Start On', info: 'Tokyo is the capital of Japan.', isActive: false },
    { id: '6', name: 'Reset', info: 'Tokyo is the capital of Japan.', isActive: false },
    { id: '7', name: 'Delete', info: 'Tokyo is the capital of Japan.', isActive: false },
  ])
  useEffect(() => {
    let excludeDate = data.filter(
      (item) =>
        new Date(item.periodStart).setHours(0, 0, 0, 0) !==
          new Date(props.costsStartD).setHours(0, 0, 0, 0) ||
        new Date(item.periodStart).setHours(0, 0, 0, 0) !==
          new Date(props.opsStartD).setHours(0, 0, 0, 0),
    )
    let dateEx = excludeDate.map((item) => ({ value: item.periodStart, label: item.periodStart }))
    setListOpsStartDate([...dateEx])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.costsStartD, props.opsStartD, data])
  const yearStart = useSelector((state) => state.ProjectRepresentation.yearStartOn)
  const handleClick = (id) => {
    setActiveTab(id)
    let tbs = [...tabs]
    tbs.forEach((t) => {
      if (Number(t.id) === id) {
        t.isActive = true
      } else {
        t.isActive = false
      }
    })
    setTabs(tbs)
  }
  return (
    <div>
      <div className="tab">
        {tabs.map((button, i) => {
          if (button.id === '6') {
            return (
              <button
                key={button.name}
                className="btn btn-sm btn-block btn-warning"
                onClick={props.onClickResetCalendar}
              >
                <CIcon icon={cilReload} /> {button.name}
              </button>
            )
          } else if (button.id === '7') {
            return (
              <button
                key={button.name}
                className="btn btn-sm btn-block btn-danger"
                onClick={props.onClickDelCalendar}
              >
                <CIcon icon={cilTrash} /> {button.name}
              </button>
            )
          } else {
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <div
                key={button.name}
                className={`tablinks ${button.isActive ? 'active' : ''}`}
                onClick={() => {
                  handleClick(i)
                  props.changeSelectedPeriodType(i)
                }}
              >
                {button.name}
              </div>
            )
          }
        })}
      </div>

      <div className="tabcontent">
        {activeTab !== -1 && (
          <React.Fragment>
            {/* <h4>{tabs[activeTab].name}</h4> */}
            {(() => {
              switch (activeTab) {
                case 0:
                  return (
                    <CRow>
                      <CCol xs={12}>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Costs Start Date
                          </CFormLabel>
                          <CCol sm={8}>
                            <CFormInput
                              size="sm"
                              placeholder="Costs Start Date"
                              value={props.costsStartD ? formatDate(props.costsStartD) : ''}
                              disabled={true}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Operations Start Date
                          </CFormLabel>
                          <CCol sm={8}>
                            <CFormInput
                              size="sm"
                              placeholder="Operations Start Date"
                              value={props.opsStartD ? formatDate(props.opsStartD) : ''}
                              disabled={true}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Project End Date
                          </CFormLabel>
                          <CCol sm={8}>
                            <CFormInput
                              size="sm"
                              placeholder="Project End Date"
                              value={
                                !isEmptyNullOrUndefined(props.projectEndD)
                                  ? formatDate(props.projectEndD)
                                  : ''
                              }
                              disabled={true}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Number of Period
                          </CFormLabel>
                          <CCol sm={8}>
                            <CFormInput
                              size="sm"
                              placeholder="Number of Period"
                              value={props.noOfPeriod - 1}
                              disabled={true}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Year start On
                          </CFormLabel>
                          <CCol sm={8}>
                            <CFormSelect
                              aria-label="Year Start On"
                              options={props.yearStart}
                              value={props.yearStartOn}
                              disabled={true}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  )
                case 1:
                  return (
                    <>
                      <Period key={new Date().getTime()} dataPeriod={data} isCustom={false} />
                      <CRow>
                        <CCol xs={12}>
                          <CRow>
                            <CFormLabel htmlFor="notes" className="col-sm-8 col-form-label">
                              Number of periods to delete from Start :
                            </CFormLabel>
                            <CCol sm={2}>
                              <CFormInput
                                size="sm"
                                value={props.deleteStart}
                                type="number"
                                onChange={(e) => props.setDeleteStart(e.currentTarget.value)}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CFormLabel htmlFor="notes" className="col-sm-8 col-form-label">
                              Number of periods to delete from End :
                            </CFormLabel>
                            <CCol sm={2}>
                              <CFormInput
                                size="sm"
                                type="number"
                                value={props.deleteEnd}
                                onChange={(e) => props.setDeleteEnd(e.currentTarget.value)}
                              />
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </>
                  )
                case 2:
                  return (
                    <>
                      <Period dataPeriod={data} isCustom={false} />
                      <CRow>
                        <CCol xs={12}>
                          <CRow>
                            <CFormLabel htmlFor="notes" className="col-sm-8 col-form-label">
                              Number of periods to add from Start :
                            </CFormLabel>
                            <CCol sm={2}>
                              <CFormInput
                                size="sm"
                                type="number"
                                value={props.addStart}
                                onChange={(e) => props.setAddStart(e.currentTarget.value)}
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CFormLabel htmlFor="notes" className="col-sm-8 col-form-label">
                              Number of periods to add from End :
                            </CFormLabel>
                            <CCol sm={2}>
                              <CFormInput
                                size="sm"
                                type="number"
                                value={props.addEnd}
                                onChange={(e) => props.setAddEnd(e.currentTarget.value)}
                              />
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </>
                  )
                case 3:
                  return (
                    <Period
                      dataPeriod={data}
                      isCustom={true}
                      onClickSaveCalendar={props.onClickSaveCalendar}
                      setStartDate={props.setStartDate}
                      setEndDate={props.setEndDate}
                    />
                  )
                case 4:
                  return (
                    <>
                      <Period dataPeriod={data} isCustom={false} />
                      <CRow>
                        <CCol xs={12}>
                          <CRow>
                            <CFormLabel htmlFor="notes" className="col-sm-6 col-form-label">
                              New Operations Start Date :
                            </CFormLabel>
                            <CCol sm={6}>
                              <CFormSelect
                                size="sm"
                                options={ListOpsStartDate}
                                value={props.opsStartDate}
                                onChange={(e) => props.setOpsStartDate(e.currentTarget.value)}
                              />
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </>
                  )
                case 5:
                  return (
                    <>
                      <Period dataPeriod={data} isCustom={false} />
                      <CRow>
                        <CCol xs={12}>
                          <CRow>
                            <CFormLabel htmlFor="notes" className="col-sm-6 col-form-label">
                              Year Starts On:
                            </CFormLabel>
                            <CCol sm={6}>
                              <CFormSelect
                                size="sm"
                                options={yearStart}
                                value={props.yearStartOnPeriod}
                                onChange={(e) => props.setYearStartOnPeriod(e.currentTarget.value)}
                              />
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </>
                  )
                default:
              }
            })()}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default VerticalTab

VerticalTab.propTypes = {
  startDate: PropType.any,
  setStartDate: PropType.func,
  endDate: PropType.any,
  setEndDate: PropType.func,
  yearStart: PropType.array,
  yearStartOn: PropType.number,
  dataCalendar: PropType.array,
  noOfPeriod: PropType.number,
  costsStartD: PropType.any,
  opsStartD: PropType.any,
  projectEndD: PropType.any,
  changeSelectedPeriodType: PropType.func,
  onClickResetCalendar: PropType.func,
  onClickSaveCalendar: PropType.func,
  onClickDelCalendar: PropType.func,
  deleteStart: PropType.any,
  setDeleteStart: PropType.any,
  deleteEnd: PropType.any,
  setDeleteEnd: PropType.any,
  addStart: PropType.any,
  setAddStart: PropType.any,
  addEnd: PropType.any,
  setAddEnd: PropType.any,
  yearStartOnPeriod: PropType.any,
  setYearStartOnPeriod: PropType.any,
  opsStartDate: PropType.any,
  setOpsStartDate: PropType.any,
}
