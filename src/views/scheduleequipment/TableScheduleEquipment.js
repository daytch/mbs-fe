/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import makeData from './makeData'
import { CButton, CFormSelect } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { isEmptyNullOrUndefined } from 'src/functions'
import PropTypes from 'prop-types'

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
  isEdit,
  dataRosters,
  tipe,
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(initialValue)
  const [valueid, setValueid] = useState('')
  const [visibleSelect, setVisibleSelect] = useState(false)

  const onChange = (e) => {
    setValue(e.target.value)
    setValueid(e.target.getAttribute('data-valueid'))
  }
  const onBlur = () => {
    updateMyData(index, id, value)
  }
  const onClick = () => {
    setVisibleSelect(true)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if (id.indexOf('indexnameR') !== -1) {
    if (!isEmptyNullOrUndefined(value) && value.indexOf('~') !== -1) {
      return (
        <input
          disabled={true}
          value={value.split('~')[0]}
          data-id={value.split('~')[1]}
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
  } else if (id.indexOf('indexnameO') !== -1) {
    if (!isEmptyNullOrUndefined(value) && value.indexOf('~') !== -1) {
      return (
        <input
          disabled={true}
          value={value.split('~')[0]}
          data-id={value.split('~')[1]}
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
  } else if (typeof value === 'number') {
    return (
      <div onClick={onClick}>
        <select
          disabled={!isEdit}
          id={id.replace(' ', '_') + index}
          data-index={index}
          className="visible"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {dataRosters &&
            dataRosters.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name < 0 ? '' : item.name}
                </option>
              )
            })}
        </select>
      </div>
    )
  } else if (tipe === 'roster') {
    return (
      <div onClick={onClick}>
        <select
          id={id.replace(' ', '_') + index}
          data-index={index}
          className={'' + (visibleSelect && isEdit ? 'visible' : 'invisible')}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {dataRosters &&
            dataRosters.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name < 0 ? '' : item.name}
                </option>
              )
            })}
        </select>
      </div>
    )
  } else if (value?.indexOf('~') > -1) {
    return (
      <input
        disabled={!isEdit}
        type="text"
        value={value ? (value.split('~')[0] !== 'undefined' ? value.split('~')[0] : '') : ''}
        id={id.replace(' ', '_') + index}
        data-valueid={value.split('~')[1]}
        data-periodid={value.split('~')[2]}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  } else {
    return (
      <input
        disabled={!isEdit}
        value={value || ''}
        data-valueid={valueid}
        id={id.replace(' ', '_') + index}
        type={tipe === 'pa' ? 'number' : 'text'}
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
  isEdit,
  columns,
  data,
  updateMyData,
  tipe,
  skipPageReset,
  setDeletedId,
  deletedId,
  dataRosters,
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
      isEdit,
      columns,
      data,
      setDeletedId,
      deletedId,
      dataRosters,
      tipe,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
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

const TableScheduleEquipment = (props) => {
  const {
    tipe,
    dataRosters,
    arrPeriodData,
    dataScheduleRoster,
    dataScheduleOH,
    dataSchedulePA,
    isEdit,
    setDeletedId,
    deletedId,
  } = props
  // console.log('props : ', props)

  const columns = useMemo(() => arrPeriodData, [arrPeriodData])
  const dt = {
    roster: dataScheduleRoster,
    oh: dataScheduleOH,
    pa: dataSchedulePA,
  }
  const [data, setData] = useState(() =>
    dt[tipe]?.length > 0 ? makeData(dt[tipe]?.length, dt[tipe], tipe) : makeData(10, [], tipe),
  )
  const [skipPageReset, setSkipPageReset] = useState(false)
  // console.log('data tipe : ', dt[tipe])
  // console.log('tipe : ', tipe)
  // console.log('data : ', data)
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
    // console.log('data : ', data)
  }, [data])

  return (
    <Styles>
      <Table
        isEdit={isEdit}
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setDeletedId={setDeletedId}
        deletedId={deletedId}
        dataRosters={dataRosters}
        tipe={tipe}
      />
    </Styles>
  )
}

TableScheduleEquipment.propTypes = {
  isEdit: PropTypes.bool,
  setDeletedId: PropTypes.func,
  deletedId: PropTypes.array,
  tipe: PropTypes.string,
  dataRosters: PropTypes.array,
  arrPeriodData: PropTypes.array,
  dataScheduleRoster: PropTypes.array,
  dataScheduleOH: PropTypes.array,
  dataSchedulePA: PropTypes.array,
}

export default TableScheduleEquipment
