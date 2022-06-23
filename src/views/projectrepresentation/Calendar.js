/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import makeData from './makeData'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.2rem;
      font-size: 0.85rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 0.75rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
  th {
    text-align: center;
  }
`

const EditableCell = ({
  period,
  updateCalendar,
  periodLength,
  numOfDays,
  periodStart,
  setPeriodStart,
  periodEnd,
  setPeriodEnd,
  projectEndDate,
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(initialValue)
  const [visibleSelect, setVisibleSelect] = useState(false)

  const onClick = (e) => {
    setVisibleSelect(true)
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  let elem = ''
  let elemName = id + (index + 1)
  let plName = 'periodLength' + (index + 1)

  switch (id) {
    case 'periodLength':
      elem = (
        <div onClick={onClick}>
          <select
            id={elemName}
            data-index={index}
            className={'' + (visibleSelect || periodLength[elemName] ? 'visible' : 'invisible')}
            value={periodLength[elemName]}
            onChange={updateCalendar}
          >
            {period &&
              period.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.value < 0 ? '' : item.label}
                  </option>
                )
              })}
          </select>
        </div>
      )
      break
    case 'numOfDays':
      elem = (
        <input
          id={elemName}
          data-index={index}
          value={numOfDays[elemName]}
          onChange={updateCalendar}
          disabled={periodLength[plName] === '6' ? false : true}
        />
      )
      break
    case 'periodStart':
      elem = (
        <div onClick={onClick}>
          <DatePicker
            id={elemName}
            selected={periodStart[elemName]}
            onChange={(date) => setPeriodStart({ ...periodStart, [elemName]: date })}
            disabled={periodLength[plName] !== 0 ? false : true}
          />
        </div>
      )
      break
    case 'periodEnd':
      elem = (
        <div onClick={onClick}>
          <DatePicker
            id={elemName}
            selected={periodEnd[elemName]}
            onChange={(date) => {
              if (periodStart['periodStart' + (index + 1)] < date) {
                setPeriodEnd({ ...periodEnd, [elemName]: date })
              } else {
                Swal.fire({
                  icon: 'info',
                  title: 'Information',
                  text: 'End date must be greater than start date',
                })
              }
              if (date < new Date(projectEndDate)) {
                let nm = 'periodStart' + (index + 2)
                setPeriodStart({
                  ...periodStart,
                  [nm]: new Date(date).setDate(new Date(date).getDate() + 1),
                })
                let e = { target: { id: 'periodlength' + (index + 2), value: 5 } }
                updateCalendar(e)
                setVisibleSelect(true)
              }
            }}
            disabled={periodLength[plName] !== 0 ? false : true}
          />
        </div>
      )
      break
    default:
      break
  }
  return elem
}

const defaultColumn = {
  Cell: EditableCell,
}

function Table({
  period,
  updateCalendar,
  periodLength,
  numOfDays,
  periodStart,
  setPeriodStart,
  periodEnd,
  setPeriodEnd,
  projectEndDate,
  columns,
  data,
  updateMyData,
  skipPageReset,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = useTable(
    {
      period,
      updateCalendar,
      periodLength,
      numOfDays,
      periodStart,
      setPeriodStart,
      periodEnd,
      setPeriodEnd,
      projectEndDate,
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination,
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idxx) => (
                <th key={idxx} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => {
                  return (
                    <td
                      // onKeyUp={(e) => {
                      //   updateEquipmentModelCosts(e, row)
                      // }}
                      key={idx}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

const Calendar = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Period Length',
        accessor: 'periodLength',
        align: 'center',
      },
      {
        Header: '#. Days',
        accessor: 'numOfDays',
        align: 'center',
        width: 50,
      },
      {
        Header: 'Start',
        accessor: 'periodStart',
        align: 'center',
        width: 50,
      },
      {
        Header: 'End',
        accessor: 'periodEnd',
        align: 'center',
      },
    ],
    [],
  )

  const [data, setData] = useState(() => makeData(6, 'calendar'))
  //   const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      }),
    )
  }

  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  return (
    <Styles>
      <Table
        period={props.period}
        updateCalendar={props.updateCalendar}
        periodLength={props.periodLength}
        numOfDays={props.numOfDays}
        periodStart={props.periodStart}
        setPeriodStart={props.setPeriodStart}
        periodEnd={props.periodEnd}
        setPeriodEnd={props.setPeriodEnd}
        projectEndDate={props.projectEndDate}
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  )
}

export default Calendar
