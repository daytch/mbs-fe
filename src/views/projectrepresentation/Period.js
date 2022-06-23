/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import { CButton, CFormSelect } from '@coreui/react'
import makeData from './makeData'
import { isEmptyNullOrUndefined, diffDate, formatDate } from 'src/functions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'

const Styles = styled.div`
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
      padding: 0 0 0 0.3rem;
      font-size: 0.65rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 0.55rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.3rem;
  }
  th {
    text-align: center;
    font-size: 0.8rem;
    font-style: bold;
  }

  .form-control:disabled,
  .form-control[readonly] {
    background-color: transparent !important;
  }
`

const EditableCell = ({
  dataPeriod,
  setStartDate,
  setEndDate,
  onClickSaveCalendar,
  isCustom,
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e) => {
    if (e?.currentTarget?.nodeName === 'INPUT') {
      setValue(e.target.value)
    } else {
      if (
        (id === 'periodEnd' &&
          e > new Date(document.getElementById('periodStart' + index).value)) ||
        id === 'periodStart'
      ) {
        setValue(e)
        onClickSaveCalendar()
        if (id === 'periodStart') {
          setStartDate(e)
          let diffStart = diffDate(new Date(dataPeriod[index].periodStart), new Date(e), 'days')
          let diffEnd = diffDate(
            new Date(dataPeriod[index].periodEnd),
            new Date(document.getElementById('periodEnd' + index).value),
            'days',
          )
          onClickSaveCalendar(diffStart, diffEnd, dataPeriod[index].positionN)
        } else if (id === 'periodEnd') {
          setEndDate(e)
          let diffStart = diffDate(
            new Date(dataPeriod[index].periodStart),
            new Date(document.getElementById('periodStart' + index).value),
            'days',
          )
          let diffEnd = diffDate(new Date(dataPeriod[index].periodEnd), new Date(e), 'days')
          onClickSaveCalendar(diffStart, diffEnd, dataPeriod[index].positionN)
          adjustmentNextPeriodStart(diffEnd)
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Information',
          text: 'End date must be greater than start date',
        })
      }
    }
  }

  const adjustmentNextPeriodStart = (diff) => {
    let idx = index + 1
    let lastPeriodEnd = new Date(document.getElementById('periodEnd' + index).value)
    while (document.getElementById('periodStart' + idx + '')) {
      let newPeriodStart = lastPeriodEnd.setDate(lastPeriodEnd.getDate() - diff)
      document.getElementById('periodStart' + idx + '').value = formatDate(newPeriodStart)
      idx++
    }
  }

  const onBlur = () => {
    updateMyData(index, id, value)
  }

  React.useEffect(() => {
    setValue(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  return id === 'periodStart' && isCustom && index === 0 ? (
    <DatePicker
      className="form-control form-control-sm"
      dateFormat="dd-MMM-yyyy"
      selected={!isEmptyNullOrUndefined(value) ? new Date(value) : null}
      onChange={onChange}
      id={'periodStart' + index}
    />
  ) : id === 'periodStart' ? (
    <input
      value={value}
      id={'periodStart' + index}
      disabled={true}
      onChange={onChange}
      onBlur={onBlur}
    />
  ) : id === 'periodEnd' && isCustom ? (
    <DatePicker
      className="form-control form-control-sm"
      dateFormat="dd-MMM-yyyy"
      selected={!isEmptyNullOrUndefined(value) ? new Date(value) : null}
      onChange={onChange}
      id={'periodEnd' + index}
    />
  ) : (
    <input value={value} onChange={onChange} onBlur={onBlur} />
  )
}

const defaultColumn = {
  Cell: EditableCell,
}

function Table({
  dataPeriod,
  setStartDate,
  setEndDate,
  onClickSaveCalendar,
  isCustom,
  columns,
  data,
  updateMyData,
  skipPageReset,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      dataPeriod,
      setStartDate,
      setEndDate,
      onClickSaveCalendar,
      isCustom,
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
                      // onClick={(e) => {
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
      <div className="pagination">
        <CButton
          color="secondary"
          shape="rounded-pill"
          size="sm"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          style={{ width: '2rem', height: '2rem', fontSize: '0.63rem' }}
        >
          {'<<'}
        </CButton>{' '}
        <CButton
          color="secondary"
          shape="rounded-pill"
          size="sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{ width: '2rem', height: '2rem', fontSize: '0.63rem' }}
        >
          {'<'}
        </CButton>{' '}
        <CButton
          color="secondary"
          shape="rounded-pill"
          size="sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{ width: '2rem', height: '2rem', fontSize: '0.63rem' }}
        >
          {'>'}
        </CButton>{' '}
        <CButton
          style={{ width: '2rem', height: '2rem', fontSize: '0.63rem' }}
          color="secondary"
          size="sm"
          shape="rounded-pill"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </CButton>{' '}
        <span style={{ fontSize: '0.65rem', padding: '0.5rem' }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span style={{ fontSize: '0.65rem', padding: '0.25rem' }}>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '40px' }}
          />
        </span>{' '}
        <div style={{ padding: '0.27rem' }}>
          <CFormSelect
            size="sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
            style={{
              width: '90px',
              height: '1.3rem',
              paddingTop: '0.15rem',
              paddingBottom: '0.15rem',
              fontSize: '0.6rem',
              borderRadius: '0.2rem',
            }}
            aria-label="Small select example"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </CFormSelect>
        </div>
      </div>
    </>
  )
}

const Period = ({ setStartDate, setEndDate, dataPeriod, isCustom, onClickSaveCalendar }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Period Name',
        accessor: 'periodName',
        align: 'center',
        width: 100,
      },
      {
        Header: 'Days',
        accessor: 'days',
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

  const [data, setData] = useState(() => makeData(20, dataPeriod))
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
        dataPeriod={dataPeriod}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onClickSaveCalendar={onClickSaveCalendar}
        isCustom={isCustom}
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  )
}

export default Period
