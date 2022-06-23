const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const dataCalendar = () => {
  return {
    periodName: '',
    days: '',
    periodStart: '',
    periodEnd: '',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]

    return range(len).map((d, i) => {
      let data = dataCalendar()

      if (lens[1].length > 0) {
        if (lens[1][i]) {
          data = {
            rowId: i,
            periodName: lens[1][i].periodName,
            days: lens[1][i].days,
            periodStart: lens[1][i].periodStart,
            periodEnd: lens[1][i].periodEnd,
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
