import FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const EmployeeTotalSummary = ({ excelData, project, projectRepresentation }) => {
  console.log('project', project)
  console.log('projectRepresentation', projectRepresentation)
  console.log('excelData', excelData)

  const listPeriods = excelData[0]?.rptEmployeeSchedulePeriodSummaryDtos?.map((x) => {
    return { periodId: x.periodId, positionN: x.value, periodName: x.periodName }
  })

  const listData = []
  const listParent = []
  let parentTemp = ''

  excelData.forEach((item, idx) => {
    const tempData = item.rptEmployeeSchedulePeriodSummaryDtos.map((item) => item.value)
    listData.push([item.groupName, ...tempData, Math.max(...tempData)])
  })

  const headerCol = ['Employee Name']
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'
  const merge = XLSX.utils.decode_range('A1:C1')
  const merge1 = XLSX.utils.decode_range('A2:C2')
  const merge2 = XLSX.utils.decode_range('A4:F4')
  const ws = XLSX.utils.aoa_to_sheet([
    ['Project', '', '', project.projectName],
    ['Project Representation', '', '', projectRepresentation.projectRepresentationName],
    [''],
    ['Employee Total Summary'],
    [...headerCol, ...listPeriods.map((item) => item.periodName), 'Max'],
  ])
  XLSX.utils.sheet_add_aoa(ws, listData, { origin: 'A6' })
  if (!ws['!merges']) ws['!merges'] = []
  ws['!merges'].push(merge)
  ws['!merges'].push(merge1)
  ws['!merges'].push(merge2)
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const data = new Blob([excelBuffer], { type: fileType })
  FileSaver.saveAs(data, 'EmployeeTotalSummary', +fileExtension)
}

export default EmployeeTotalSummary
