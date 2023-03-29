import React, { useState } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
// import './analysis.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& .MuiTableCell-sizeSmall': {
      padding: '5px 16px 5px 16px', // <-- arbitrary value
    },
  },
})

const Analysis = () => {
  const classes = useStyles()
  const [radioTop, setRadioTop] = useState({ full: true, physical: false, cost: false })
  const [radioLeft, setRadioLeft] = useState({ from: true, restart: false, one: false })
  const [visible, setVisible] = useState(false)
  const [isEquipment, setIsEquipment] = useState(true)
  const [eActiveTab, setEActiveTab] = useState(1)
  const [pActiveTab, setPActiveTab] = useState(1)

  const handleOpen = (e) => {
    e.nativeEvent.stopImmediatePropagation()
    setVisible(true)
  }

  const renderTab = () => (
    <>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink href="#!" active={eActiveTab === 1} onClick={() => setEActiveTab(1)}>
            General
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#!" active={eActiveTab === 2} onClick={() => setEActiveTab(2)}>
            Replacement
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#!" active={eActiveTab === 3} onClick={() => setEActiveTab(3)}>
            Disposal
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={eActiveTab === 1}>
          <CCard className="p-4">
            If availble used and owned already equipment operating hours exceeds the fleet
            potential:
            <div className="row">
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop1"
                  // value={actMenu}
                  checked={radioLeft.from}
                  onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Adjust to the maximum available OH
                </label>
              </div>
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop2"
                  // value={actMenu}
                  checked={radioLeft.restart}
                  onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Abort with error message
                </label>
              </div>
            </div>
          </CCard>
          <CCard className="p-4">
            If project calendar has insuffient for equipment disposal:
            <div className="row">
              <div className="col-5 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop1"
                  // value={actMenu}
                  checked={radioLeft.from}
                  onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Create an additional period
                </label>
              </div>
              <div className="col-5 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop2"
                  // value={actMenu}
                  checked={radioLeft.restart}
                  onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Abort with error message
                </label>
              </div>
            </div>
          </CCard>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={eActiveTab === 2}>
          <CCard className="p-4">
            Commission equipment units as:
            <div className="row">
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop1"
                  // value={actMenu}
                  checked={radioLeft.from}
                  onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Always replacement if spares available
                </label>
              </div>
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop2"
                  // value={actMenu}
                  checked={radioLeft.restart}
                  onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Commissioning if the number of lapse days exceed: <input className="w-25" />
                </label>
              </div>
            </div>
          </CCard>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={eActiveTab === 3}>
          <CCard className="p-4">
            <div className="form-inline">
              Number of replacement Exclusion Periods at end of Project Calendar:{' '}
              <input style={{ width: '35px' }} />
            </div>
            <div className="form-inline">
              Dispose equipment when no longer required: <input type="checkbox" />
            </div>
            <CCard className="p-2">
              Commission equipment units as:
              <div className="row">
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eg1"
                    id="radiotop1"
                    // value={actMenu}
                    checked={radioLeft.from}
                    onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Always replacement if spares available
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eg1"
                    id="radiotop2"
                    // value={actMenu}
                    checked={radioLeft.restart}
                    onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Commissioning if the number of lapse days exceed:{' '}
                    <input style={{ width: '35px' }} />
                  </label>
                </div>
              </div>
            </CCard>
          </CCard>
        </CTabPane>
      </CTabContent>
    </>
  )

  const renderPersonnelTab = () => (
    <>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink href="#!" active={pActiveTab === 1} onClick={() => setPActiveTab(1)}>
            Operator Basis
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#!" active={pActiveTab === 2} onClick={() => setPActiveTab(2)}>
            Rounding
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#!" active={pActiveTab === 3} onClick={() => setPActiveTab(3)}>
            Maintenance Personnel Allocation
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={eActiveTab === 1}>
          <CCard className="p-4">
            <fieldset>
              <legend>Base required number of operators on:</legend>
              <div className="row">
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eg1"
                    id="radiotop1"
                    // value={actMenu}
                    checked={radioLeft.from}
                    onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Available Required Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eg1"
                    id="radiotop2"
                    // value={actMenu}
                    checked={radioLeft.restart}
                    onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Rounded up Available Required Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eg1"
                    id="radiotop2"
                    // value={actMenu}
                    checked={radioLeft.restart}
                    onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Available Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eg1"
                    id="radiotop2"
                    // value={actMenu}
                    checked={radioLeft.restart}
                    onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Rounded up Available Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eg1"
                    id="radiotop2"
                    // value={actMenu}
                    checked={radioLeft.restart}
                    onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    All Equipment
                  </label>
                </div>
              </div>
            </fieldset>
          </CCard>
          <CCard className="p-4">
            If project calendar has insuffient for equipment disposal:
            <div className="row">
              <div className="col-5 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop1"
                  // value={actMenu}
                  checked={radioLeft.from}
                  onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Create an additional period
                </label>
              </div>
              <div className="col-5 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop2"
                  // value={actMenu}
                  checked={radioLeft.restart}
                  onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Abort with error message
                </label>
              </div>
            </div>
          </CCard>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={eActiveTab === 2}>
          <CCard className="p-4">
            <div className="row">
              <div className="col-6 form-inline">
                <div className="row">
                  <div className="col-4">Round:</div>
                  <div className="col-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rounding"
                      id="rounding1"
                      // value={actMenu}
                      checked={radioLeft.from}
                      onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                    />
                    <label className="form-check-label ms-1" htmlFor="rounding1">
                      Up
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rounding"
                      id="rounding2"
                      // value={actMenu}
                      checked={radioLeft.from}
                      onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                    />
                    <label className="form-check-label ms-1" htmlFor="rounding2">
                      Down
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-6 form-inline">
                By Level:
                <select className="ms-2">
                  <option>None</option>
                  <option>Level 1</option>
                  <option>Level 2</option>
                  <option>Level 3</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 form-inline">
                <div className="row">
                  <div className="col-2">Relief:</div>
                  <div className="col-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rounding"
                      id="rounding1"
                      // value={actMenu}
                      checked={radioLeft.from}
                      onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                    />
                    <label className="form-check-label ms-1" htmlFor="rounding1">
                      Add in
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-10 form-inline">
                    <div className="row">
                      <div className="col-6">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rounding"
                          id="rounding2"
                          // value={actMenu}
                          checked={radioLeft.from}
                          onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                        />
                        <label className="form-check-label ms-1" htmlFor="rounding2">
                          Keep separate and round:
                        </label>
                      </div>
                      <div className="col-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rounding"
                          id="rounding1"
                          // value={actMenu}
                          checked={radioLeft.from}
                          onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                        />
                        <label className="form-check-label ms-1" htmlFor="rounding1">
                          Up
                        </label>
                      </div>

                      <div className="col-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rounding"
                          id="rounding2"
                          // value={actMenu}
                          checked={radioLeft.from}
                          onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                        />
                        <label className="form-check-label ms-1" htmlFor="rounding2">
                          Down
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CCard>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={eActiveTab === 3}>
          <CCard className="p-4">
            Allocation oof Maintenance Personnel
            <div className="row">
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop1"
                  // value={actMenu}
                  checked={radioLeft.from}
                  onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  To the associated equipment cost centre
                </label>
              </div>
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eg1"
                  id="radiotop2"
                  // value={actMenu}
                  checked={radioLeft.restart}
                  onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  To the single specified cost centre
                </label>
              </div>
            </div>
          </CCard>
        </CTabPane>
      </CTabContent>
    </>
  )

  const renderModal = () => {
    return (
      <CModal
        size="lg"
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Options</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink href="#!" active={isEquipment} onClick={() => setIsEquipment(true)}>
                Equipment
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#!" active={!isEquipment} onClick={() => setIsEquipment(false)}>
                Personnel
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={isEquipment}>
              <CCard className="p-4"> {renderTab()}</CCard>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={!isEquipment}>
              <CCard className="p-4"> {renderPersonnelTab()}</CCard>
            </CTabPane>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    )
  }
  console.log('visible:', visible)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="p-4">
          {renderModal()}
          <div className="container">
            <div className="row border border-dark p-2">
              <div className="row">
                <div className="col-3 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radiotop"
                    id="radiotop1"
                    // value={actMenu}
                    checked={radioTop.full}
                    onChange={() => setRadioTop({ full: true, physical: false, cost: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Full Analysis
                  </label>
                </div>
                <div className="col-5 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radiotop"
                    id="radiotop2"
                    // value={actMenu}
                    checked={radioTop.physical}
                    onChange={() => setRadioTop({ full: false, physical: true, cost: false })}
                  />
                  <label className="form-check-label" htmlFor="reportType2">
                    Pyshical Analysis only
                  </label>
                </div>
                <div className="col-4 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radiotop"
                    id="radiotop3"
                    // value={actMenu}
                    checked={radioTop.cost}
                    onChange={() => setRadioTop({ full: false, physical: false, cost: true })}
                  />
                  <label className="form-check-label" htmlFor="reportType3">
                    Cost Analysis only
                  </label>
                </div>
              </div>
            </div>

            <div className="row border border-dark mt-2 p-2">
              <div className="col-3">
                <div className="row">
                  <div className="col-12 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioleft"
                      id="radiotop1"
                      // value={actMenu}
                      checked={radioLeft.from}
                      onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                    />
                    <label className="form-check-label" htmlFor="reportType1">
                      From beginning
                    </label>
                  </div>
                  <div className="col-12 mt-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioleft"
                      id="radiotop2"
                      // value={actMenu}
                      checked={radioLeft.restart}
                      onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                    />
                    <label className="form-check-label" htmlFor="reportType1">
                      Restart from:
                    </label>
                  </div>
                  <div className="col-12 mt-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioleft"
                      id="radiotop3"
                      // value={actMenu}
                      checked={radioLeft.one}
                      onChange={() => setRadioLeft({ from: false, restart: false, one: true })}
                    />
                    <label className="form-check-label" htmlFor="reportType1">
                      Do one part only
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="overflow-auto">
                  <Table className={classes.table} aria-label="Project table" size="small">
                    <TableBody>
                      {radioTop.full || radioTop.physical ? (
                        <>
                          <TableRow hover>
                            <TableCell>Equipment Operating Hours</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Materials and Services</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Required Equipment</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Commissioning and Disposal</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Equipment</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Equipment Utilization</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Employees</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>General Functiomn Output</TableCell>
                          </TableRow>
                        </>
                      ) : null}
                      {radioTop.full || radioTop.cost ? (
                        <TableRow hover>
                          <TableCell>Costs</TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          <CModalFooter className="mt-2">
            <CButton color="secondary" onClick={handleOpen} size="sm">
              Options
            </CButton>
            <CButton color="primary" type="submit" size="sm" className="ms-2">
              Compute
            </CButton>
          </CModalFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Analysis
