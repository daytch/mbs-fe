import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const TableExistingEquipment = (props) => {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })
  // console.log('props.data :', props.data)
  const classes = useStyles()
  const [selected, setSelected] = useState([])

  const selectRow = (event, dt) => {
    let newSelected = [dt.fleetId]
    setSelected(newSelected)
    props.setSelectedModelId(dt.fleetId)

    props.setSelectedFleet(dt)
  }

  const isSelected = (row) => selected.indexOf(row.fleetId) !== -1

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Model Name</b>
            </TableCell>
            <TableCell>
              <b>From</b>
            </TableCell>
            <TableCell>
              <b>Project Representation</b>
            </TableCell>
            <TableCell>
              <b>Project Equipment Name</b>
            </TableCell>
            <TableCell>
              <b>Source</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => {
            const isItemSelected = isSelected(row)
            return (
              <TableRow
                key={row.fleetId}
                hover
                onClick={(event) => selectRow(event, row)}
                selected={isItemSelected}
              >
                <TableCell component="th" scope="row">
                  {row.equipmentTypeName}
                </TableCell>
                <TableCell>{row.projectName}</TableCell>
                <TableCell>{row.projectRepresentationName}</TableCell>
                <TableCell>{row.equipmentModelName}</TableCell>
                <TableCell>{row.source}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableExistingEquipment
TableExistingEquipment.propTypes = {
  data: PropTypes.array,
  setSelectedModelId: PropTypes.func,
  setSelectedFleet: PropTypes.func,
}
