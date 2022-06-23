const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const mainCost = () => {
  return {
    costComponentName: '',
    units: '',
    quantity: '',
    countryId: '',
    componentCost: '',
    levyCategoryId: '',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d, i) => {
      let data = mainCost()
      if (lens[2].length > 0) {
        if (lens[2][i]) {
          data = {
            rowId: i,
            infraStructureCostComponentId: lens[2][i].infraStructureCostComponentId,
            costComponentName: lens[2][i].costComponentName,
            units: lens[2][i].units,
            quantity: lens[2][i].quantity,
            countryId: lens[2][i].countryId,
            componentCost: lens[2][i].componentCost,
            levyCategoryId: lens[2][i].levyCategoryID,
          }
        }
      }
      return {
        ...data,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }
  return makeDataLevel()
}
