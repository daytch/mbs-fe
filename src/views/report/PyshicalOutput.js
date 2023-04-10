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
import { useTable, usePagination, useRowSelect } from 'react-table'
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
import { useEffectOnce, isEmptyNullOrUndefined } from './../../functions'
import { jsPDF } from 'jspdf'
import { PDFViewer } from '@react-pdf/renderer'
import EquipmentRequiredSummary from './PyshicalOutput/EquipmentRequiredSummary'
import EquipmentReplacementByCostCentre from './PyshicalOutput/EquipmentReplacementByCostCentre'
import EquipmentReplacementSummary from './PyshicalOutput/EquipmentReplacementSummary'
import EquipmentRequiredByCostCentre from './PyshicalOutput/EquipmentRequiredByCostCentre'
import EquipmentDisposalExpiredByCostCentre from './PyshicalOutput/EquipmentDisposalExpiredByCostCentre'
import EquipmentDisposalExpiredSummary from './PyshicalOutput/EquipmentDisposalExpiredSummary'
import EquipmentDisposalNotRequiredCostCentre from './PyshicalOutput/EquipmentDisposalNotRequiredByCostCentre'
import EquipmentDisposalNotRequiredSummary from './PyshicalOutput/EquipmentDisposalNotRequiredSummary'
import EquipmentTotalDisposalByCostCentre from './PyshicalOutput/EquipmentTotalDisposalByCostCentre'
import EquipmentTotalDisposalSummary from './PyshicalOutput/EquipmentTotalDisposalSummary'
import EquipmentFleetByCostCentre from './PyshicalOutput/EquipmentFleetByCostCentre'
import EquipmentFleetSummary from './PyshicalOutput/EquipmentFleetSummary'
import EquipmentUtilisationByCostCentre from './PyshicalOutput/EquipmentUtilisationByCostCentre'
import EquipmentUtilisationSummary from './PyshicalOutput/EquipmentUtilisationSummary'
import MaterialsServicesByCostCentre from './PyshicalOutput/MaterialsServicesByCostCentre'
import MaterialsByCostCentre from './PyshicalOutput/MaterialsByCostCentre'
import ServicesByCostCentre from './PyshicalOutput/ServicesByCostCentre'
import MaterialsServicesConsumedByEquipment from './PyshicalOutput/MaterialsServicesConsumedByEquipment'
import MaterialsServicesNotConsumedByEquipment from './PyshicalOutput/MaterialsServicesNotConsumedByEquipment'
import MaterialsServicesSummary from './PyshicalOutput/MaterialsServicesSummary'

import EmployeeExcludingReliefByCostCentre from './PyshicalOutput/EmployeeExcludingReliefByCostCentre'
import EmployeeExcludingReliefSummary from './PyshicalOutput/EmployeeExcludingReliefSummary'
import EmployeeRequiredReliefByCostCentre from './PyshicalOutput/EmployeeRequiredReliefByCostCentre'
import EmployeeRequiredReliefSummary from './PyshicalOutput/EmployeeRequiredReliefSummary'
import EmployeeTotalByCostCentre from './PyshicalOutput/EmployeeTotalByCostCentre'
import EmployeeTotalSummary from './PyshicalOutput/EmployeeTotalSummary'
import GeneralFunction from './PyshicalOutput/GeneralFunctionPDF'

