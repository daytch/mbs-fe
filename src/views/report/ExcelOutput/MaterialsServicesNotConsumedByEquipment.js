import FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const MaterialsServicesNotConsumedByEquipment = ({excelData, project, projectRepresentation}) => {
  const listPeriods = excelData[0]?.rptMaterialServiceSchedulePeriodDtos?.map((x) => {
    return { periodId: x.periodId, positionN: x.positionN, periodName: x.periodName }
  })

  const listData = []
  const listParent = []
  let parentTemp = ''
  
  excelData.forEach((item, idx) => {
    let i = listParent.filter((x) => x.costCentreCode === item.costCentreCode)
    if (i.length < 1) {
      listParent.push({ costCentreCode: item.costCentreCode, costCentreName: item.costCentreName })
    }
    const tempData = item.rptMaterialServiceSchedulePeriodDtos.map((item) => item.value)
    if (parentTemp === '') {
      parentTemp = item.costCentreCode
      listData.push([item.costCentreCode, item.costCentreName, ...tempData.map(() => ''), ''])
    } else if (parentTemp !== item.costCentreCode) {
      parentTemp = item.costCentreCode
      listData.push([item.costCentreCode, item.costCentreName, ...tempData.map(() => ''), ''])
    }
    listData.push(['', item.matServName, ...tempData, Math.max(...tempData)])
  })

  const headerCol = ['Code', 'Description']

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'
  const merge = XLSX.utils.decode_range('A1:C1')
  const merge1 = XLSX.utils.decode_range('A2:C2')
  const merge2 = XLSX.utils.decode_range('A4:F4')
  const ws = XLSX.utils.aoa_to_sheet([
    ['Project', '', '', project.projectName],
    ['Project Representation', '', '', projectRepresentation.projectRepresentationName],
    [''],
    ['Equipment Disposal Expired By Cost Centre'],
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
  FileSaver.saveAs(data, "MaterialsServicesNotConsumedByEquipment", +fileExtension)
}

export default MaterialsServicesNotConsumedByEquipment