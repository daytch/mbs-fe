const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const dataRoster = () => {
  let dataRepresentation = JSON.parse(localStorage.getItem('projectRepresentation'))

  if (dataRepresentation) {
    let dataPeriods = dataRepresentation.periods
    let objData = { indexnameR: '' }
    for (var i in dataPeriods) {
      if (dataPeriods.hasOwnProperty(i)) {
        objData[dataPeriods[i].periodName] = ''
      }
    }

    return objData
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d, i) => {
      let data = dataRoster()

      // console.log('lens:', lens)
      // let total = localStorage.getItem('totalArrayPeriod')
      if (lens[1].length > 0) {
        if (lens[1][i]) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              let valData = lens[1][i]
              for (var item in valData) {
                let idx = item.split('_')[1]

                if (key === 'indexnameR' && valData['ccFleetRosterID_' + idx]) {
                  // debugger
                  data['indexnameR'] =
                    valData['fleetName_' + idx] +
                    '~' +
                    valData['ccFleetRosterID_' + idx] +
                    '~' +
                    valData['periodId_' + idx]
                } else if (valData[item] === key && valData['rosterID_' + idx]) {
                  data[key] = valData['rosterID_' + idx]
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

  return makeDataLevel()
}
