/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import makeData from './EquipmentData'
import { CButton, CFormSelect } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
// import { isEmptyNullOrUndefined } from 'src/functions'
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
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
  isEdit,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(initialValue)
  const [valueid, setValueid] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
    setValueid(e.target.getAttribute('data-valueid'))
  }
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value || ''} disabled={!isEdit} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  Cell: EditableCell,
}

function Table({ columns, data, updateMyData, skipPageReset, isEdit }) {
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
      isEdit,
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

const Equipment = (props) => {
  const columns = useMemo(
    () => [
      { Header: 'Equipment', accessor: 'equipment', align: 'center' },
      { Header: '-50', accessor: '-50' },
      { Header: '-49', accessor: '-49' },
      { Header: '-48', accessor: '-48' },
      { Header: '-47', accessor: '-47' },
      { Header: '-46', accessor: '-46' },
      { Header: '-45', accessor: '-45' },
      { Header: '-44', accessor: '-44' },
      { Header: '-43', accessor: '-43' },
      { Header: '-42', accessor: '-42' },
      { Header: '-41', accessor: '-41' },
      { Header: '-40', accessor: '-40' },
      { Header: '-39', accessor: '-39' },
      { Header: '-38', accessor: '-38' },
      { Header: '-37', accessor: '-37' },
      { Header: '-36', accessor: '-36' },
      { Header: '-35', accessor: '-35' },
      { Header: '-34', accessor: '-34' },
      { Header: '-33', accessor: '-33' },
      { Header: '-32', accessor: '-32' },
      { Header: '-31', accessor: '-31' },
      { Header: '-30', accessor: '-30' },
      { Header: '-29', accessor: '-29' },
      { Header: '-28', accessor: '-28' },
      { Header: '-27', accessor: '-27' },
      { Header: '-26', accessor: '-26' },
      { Header: '-25', accessor: '-25' },
      { Header: '-24', accessor: '-24' },
      { Header: '-23', accessor: '-23' },
      { Header: '-22', accessor: '-22' },
      { Header: '-21', accessor: '-21' },
      { Header: '-20', accessor: '-20' },
      { Header: '-19', accessor: '-19' },
      { Header: '-18', accessor: '-18' },
      { Header: '-17', accessor: '-17' },
      { Header: '-16', accessor: '-16' },
      { Header: '-15', accessor: '-15' },
      { Header: '-14', accessor: '-14' },
      { Header: '-13', accessor: '-13' },
      { Header: '-12', accessor: '-12' },
      { Header: '-11', accessor: '-11' },
      { Header: '-10', accessor: '-10' },
      { Header: '-9', accessor: '-9' },
      { Header: '-8', accessor: '-8' },
      { Header: '-7', accessor: '-7' },
      { Header: '-6', accessor: '-6' },
      { Header: '-5', accessor: '-5' },
      { Header: '-4', accessor: '-4' },
      { Header: '-3', accessor: '-3' },
      { Header: '-2', accessor: '-2' },
      { Header: '-1', accessor: '-1' },
      { Header: '0', accessor: '0' },
      { Header: '1', accessor: '1' },
      { Header: '2', accessor: '2' },
      { Header: '3', accessor: '3' },
      { Header: '4', accessor: '4' },
      { Header: '5', accessor: '5' },
      { Header: '6', accessor: '6' },
      { Header: '7', accessor: '7' },
      { Header: '8', accessor: '8' },
      { Header: '9', accessor: '9' },
      { Header: '10', accessor: '10' },
      { Header: '11', accessor: '11' },
      { Header: '12', accessor: '12' },
      { Header: '13', accessor: '13' },
      { Header: '14', accessor: '14' },
      { Header: '15', accessor: '15' },
      { Header: '16', accessor: '16' },
      { Header: '17', accessor: '17' },
      { Header: '18', accessor: '18' },
      { Header: '19', accessor: '19' },
      { Header: '20', accessor: '20' },
      { Header: '21', accessor: '21' },
      { Header: '22', accessor: '22' },
      { Header: '23', accessor: '23' },
      { Header: '24', accessor: '24' },
      { Header: '25', accessor: '25' },
      { Header: '26', accessor: '26' },
      { Header: '27', accessor: '27' },
      { Header: '28', accessor: '28' },
      { Header: '29', accessor: '29' },
      { Header: '30', accessor: '30' },
      { Header: '31', accessor: '31' },
      { Header: '32', accessor: '32' },
      { Header: '33', accessor: '33' },
      { Header: '34', accessor: '34' },
      { Header: '35', accessor: '35' },
      { Header: '36', accessor: '36' },
      { Header: '37', accessor: '37' },
      { Header: '38', accessor: '38' },
      { Header: '39', accessor: '39' },
      { Header: '40', accessor: '40' },
      { Header: '41', accessor: '41' },
      { Header: '42', accessor: '42' },
      { Header: '43', accessor: '43' },
      { Header: '44', accessor: '44' },
      { Header: '45', accessor: '45' },
      { Header: '46', accessor: '46' },
      { Header: '47', accessor: '47' },
      { Header: '48', accessor: '48' },
      { Header: '49', accessor: '49' },
      { Header: '50', accessor: '50' },
    ],
    [],
  )

  const [data, setData] = useState(() => makeData(50, []))

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
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        isEdit={props.isEdit}
      />
    </Styles>
  )
}

export default Equipment
