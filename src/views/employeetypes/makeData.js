const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const employeeType = () => {
  return {
    rosterId: '',
    paymentMethod: '',
    countryId: '',
    sicknessLeave: '',
    annualCost: '',
    annualLeave: '',
    otherLeave: '',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d, i) => {
      let data = employeeType()
      if (lens[2]?.length > 0) {
        if (lens[2][i]) {
          data = {
            rowId: i,
            employeeTypeRosteredId: lens[2][i].employeeTypeRosteredId,
            paymentMethod: lens[2][i].paymentMethod,
            rosterId: lens[2][i].rosterId,
            countryId: lens[2][i].countryId,
            annualCost: lens[2][i].annualCost,
            annualLeave: lens[2][i].annualLeave,
            sicknessLeave: lens[2][i].sicknessLeave,
            otherLeave: lens[2][i].otherLeave,
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
