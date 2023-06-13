/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import { useTable, usePagination, useRowSelect } from 'react-table'

/*
 * Icon & Styles
 */
import CIcon from '@coreui/icons-react'
import styled from 'styled-components'
import {
  cilActionUndo,
  cilPrint,
  cilFindInPage,
  cilDescription,
  cilCheckAlt,
  cilX,
} from '@coreui/icons'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormSelect,
  CCol,
} from '@coreui/react'
import makeData from './makeData'
import { useEffectOnce } from './../../functions'
import { jsPDF } from 'jspdf'
import { PDFViewer } from '@react-pdf/renderer'
import CountryPDF from './CostOutput/CountryPDF'

/*
 * Components
 */
import NoData from './NoData'
import EquipmentCommissioningSummary from './CostOutput/EquipmentCommissioningSummary'
import EquipmentReplacementByCostCentre from './CostOutput/EquipmentReplacementByCostCentre'
import EquipmentReplacementSummary from './CostOutput/EquipmentReplacementSummary'
import EquipmentDisposalValueByCostCentre from './CostOutput/EquipmentDisposalValueByCostCentre'
import EquipmentDisposalValueSummary from './CostOutput/EquipmentDisposalValueSummary'
import MaterialsServicesCostByCostCentre from './CostOutput/MaterialsServicesCostByCostCentre'
import MaterialsCostByCostCentre from './CostOutput/MaterialsCostByCostCentre'
import ServicesCostByCostCentre from './CostOutput/ServicesCostByCostCentre'
import MaterialsServicesCostConsumedByEquipment from './CostOutput/MaterialsServicesCostConsumedByEquipment'
import MaterialsServicesCostNotConsumedByEquipment from './CostOutput/MaterialsServicesCostNotConsumedByEquipment'
import MaterialsServicesCostSummary from './CostOutput/MaterialsServicesCostSummary'
import EmployeeExcludingReliefCostByCostCentre from './CostOutput/EmployeeExcludingReliefCostByCostCentre'
import EmployeeExcludingReliefCostSummary from './CostOutput/EmployeeExcludingReliefCostSummary'
import EmployeeRequiredForReliefCostByCostCentre from './CostOutput/EmployeeRequiredForReliefCostByCostCentre'
import EmployeeRequiredForReliefCostSummary from './CostOutput/EmployeeRequiredForReliefCostSummary'
import EmployeeTotalCostByCostCentre from './CostOutput/EmployeeTotalCostByCostCentre'
import EmployeeTotalCostSummary from './CostOutput/EmployeeTotalCostSummary'
import InfrastructureCostByCostCentre from './CostOutput/InfrastructureCostByCostCentre'
import InfrastructureCostSummary from './CostOutput/InfrastructureCostSummary'
import TotalCapitalCosts from './CostOutput/TotalCapitalCosts'
import TotalOperationCosts from './CostOutput/TotalOperationCosts'
import TotalProjectsCosts from './CostOutput/TotalProjectsCosts'

/*
 * Context and Action Reducer
 */
import { useDispatch, useSelector } from 'react-redux'
import {
  getEquipmentReplacementByCostCentre,
  getEquipmentReplacementSummary,
  getEquipmentCommissioningByCostCentre,
  getEquipmentCommissioningSummary,
  getEquipmentDisposalValueByCostCentre,
  getEquipmentDisposalValueSummary,
  getEmployeeExcludingReliefCostByCostCentre,
  getEmployeeExcludingReliefCostSummary,
  getEmployeeRequiredForReliefCostByCostCentre,
  getEmployeeRequiredForReliefCostSummary,
  getEmployeeTotalCostByCostCentre,
  getEmployeeTotalCostSummary,
  getInfrastructureCostByCostCentre,
  getInfrastructureCostSummary,
  getMaterialsCostByCostCentre,
  getMaterialsServicesCostByCostCentre,
  getMaterialsServicesCostConsumedByEquipment,
  getMaterialsServicesCostNotConsumedByEquipment,
  getMaterialsServicesCostSummary,
  getServicesCostByCostCentre,
  getTotalCapitalCosts,
  getTotalOperatingCosts,
  getTotalProjectCosts,
} from '../../redux/actions'

