const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const getInitPeriod = {
  personnel: { indexnameR: '', rosterName_R: '' },
  material: { indexnameO: '' },
  general: { indexnameP: '' },
}

const dataPeriods = (tipe) => {
  let dataRepresentation = JSON.parse(localStorage.getItem('projectRepresentation'))

  if (dataRepresentation) {
    let dataPeriods = dataRepresentation.periods
    let objData = getInitPeriod[tipe]
    for (var i in dataPeriods) {
      if (dataPeriods.hasOwnProperty(i)) {
        objData[dataPeriods[i]?.periodName] = ''
      }
    }

    return objData
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d, i) => {
      let data = dataPeriods(lens[2])
      // console.log('lens:', lens)
      // let total = localStorage.getItem('totalArrayPeriod')
      if (lens[1]?.length > 0) {
        if (lens[2] === 'general') {
        }
        if (lens[1][i]) {
          for (var key in data) {
            // console.log('key: ', key)
            if (data.hasOwnProperty(key)) {
              let valData = lens[1][i]
              for (var item in valData) {
                let idx = item.split('_')[1]

                if (valData['value_' + idx]) {
                  data[valData['periodName_' + idx]] = valData['value_' + idx]
                } else if (valData['periodName_' + idx] === key && valData['rosterID_' + idx]) {
                  data[key] = valData['rosterID_' + idx]
                } else if (key === 'rosterName_R') {
                  data['roster_R'] = valData['rosterName_' + idx]
                } else if (key === 'indexnameR' || valData['ccEmployeeID_' + idx]) {
                  // Personnel Functions

                  data['indexnameR'] =
                    valData['indexnameR_' + idx] +
                    '~' +
                    valData['ccEmployeeID_' + idx] +
                    '~' +
                    valData['prisCCEmployeeID_' + idx]
                  // +'~' +
                  // valData['periodId_' + idx]
                } else if (key === 'indexnameO' || valData['ccFleetOHID_' + idx]) {
                  // For Material Functions
                  data['indexnameO'] =
                    valData['generalFunctionName_' + idx] +
                    '~' +
                    valData['ccFleetOHID_' + idx] +
                    '~' +
                    valData['periodId_' + idx]
                }
                // For Function General
                if (lens[2] === 'general') {
                  if (valData[item] === key) {
                    // console.log('key : ', key)
                    data[key] = valData['value_' + idx]
                  } else if (
                    key === 'indexnameP' &&
                    valData['generalFunctionName_' + idx] &&
                    valData['value_' + idx]
                  ) {
                    data['indexnameP'] =
                      valData['generalFunctionName_' + idx] +
                      '~' +
                      valData['generalFunctionId_' + idx] +
                      '~' +
                      valData['periodId_' + idx]
                  }
                }
              }
            }
          }
        }
      }

      return {
        ...data,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : null,
      }
    })
  }
  const isPeriodEmpty = (obj) => {
    let isEmpty = true
    for (const key in obj) {
      if (key !== 'indexnameP' && key !== 'subRows' && obj[key]) {
        isEmpty = false
      }
    }
    return isEmpty
  }

  let data = makeDataLevel()
  if (lens[2] === 'general') {
    data.forEach((elm) => {
      if (isPeriodEmpty(elm)) {
        elm.indexnameP = ''
      }
    })
  }

  return data
}
