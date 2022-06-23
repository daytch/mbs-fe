const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const dataCalendar = () => {
  return []
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]

    return range(len).map((d, i) => {
      let data = dataCalendar()

      return {
        ...data,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : null,
      }
    })
  }

  return makeDataLevel()
}
