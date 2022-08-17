const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const dataMaterials = () => {
  return {
    materials: '',
    units: '',
    currency: '',
    cost: '',
    resourceType: '',
    levyCategory: '',
    costIndex: '',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d, i) => {
      let data = dataMaterials()
      
      // let total = localStorage.getItem('totalArrayPeriod')
      if (lens[1].length > 0) {
        if (lens[1][i]) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              //

              let valData = lens[1][i]
              for (var item in valData) {
                let idx = item.split('_')[1]
                if (valData[item] === key) {
                  data[key] =
                    valData['costIndexValue_' + idx] + '~' + valData['costIndexValueId_' + idx]
                } else if (key === 'indexname') {
                  data['indexname'] =
                    valData['costIndexName_' + idx] +
                    '~' +
                    valData['costIndexId_' + idx] +
                    '~' +
                    valData['periodId_' + idx]
                }
              }

              // if (key === 'indexname') {
              //   console.log('costIndexId :', lens[1][i].costIndexId)
              //   data['indexname'] = lens[1][i].costIndexId
              //     ? lens[1][i].indexname + '~' + lens[1][i].costIndexId
              //     : lens[1][i].indexname
              // } else if (lens[1][i].periodId.indexOf('~') > -1) {
              //   data[key] = lens[1][i][key] + '~' + lens[1][i].periodId.split('~')[1]
              // } else {
              //   data[key] = lens[1][i][key]
              // }
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
