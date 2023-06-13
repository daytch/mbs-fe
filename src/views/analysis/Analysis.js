import React, { useState, useEffect, useRef } from 'react'
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
  CToastBody,
  CToastClose,
  CToast,
  CToaster,
} from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { postAnalysis } from '../../redux/actions'
import Spinner from '../../components/Spinner'
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
  const toaster = useRef()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [radioTop, setRadioTop] = useState({ full: true, physical: false, cost: false })
  const [radioLeft, setRadioLeft] = useState({ from: true, restart: false, one: false })
  const [visible, setVisible] = useState(false)
  const [isEquipment, setIsEquipment] = useState(true)
  const [eActiveTab, setEActiveTab] = useState(1)
  const [toast, addToast] = useState(0)
  const [pActiveTab, setPActiveTab] = useState(1)
  const [fleetpotential, setFleetPotential] = useState(1)
  const [insufficientPeriod, setInsufficientPeriod] = useState(2)
  const [commissionEquipment, setCommissionEquipment] = useState(1)
  const [exclusionPeriod, setExclusionPeriod] = useState(0)
  const [disposeTime, setDisposeTime] = useState(1)
  const [baseRequired, setBaseRequired] = useState(1)
  const [relief, setRelief] = useState(1)
  const [round, setRound] = useState(1)
  const [separateRound, setSeparateRound] = useState(1)
  const [allocationMaintenance, setAllocationMaintenance] = useState(1)
  const [analysisStart, setAnalysisStart] = useState(1)

  const isLoading = useSelector((state) => state.Analysis.loading)
  const error = useSelector((state) => state.Analysis.error)
  const message = useSelector((state) => state.Analysis.message)
  const isChangeState = useSelector((state) => state.Analysis.isChangeState)

  const setMessageProcess = (isOnProcess) => {
    if (isOnProcess === false) {
      if (message !== '' && !isChangeState) {
        addToast(ToastSuccessDelete)
      } else if (error !== '') {
        addToast(ToastError(error))
      } else if (isChangeState) {
        setVisible(false)
        addToast(ToastSuccess(message))
      }
    }
  }

  useEffect(() => {
    setMessageProcess(isLoading)
    // eslint-disable-next-line
  }, [isLoading])

  const handleOpen = (e) => {
    e.nativeEvent.stopImmediatePropagation()
    setVisible(true)
  }

  const handleCompute = (e) => {
    const project = JSON.parse(localStorage.getItem('project'))

    var payload = {
      projectRepresentationN: project.projectSubCategoryID,
      analysisType: radioTop.full ? 1 : radioTop.physical ? 2 : 3,
      analysisStart: radioLeft.from ? 1 : radioLeft.restart ? 2 : 3,
      listTask: analysisStart,
      currency: project.currencyAbbr,
    }
    dispatch(postAnalysis(payload))
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
            If available used and owned already equipment operating hours exceeds the fleet
            potential:
            <div className="row">
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="fleetPotential"
                  id="fleetPotential1"
                  value="1"
                  checked={fleetpotential === 1}
                  onChange={() => setFleetPotential(1)}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Adjust to the maximum available OH
                </label>
              </div>
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="fleetPotential"
                  id="fleetPotential2"
                  value="2"
                  checked={fleetpotential === 2}
                  onChange={() => setFleetPotential(2)}
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
                  name="insufficientPeriod"
                  id="insufficientPeriod1"
                  value="1"
                  checked={insufficientPeriod === 1}
                  onChange={() => setInsufficientPeriod(1)}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Create an additional period
                </label>
              </div>
              <div className="col-5 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="insufficientPeriod"
                  id="insufficientPeriod2"
                  value="2"
                  checked={insufficientPeriod === 2}
                  onChange={() => setInsufficientPeriod(2)}
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
                  name="commissionEquipment"
                  id="commissionEquipment1"
                  value="1"
                  checked={commissionEquipment === 1}
                  onChange={() => setCommissionEquipment(1)}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Always replacement if spares available
                </label>
              </div>
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="commissionEquipment"
                  id="commissionEquipment2"
                  value="2"
                  checked={commissionEquipment === 2}
                  onChange={() => setCommissionEquipment(2)}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  Commissioning if the number of lapse days exceed:
                  <input
                    disabled={commissionEquipment === 1}
                    value="1"
                    type="number"
                    style={{ width: '35px' }}
                  />
                </label>
              </div>
            </div>
          </CCard>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={eActiveTab === 3}>
          <CCard className="p-4">
            <div className="form-inline">
              Number of replacement Exclusion Periods at end of Project Calendar:{' '}
              <input
                style={{ width: '35px' }}
                value={exclusionPeriod}
                onChange={(e) => setExclusionPeriod(e.current.value)}
              />
            </div>
            <div className="form-inline">
              Dispose equipment when no longer required: <input checked type="checkbox" />
            </div>
            <CCard className="p-2">
              When an equipment disposal is identified, dispose:
              <div className="row">
                <div className="col-6 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="disposeTime"
                    id="disposeTime1"
                    value="1"
                    checked={disposeTime === 1}
                    onChange={() => setDisposeTime(1)}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    In the identified period
                  </label>
                </div>
                <div className="col-6 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="disposeTime"
                    id="disposeTime2"
                    value="2"
                    checked={disposeTime === 2}
                    onChange={() => setDisposeTime(2)}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    In the next period
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
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={pActiveTab === 1}>
          <CCard className="p-4">
            <fieldset>
              <legend>Base required number of operators on:</legend>
              <div className="row">
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="baseRequired"
                    id="baseRequired1"
                    value="1"
                    checked={baseRequired === 1}
                    onChange={() => setBaseRequired(1)}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Available Required Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="baseRequired"
                    id="baseRequired2"
                    value="2"
                    checked={baseRequired === 2}
                    onChange={() => setBaseRequired(2)}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Rounded up Available Required Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="baseRequired"
                    id="baseRequired3"
                    value="3"
                    checked={baseRequired === 3}
                    onChange={() => setBaseRequired(3)}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Available Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="baseRequired"
                    id="baseRequired4"
                    value="4"
                    checked={baseRequired === 4}
                    onChange={() => setBaseRequired(4)}
                  />
                  <label className="form-check-label" htmlFor="reportType1">
                    Rounded up Available Equipment
                  </label>
                </div>
                <div className="col-12 ms-2 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="baseRequired"
                    id="baseRequired5"
                    value="5"
                    checked={baseRequired === 5}
                    onChange={() => setBaseRequired(5)}
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
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={pActiveTab === 2}>
          <CCard className="p-4">
            <div className="row">
              <div className="col-6 form-inline">
                <div className="row">
                  <div className="col-4">Round:</div>
                  <div className="col-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="round"
                      id="round1"
                      value="1"
                      checked={round === 1}
                      onChange={() => setRound(1)}
                    />
                    <label className="form-check-label ms-1" htmlFor="rounding1">
                      Up
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="round"
                      id="round2"
                      value="2"
                      checked={round === 2}
                      onChange={() => setRound(2)}
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
                      name="relief"
                      id="relief1"
                      value="1"
                      checked={relief === 1}
                      onChange={() => setRelief(1)}
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
                          name="relief"
                          id="relief2"
                          value="2"
                          checked={relief === 2}
                          onChange={() => setRelief(2)}
                        />
                        <label className="form-check-label ms-1" htmlFor="rounding2">
                          Keep separate and round:
                        </label>
                      </div>
                      <div className="col-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="separateRound"
                          id="separateRound1"
                          value="1"
                          disabled={relief === 1}
                          checked={separateRound === 1}
                          onChange={() => setSeparateRound(1)}
                        />
                        <label className="form-check-label ms-1" htmlFor="separateRound1">
                          Up
                        </label>
                      </div>

                      <div className="col-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="separateRound"
                          id="separateRound2"
                          value="2"
                          checked={separateRound === 2}
                          disabled={relief === 1}
                          onChange={() => setSeparateRound(2)}
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
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={pActiveTab === 3}>
          <CCard className="p-4">
            Allocation of Maintenance Personnel
            <div className="row">
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="allocationMaintenance"
                  id="allocationMaintenance1"
                  value="1"
                  checked={allocationMaintenance === 1}
                  onChange={() => setAllocationMaintenance(1)}
                />
                <label className="form-check-label" htmlFor="reportType1">
                  To the associated equipment cost centre
                </label>
              </div>
              <div className="col-12 ms-2 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="allocationMaintenance"
                  id="allocationMaintenance2"
                  value="2"
                  checked={allocationMaintenance === 2}
                  onChange={() => setAllocationMaintenance(2)}
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

  const handleClickAnalysis = (e) => {
    var analysis =
      typeof Number(e.currentTarget.dataset.id) !== 'number'
        ? analysisStart
        : Number(e.currentTarget.dataset.id)
    setAnalysisStart(analysis)
  }

  useEffect(() => {
    console.log('analysisStart:', analysisStart)
  }, [analysisStart])

  const ToastSuccess = (msg) => (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>{msg ? msg : 'Data has been saved!'}</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const ToastError = (errorText) => {
    return (
      <CToast className="align-items-center" color="warning">
        <div className="d-flex">
          <CToastBody>{errorText}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    )
  }

  return (
    <>
      <Spinner loading={isLoading} />
      <CRow>
        <CCol xs={12}>
          <CToaster ref={toaster} push={toast} placement="bottom-end" />
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
                    <label className="form-check-label" htmlFor="radiotop1">
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
                    <label className="form-check-label" htmlFor="radiotop2">
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
                    <label className="form-check-label" htmlFor="radiotop3">
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
                        id="radioleft1"
                        // value={actMenu}
                        checked={radioLeft.from}
                        onChange={() => setRadioLeft({ from: true, restart: false, one: false })}
                      />
                      <label className="form-check-label" htmlFor="radioleft1">
                        From beginning
                      </label>
                    </div>
                    <div className="col-12 mt-4 form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioleft"
                        id="radioleft2"
                        // value={actMenu}
                        checked={radioLeft.restart}
                        onChange={() => setRadioLeft({ from: false, restart: true, one: false })}
                      />
                      <label className="form-check-label" htmlFor="radioleft2">
                        Restart from:
                      </label>
                    </div>
                    <div className="col-12 mt-4 form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radioleft"
                        id="radioleft3"
                        // value={actMenu}
                        checked={radioLeft.one}
                        onChange={() => setRadioLeft({ from: false, restart: false, one: true })}
                      />
                      <label className="form-check-label" htmlFor="radioleft3">
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
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 1}
                              data-id="1"
                              hover
                            >
                              <TableCell style={{ cursor: 'pointer' }}>
                                Equipment Operating Hours
                              </TableCell>
                            </TableRow>
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 2}
                              data-id="2"
                              hover
                            >
                              <TableCell style={{ cursor: 'pointer' }}>
                                Materials and Services
                              </TableCell>
                            </TableRow>
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 3}
                              data-id="3"
                              hover
                            >
                              <TableCell style={{ cursor: 'pointer' }}>
                                Required Equipment
                              </TableCell>
                            </TableRow>
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 4}
                              data-id="4"
                              hover
                            >
                              <TableCell style={{ cursor: 'pointer' }}>
                                Commissioning and Disposal
                              </TableCell>
                            </TableRow>
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 5}
                              data-id="5"
                              hover
                            >
                              <TableCell>Equipment</TableCell>
                            </TableRow>
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 6}
                              data-id="6"
                              hover
                            >
                              <TableCell>Equipment Utilization</TableCell>
                            </TableRow>
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 7}
                              data-id="7"
                              hover
                            >
                              <TableCell>Employees</TableCell>
                            </TableRow>
                            <TableRow
                              onClick={handleClickAnalysis}
                              selected={analysisStart === 8}
                              data-id="8"
                              hover
                            >
                              <TableCell>General Functiomn Output</TableCell>
                            </TableRow>
                          </>
                        ) : null}
                        {radioTop.full || radioTop.cost ? (
                          <TableRow
                            onClick={handleClickAnalysis}
                            selected={analysisStart === 9}
                            data-id="9"
                            hover
                          >
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
              <CButton
                color="primary"
                onClick={handleCompute}
                type="submit"
                size="sm"
                className="ms-2"
              >
                Compute
              </CButton>
            </CModalFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Analysis
