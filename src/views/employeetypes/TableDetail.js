/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import { CButton, CFormSelect } from '@coreui/react'
import makeData from './makeData'

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
  currencies,
  paymentMethod,
  rosters,
  updateDataDetail,
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue)
  const [visibleSelect, setVisibleSelect] = useState(false)
  const preventMinus = (e) => {
    if (e.code === 'Minus') {
      e.preventDefault()
    }
  }

  const onChange = (e) => {
    let isi = ''
    let val = Number(e.target.value)

    if (e.currentTarget.nodeName === 'INPUT') {
      setValue(val)
      isi = val
    } else {
      setValue(val) //(e.currentTarget.value)
      isi = val //e.currentTarget.value
    }
    updateDataDetail(index, id, isi)
  }
  const onBlur = () => {
    updateMyData(index, id, value)
  }
  const onClick = () => {
    setVisibleSelect(true)
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if (id === 'countryId') {
    return (
      <div onClick={onClick}>
        <select
          id={id}
          data-index={index}
          className={'' + (visibleSelect || value ? 'visible' : 'invisible')}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {currencies &&
            currencies.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.value < 0 ? '' : item.label}
                </option>
              )
            })}
        </select>
      </div>
    )
  } else if (id === 'paymentMethod') {
    return (
      <div onClick={onClick}>
        <select
          id={id}
          data-index={index}
          className={'' + (visibleSelect || value ? 'visible' : 'invisible')}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {paymentMethod &&
            paymentMethod.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.value < 0 ? '' : item.label}
                </option>
              )
            })}
        </select>
      </div>
    )
  } else if (id === 'rosterId') {
    return (
      <div onClick={onClick}>
        <select
          id={id}
          data-index={index}
          className={'' + (visibleSelect || value ? 'visible' : 'invisible')}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {rosters &&
            rosters.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              )
            })}
        </select>
      </div>
    )
  } else {
    return (
      <input
        id={id}
        min="0"
        onKeyPress={preventMinus}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }
}

const defaultColumn = {
  Cell: EditableCell,
}

function Table({
  currencies,
  paymentMethod,
  rosters,
  updateDataDetail,
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
      currencies,
      paymentMethod,
      rosters,
      updateDataDetail,
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
                // <th key={idxx} {...column.getHeaderProps()}>
                //   {column.render('Header')}
                // </th>
                <th
                  key={idxx}
                  {...column.getHeaderProps()}
                  rowSpan={`${column.rowSpan ?? 1}`}
                  style={column.displayNone ? { display: 'none' } : {}}
                >
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
                    <td key={idx} {...cell.getCellProps()}>
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

const TableDetail = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Roster',
        align: 'center',
        columns: [
          {
            Header: 'Not visible header 2',
            displayNone: true,
            accessor: 'rosterId',
          },
        ],
        rowSpan: '2',
      },
      {
        Header: 'Payment Method',
        align: 'center',
        columns: [
          {
            Header: 'Not visible header 2',
            displayNone: true,
            accessor: 'paymentMethod',
          },
        ],
        rowSpan: '2',
      },
      {
        Header: 'Currency',
        align: 'center',
        columns: [
          {
            Header: 'Not visible header 2',
            displayNone: true,
            accessor: 'countryId',
          },
        ],
        rowSpan: '2',
      },
      {
        Header: 'Annual Cost',
        align: 'center',
        maxWidth: 13,
        minWidth: 5,
        width: 10,
        columns: [
          {
            Header: 'Not visible header 2',
            displayNone: true,
            accessor: 'annualCost',
          },
        ],
        rowSpan: '2',
      },
      {
        Header: 'Annual',
        columns: [
          {
            Header: 'Leave (days)',
            accessor: 'annualLeave',
            width: 10,
          },
          {
            Header: 'Sick Leave',
            accessor: 'sicknessLeave',
            width: 10,
          },
          {
            Header: 'Other Leave',
            accessor: 'otherLeave',
            width: 10,
          },
        ],
      },
    ],
    [],
  )

  const [data, setData] = useState(() => makeData(20, 'mainCost', props.dataDetail))
  const [originalData] = useState(data)
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
        updateDataDetail={props.updateDataDetail}
        paymentMethod={props.paymentMethod}
        rosters={props.rosters}
        currencies={props.currencies}
        columns={columns}
        data={props.isNew ? originalData : data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  )
}

export default TableDetail
