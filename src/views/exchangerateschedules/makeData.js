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
    let objData = { currency: '' }
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
    if (lens[1]) {
      return range(len).map((d, i) => {
        let data = dataCalendar()
        if (lens[2].length > 0) {
          if (lens[2][i]) {
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                if (key === 'currency') {
                  data['currency'] = lens[2][i].currencyAbbr + '~' + lens[2][i].countryId
                } else {
                  if (lens[1].length > 0) {
                    // eslint-disable-next-line no-loop-func
                    let dataPeriod = lens[3].filter((x) => x.periodName === key)
                    let existingData = lens[1].filter(
                      (x) =>
                        x.countryId === lens[2][i].countryId &&
                        x.periodId === dataPeriod[0].periodId &&
                        x.positionN === dataPeriod[0].positionN,
                    )
                    if (existingData.length > 0) {
                      data[key] =
                        existingData[0].exchRate +
                        '~' +
                        existingData[0].exchRateId +
                        '~' +
                        existingData[0].periodId
                    } else {
                      data[key] = lens[2][i][key]
                    }
                  } else {
                    data[key] = lens[2][i][key]
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
    } else {
      let data = dataCalendar()
      return {
        ...data,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : null,
      }
    }
  }

  return makeDataLevel()
}
