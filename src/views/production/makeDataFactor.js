import { isEmptyNullOrUndefined } from '../../functions'
const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const dataCalendar = () => {
  let dataRepresentation = JSON.parse(localStorage.getItem('projectRepresentation'))

  if (dataRepresentation) {
    let dataPeriods = dataRepresentation.periods
    let objData = { indexname: '', units: '' }
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
      let data = dataCalendar()

      if (lens[1].length > 0) {
        if (lens[1][i]) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              let valData = lens[1][i]
              for (var item in valData) {
                let idx = item.split('_')[1]
                if (key === 'units' && !isEmptyNullOrUndefined(valData['units_' + idx])) {
                  data[key] = valData['units_' + idx]
                } else if (
                  valData[item] === key &&
                  !isEmptyNullOrUndefined(valData['productFactorValueId_' + idx])
                ) {
                  data[key] =
                    valData['productFactorValue_' + idx] +
                    '~' +
                    valData['productFactorValueId_' + idx]
                } else if (
                  key === 'indexname' &&
                  !isEmptyNullOrUndefined(valData['productName_' + idx])
                ) {
                  data['indexname'] =
                    valData['productName_' + idx] +
                    '~' +
                    valData['productId_' + idx] +
                    '~' +
                    valData['periodId_' + idx]
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
