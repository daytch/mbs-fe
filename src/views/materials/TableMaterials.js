/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useRowSelect } from 'react-table'
import makeData from './makeData'
import { CButton, CFormSelect } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
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
  currencies,
  levyCategory,
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(initialValue)
  const [valueid, setValueid] = useState('')
  const [visibleSelect, setVisibleSelect] = useState(false)
  const [resourcesTypes] = useState([
    { value: 1, label: 'Material' },
    { value: 2, label: 'Service' },
  ])

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
  console.log('levyCategory', levyCategory)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if (id.indexOf('currency') !== -1) {
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
  } else if (id.indexOf('levyCategory') !== -1) {
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
          {levyCategory &&
            levyCategory.map((item, index) => {
              return (
                <option key={index} value={item.levyCategoryId}>
                  {item.value < 0 ? '' : item.levyCategoryName}
                </option>
              )
            })}
        </select>
      </div>
    )
  } else if (id.indexOf('resourceType') !== -1) {
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
          {resourcesTypes &&
            resourcesTypes.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.value < 0 ? '' : item.label}
                </option>
              )
            })}
        </select>
      </div>
    )
  } else if (value.indexOf('~') > -1) {
    return (
      <input
        disabled={!isEdit}
        type="number"
        min="-999999999"
        value={value ? value.split('~')[0] : ''}
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
        type="number"
        min="-999999999"
        value={value || ''}
        data-valueid={valueid}
        id={id.replace(' ', '_') + index}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }
}

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return <input type="checkbox" ref={resolvedRef} {...rest} />
})

const defaultColumn = {
  Cell: EditableCell,
}

function Table({
  isEdit,
  columns,
  data,
  updateMyData,
  skipPageReset,
  setDeletedId,
  deletedId,
  currencies,
  levyCategory,
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
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      isEdit,
      columns,
      data,
      setDeletedId,
      deletedId,
      currencies,
      levyCategory,
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
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => {
            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} {...row.values} />
              </div>
            )
          },
        },
        ...columns,
      ])
    },
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
      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p> */}
      <pre style={{ display: 'none' }}>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map((d) => {
                if (d.original['indexname']) {
                  let id = d.original['indexname'].split('~')[1]

                  let arrId = deletedId
                  console.log('arrId', arrId)
                  // console.log('id', id)
                  if (arrId.length > 0 && arrId.indexOf(id) > -1) {
                    arrId = arrId.filter((item) => item !== id)
                  } else {
                    arrId.push(Number(id))
                  }
                  setDeletedId(arrId)
                }
                return d.original
              }),
            },
            null,
            2,
          )}
        </code>
      </pre>
    </>
  )
}

const TableMaterials = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Materials / Services Name',
        accessor: 'materials',
        align: 'center',
      },
      {
        Header: 'Units',
        accessor: 'units',
        align: 'center',
        width: 50,
      },
      {
        Header: 'Currency',
        accessor: 'currency',
        align: 'center',
        width: 50,
      },
      {
        Header: 'Cost',
        accessor: 'cost',
        align: 'center',
      },
      {
        Header: 'Resource Type',
        accessor: 'resourceType',
        align: 'center',
      },
      {
        Header: 'Levy Category',
        accessor: 'levyCategory',
        align: 'center',
      },
      {
        Header: 'Cost Index',
        accessor: 'costIndex',
        align: 'center',
      },
    ],
    [],
  )
  const [data, setData] = useState(() =>
    props.dataMaterials.length > 0 ? makeData(20, props.dataMaterials) : makeData(20, []),
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
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setDeletedId={props.setDeletedId}
        deletedId={props.deletedId}
        currencies={props.currencies}
        levyCategory={props.levyCategory}
      />
    </Styles>
  )
}

export default TableMaterials
