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
import { useEffectOnce } from './../../functions'
import { jsPDF } from 'jspdf'
import { PDFViewer } from '@react-pdf/renderer'
import CountryPDF from './InputData/CountryPDF'
import GenericEquipmentPDF from './InputData/GenericEquipmentPDF'
import ProjectCategoriesPDF from './InputData/ProjectCategoriesPDF'
import InfraChecklistPDF from './InputData/InfraChecklistPDF'
import ProductionSchedulesPDF from './InputData/ProductionSchedulesPDF'
import RostersPDF from './InputData/RostersPDF'
import ConstantsPDF from './InputData/ConstantsPDF'
import MaterialPDF from './InputData/MaterialPDF'
import EmployeeTypesPDF from './InputData/EmployeeTypePDF'
import EquipmentPDF from './InputData/EquipmentPDF'
import InfrastructurePDF from './InputData/InfrastructurePDF'
import CostCentrePDF from './InputData/CostCentrePDF'
import ProductionFactorPDF from './InputData/ProductionFactorPDF'
import EquipmentRosterPDF from './InputData/EquipmentRosterPDF'
import EquipmentOHFunctionsPDF from './InputData/EquipmentOHFunctionsPDF'
import PersonnelFunctionPDF from './InputData/PersonnelFunctionPDF'
import FunctionCostCentrePDF from './InputData/FunctionCostCentrePDF'
import MaterialFunctionPDF from './InputData/MaterialFunctionPDF'
import MaterialFunctionInfraPDF from './InputData/MaterialFunctionInfraPDF'
import GeneralFunctionPDF from './InputData/GeneralFunctionPDF'
import ExchangeRatesPDF from './InputData/ExchangeRatesPDF'
import LevyPDF from './InputData/LevyPDF'
import CostIndicesPDF from './InputData/CostIndicesPDF'
import IndexContingencyPDF from './InputData/IndexContingencyPDF'
import CostSpreadingEquipmentPDF from './InputData/CostSpreadingEquipmentPDF'
import CostSpreadingInfraPDF from './InputData/CostSpreadingInfraPDF'
import NoData from './NoData'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProjectCountry,
  getListProjectCategories,
  getGenericEquipment,
  getInfraChecklist,
  getReportProductionSchedule,
  getRoster,
  getFleets,
  getConstant,
  getMaterials,
  getEmployeeTypeReport,
  getResourcesInfra,
  getLevyCategories,
  getCostCentreReport,
  getProductionFactor,
  getEquipmentRosterReport,
  getEquipmentScheduleOHReport,
  getFunctionPersonnelReport,
  getFunctionCostCentreReport,
  getMaterialFunctionReport,
  getMaterialInfraReport,
  getFuntionGeneral,
  getExchangeRate,
  getLevyReport,
  getCostIndices,
  getIndexContingencyReport,
} from '../../redux/actions'
import './print.css'
import ContextMenu from './../../components/ContextMenu'

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
}) => {
  const [value, setValue] = useState(initialValue)
  const [visibleSelect, setVisibleSelect] = useState(false)

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
    const dataSize = [
      { label: '', value: 'kosong' },
      { label: 'A4', value: 'a4' },
      { label: 'Legal', value: 'legal' },
      { label: 'Letter', value: 'letter' },
    ]
    return (
      <select
        id={id}
        disabled={true}
        data-index={index}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
  } else if (id === 'report') {
    return <span>{value}</span>
  } else if (id === 'rheader') {
    return <span>{value}</span>
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
        className="ms-4 text-center"
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
    // updateEquipmentModelCosts,
    // currencies,
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
      // updateEquipmentModelCosts,
      // currencies,
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
    </>
  )
})