import NoData from './NoData'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFleets,
  getCostCentre,
  getEquipmentRequiredByCostCentre,
  getEquipmentRequiredSummary,
  getEquipmentReplacementByCostCentre,
  getEquipmentReplacementSummary,
  getEquipmentCommisionongByCostCentre,
  getEquipmentDisposalExpiredByCostCentre,
  getEquipmentDisposalExpiredSummary,
  getEquipmentDisposalNotRequiredCostCentre,
  getEquipmentDisposalNotRequiredSummary,
  getEquipmentTotalDisposalByCostCentre,
  getEquipmentTotalDisposalSummary,
  getEquipmentFleetByCostCentre,
  getEquipmentFleetSummary,
  getEquipmentUtilisationByCostCentre,
  getEquipmentUtilisationSummary,
  getMaterialsServicesByCostCentre,
  getMaterialsByCostCentre,
  getServicesByCostCentre,
  getMaterialsServicesConsumedByEquipment,
  getMaterialsServicesNotConsumedByEquipment,
  getMaterialsServicesSummary,
  getEmployeeExcludingReliefByCostCentre,
  getEmployeeRequiredReliefByCostCentre,
  getEmployeeExcludingReliefSummary,
  getEmployeeRequiredReliefSummary,
  getEmployeeTotalByCostCentre,
  getEmployeeTotalSummary,
  getGeneralFunction,
} from '../../redux/actions'
import './print.css'
import ContextMenu from './../../components/ContextMenu'
import Spinner from '../../components/Spinner'
import { callExport } from './ExcelOutput'

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
        data-index={'size_' + index}
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
        id={'header_' + id}
        data-index={'header_' + index}
        value={value}
        type="checkbox"
        className="ms-3 text-center"
        defaultChecked={true}
      />
    )
  } else if (id === 'footer') {
    return (
      <input
        id={'footer' + id}
        data-index={'footer' + index}
        value={value}
        type="checkbox"
        className="ms-3 text-center"
        defaultChecked={true}
      />
    )
  } else if (id === 'decimal') {
    return (
      <select
        id={'decimal_' + id}
        // disabled={true}
        data-index={'decimal_' + index}
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

const PyshicalOutput = ({
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

  const genPDF = () => {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF()
    doc.text('Hello world!', 50, 10)
    // doc.save("a4.pdf");
    // doc.output('save', 'filename.pdf') //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
    doc.output('datauristring') //returns the data uri string
    doc.output('datauri') //opens the data uri in current window
    doc.output('dataurlnewwindow')
  }
  const myRef = useRef()
  const [loading, setLoading] = useState(true)

  const proj = JSON.parse(localStorage.getItem('project'))
  const projRep = JSON.parse(localStorage.getItem('projectRepresentation'))
  const [data, setData] = useState(() => makeData(dataSource.length, 'inputData', dataSource))
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)

  // const [selectedRowCount, setSelectedRowCount] = useState(0)
  const [selectedRow, setSelectedRow] = useState([])
  const [visibleMaterialQuantity, setVisibleMaterialQuantity] = useState(true)
  const [title, setTitle] = useState('MaterialsByCostCentre')
  const [code, setCode] = useState('MaterialsByCostCentre')
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
        setPdfSize(count[0].original.size)
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

  useEffect(() => {
    // dispatch(getEquipmentRequiredByCostCentre(projRep.projectRepresentationId))
    // dispatch(getEquipmentRequiredSummary(projRep.projectRepresentationId))
    dispatch(getEquipmentReplacementByCostCentre(projRep.projectRepresentationId))
    dispatch(getEquipmentReplacementSummary(projRep.projectRepresentationId))
    // dispatch(getEquipmentCommisionongByCostCentre(projRep.projectRepresentationId))
    dispatch(getEquipmentDisposalExpiredByCostCentre(projRep.projectRepresentationId))
    dispatch(getEquipmentDisposalExpiredSummary(projRep.projectRepresentationId))
    dispatch(getEquipmentDisposalNotRequiredCostCentre(projRep.projectRepresentationId))
    dispatch(getEquipmentDisposalNotRequiredSummary(projRep.projectRepresentationId))
    dispatch(getEquipmentTotalDisposalByCostCentre(projRep.projectRepresentationId))
    dispatch(getEquipmentTotalDisposalSummary(projRep.projectRepresentationId))
    dispatch(getEquipmentFleetByCostCentre(projRep.projectRepresentationId))
    dispatch(getEquipmentFleetSummary(projRep.projectRepresentationId))
    dispatch(getEquipmentUtilisationByCostCentre(projRep.projectRepresentationId))
    dispatch(getEquipmentUtilisationSummary(projRep.projectRepresentationId))
    dispatch(getMaterialsServicesByCostCentre(projRep.projectRepresentationId))
    dispatch(getMaterialsByCostCentre(projRep.projectRepresentationId))
    dispatch(getServicesByCostCentre(projRep.projectRepresentationId))
    dispatch(getMaterialsServicesConsumedByEquipment(projRep.projectRepresentationId))
    dispatch(getMaterialsServicesNotConsumedByEquipment(projRep.projectRepresentationId))

    dispatch(getMaterialsServicesSummary(projRep.projectRepresentationId))
    dispatch(getEmployeeExcludingReliefByCostCentre(projRep.projectRepresentationId))
    dispatch(getEmployeeRequiredReliefByCostCentre(projRep.projectRepresentationId))
    dispatch(getEmployeeExcludingReliefSummary(projRep.projectRepresentationId))
    dispatch(getEmployeeRequiredReliefSummary(projRep.projectRepresentationId))

    dispatch(getEmployeeTotalByCostCentre(projRep.projectRepresentationId))
    dispatch(getEmployeeTotalSummary(projRep.projectRepresentationId))
    dispatch(getGeneralFunction(projRep.projectRepresentationId))

    dispatch(getFleets({ projectRepresentationId: projRep.projectRepresentationId }))
    dispatch(getCostCentre({ projectRepresentationId: projRep.projectRepresentationId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let groupDtEquipmentRequiredByCostCentre = []
  const dtEquipmentRequiredByCostCentre = useSelector((state) => {
    if (state.PhysicalOutput.dtEquipmentRequiredByCostCentre.length > 0) {
      const dt = state.PhysicalOutput.dtEquipmentRequiredByCostCentre
      dt.forEach((elm) => {
        if (
          groupDtEquipmentRequiredByCostCentre
            .map((x) => x.costCentreName)
            .indexOf(elm.costCentreName) === -1
        ) {
          groupDtEquipmentRequiredByCostCentre.push({
            costCentreCode: elm.costCentreCode,
            costCentreName: elm.costCentreName,
          })
        }
      })
      return dt
    }
  })
  const dtEquipmentRequiredSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentRequiredSummary,
  )
  const dtEquipmentCommissionRequiredByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentCommissionRequiredByCostCentre,
  )
  const dtEquipmentReplacementByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentReplacementByCostCentre,
  )
  const dtEquipmentReplacementSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentReplacementSummary,
  )
  const dtEquipmentDisposalExpiredByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentDisposalExpiredByCostCentre,
  )
  const dtEquipmentDisposalExpiredSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentDisposalExpiredSummary,
  )
  const dtEquipmentDisposalNotRequiredByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentDisposalNotRequiredByCostCentre,
  )
  const dtEquipmentDisposalNotRequiredSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentDisposalNotRequiredSummary,
  )
  const dtEquipmentTotalDisposalByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentTotalDisposalByCostCentre,
  )
  const dtEquipmentTotalDisposalSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentTotalDisposalSummary,
  )
  const dtEquipmentFleetByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentFleetByCostCentre,
  )
  const dtEquipmentFleetSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentFleetSummary,
  )
  const dtEquipmentUtilisationByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentUtilisationByCostCentre,
  )
  const dtEquipmentUtilisationSummary = useSelector(
    (state) => state.PhysicalOutput.dtEquipmentUtilisationSummary,
  )
  const dtMaterialsServicesByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtMaterialsServicesByCostCentre,
  )
  const dtMaterialsByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtMaterialsByCostCentre,
  )
  const dtServicesByCostCentre = useSelector((state) => state.PhysicalOutput.dtServicesByCostCentre)
  const dtMaterialsConsumedByEquipment = useSelector(
    (state) => state.PhysicalOutput.dtMaterialsConsumedByEquipment,
  )
  const dtMaterialsNotConsumedByEquipment = useSelector(
    (state) => state.PhysicalOutput.dtMaterialsNotConsumedByEquipment,
  )
  const dtMaterialsServicesSummary = useSelector(
    (state) => state.PhysicalOutput.dtMaterialsServicesSummary,
  )
  const dtEmployeeExcludingReliefByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEmployeeExcludingReliefByCostCentre,
  )
  const dtEmployeeRequiredReliefByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEmployeeRequiredReliefByCostCentre,
  )
  const dtEmployeeExcludingReliefSummary = useSelector(
    (state) => state.PhysicalOutput.dtEmployeeExcludingReliefSummary,
  )
  const dtEmployeeRequiredReliefSummary = useSelector(
    (state) => state.PhysicalOutput.dtEmployeeRequiredReliefSummary,
  )
  const dtEmployeeTotalByCostCentre = useSelector(
    (state) => state.PhysicalOutput.dtEmployeeTotalByCostCentre,
  )
  const dtEmployeeTotalSummary = useSelector((state) => state.PhysicalOutput.dtEmployeeTotalSummary)
  const dtGeneralFunction = useSelector((state) => state.PhysicalOutput.dtGeneralFunction)
  console.log('dtGeneralFunction: ', dtGeneralFunction)

  const fleets = useSelector((state) => {
    if (state.Equipment.dataFleets.length > 0) {
      let arrFleets = state.Equipment.dataFleets
      arrFleets.forEach((item) => {
        switch (item.source) {
          case '1':
            item.source = 'Owned Already'
            break
          case '2':
            item.source = 'Available New'
            break
          case '3':
            item.source = 'Available Used'
            break

          default:
            break
        }

        item.projectName = proj.projectName
      })
      return arrFleets
    }
  })
  const costCentres = useSelector((state) => state.CostCentre.data)
  const loadingPart = useSelector((state) => state.PhysicalOutput.loading)
  const loadingEqp = useSelector((state) => state.Equipment.loading)

  useEffect(() => {
    if (!loadingPart && !loadingEqp) {
      setLoading(false)
    }
  }, [loadingPart, loadingEqp])

  useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  const renderPyshicalOutput = {
    EquipmentRequiredByCostCentre: () =>
      dtEquipmentRequiredByCostCentre && fleets && costCentres ? (
        <EquipmentRequiredByCostCentre
          dtEquipmentRequiredByCostCentre={dtEquipmentRequiredByCostCentre}
          groupDtEquipmentRequiredByCostCentre={groupDtEquipmentRequiredByCostCentre}
          fleets={fleets}
          costCentres={costCentres}
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
    EquipmentRequiredSummary: () =>
      dtEquipmentRequiredSummary ? (
        <EquipmentRequiredSummary
          dtEquipmentRequiredSummary={dtEquipmentRequiredSummary}
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
    EquipmentReplacementByCostCentre: () =>
      dtEquipmentReplacementByCostCentre ? (
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

    EquipmentReplacementSummary: () =>
      dtEquipmentReplacementSummary?.length > 0 ? (
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
    EquipmentDisposalExpiredByCostCentre: () =>
      dtEquipmentDisposalExpiredByCostCentre ? (
        <EquipmentDisposalExpiredByCostCentre
          dtEquipmentDisposalExpiredByCostCentre={dtEquipmentDisposalExpiredByCostCentre}
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
    EquipmentDisposalExpiredSummary: () =>
      dtEquipmentDisposalExpiredSummary ? (
        <EquipmentDisposalExpiredSummary
          dtEquipmentDisposalExpiredSummary={dtEquipmentDisposalExpiredSummary}
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
    EquipmentDisposalNotRequiredCostCentre: () =>
      dtEquipmentDisposalNotRequiredByCostCentre ? (
        <EquipmentDisposalNotRequiredCostCentre
          dtEquipmentDisposalNotRequiredByCostCentre={dtEquipmentDisposalNotRequiredByCostCentre}
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
    EquipmentDisposalNotRequiredSummary: () =>
      !isEmptyNullOrUndefined(dtEquipmentDisposalNotRequiredSummary) ? (
        <EquipmentDisposalNotRequiredSummary
          dtEquipmentDisposalNotRequiredSummary={dtEquipmentDisposalNotRequiredSummary}
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
    EquipmentTotalDisposalByCostCentre: () =>
      !isEmptyNullOrUndefined(dtEquipmentTotalDisposalByCostCentre) ? (
        <EquipmentTotalDisposalByCostCentre
          dtEquipmentTotalDisposalByCostCentre={dtEquipmentTotalDisposalByCostCentre}
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
    EquipmentTotalDisposalSummary: () =>
      dtEquipmentTotalDisposalSummary ? (
        <EquipmentTotalDisposalSummary
          dtEquipmentTotalDisposalSummary={dtEquipmentTotalDisposalSummary}
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
    EquipmentFleetByCostCentre: () =>
      !isEmptyNullOrUndefined(dtEquipmentFleetByCostCentre) ? (
        <EquipmentFleetByCostCentre
          dtEquipmentFleetByCostCentre={dtEquipmentFleetByCostCentre}
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
    EquipmentFleetSummary: () =>
      dtEquipmentFleetSummary ? (
        <EquipmentFleetSummary
          dtEquipmentFleetSummary={dtEquipmentFleetSummary}
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

    EquipmentUtilisationByCostCentre: () =>
      !isEmptyNullOrUndefined(dtEquipmentFleetByCostCentre) ? (
        <EquipmentUtilisationByCostCentre
          dtEquipmentUtilisationByCostCentre={dtEquipmentUtilisationByCostCentre}
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
    EquipmentUtilisationSummary: () =>
      dtEquipmentUtilisationSummary ? (
        <EquipmentUtilisationSummary
          dtEquipmentUtilisationSummary={dtEquipmentUtilisationSummary}
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
    MaterialsServicesByCostCentre: () =>
      dtMaterialsServicesByCostCentre ? (
        <MaterialsServicesByCostCentre
          dtMaterialsServicesByCostCentre={dtMaterialsServicesByCostCentre}
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
    MaterialsByCostCentre: () =>
      dtMaterialsByCostCentre ? (
        <MaterialsByCostCentre
          dtMaterialsByCostCentre={dtMaterialsByCostCentre}
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
    ServicesByCostCentre: () =>
      dtServicesByCostCentre ? (
        <ServicesByCostCentre
          dtServicesByCostCentre={dtServicesByCostCentre}
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
    MaterialsServicesConsumedByEquipment: () =>
      dtMaterialsConsumedByEquipment ? (
        <MaterialsServicesConsumedByEquipment
          dtMaterialsConsumedByEquipment={dtMaterialsConsumedByEquipment}
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
    MaterialsServicesNotConsumedByEquipment: () =>
      dtMaterialsNotConsumedByEquipment ? (
        <MaterialsServicesNotConsumedByEquipment
          dtMaterialsNotConsumedByEquipment={dtMaterialsNotConsumedByEquipment}
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
    MaterialsServicesSummary: () =>
      dtMaterialsServicesSummary ? (
        <MaterialsServicesSummary
          dtMaterialsServicesSummary={dtMaterialsServicesSummary}
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

    EmployeeExcludingReliefByCostCentre: () =>
      dtEmployeeExcludingReliefByCostCentre ? (
        <EmployeeExcludingReliefByCostCentre
          dtEmployeeExcludingReliefByCostCentre={dtEmployeeExcludingReliefByCostCentre}
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

    EmployeeExcludingReliefSummary: () =>
      dtEmployeeExcludingReliefSummary ? (
        <EmployeeExcludingReliefSummary
          dtEmployeeExcludingReliefSummary={dtEmployeeExcludingReliefSummary}
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

    EmployeeRequiredforReliefByCostCentre: () =>
      dtEmployeeRequiredReliefByCostCentre ? (
        <EmployeeRequiredReliefByCostCentre
          dtEmployeeRequiredReliefByCostCentre={dtEmployeeRequiredReliefByCostCentre}
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

    EmployeeRequiredforReliefSummary: () =>
      dtEmployeeRequiredReliefSummary ? (
        <EmployeeRequiredReliefSummary
          dtEmployeeRequiredReliefSummary={dtEmployeeRequiredReliefSummary}
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

    EmployeeTotalByCostCentre: () =>
      dtEmployeeTotalByCostCentre && dtEmployeeTotalByCostCentre.length > 0 ? (
        <EmployeeTotalByCostCentre
          dtEmployeeTotalByCostCentre={dtEmployeeTotalByCostCentre}
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

    EmployeeTotalSummary: () =>
      dtEmployeeTotalSummary && dtEmployeeTotalSummary.length > 0 ? (
        <EmployeeTotalSummary
          dtEmployeeTotalSummary={dtEmployeeTotalSummary}
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

    GeneralFunction: () =>
      dtGeneralFunction && dtGeneralFunction.length > 0 ? (
        <GeneralFunction
          dtGeneralFunction={dtGeneralFunction}
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

  const handleExport = () => {
    const excelDataExport = {
      EquipmentRequiredByCostCentre: dtEquipmentRequiredByCostCentre,
      EquipmentRequiredSummary:dtEquipmentRequiredSummary,
      EquipmentReplacementByCostCentre: dtEquipmentReplacementByCostCentre,
      EquipmentReplacementSummary:dtEquipmentReplacementSummary,
      EquipmentDisposalExpiredByCostCentre:dtEquipmentDisposalExpiredByCostCentre,
      EquipmentDisposalExpiredSummary:dtEquipmentDisposalExpiredSummary,
      EquipmentDisposalNotRequiredCostCentre:dtEquipmentDisposalNotRequiredByCostCentre,
      EquipmentDisposalNotRequiredSummary:dtEquipmentDisposalNotRequiredSummary,
      EquipmentTotalDisposalByCostCentre:dtEquipmentTotalDisposalByCostCentre,
      EquipmentTotalDisposalSummary: dtEquipmentTotalDisposalSummary,
      EquipmentFleetByCostCentre: dtEquipmentFleetByCostCentre,
      EquipmentFleetSummary: dtEquipmentFleetSummary,
      EquipmentUtilisationByCostCentre:dtEquipmentFleetByCostCentre,
      EquipmentUtilisationSummary:dtEquipmentUtilisationSummary,
      MaterialsServicesByCostCentre:dtMaterialsServicesByCostCentre,
      MaterialsByCostCentre:dtMaterialsByCostCentre,
      ServicesByCostCentre:dtServicesByCostCentre,
      MaterialsServicesConsumedByEquipment:dtMaterialsConsumedByEquipment,
      MaterialsServicesNotConsumedByEquipment:dtMaterialsNotConsumedByEquipment,
      MaterialsServicesSummary:dtMaterialsServicesSummary,
      EmployeeExcludingReliefByCostCentre:dtEmployeeExcludingReliefByCostCentre,
      EmployeeExcludingReliefSummary:dtEmployeeExcludingReliefSummary,
      EmployeeRequiredforReliefByCostCentre:dtEmployeeRequiredReliefByCostCentre,
      EmployeeRequiredforReliefSummary:dtEmployeeRequiredReliefSummary,
      EmployeeTotalByCostCentre:dtEmployeeTotalByCostCentre,
      EmployeeTotalSummary:dtEmployeeTotalSummary,
      GeneralFunction:dtGeneralFunction,
    }
    console.log('code',code)
    console.log('excelDataExport',excelDataExport[code])
    callExport[code]({ excelData: excelDataExport[code], project: proj, projectRepresentation: projRep })
  }

  return (
    <>
      <Spinner loading={loading} />
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
              {renderPyshicalOutput[code]()}
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
            <button className="m-2 btn btn-primary btn-sm" onClick={() => genPDF()}>
              generate
            </button>
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
            <button
              className="m-2 btn btn-primary btn-sm"
              type="button"
              onClick={() => handleExport()}
            >
              <CIcon icon={cilDescription} />
              <span className="mx-2">Export</span>
            </button>
          </div>
        </CCol>
      </Styles>
    </>
  )
}

export default PyshicalOutput
