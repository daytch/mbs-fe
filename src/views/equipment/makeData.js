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
  }
}

const spares = () => {
  return {
    sparePartName: '',
    units: '',
    quantity: '',
    countryId: '',
    sparePartCost: '',
  }
}

const materials = () => {
  return {
    fleetResourceId: '',
    fleetId: '',
    resourceId: '',
    quantityPerOh: '',
    quantityType: '',
  }
}

export default function makeData(...lens) {
  if (lens[1] === 'mainCost') {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth]
      return range(len).map((d, i) => {
        let data = mainCost()
        if (lens[2].length > 0) {
          if (lens[2][i]) {
            data = {
              rowId: i,
              equipmentModelCostComponentId: lens[2][i].equipmentModelCostComponentId,
              costComponentName: lens[2][i].costComponentName,
              units: lens[2][i].units,
              quantity: lens[2][i].quantity,
              countryId: lens[2][i].countryId,
              componentCost: lens[2][i].componentCost,
              levyCategoryId: lens[2][i].levyCategoryId,
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
  } else if (lens[1] === 'spares') {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth]
      return range(len).map((d, i) => {
        let data = spares()

        if (lens[2].length > 0) {
          if (lens[2][i]) {
            data = {
              rowId: i,
              equipmentModelSparepartId: lens[2][i].equipmentModelSparepartId,
              sparePartName: lens[2][i].sparePartName,
              units: lens[2][i].units,
              quantity: lens[2][i].quantity,
              countryId: lens[2][i].countryId,
              sparePartCost: lens[2][i].sparePartCost,
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
  } else if (lens[1] === 'material') {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth]
      return range(len).map((d, i) => {
        let data = materials()

        if (lens[2].length > 0) {
          if (lens[2][i]) {
            data = {
              rowId: i,
              fleetResourceId: lens[2][i].fleetResourceId,
              fleetId: lens[2][i].fleetId,
              resourceId: lens[2][i].resourceId,
              quantityPerOh: lens[2][i].quantityPerOh,
              quantityType: lens[2][i].quantityType,
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
}
