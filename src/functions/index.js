export function isEmptyNullOrUndefined(param) {
  if (param === undefined) {
    return true
  }
  if (param === null) {
    return true
  }
  if (isString(param)) {
    return param.replace(/\s+/g, '') === ''
  }
  return false
}

export function isString(param) {
  return Object.prototype.toString.call(param) === '[object String]'
}
export function isObjectEmpty(object) {
  var isEmpty = true
  // eslint-disable-next-line no-unused-vars
  for (var keys in object) {
    isEmpty = false
    break // exiting since we found that the object is not empty
  }
  return isEmpty
}

export function dateToString(date) {
  // return date.toISOString().split('T')[0]
  let month =
    (new Date(date).getMonth() + 1).toString().length < 2
      ? '0' + (new Date(date).getMonth() + 1)
      : new Date(date).getMonth() + 1

  let day =
    new Date(date).getDate().toString().length < 2
      ? '0' + new Date(date).getDate()
      : new Date(date).getDate()
  return new Date(date).getFullYear() + '-' + month + '-' + day
}

export function formatDate(value) {
  // let date = new Date(value)
  // const day = date.toString('default', { day: '2-digit' })
  // const month = date.toString('default', { month: 'short' })
  // const year = date.toString('default', { year: 'numeric' })
  // return day + '-' + month + '-' + year
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  var date = new Date(value)
  date = date.getDate() + '-' + monthNames[date.getMonth()] + '-' + date.getFullYear()
  return date
}

export function diffDate(date1, date2, interval) {
  var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7
  date1 = new Date(date1)
  date2 = new Date(date2)
  var timediff = date2 - date1
  if (isNaN(timediff)) return NaN
  switch (interval) {
    case 'years':
      return date2.getFullYear() - date1.getFullYear()
    case 'months':
      return (
        date2.getFullYear() * 12 + date2.getMonth() - (date1.getFullYear() * 12 + date1.getMonth())
      )
    case 'weeks':
      return Math.floor(timediff / week)
    case 'days':
      return Math.floor(timediff / day)
    case 'hours':
      return Math.floor(timediff / hour)
    case 'minutes':
      return Math.floor(timediff / minute)
    case 'seconds':
      return Math.floor(timediff / second)
    default:
      return undefined
  }
}

export function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(',')
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

export function merge(...arrays) {
  const merged = {}

  arrays.forEach((data) => data.forEach((o) => Object.assign((merged[o.periodId] ??= {}), o)))

  return Object.values(merged)
}
export const returnFlattenObject = (arr) => {
  const flatObject = {}
  for (let i = 0; i < arr.length; i++) {
    for (const property in arr[i]) {
      flatObject[`${property}_${i}`] = arr[i][property]
    }
  }
  return flatObject
}