import './print.css'
import ContextMenu from './../../components/ContextMenu'
import { combineDataByCostCentreCode } from './CostOutput/ConvertFunction'

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
  updateEquipmentModelCosts,
  currencies,
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
  paperSize,
  decimalPoint,
  lastCol,
}) => {
  const [value, setValue] = useState(initialValue)
  const [visibleSelect, setVisibleSelect] = useState(false)
  // console.log('decimalPoint:', decimalPoint)
  const onChange = (e) => {
    let isi = ''
    if (e.currentTarget.nodeName === 'INPUT') {
      setValue(e.target.value)
      isi = e.target.value
    } else {
      setValue(e.currentTarget.value)
      isi = e.currentTarget.value
    }
    updateEquipmentModelCosts(index, id, isi)
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

  if (id === 'size') {
    return (
      <select
        id={id}
        // disabled={true}
        data-index={index}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="mx-2 text-center"
      >
        {paperSize.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    )
  } else if (id === 'last') {
    return (
      <select
        id={id}
        // disabled={true}
        data-index={index}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="mx-2 text-center"
      >
        {lastCol.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    )
  } else if (id === 'report') {
    return <span className="ms-1 me-3">{value}</span>
  } else if (id === 'rheader') {
    return <span className="ms-1 me-3">{value}</span>
  } else if (id === 'header') {
    return (
      <input
        id={id}
        data-index={index}
        value={value}
        type="checkbox"
        className="ms-3 text-center"
      />
    )
  } else if (id === 'footer') {
    return (
      <input
        id={id}
        data-index={index}
        value={value}
        type="checkbox"
        className="ms-3 text-center"
      />
    )
  } else if (id === 'decimal') {
    return (
      <select
        id={id}
        // disabled={true}
        data-index={index}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="mx-2 text-center"
      >
        {decimalPoint.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    )
  } else {
    const dataSize = [
      { label: '', value: 'kosong' },
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ]
    return (
      <select
        id={id}
        disabled={true}
        data-index={index}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="mx-2 text-center"
      >
        {dataSize.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    )
  }
}

const defaultColumn = {
  Cell: EditableCell,
}

// eslint-disable-next-line react/display-name
const Table = React.forwardRef((props, ref) => {
  const {
    dataSource,
    paperSize,
    decimalPoint,
    lastCol,
    updateEquipmentModelCosts,
    columns,
    data,
    updateMyData,
    skipPageReset,
  } = props
  const initiallySelectedRows = React.useMemo(() => new Set(['1']), [])
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
    state: { pageIndex, pageSize },
    toggleAllRowsSelected,
  } = useTable(
    {
      dataSource: props.dataSource,
      paperSize,
      decimalPoint,
      lastCol,
      updateEquipmentModelCosts,
      columns: props.columns,
      data: props.data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !props.skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData: props.updateMyData,
      initialState: { pageSize: 50, selectedRowPaths: initiallySelectedRows },
    },
    usePagination,
    useRowSelect,
  )
  useImperativeHandle(ref, () => ({
    toggleAllRowsSelected() {
      toggleAllRowsSelected()
    },
  }))

  useEffect(() => {
    // console.log('selectedFlatRows', selectedFlatRows)
    props.onChangeSelection(selectedFlatRows)
  }, [selectedFlatRows, props.onChangeSelection, props])

  // console.log('page : ', page)
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
    </>
  )
})

const CostOutput = ({
  dataSource,
  updateEquipmentModelCosts,
  isNew,
  paperSize,
  decimalPoint,
  lastCol,
}) => {
  const dispatch = useDispatch()
  const columns = useMemo(
    () => [
      {
        id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>{/* <input type="checkbox" {...getToggleAllRowsSelectedProps()} /> */}</div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: 'Paper Size',
        accessor: 'size',
        align: 'center',
        width: 30,
      },
      {
        Header: 'Report Name',
        accessor: 'report',
        align: 'center',
        width: 50,
      },
      {
        Header: 'Report Header',
        accessor: 'rheader',
        align: 'center',
        width: 50,
      },
      {
        Header: 'Header',
        accessor: 'header',
        align: 'center',
      },
      {
        Header: 'Footer',
        accessor: 'footer',
        align: 'center',
      },
      {
        Header: 'Decimal Point',
        accessor: 'decimal',
        align: 'center',
      },
      {
        Header: 'Last Column',
        accessor: 'last',
        align: 'center',
      },
    ],
    [],
  )

  const myRef = useRef()

  const proj = JSON.parse(localStorage.getItem('project'))
  const projRep = JSON.parse(localStorage.getItem('projectRepresentation'))
  const [data, setData] = useState(() => makeData(23, 'inputData', dataSource))
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)
  // const [selectedRowCount, setSelectedRowCount] = useState(0)
  const [selectedRow, setSelectedRow] = useState([])
  const [visibleMaterialQuantity, setVisibleMaterialQuantity] = useState(false)
  const [title, setTitle] = useState('Equipment Commissioning Cost By Cost Centre')
  const [code, setCode] = useState('EquipmentCommissioningCostByCostCentre')
  const [decimal, setDecimal] = useState(2)
  const [pdfSize, setPdfSize] = useState('A4')
  const [headerPdf, setHeaderPdf] = useState(true)
  const [footerPdf, setFooterPdf] = useState(true)
  const [lastColumn, setLastColumn] = useState('max')
  const handleChangeSelection = useCallback(
    (count) => {
      setSelectedRow(count)
      if (count.length > 0) {
        setTitle(count[0].original.rheader)
        setCode(count[0].original.code)
      }
    },
    [setSelectedRow],
  )

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

  useEffect(() => {}, [code, title])

  useEffect(() => {
    let hardcode = 57

    dispatch(getEquipmentCommissioningByCostCentre(hardcode))
    dispatch(getEquipmentCommissioningSummary(hardcode))
    dispatch(getEquipmentReplacementByCostCentre(hardcode))
    dispatch(getEquipmentReplacementSummary(hardcode))
    dispatch(getEquipmentDisposalValueByCostCentre(hardcode))
    dispatch(getEquipmentDisposalValueSummary(hardcode))
    dispatch(getMaterialsServicesCostByCostCentre(hardcode))
    dispatch(getMaterialsCostByCostCentre(hardcode))
    dispatch(getServicesCostByCostCentre(hardcode))
    dispatch(getMaterialsServicesCostConsumedByEquipment(hardcode))
    dispatch(getMaterialsServicesCostNotConsumedByEquipment(hardcode))
    dispatch(getMaterialsServicesCostSummary(hardcode))
    dispatch(getEmployeeExcludingReliefCostByCostCentre(hardcode))
    dispatch(getEmployeeExcludingReliefCostSummary(hardcode))
    dispatch(getEmployeeRequiredForReliefCostByCostCentre(hardcode))
    dispatch(getEmployeeRequiredForReliefCostSummary(hardcode))
    dispatch(getEmployeeTotalCostByCostCentre(hardcode))
    dispatch(getEmployeeTotalCostSummary(hardcode))
    dispatch(getInfrastructureCostByCostCentre(hardcode))
    dispatch(getInfrastructureCostSummary(hardcode))
    dispatch(getTotalCapitalCosts(hardcode))
    dispatch(getTotalOperatingCosts(hardcode))
    dispatch(getTotalProjectCosts(hardcode))

    // dispatch(getEquipmentCommissioningByCostCentre(projRep.projectRepresentationId))
    // dispatch(getEquipmentCommissioningSummary(projRep.projectRepresentationId))
    // dispatch(getEquipmentReplacementByCostCentre(projRep.projectRepresentationId))
    // dispatch(getEquipmentReplacementSummary(projRep.projectRepresentationId))
    // dispatch(getEquipmentDisposalValueByCostCentre(projRep.projectRepresentationId))
    // dispatch(getEquipmentDisposalValueSummary(projRep.projectRepresentationId))
    // dispatch(getMaterialsServicesCostByCostCentre(projRep.projectRepresentationId))
    // dispatch(getMaterialsCostByCostCentre(projRep.projectRepresentationId))
    // dispatch(getServicesCostByCostCentre(projRep.projectRepresentationId))
    // dispatch(getMaterialsServicesCostConsumedByEquipment(projRep.projectRepresentationId))
    // dispatch(getMaterialsServicesCostNotConsumedByEquipment(projRep.projectRepresentationId))
    // dispatch(getMaterialsServicesCostSummary(projRep.projectRepresentationId))
    // dispatch(getEmployeeExcludingReliefCostByCostCentre(projRep.projectRepresentationId))
    // dispatch(getEmployeeExcludingReliefCostSummary(projRep.projectRepresentationId))
    // dispatch(getEmployeeRequiredForReliefCostByCostCentre(projRep.projectRepresentationId))
    // dispatch(getEmployeeRequiredForReliefCostSummary(projRep.projectRepresentationId))
    // dispatch(getEmployeeTotalCostByCostCentre(projRep.projectRepresentationId))
    // dispatch(getEmployeeTotalCostSummary(projRep.projectRepresentationId))
    // dispatch(getInfrastructureCostByCostCentre(projRep.projectRepresentationId))
    // dispatch(getInfrastructureCostSummary(projRep.projectRepresentationId))
    // dispatch(getTotalCapitalCosts(projRep.projectRepresentationId))
    // dispatch(getTotalOperatingCosts(projRep.projectRepresentationId))
    // dispatch(getTotalProjectCosts(projRep.projectRepresentationId))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  const dtEquipmentCommissioningByCostCentre = useSelector(
    (state) => state.CostOutput.dtEquipmentCommissioningByCostCentre,
  )
  const dtEquipmentCommissioningSummary = useSelector(
    (state) => state.CostOutput.dtEquipmentCommissioningSummary,
  )

  const dtEquipmentReplacementByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentReplacementByCostCentre,
  )
  const dtEquipmentReplacementSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentReplacementSummary,
  )

  /* CostOutput Data From Store */

  const dtEquipmentDisposalByCostCentre = useSelector(
    (state) => state.CostOutput.dtEquipmentDisposalByCostCentre,
  )
  const dtEquipmentDisposalValueSummary = useSelector(
    (state) => state.CostOutput.dtEquipmentDisposalValueSummary,
  )
  const dtMaterialsServicesCostByCostCentre = useSelector(
    (state) => state.CostOutput.dtMaterialsServicesCostByCostCentre,
  )
  const dtMaterialsCostByCostCentre = useSelector(
    (state) => state.CostOutput.dtMaterialsCostByCostCentre,
  )
  const dtServicesCostByCostCentre = useSelector(
    (state) => state.CostOutput.dtServicesCostByCostCentre,
  )
  const dtMaterialsServicesCostConsumedByEquipment = useSelector(
    (state) => state.CostOutput.dtMaterialsServicesCostConsumedByEquipment,
  )
  const dtMaterialsServicesCostNotConsumedByEquipment = useSelector(
    (state) => state.CostOutput.dtMaterialsServicesCostNotConsumedByEquipment,
  )
  const dtMaterialsServicesCostSummary = useSelector(
    (state) => state.CostOutput.dtMaterialsServicesCostSummary,
  )
  const dtEmployeeExcludingReliefCostByCostCentre = useSelector(
    (state) => state.CostOutput.dtEmployeeExcludingReliefCostByCostCentre,
  )
  const dtEmployeeExcludingReliefCostSummary = useSelector(
    (state) => state.CostOutput.dtEmployeeExcludingReliefCostSummary,
  )
  const dtEmployeeRequiredForReliefCostByCostCentre = useSelector(
    (state) => state.CostOutput.dtEmployeeRequiredForReliefCostByCostCentre,
  )
  const dtEmployeeRequiredForReliefCostSummary = useSelector(
    (state) => state.CostOutput.dtEmployeeRequiredForReliefCostSummary,
  )
  const dtEmployeeTotalCostByCostCentre = useSelector(
    (state) => state.CostOutput.dtEmployeeTotalCostByCostCentre,
  )
  const dtEmployeeTotalCostSummary = useSelector(
    (state) => state.CostOutput.dtEmployeeTotalCostSummary,
  )
  const dtInfrastructureCostByCostCentre = useSelector(
    (state) => state.CostOutput.dtInfrastructureCostByCostCentre,
  )
  const dtInfrastructureCostSummary = useSelector(
    (state) => state.CostOutput.dtInfrastructureCostSummary,
  )
  const dtTotalCapitalCosts = useSelector((state) => state.CostOutput.dtTotalCapitalCosts)
  const dtTotalOperationCosts = useSelector((state) => state.CostOutput.dtTotalOperationCosts)
  const dtTotalProjectsCosts = useSelector((state) => state.CostOutput.dtTotalProjectsCosts)

  const renderCostOutputData = {
    EquipmentCommissioningCostByCostCentre: () =>
      dtEquipmentCommissioningByCostCentre?.length ? (
        <CountryPDF
          countries={dtEquipmentCommissioningByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),
    EquipmentCommissioningCostSummary: () =>
      dtEquipmentCommissioningSummary?.length ? (
        <EquipmentCommissioningSummary
          dtEquipmentCommissioningSummary={dtEquipmentCommissioningSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EquipmentReplacementCostByCostCentre: () =>
      dtEquipmentReplacementByCostCentre?.length ? (
        <EquipmentReplacementByCostCentre
          dtEquipmentReplacementByCostCentre={dtEquipmentReplacementByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EquipmentReplacementCostSummary: () =>
      dtEquipmentReplacementSummary?.length > 0?.length ? (
        <EquipmentReplacementSummary
          dtEquipmentReplacementSummary={dtEquipmentReplacementSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EquipmentDisposalByCostCentre: () =>
      dtEquipmentReplacementByCostCentre?.length ? (
        <EquipmentDisposalValueByCostCentre
          dtEquipmentReplacementByCostCentre={dtEquipmentReplacementByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),
    EquipmentDisposalValueSummary: () =>
      dtEquipmentDisposalValueSummary?.length ? (
        <EquipmentDisposalValueSummary
          dtEquipmentReplacementSummary={dtEquipmentDisposalValueSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),
    MaterialsServicesCostByCostCentre: () =>
      dtMaterialsServicesCostByCostCentre?.length ? (
        <MaterialsServicesCostByCostCentre
          dtMaterialsServicesCostByCostCentre={dtMaterialsServicesCostByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),
    MaterialsCostByCostCentre: () =>
      dtMaterialsCostByCostCentre?.length ? (
        <MaterialsCostByCostCentre
          dtMaterialsCostByCostCentre={dtMaterialsCostByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    ServicesCostByCostCentre: () =>
      dtServicesCostByCostCentre?.length ? (
        <ServicesCostByCostCentre
          dtServicesCostByCostCentre={dtServicesCostByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    MaterialsServicesCostConsumedByEquipment: () =>
      dtMaterialsServicesCostConsumedByEquipment?.length ? (
        <MaterialsServicesCostConsumedByEquipment
          dtMaterialsServicesCostConsumedByEquipment={dtMaterialsServicesCostConsumedByEquipment}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    MaterialsServicesCostNotConsumedByEquipment: () =>
      dtMaterialsServicesCostNotConsumedByEquipment?.length ? (
        <MaterialsServicesCostNotConsumedByEquipment
          dtMaterialsServicesCostNotConsumedByEquipment={
            dtMaterialsServicesCostNotConsumedByEquipment
          }
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    MaterialsServicesCostSummary: () =>
      dtMaterialsServicesCostSummary?.length ? (
        <MaterialsServicesCostSummary
          dtMaterialsServicesCostSummary={dtMaterialsServicesCostSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EmployeeExcludingReliefCostByCostCentre: () =>
      dtEmployeeExcludingReliefCostByCostCentre?.length ? (
        <EmployeeExcludingReliefCostByCostCentre
          dtEmployeeExcludingReliefCostByCostCentre={dtEmployeeExcludingReliefCostByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EmployeeExcludingReliefCostSummary: () =>
      dtEmployeeExcludingReliefCostSummary?.length ? (
        <EmployeeExcludingReliefCostSummary
          dtEmployeeExcludingReliefCostSummary={dtEmployeeExcludingReliefCostSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EmployeeRequiredForReliefCostByCostCentre: () =>
      dtEmployeeRequiredForReliefCostByCostCentre?.length ? (
        <EmployeeRequiredForReliefCostByCostCentre
          dtEmployeeRequiredForReliefCostByCostCentre={dtEmployeeRequiredForReliefCostByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EmployeeRequiredForReliefCostSummary: () =>
      dtEmployeeRequiredForReliefCostSummary?.length ? (
        <EmployeeRequiredForReliefCostSummary
          dtEmployeeRequiredForReliefCostSummary={dtEmployeeRequiredForReliefCostSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EmployeeTotalCostByCostCentre: () =>
      dtEmployeeTotalCostByCostCentre?.length ? (
        <EmployeeTotalCostByCostCentre
          dtEmployeeTotalCostByCostCentre={dtEmployeeTotalCostByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    EmployeeTotalCostSummary: () =>
      dtEmployeeTotalCostSummary?.length ? (
        <EmployeeTotalCostSummary
          dtEmployeeTotalCostSummary={dtEmployeeTotalCostSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    InfrastructureCostByCostCentre: () =>
      dtInfrastructureCostByCostCentre?.length ? (
        <InfrastructureCostByCostCentre
          dtInfrastructureCostByCostCentre={dtInfrastructureCostByCostCentre}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    InfrastructureCostSummary: () =>
      dtInfrastructureCostSummary?.length ? (
        <InfrastructureCostSummary
          dtInfrastructureCostSummary={dtInfrastructureCostSummary}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    TotalCapitalCosts: () =>
      dtTotalCapitalCosts?.length ? (
        <TotalCapitalCosts
          dtTotalCapitalCosts={dtTotalCapitalCosts}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    TotalOperationCosts: () =>
      dtTotalOperationCosts?.length ? (
        <TotalOperationCosts
          dtTotalOperationCosts={dtTotalOperationCosts}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),

    TotalProjectsCosts: () =>
      dtTotalProjectsCosts?.length ? (
        <TotalProjectsCosts
          dtTotalProjectsCosts={dtTotalProjectsCosts}
          project={proj}
          projectRepresentation={projRep}
          showHeader={headerPdf}
          showFooter={footerPdf}
          lastColumn={lastColumn}
          decimalPoint={decimal}
          pageSize={pdfSize}
        />
      ) : (
        <NoData />
      ),
  }

  const onPreviewPDF = () => {}

  return (
    <Styles>
      <CModal
        size="lg"
        alignment="center"
        scrollable
        visible={visibleMaterialQuantity}
        onClose={() => setVisibleMaterialQuantity(false)}
      >
        <CModalHeader className="px-5">
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody className="px-5 overflow-auto" style={{ height: '100vh' }}>
          <PDFViewer width="700px" height="950px">
            {renderCostOutputData[code]()}
          </PDFViewer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" size="sm" onClick={() => setVisibleMaterialQuantity(false)}>
            Ok
            <CIcon icon={cilCheckAlt} />
          </CButton>
          <CButton
            color="danger"
            onClick={() => setVisibleMaterialQuantity(false)}
            type="submit"
            size="sm"
          >
            Cancel
            <CIcon icon={cilX} />
          </CButton>
        </CModalFooter>
      </CModal>

      <Table
        ref={myRef}
        dataSource={dataSource}
        onChangeSelection={handleChangeSelection}
        enableMultiRowSelection={false}
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        paperSize={paperSize}
        decimalPoint={decimalPoint}
        lastCol={lastCol}
        updateEquipmentModelCosts={updateEquipmentModelCosts}
      />
      <CCol className="d-flex justify-content-between">
        <div className="d-flex justify-content-between flex-row ">
          <button
            onClick={() => myRef.current.toggleAllRowsSelected()}
            className="m-2 btn btn-primary btn-sm"
            type="button"
          >
            Select all
          </button>
          <button
            disabled={selectedRow.length < 1}
            onClick={() => myRef.current.toggleAllRowsSelected()}
            className="m-2 btn btn-primary btn-sm"
            type="button"
          >
            <CIcon icon={cilActionUndo} />
            <span className="mx-2">Reset</span>
          </button>
          <button
            className="m-2 btn btn-primary btn-sm"
            onClick={() => setVisibleMaterialQuantity(true)}
            type="button"
          >
            <CIcon icon={cilPrint} />
            <span className="mx-2">Print</span>
          </button>
          <button
            className="m-2 btn btn-primary btn-sm"
            type="button"
            onClick={() => setVisibleMaterialQuantity(true)}
          >
            <CIcon icon={cilFindInPage} />
            <span className="mx-2">Preview</span>
          </button>
          <button className="m-2 btn btn-primary btn-sm" type="button">
            <CIcon icon={cilDescription} />
            <span className="mx-2">Export</span>
          </button>
        </div>
      </CCol>
    </Styles>
  )
}

export default CostOutput