const InputData = ({ dataSource, updateEquipmentModelCosts, isNew }) => {
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

  const proj = JSON.parse(localStorage.getItem('project'))
  const projRep = JSON.parse(localStorage.getItem('projectRepresentation'))
  const [data, setData] = useState(() => makeData(26, 'inputData', dataSource))
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)
  // const [selectedRowCount, setSelectedRowCount] = useState(0)
  const [selectedRow, setSelectedRow] = useState([])
  const [visibleMaterialQuantity, setVisibleMaterialQuantity] = useState(false)
  const [title, setTitle] = useState('country')
  const [code, setCode] = useState('country')
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

  useEffect(() => {
    dispatch(getProjectCountry())
    dispatch(getListProjectCategories())
    dispatch(getGenericEquipment())
    dispatch(getInfraChecklist())
    dispatch(
      getReportProductionSchedule({ projectRepresentationId: projRep.projectRepresentationId }),
    )
    dispatch(getRoster(projRep.projectRepresentationId))
    dispatch(getConstant(projRep.projectRepresentationId))
    dispatch(getMaterials({ projectRepresentationId: projRep.projectRepresentationId }))
    dispatch(getEmployeeTypeReport(projRep.projectRepresentationId))
    dispatch(getFleets({ projectRepresentationId: projRep.projectRepresentationId }))
    dispatch(getResourcesInfra(projRep.projectRepresentationId))
    dispatch(getLevyCategories(projRep.projectRepresentationId))
    dispatch(getCostCentreReport(projRep.projectRepresentationId))
    dispatch(
      getProductionFactor({
        projectRepresentationId: projRep.projectRepresentationId,
      }),
    )
    dispatch(getEquipmentRosterReport(projRep.projectRepresentationId))
    dispatch(getEquipmentScheduleOHReport(projRep.projectRepresentationId))
    dispatch(getFunctionPersonnelReport(projRep.projectRepresentationId))
    dispatch(getFunctionCostCentreReport(projRep.projectRepresentationId))
    dispatch(getMaterialFunctionReport(projRep.projectRepresentationId))
    dispatch(getMaterialInfraReport(projRep.projectRepresentationId))
    dispatch(getFuntionGeneral({ projectRepresentationId: projRep.projectRepresentationId }))
    dispatch(getExchangeRate({ projectRepresentationId: projRep.projectRepresentationId }))
    dispatch(getLevyReport(projRep.projectRepresentationId))
    dispatch(getCostIndices({ projectRepresentationId: projRep.projectRepresentationId }))
    dispatch(getIndexContingencyReport(projRep.projectRepresentationId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currencies = useSelector((state) => state.Country.dataCountries)
  const projectcategories = useSelector((state) => state.ProjectCategories.datas)
  const listequipment = useSelector((state) => state.GenericEquipment.dataEqp)
  const infras = useSelector((state) => state.InfraChecklist.dataInfra)
  const productionschedules = useSelector((state) => state.ProductionSchedule.report)
  const rosters = useSelector((state) => state.Roster.data)
  const constants = useSelector((state) => state.Constant.data)
  const materials = useSelector((state) => state.ResourcesMaterials.data)
  const employeetypes = useSelector((state) => state.ResourcesEmployeeType.report)
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
  const infrastructures = useSelector((state) => state.ResourcesInfrastructure.dataInfra)
  const levyCategories = useSelector((state) => {
    if (state.LevyCategory?.data?.length > 0) {
      let dat = state.LevyCategory.data
      return data.map((i, idx) => {
        return { id: i.levyCategoryId, name: i.levyCategoryName }
      })
    } else {
      return null
    }
  })
  const costCentres = useSelector((state) => state.CostCentre.report)
  const productionFactors = useSelector((state) => state.ProductionFactor.data)
  const equipmentRosters = useSelector((state) => state.EquipmentScheduleRoster.report)
  const equipmentOHFunctions = useSelector((state) => state.EquipmentScheduleOH.report)
  const personnelFunctions = useSelector((state) => state.FunctionPersonnel.report)
  const functionCostCentres = useSelector((state) => state.FunctionCostCentre.report)
  const materialFunctions = useSelector((state) => state.MaterialFunction.data)
  const materialFunctionInfra = useSelector((state) => state.MaterialFunction.dataInfra)
  const generalFunction = useSelector((state) => state.FunctionGeneral.data)
  const exchangeRates = useSelector((state) => state.FinanceExchangeRate.dataExchangeRate)
  let listEchangeCountries = exchangeRates
    ? [...new Set(exchangeRates.map((x) => x.countryId))]
    : []
  const levies = useSelector((state) => state.Levy.report)
  const costIndices = useSelector((state) => state.FinanceCostIndices.dataCostIndices)
  const indexContingency = useSelector((state) => state.IndexContingency.report)

  useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  const renderCompInputData = {
    country: () =>
      currencies ? (
        <CountryPDF
          countries={currencies}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    projectcategory: () => (
      <ProjectCategoriesPDF
        projectcategories={projectcategories}
        project={proj}
        projectRepresentation={projRep}
        showHeader={true}
        showFooter={true}
      />
    ),
    genericequipment: () => (
      <GenericEquipmentPDF
        listequipment={listequipment}
        currencies={currencies}
        project={proj}
        projectRepresentation={projRep}
        showHeader={true}
        showFooter={true}
      />
    ),
    infrachecklist: () =>
      infras?.length > 0 ? (
        <InfraChecklistPDF
          infras={infras}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    productionschedules: () =>
      productionschedules?.listProductionSchedule ? (
        <ProductionSchedulesPDF
          productionschedules={productionschedules.listProductionSchedule}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    rosters: () =>
      rosters ? (
        <RostersPDF
          rosters={rosters}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    constants: () =>
      constants ? (
        <ConstantsPDF
          constants={constants}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    materials: () =>
      materials ? (
        <MaterialPDF
          materials={materials}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    employeetypes: () =>
      employeetypes ? (
        <EmployeeTypesPDF
          employeetypes={employeetypes}
          currencies={currencies}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    equipment: () =>
      fleets && levyCategories ? (
        <EquipmentPDF
          fleets={fleets}
          levyCategories={levyCategories}
          currencies={currencies}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    infrastructure: () =>
      infrastructures && levyCategories ? (
        <InfrastructurePDF
          infrastructures={infrastructures}
          levyCategories={levyCategories}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    costcentre: () =>
      costCentres ? (
        <CostCentrePDF
          costCentres={costCentres}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    productionfactor: () =>
      productionFactors ? (
        <ProductionFactorPDF
          productionFactors={productionFactors}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    equipmentroster: () =>
      equipmentRosters ? (
        <EquipmentRosterPDF
          equipmentRosters={equipmentRosters}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    equipmentohfunctions: () =>
      equipmentOHFunctions?.length > 0 ? (
        <EquipmentOHFunctionsPDF
          equipmentOHFunctions={equipmentOHFunctions}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    personnelfunctions: () =>
      personnelFunctions?.length > 0 ? (
        <PersonnelFunctionPDF
          personnelFunctions={personnelFunctions}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    functioncostcentre: () =>
      functionCostCentres?.length > 0 ? (
        <PersonnelFunctionPDF
          functionCostCentres={functionCostCentres}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    materialfunction: () =>
      materialFunctions?.length > 0 ? (
        <MaterialFunctionPDF
          materialFunctions={materialFunctions}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    materialfunctioninfra: () =>
      materialFunctionInfra?.length > 0 ? (
        <MaterialFunctionInfraPDF
          materialFunctionInfra={materialFunctionInfra}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    generalfunctions: () =>
      generalFunction?.length > 0 ? (
        <GeneralFunctionPDF
          generalFunction={generalFunction}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    exchangerates: () =>
      exchangeRates?.length > 0 ? (
        <ExchangeRatesPDF
          exchangeRates={exchangeRates}
          listEchangeCountries={listEchangeCountries}
          currencies={currencies}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    levy: () =>
      levies ? (
        <LevyPDF
          levies={levies}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    costindices: () =>
      exchangeRates?.length > 0 ? (
        <CostIndicesPDF
          costIndices={costIndices}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    indexcontingency: () =>
      indexContingency ? (
        <IndexContingencyPDF
          indexContingency={indexContingency}
          countries={currencies}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    costspreadingequipment: () =>
      equipmentRosters ? (
        <CostSpreadingEquipmentPDF
          equipmentRosters={equipmentRosters}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
        />
      ) : (
        <NoData />
      ),
    costspreadinginfra: () =>
      equipmentRosters ? (
        <CostSpreadingInfraPDF
          equipmentRosters={equipmentRosters}
          project={proj}
          projectRepresentation={projRep}
          showHeader={true}
          showFooter={true}
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
            {renderCompInputData[code]()}
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
          <button className="m-2 btn btn-primary btn-sm" type="button">
            <CIcon icon={cilDescription} />
            <span className="mx-2">Export</span>
          </button>
        </div>
      </CCol>
    </Styles>
  )
}

export default InputData
