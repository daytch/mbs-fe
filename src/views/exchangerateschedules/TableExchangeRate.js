/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import makeData from './makeData'
import { CButton, CFormSelect } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { isEmptyNullOrUndefined } from 'src/functions'
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin-right: 0.5rem;

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
  isEdit,
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(initialValue)
  const [valueid, setValueid] = useState('')
  const [exchRateId, setExchRateId] = useState('')
  const [periodId, setPeriodId] = useState('')

  const onChange = (e) => {
    setValueid(e.target.attributes['data-id'].value)
    setExchRateId(e.target.attributes['data-exchRateId'].value)
    setPeriodId(e.target.attributes['data-periodId'].value)
    setValue(e.target.value)
  }
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  useEffect(() => {
    if (id.toLowerCase().indexOf('period') > -1) {
      setPeriodId(value)
    }
  }, [id, value])

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if (id.indexOf('currency') !== -1) {
    if (!isEmptyNullOrUndefined(value) && value.indexOf('~') !== -1) {
      return (
        <input
          disabled={!isEdit}
          value={value.split('~')[0]}
          data-id={value.split('~')[2]}
          data-countryid={value.split('~')[1]}
          id={id + index}
          onChange={onChange}
          onBlur={onBlur}
        />
      )
    } else {
      return (
        <input
          disabled={!isEdit}
          value={value || ''}
          onChange={onChange}
          id={id + index}
          onBlur={onBlur}
        />
      )
    }
  } else {
    return (
      <input
        disabled={!isEdit}
        type="number"
        value={value && value?.indexOf('~') !== -1 ? value.split('~')[0] : value}
        data-id={valueid ? valueid : value && value?.indexOf('~') !== -1 ? value.split('~')[1] : ''}
        data-exchRateId={
          exchRateId ? exchRateId : value && value?.indexOf('~') !== -1 ? value.split('~')[1] : ''
        }
        data-periodId={
          periodId ? periodId : value && value?.indexOf('~') !== -1 ? value.split('~')[2] : ''
        }
        id={id.replace(' ', '_') + index}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }
}

const defaultColumn = {
  Cell: EditableCell,
}

function Table({ isEdit, columns, data, pageSizes, updateMyData, skipPageReset }) {
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
      isEdit,
      columns,
      data,
      pageSize: pageSizes,
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
  useEffect(() => {
    setPageSize(pageSizes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        </CButton>
        <CButton
          color="secondary"
          shape="rounded-pill"
          size="sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{ width: '2rem', height: '2rem', fontSize: '0.63rem' }}
        >
          {'<'}
        </CButton>
        <CButton
          color="secondary"
          shape="rounded-pill"
          size="sm"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{ width: '2rem', height: '2rem', fontSize: '0.63rem' }}
        >
          {'>'}
        </CButton>
        <CButton
          style={{ width: '2rem', height: '2rem', fontSize: '0.63rem' }}
          color="secondary"
          size="sm"
          shape="rounded-pill"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </CButton>
        <span style={{ fontSize: '0.65rem', padding: '0.5rem' }}>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span style={{ fontSize: '0.65rem', padding: '0.25rem' }}>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '40px' }}
          />
        </span>
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

const TableExchangeRate = (props) => {
  const columns = useMemo(() => props.arrPeriodData, [props.arrPeriodData])
  const [dataLength] = useState(JSON.parse(localStorage.getItem('country')).length)
  const [data, setData] = useState(() =>
    makeData(dataLength, props.dataExchangeRate, props.dataCountries, props.periods),
  )

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

  useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  return (
    <Styles>
      <Table
        isEdit={props.isEdit}
        columns={columns}
        data={data}
        pageSizes={data.length > 5 ? 20 : data.length}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  )
}

export default TableExchangeRate
