import FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const EquipmentFleetSummary = ({ excelData, project, projectRepresentation }) => {
  console.log('project', project)
  console.log('projectRepresentation', projectRepresentation)
  console.log('excelData', excelData)
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'
  const merge = XLSX.utils.decode_range('A1:C1')
  const merge1 = XLSX.utils.decode_range('A2:C2')
  const merge2 = XLSX.utils.decode_range('A4:F4')
  const ws = XLSX.utils.aoa_to_sheet([
    ['Project', '', '', project.projectName],
    ['Project Representation', '', '', projectRepresentation.projectRepresentationName],
    [''],
    ['Equipment Total Disposal Summary'],
    ['No', 'Country Name', 'Full Currency Name', 'Currency Abbreviation'],
  ])
  XLSX.utils.sheet_add_json(ws, excelData, { origin: 'A5', skipHeader: true })
  if (!ws['!merges']) ws['!merges'] = []
  ws['!merges'].push(merge)
  ws['!merges'].push(merge1)
  ws['!merges'].push(merge2)
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const data = new Blob([excelBuffer], { type: fileType })
  FileSaver.saveAs(data, 'EquipmentFleetSummary', +fileExtension)
}

export default EquipmentFleetSummary
