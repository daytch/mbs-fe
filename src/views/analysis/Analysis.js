import React from 'react'
import { CCol, CRow, CCard } from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="p-4">
          <div className="container">
            <div className="row border border-dark p-2">
              <div className="row">
                <div className="col-3 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="reportType"
                    id="reportType1"
                    // value={actMenu}
                    // checked={actMenu === '1'}
                    // onChange={() => {
                    //   localStorage.setItem('actMenu', '1')
                    //   setActMenu('1')
                    // }}
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
                    // value={actMenu}
                    // checked={actMenu === '2'}
                    // onChange={() => {
                    //   localStorage.setItem('actMenu', '2')
                    //   setActMenu('2')
                    // }}
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
                    // value={actMenu}
                    // onChange={() => {
                    //   localStorage.setItem('actMenu', '3')
                    //   setActMenu('3')
                    // }}
                    // checked={actMenu === '3'}
                  />
                  <label className="form-check-label" htmlFor="reportType3">
                    Cost Output Schedules
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
                      name="reportType"
                      id="reportType1"
                      // value={actMenu}
                      // checked={actMenu === '1'}
                      // onChange={() => {
                      //   localStorage.setItem('actMenu', '1')
                      //   setActMenu('1')
                      // }}
                    />
                    <label className="form-check-label" htmlFor="reportType1">
                      From beginning
                    </label>
                  </div>
                  <div className="col-12 mt-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="reportType"
                      id="reportType1"
                      // value={actMenu}
                      // checked={actMenu === '1'}
                      // onChange={() => {
                      //   localStorage.setItem('actMenu', '1')
                      //   setActMenu('1')
                      // }}
                    />
                    <label className="form-check-label" htmlFor="reportType1">
                      Restart from:
                    </label>
                  </div>
                  <div className="col-12 mt-4 form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="reportType"
                      id="reportType1"
                      // value={actMenu}
                      // checked={actMenu === '1'}
                      // onChange={() => {
                      //   localStorage.setItem('actMenu', '1')
                      //   setActMenu('1')
                      // }}
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
                      <TableRow
                        // sx={{ cursor: 'pointer' }}
                        style={{ cursor: 'pointer', padding: '5px 15px 5px 15px !important' }}
                        // key={idx}
                        hover
                        // onClick={(event) => selectProject(event, row)}
                        // selected={isItemSelected}
                      >
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
                      <TableRow hover>
                        <TableCell>Costs</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Analysis
