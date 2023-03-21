import React, { useState, useRef, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CModal,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CToastBody,
  CToastClose,
  CToaster,
  CForm,
  CFormFeedback,
} from '@coreui/react'
import { cilPencil, cilTrash, cilCalendar } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
// import DataTable from 'react-data-table-component'
import {
  getProjectCountry,
  postProjectRepresentation,
  getProjectRepresentation,
  putProjectRepresentation,
  deleteProjectRepresentation,
  getDropdownProjects,
  getCurrencies,
  setProjectRepresentation,
  putProjectRepresentationCalendar,
  deleteProjectRepresentationCalendar,
  putPeriodShorten,
  putPeriodExtend,
  putPeriodCustom,
  putPeriodEditDate,
} from '../../redux/actions'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Calendar from './Calendar'
import { isEmptyNullOrUndefined, dateToString, formatDate } from 'src/functions'
import VerticalTab from './VerticalTab'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& .MuiTableCell-sizeSmall': {
      padding: '5px 16px 5px 16px', // <-- arbitrary value
    },
  },
})

const ProjectRepresentation = () => {
  const [visible, setVisible] = useState(false)
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [id, setId] = useState(0)
  const [currProject] = useState(JSON.parse(localStorage.getItem('project')))
  const [projRep] = useState(JSON.parse(localStorage.getItem('projectRepresentation')))
  const [projectId, setProjectId] = useState(currProject.projectId)
  const [selected, setSelected] = useState([projRep?.projectRepresentationId])
  const [projectName, setProjectName] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState(0)
  // eslint-disable-next-line
  const [countryName, setCountryName] = useState('')
  const [currencyAbbr, setCurrencyAbbr] = useState('')
  const [note, setNote] = useState('')
  const [costStartDate, setCostStartDate] = useState('')
  const [operationStartDate, setOperationStartDate] = useState('')
  const [projectEndDate, setProjectEndDate] = useState('')
  const [validated, setValidated] = useState(false)
  const [isPeriodEmpty, setIsPeriodEmpty] = useState(true)
  const [dataCalendar, setDataCalendar] = useState([])
  const [noOfPeriod, setNoOfPeriod] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [selectedRows, setSelectedRows] = useState([])
  const [yearStartOn, setYearStartOn] = useState(0)
  const [selectedPeriodType, setSelectedPeriodType] = useState('')
  const [deleteStart, setDeleteStart] = useState(0)
  const [deleteEnd, setDeleteEnd] = useState(0)
  const [addStart, setAddStart] = useState(0)
  const [addEnd, setAddEnd] = useState(0)
  const [opsStartDate, setOpsStartDate] = useState('')
  const [yearStartOnPeriod, setYearStartOnPeriod] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  // backup if user click button reset
  const [periodBackUp, setPeriodBackUp] = useState([])

  const [periodLength, setPeriodLength] = useState({
    periodLength1: 0,
    periodLength2: 0,
    periodLength3: 0,
    periodLength4: 0,
    periodLength5: 0,
    periodLength6: 0,
  })
  const [numOfDays, setNumOfDays] = useState({
    numOfDays1: '',
    numOfDays2: '',
    numOfDays3: '',
    numOfDays4: '',
    numOfDays5: '',
    numOfDays6: '',
  })
  const [periodStart, setPeriodStart] = useState({
    periodStart1: '',
    periodStart2: '',
    periodStart3: '',
    periodStart4: '',
    periodStart5: '',
    periodStart6: '',
  })
  const [periodEnd, setPeriodEnd] = useState({
    periodEnd1: '',
    periodEnd2: '',
    periodEnd3: '',
    periodEnd4: '',
    periodEnd5: '',
    periodEnd6: '',
  })

  const changeSelectedPeriodType = (e) => {
    setSelectedPeriodType(e)
  }

  const updateCalendar = (e) => {
    const { id, value } = e.target
    if (id.toLowerCase().indexOf('periodlength') !== -1) {
      setPeriodLength({ ...periodLength, [id]: value })
    } else if (id.toLowerCase().indexOf('numofdays') !== -1) {
      setNumOfDays({ ...numOfDays, [id]: value })
    }
  }

  const selectProject = (event, row) => {
    let newSelected = [row.projectRepresentationId]
    setSelected(newSelected)
    dispatch(setProjectRepresentation(row))
  }

  const loading = useSelector((state) => state.Project.loading)
  const project = useSelector((state) => state.Navigation.project)
  const err = useSelector((state) => state.ProjectRepresentation.error)
  const msg = useSelector((state) => state.ProjectRepresentation.message)
  const isDeleted = useSelector((state) => state.ProjectRepresentation.isDeleted)
  const isCalendar = useSelector((state) => state.ProjectRepresentation.isCalendar)
  const yearStart = useSelector((state) => state.ProjectRepresentation.yearStartOn)

  const setMessageProcess = () => {
    if (err) {
      addToast(ToastError(err))
    } else if (msg && isDeleted) {
      addToast(ToastSuccessDelete)
    } else if (msg && !isDeleted) {
      addToast(ToastSuccess)
    }
    if (isCalendar) {
      setTimeout(() => {
        window.location.reload()
      }, 3000)
      // resetStates()

      // let selectedData = projects.filter((item) => item.projectRepresentationId === id)
      // setCalendarVisible(true)
      // onClickCalendar(selectedData[0])
    }
  }

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const ToastError = (errorText) => {
    return (
      <CToast className="align-items-center" color="warning">
        <div className="d-flex">
          <CToastBody>{errorText}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    )
  }

  useEffect(() => {
    dispatch(getDropdownProjects())
    dispatch(getProjectRepresentation({ projectId: project.projectId }))
    dispatch(getCurrencies())
    dispatch(getProjectCountry())
    setMessageProcess()
    // eslint-disable-next-line
  }, [msg, err])

  const projectsDropdown = useSelector((state) => state.Project.dataDropdown)
  const projects = useSelector((state) => state.ProjectRepresentation.dateRepresentation)
  const currencies = useSelector((state) => state.Country.dataCurrencies)
  const countries = useSelector((state) => state.Country.dataCountries)
  const period = useSelector((state) => state.ProjectRepresentation.dataPeriod)

  const onClickEdit = (row) => {
    setValidated(false)
    setProjectId(row.projectId)
    setName(row.projectRepresentationName)
    setId(row.projectRepresentationId)
    if (row.countryId) {
      setCountry(row.countryId)
    }
    setNote(row.notes)
    setVisible(!visible)
  }
  const resetStates = () => {
    // reset fields create new Project Representation
    setValidated(false)
    setName('')
    setId(0)
    setCountry(0)
    setNote('')
    // Calendar's State
    setDeleteStart(0)
    setDeleteEnd(0)
  }
  const onClickDeleteCalendar = () => {
    Swal.fire({
      title: 'Do you want to continue ?',
      text: 'If you delete the project calendar all related input schedules will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id: id,
        }
        dispatch(deleteProjectRepresentationCalendar(data))
      }
    })
  }
  const onClickResetCalendar = () => {
    Swal.fire({
      title: 'Do you want to continue ?',
      text: 'Resetting the Project Calendar erases all input and output schedules.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmitCalendar(true)
      }
    })
  }
  const shortenPeriod = () => {
    if (Number(deleteStart) < 0 || Number(deleteEnd) < 0) {
      Swal.fire({
        title: 'Do you want to continue ?',
        text: 'Number of periods must be greater than or equals to zero.',
        icon: 'warning',
        showCancelButton: true,
      })
    } else {
      let wording =
        'About to delete ' +
        deleteStart +
        ' periods from the start of the Project Calendar and ' +
        deleteEnd +
        ' periods from the end or the Project Calendar and modily input schedules and erase output schedules.'
      Swal.fire({
        title: 'Do you want to continue ?',
        text: wording,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, shorten it!',
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            id: id,
            shortStartPeriod: deleteStart,
            shortEndPeriod: deleteEnd,
          }
          dispatch(putPeriodShorten(data))
        }
      })
    }
  }
  const extendPeriod = () => {
    if (Number(addStart) < 0 || Number(addEnd) < 0) {
      Swal.fire({
        title: 'Do you want to continue ?',
        text: 'Number of periods must be greater than or equals to zero.',
        icon: 'warning',
        showCancelButton: true,
      })
    } else {
      let wording =
        'About to add ' +
        addStart +
        ' periods to the start of the Project Calendar and ' +
        addEnd +
        ' periods to the end of the Project Calendar. There will be no input or output schedules in the added periods.'
      Swal.fire({
        title: 'Do you want to continue ?',
        text: wording,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, extend it!',
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            id: id,
            addStartPeriod: addStart,
            addEndPeriod: addEnd,
          }
          dispatch(putPeriodExtend(data))
        }
      })
    }
  }
  const customPeriod = (sDate, eDate, positionN) => {
    if (Number(addStart) < 0 || Number(addEnd) < 0) {
      Swal.fire({
        title: 'Do you want to continue ?',
        text: 'Number of periods must be greater than or equals to zero.',
        icon: 'warning',
        showCancelButton: true,
      })
    } else {
      let wording =
        'Click YES, to recalculate the number of days in this Period and adjust all subsequent Start and End dates by the same number of days.'
      Swal.fire({
        title: 'You are about to change the End Period.?',
        text: wording,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            id: id,
            positionN: positionN,
            startDate: sDate,
            endDate: eDate,
          }
          dispatch(putPeriodCustom(data))
        }
      })
    }
  }
  const editDate = (tipe) => {
    let data =
      tipe === 'opsstartdate'
        ? {
            id: id,
            opsStartDate: dateToString(opsStartDate), // new Date(opsStartDate).toISOString().split('T')[0],
            yearStartOn: periodBackUp.yearStartOn,
          }
        : {
            id: id,
            opsStartDate: dateToString(periodBackUp.opsStartD), // new Date(periodBackUp.opsStartD).toISOString().split('T')[0],
            yearStartOn: yearStartOnPeriod,
          }
    dispatch(putPeriodEditDate(data))
  }
  const onClickSaveCalendar = (sDate, eDate, positionN) => {
    if (selectedPeriodType === '1' || selectedPeriodType === 1) {
      shortenPeriod(sDate, eDate)
    } else if (selectedPeriodType === '2' || selectedPeriodType === 2) {
      extendPeriod()
    } else if (selectedPeriodType === '3' || selectedPeriodType === 3) {
      customPeriod(sDate, eDate, positionN)
    } else if (selectedPeriodType === '4' || selectedPeriodType === 4) {
      editDate('opsstartdate')
    } else if (selectedPeriodType === '5' || selectedPeriodType === 5) {
      editDate('yearstarton')
    }
    if (
      ['1', '2', '3', '4', '5'].includes(selectedPeriodType) ||
      [1, 2, 3, 4, 5].includes(selectedPeriodType)
    ) {
    } else {
      handleSubmitCalendar()
    }
  }

  const onClickDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let param = { id: id }
        dispatch(deleteProjectRepresentation(param))
      }
    })
  }
  const onClickCalendar = (row) => {
    setProjectId(row.projectId)
    setName(row.projectRepresentationName)
    setId(row.projectRepresentationId)
    setIsPeriodEmpty(row.periods.length === 0 ? true : false)
    setPeriodBackUp(row)

    if (row.periods.length > 0) {
      setSelectedPeriodType(1)
      let backUp = []
      // eliminate unused variable
      let arrData = row.periods.filter(function (value, index, arr) {
        return index > 0
      })
      let datPer = arrData.map((item, index) => {
        backUp.push({
          periodId: item.periodId,
          bPeriodName: item.bPeriodName,
          bPeriodLength: item.bPeriodLength,
          bPeriodStart: item.bPeriodStart,
          bPeriodEnd: item.bPeriodEnd,
        })
        return {
          periodName: item.periodName,
          days: !isEmptyNullOrUndefined(item.periodLength) ? item.periodLength : 0,
          periodStart: !isEmptyNullOrUndefined(item.periodStart)
            ? formatDate(item.periodStart)
            : formatDate(new Date()),
          periodEnd: !isEmptyNullOrUndefined(item.periodEnd)
            ? formatDate(item.periodEnd)
            : formatDate(new Date()),
          positionN: item.positionN,
        }
      })

      // setPeriodBackUp([...backUp])
      setDataCalendar(datPer)
      setNoOfPeriod(row.periods.length)
    } else {
      setSelectedPeriodType(0)
      setDataCalendar([])
      setNoOfPeriod(0)
    }

    if (row.countryId) {
      setCountry(row.countryId)
    }
    setNote(row.notes)
    setCostStartDate(!isEmptyNullOrUndefined(row.costsStartD) ? new Date(row.costsStartD) : '')
    setOperationStartDate(!isEmptyNullOrUndefined(row.opsStartD) ? new Date(row.opsStartD) : '')
    setProjectEndDate(!isEmptyNullOrUndefined(row.projectEndD) ? new Date(row.projectEndD) : '')

    setYearStartOn(!isEmptyNullOrUndefined(row.yearStartOn) ? row.yearStartOn : '')

    setPeriodLength({
      ...periodLength,
      periodLength1: !isEmptyNullOrUndefined(row.periodLength1) ? row.periodLength1 : '',
    })
    setPeriodLength({
      ...periodLength,
      periodLength2: !isEmptyNullOrUndefined(row.periodLength2) ? row.periodLength2 : '',
    })
    setPeriodLength({
      ...periodLength,
      periodLength3: !isEmptyNullOrUndefined(row.periodLength3) ? row.periodLength3 : '',
    })
    setPeriodLength({
      ...periodLength,
      periodLength4: !isEmptyNullOrUndefined(row.periodLength4) ? row.periodLength4 : '',
    })
    setPeriodLength({
      ...periodLength,
      periodLength5: !isEmptyNullOrUndefined(row.periodLength5) ? row.periodLength5 : '',
    })
    setPeriodLength({
      ...periodLength,
      periodLength6: !isEmptyNullOrUndefined(row.periodLength6) ? row.periodLength6 : '',
    })

    setNumOfDays({
      ...numOfDays,
      numOfDays1: !isEmptyNullOrUndefined(row.numOfDays1) ? row.numOfDays1 : '',
    })
    setNumOfDays({
      ...numOfDays,
      numOfDays2: !isEmptyNullOrUndefined(row.numOfDays2) ? row.numOfDays2 : '',
    })
    setNumOfDays({
      ...numOfDays,
      numOfDays3: !isEmptyNullOrUndefined(row.numOfDays3) ? row.numOfDays3 : '',
    })
    setNumOfDays({
      ...numOfDays,
      numOfDays4: !isEmptyNullOrUndefined(row.numOfDays4) ? row.numOfDays4 : '',
    })
    setNumOfDays({
      ...numOfDays,
      numOfDays5: !isEmptyNullOrUndefined(row.numOfDays5) ? row.numOfDays5 : '',
    })
    setNumOfDays({
      ...numOfDays,
      numOfDays6: !isEmptyNullOrUndefined(row.numOfDays6) ? row.numOfDays6 : '',
    })

    setPeriodStart({
      ...periodStart,
      periodStart1: !isEmptyNullOrUndefined(row.periodStart1) ? row.periodStart1 : '',
    })
    setPeriodStart({
      ...periodStart,
      periodStart2: !isEmptyNullOrUndefined(row.periodStart2) ? row.periodStart2 : '',
    })
    setPeriodStart({
      ...periodStart,
      periodStart3: !isEmptyNullOrUndefined(row.periodStart3) ? row.periodStart3 : '',
    })
    setPeriodStart({
      ...periodStart,
      periodStart4: !isEmptyNullOrUndefined(row.periodStart4) ? row.periodStart4 : '',
    })
    setPeriodStart({
      ...periodStart,
      periodStart5: !isEmptyNullOrUndefined(row.periodStart5) ? row.periodStart5 : '',
    })
    setPeriodStart({
      ...periodStart,
      periodStart6: !isEmptyNullOrUndefined(row.periodStart6) ? row.periodStart6 : '',
    })

    setPeriodEnd({
      ...periodEnd,
      periodEnd1: !isEmptyNullOrUndefined(row.periodEnd1) ? row.periodEnd1 : '',
    })
    setPeriodEnd({
      ...periodEnd,
      periodEnd2: !isEmptyNullOrUndefined(row.periodEnd2) ? row.periodEnd2 : '',
    })
    setPeriodEnd({
      ...periodEnd,
      periodEnd3: !isEmptyNullOrUndefined(row.periodEnd3) ? row.periodEnd3 : '',
    })
    setPeriodEnd({
      ...periodEnd,
      periodEnd4: !isEmptyNullOrUndefined(row.periodEnd4) ? row.periodEnd4 : '',
    })
    setPeriodEnd({
      ...periodEnd,
      periodEnd5: !isEmptyNullOrUndefined(row.periodEnd5) ? row.periodEnd5 : '',
    })
    setPeriodEnd({
      ...periodEnd,
      periodEnd6: !isEmptyNullOrUndefined(row.periodEnd6) ? row.periodEnd6 : '',
    })

    setCalendarVisible(true)
  }
  const renderButtonAction = (row) => {
    return (
      <>
        <CButton
          color="primary"
          variant="outline"
          onClick={() => onClickCalendar(row)}
          className="mx-1"
        >
          <CIcon icon={cilCalendar} />
        </CButton>
        <CButton
          color="warning"
          variant="outline"
          onClick={() => onClickEdit(row)}
          className="mx-1"
        >
          <CIcon icon={cilPencil} />
        </CButton>
        <CButton
          color="danger"
          variant="outline"
          onClick={() => onClickDelete(row.projectRepresentationId)}
          className="mx-1"
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </>
    )
  }

  const handleSubmitCalendar = (isReset) => {
    if (isReset) {
      let payload = {
        projectRepresentationId: id,
        projectRepresentationName: name,
        costsStartD: dateToString(costStartDate),
        opsStartD: dateToString(periodBackUp.bOpsStartD),
        projectEndD: dateToString(projectEndDate),
        yearStartOn: periodBackUp.bYearStartOn,

        periodLength1: periodBackUp.bPeriodLength1,
        numOfDays1: periodBackUp.bNumOfDays1,
        periodStart1: periodBackUp.bPeriodStart1,
        periodEnd1: periodBackUp.bPeriodEnd1,

        periodLength2: periodBackUp.bPeriodLength2,
        numOfDays2: periodBackUp.bNumOfDays2,
        periodStart2: periodBackUp.bPeriodStart2,
        periodEnd2: periodBackUp.bPeriodEnd2,

        periodLength3: periodBackUp.bPeriodLength3,
        numOfDays3: periodBackUp.bNumOfDays3,
        periodStart3: periodBackUp.bPeriodStart3,
        periodEnd3: periodBackUp.bPeriodEnd3,

        periodLength4: periodBackUp.bPeriodLength4,
        numOfDays4: periodBackUp.bNumOfDays4,
        periodStart4: periodBackUp.bPeriodStart4,
        periodEnd4: periodBackUp.bPeriodEnd4,

        periodLength5: periodBackUp.bPeriodLength5,
        numOfDays5: periodBackUp.bNumOfDays5,
        periodStart5: periodBackUp.bPeriodStart5,
        periodEnd5: periodBackUp.bPeriodEnd5,

        periodLength6: periodBackUp.bPeriodLength6,
        numOfDays6: periodBackUp.bNumOfDays6,
        periodStart6: periodBackUp.bPeriodStart6,
        periodEnd6: periodBackUp.bPeriodEnd6,
      }
      dispatch(putProjectRepresentationCalendar(payload))
    } else {
      let payload = {
        projectRepresentationId: id,
        projectRepresentationName: name,
        costsStartD: dateToString(costStartDate),
        opsStartD: dateToString(operationStartDate),
        projectEndD: dateToString(projectEndDate),
        yearStartOn: yearStartOn,

        periodLength1: isEmptyNullOrUndefined(periodLength.periodLength1)
          ? null
          : Number(periodLength.periodLength1),
        numOfDays1: isEmptyNullOrUndefined(numOfDays.numOfDays1)
          ? null
          : Number(numOfDays.numOfDays1),
        periodStart1: isEmptyNullOrUndefined(periodStart.periodStart1)
          ? null
          : dateToString(periodStart.periodStart1),
        periodEnd1: isEmptyNullOrUndefined(periodEnd.periodEnd1)
          ? null
          : dateToString(periodEnd.periodEnd1),

        periodLength2: isEmptyNullOrUndefined(periodLength.periodLength2)
          ? null
          : Number(periodLength.periodLength2),
        numOfDays2: isEmptyNullOrUndefined(numOfDays.numOfDays2)
          ? null
          : Number(numOfDays.numOfDays2),
        periodStart2: isEmptyNullOrUndefined(periodStart.periodStart2)
          ? null
          : dateToString(periodStart.periodStart2),
        periodEnd2: isEmptyNullOrUndefined(periodEnd.periodEnd2)
          ? null
          : dateToString(periodEnd.periodEnd2),

        periodLength3: isEmptyNullOrUndefined(periodLength.periodLength3)
          ? null
          : Number(periodLength.periodLength3),
        numOfDays3: isEmptyNullOrUndefined(numOfDays.numOfDays3)
          ? null
          : Number(numOfDays.numOfDays3),
        periodStart3: isEmptyNullOrUndefined(periodStart.periodStart3)
          ? null
          : dateToString(periodStart.periodStart3),
        periodEnd3: isEmptyNullOrUndefined(periodEnd.periodEnd3)
          ? null
          : dateToString(periodEnd.periodEnd3),

        periodLength4: isEmptyNullOrUndefined(periodLength.periodLength4)
          ? null
          : Number(periodLength.periodLength4),
        numOfDays4: isEmptyNullOrUndefined(numOfDays.numOfDays4)
          ? null
          : Number(numOfDays.numOfDays4),
        periodStart4: isEmptyNullOrUndefined(periodStart.periodStart4)
          ? null
          : dateToString(periodStart.periodStart4),
        periodEnd4: isEmptyNullOrUndefined(periodEnd.periodEnd4)
          ? null
          : dateToString(periodEnd.periodEnd4),

        periodLength5: isEmptyNullOrUndefined(periodLength.periodLength5)
          ? null
          : Number(periodLength.periodLength5),
        numOfDays5: isEmptyNullOrUndefined(numOfDays.numOfDays5)
          ? null
          : Number(numOfDays.numOfDays5),
        periodStart5: isEmptyNullOrUndefined(periodStart.periodStart5)
          ? null
          : dateToString(periodStart.periodStart5),
        periodEnd5: isEmptyNullOrUndefined(periodEnd.periodEnd5)
          ? null
          : dateToString(periodEnd.periodEnd5),

        periodLength6: isEmptyNullOrUndefined(periodLength.periodLength6)
          ? null
          : Number(periodLength.periodLength6),
        numOfDays6: isEmptyNullOrUndefined(numOfDays.numOfDays6)
          ? null
          : Number(numOfDays.numOfDays6),
        periodStart6: isEmptyNullOrUndefined(periodStart.periodStart6)
          ? null
          : dateToString(periodStart.periodStart6),
        periodEnd6: isEmptyNullOrUndefined(periodEnd.periodEnd6)
          ? null
          : dateToString(periodEnd.periodEnd6),
      }
      dispatch(putProjectRepresentationCalendar(payload))
    }
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(false)
    }
    setValidated(true)

    if (form.checkValidity() === true) {
      let isValid = true

      let cName = ''
      let cAbbr = ''
      if (country <= 0) {
        isValid = false
      } else {
        cName = countries.filter((x) => x.countryId === Number(country))[0].countryName
        cAbbr = countries.filter((x) => x.countryId === Number(country))[0].currencyAbbr
      }
      if (!isValid) {
        addToast(ToastValidate)
      } else {
        let payload = {}

        if (id > 0) {
          payload = {
            projectRepresentationId: id,
            projectRepresentationName: name,
            projectId: projectId,
            projectName: projectName,
            countryId: country,
            countryName: countryName ? countryName : cName,
            currencyAbbr: currencyAbbr ? currencyAbbr : cAbbr,
            notes: note,
          }
          dispatch(putProjectRepresentation(payload))
        } else {
          payload = {
            projectRepresentationId: id,
            projectRepresentationName: name,
            projectId: projectId,
            projectName: projectName,
            countryId: country,
            countryName: countryName ? countryName : cName,
            currencyAbbr: currencyAbbr ? currencyAbbr : cAbbr,
            notes: note,
          }
          dispatch(postProjectRepresentation(payload))
        }
        setVisible(!visible)
      }
    }
  }
  const ToastSuccess = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been saved!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )
  const ToastValidate = (
    <CToast className="align-items-center" color="warning">
      <div className="d-flex">
        <CToastBody>Please Fill Mandatory Field</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )
  const onChangeCurrency = (e) => {
    let id = Number(e.target.value)
    let name = e.currentTarget[e.currentTarget.options.selectedIndex].text
    let cntry = countries.find((item) => item.countryId === id)
    setCountryName(cntry.countryName)
    setCurrencyAbbr(name)
    setCountry(id)
  }

  const isSelected = (row) => selected.indexOf(row.projectRepresentationId) !== -1

  return (
    <>
      <Spinner loading={loading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>Project Representation</strong>
            </CCardHeader>
            <CCardBody>
              <CButton
                color="primary"
                size="sm"
                onClick={() => {
                  setValidated(false)
                  setVisible(!visible)
                }}
                className="mb-2"
              >
                Create new
              </CButton>

              <CModal
                size="lg"
                alignment="center"
                scrollable
                visible={visible}
                onClose={() => {
                  resetStates()
                  setVisible(false)
                }}
              >
                <CForm
                  className="g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CModalHeader className="px-5">
                    <CModalTitle>Add Data</CModalTitle>
                  </CModalHeader>
                  <CModalBody className="px-5">
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="projectName" className="col-sm-3 col-form-label">
                        Current Project
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Project"
                          options={projectsDropdown}
                          readOnly={true}
                          size="sm"
                          required
                          id="project"
                          onChange={(e) => {
                            setProjectId(e.target.value)
                            setProjectName(
                              e.currentTarget[e.currentTarget.options.selectedIndex].text,
                            )
                          }}
                          value={projectId}
                          disabled={projectId > 0}
                        />
                        <CFormFeedback invalid>Project is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="category" className="col-sm-3 col-form-label">
                        Name
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormInput
                          size="sm"
                          value={name}
                          placeholder="Please input project representation name"
                          onInput={(e) => setName(e.currentTarget.value)}
                          required
                        />
                        <CFormFeedback invalid>Name is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="subCategory" className="col-sm-3 col-form-label">
                        Project Currency
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormSelect
                          aria-label="Please select Sub-Category"
                          options={currencies}
                          size="sm"
                          required
                          value={country}
                          id="currency"
                          onChange={onChangeCurrency}
                        />
                        <CFormFeedback invalid>Sub-Category is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-1">
                      <CFormLabel htmlFor="notes" className="col-sm-3 col-form-label">
                        Notes
                      </CFormLabel>
                      <CCol sm={9}>
                        <CFormTextarea
                          size="sm"
                          rows="3"
                          placeholder="Please input Notes"
                          value={note}
                          onChange={(e) => setNote(e.currentTarget.value)}
                          required
                        ></CFormTextarea>
                        <CFormFeedback invalid>Notes is required.</CFormFeedback>
                      </CCol>
                    </CRow>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)} size="sm">
                      Close
                    </CButton>
                    <CButton color="primary" type="submit" size="sm">
                      Save changes
                    </CButton>
                  </CModalFooter>
                </CForm>
              </CModal>

              <CModal
                size="lg"
                alignment="center"
                scrollable
                visible={calendarVisible}
                onClose={() => {
                  resetStates()
                  setCalendarVisible(false)
                }}
              >
                <CModalHeader className="px-5">
                  <CModalTitle>Data Calendar</CModalTitle>
                </CModalHeader>
                <CModalBody className="px-5">
                  {isPeriodEmpty ? (
                    <CRow>
                      <CCol xs={12}>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Costs Start Date
                          </CFormLabel>
                          <CCol sm={8}>
                            <DatePicker
                              placeholderText="Please select start date"
                              className="form-control form-control-sm"
                              dateFormat="dd-MMM-yyyy"
                              selected={
                                !isEmptyNullOrUndefined(costStartDate) ? costStartDate : null
                              }
                              onChange={(date) => {
                                setPeriodStart({ ...periodStart, periodStart1: date })
                                setPeriodLength({ ...periodLength, periodLength1: 5 })
                                setCostStartDate(date)
                              }}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Operations Start Date
                          </CFormLabel>
                          <CCol sm={8}>
                            <DatePicker
                              placeholderText="Please Select Operations Start Date"
                              className="form-control form-control-sm"
                              dateFormat="dd-MMM-yyyy"
                              selected={
                                !isEmptyNullOrUndefined(operationStartDate)
                                  ? operationStartDate
                                  : null
                              }
                              onChange={(date) => {
                                setOperationStartDate(date)
                                setPeriodStart({ ...periodStart, periodStart2: date })
                                setPeriodLength({ ...periodLength, periodLength2: 5 })
                                setPeriodEnd({
                                  ...periodEnd,
                                  periodEnd1: new Date(date).setDate(new Date(date).getDate() - 1),
                                })
                              }}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Project End Date
                          </CFormLabel>
                          <CCol sm={8}>
                            <DatePicker
                              placeholderText="Please Select Project End Date"
                              className="form-control form-control-sm"
                              dateFormat="dd-MMM-yyyy"
                              selected={
                                !isEmptyNullOrUndefined(projectEndDate) ? projectEndDate : null
                              }
                              onChange={(date) => setProjectEndDate(date)}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="notes" className="col-sm-4 col-form-label">
                            Year Starts On
                          </CFormLabel>
                          <CCol sm={8}>
                            <CFormSelect
                              aria-label="Please select Year Start On"
                              options={yearStart}
                              size="sm"
                              onChange={(e) => setYearStartOn(e.currentTarget.value)}
                              value={yearStartOn}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol xs={12} className="text-center">
                        <Calendar
                          key={Math.random()}
                          period={period}
                          updateCalendar={updateCalendar}
                          periodLength={periodLength}
                          numOfDays={numOfDays}
                          periodStart={periodStart}
                          setPeriodStart={setPeriodStart}
                          periodEnd={periodEnd}
                          setPeriodEnd={setPeriodEnd}
                          projectEndDate={projectEndDate}
                        />
                      </CCol>
                    </CRow>
                  ) : (
                    <VerticalTab
                      key={Math.random()}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      onClickSaveCalendar={onClickSaveCalendar}
                      yearStart={yearStart}
                      yearStartOn={yearStartOn}
                      dataCalendar={dataCalendar}
                      noOfPeriod={noOfPeriod}
                      costsStartD={costStartDate}
                      opsStartD={operationStartDate}
                      projectEndD={projectEndDate}
                      changeSelectedPeriodType={changeSelectedPeriodType}
                      onClickDelCalendar={onClickDeleteCalendar}
                      onClickResetCalendar={onClickResetCalendar}
                      deleteStart={deleteStart}
                      deleteEnd={deleteEnd}
                      setDeleteStart={setDeleteStart}
                      setDeleteEnd={setDeleteEnd}
                      addStart={addStart}
                      addEnd={addEnd}
                      setAddStart={setAddStart}
                      setAddEnd={setAddEnd}
                      yearStartOnPeriod={yearStartOnPeriod}
                      setYearStartOnPeriod={setYearStartOnPeriod}
                      opsStartDate={opsStartDate}
                      setOpsStartDate={setOpsStartDate}
                    />
                  )}
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setCalendarVisible(false)} size="sm">
                    Close
                  </CButton>
                  {selectedPeriodType === -1 ? (
                    <CButton color="primary" type="button" onClick={handleSubmitCalendar} size="sm">
                      Save changes
                    </CButton>
                  ) : (
                    <CButton color="primary" type="button" onClick={onClickSaveCalendar} size="sm">
                      Save changes
                    </CButton>
                  )}
                </CModalFooter>
              </CModal>

              {projects.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="Project table" size="small">
                    <TableHead>
                      <TableRow style={{ backgroundColor: '#c8c8c8' }}>
                        <TableCell>
                          <b>No.</b>
                        </TableCell>
                        <TableCell>
                          <b>Project Representation Name</b>
                        </TableCell>
                        <TableCell>
                          <b>Currency</b>
                        </TableCell>
                        <TableCell>
                          <b>Notes</b>
                        </TableCell>
                        <TableCell>
                          <b>Action</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projects &&
                        projects.map((row, idx) => {
                          // debugger
                          const isItemSelected = isSelected(row)
                          return (
                            <TableRow
                              style={{ cursor: 'pointer', padding: '5px 15px 5px 15px !important' }}
                              key={idx}
                              hover
                              onClick={(event) => selectProject(event, row)}
                              selected={isItemSelected}
                            >
                              <TableCell component="th" scope="row">
                                {idx + 1}
                              </TableCell>
                              <TableCell>{row.projectRepresentationName}</TableCell>
                              <TableCell>{row.currencyAbbr}</TableCell>
                              <TableCell>{row.notes}</TableCell>
                              <TableCell>{renderButtonAction(row)}</TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                // <DataTable
                //   columns={columns}
                //   data={projects}
                //   selectableRows
                //   onSelectedRowsChange={handleChange}
                //   selectableRowsNoSelectAll={true}
                //   pagination
                // />
                <h1>No Data.</h1>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectRepresentation
