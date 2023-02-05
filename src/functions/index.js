import { useEffect, useRef, useState } from 'react'

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

export const getExclamationMark = (total) => {
  let tndaPentung = ''
  for (let index = 0; index < total; index++) {
    tndaPentung = tndaPentung + '!'
  }
  return tndaPentung
}
export const useEffectOnce = (effect) => {
  const destroyFunc = useRef()
  const effectCalled = useRef(false)
  const renderAfterCalled = useRef(false)
  const [val, setVal] = useState(0)

  if (effectCalled.current) {
    renderAfterCalled.current = true
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect()
      effectCalled.current = true
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1)
    console.log(val)
    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return
      }
      if (destroyFunc.current) {
        destroyFunc.current()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function formatNumber(angka, prefix) {
  return generalNumberConverter(angka, prefix, '')
}
export function formatRupiah(angka, prefix) {
  return generalNumberConverter(angka, prefix, 'rupiah')
}
export function convertDate(tgl) {
  const today = new Date(tgl)
  const yyyy = today.getFullYear()
  let mm = today.getMonth() + 1 // Months start at 0!
  let dd = today.getDate()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  return dd + '/' + mm + '/' + yyyy
}
export const generalNumberConverter = (angka, prefix, tipe) => {
  if (angka) {
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
    if (tipe === 'rupiah') {
      return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : ''
    } else {
      return prefix === undefined ? rupiah : rupiah ? rupiah : ''
    }
  } else {
    return ''
  }
}

/**
 * Normalisasi nomor HP lokal
 * @param {string} phone
 * @return {string}
 */
export function normalisasiNomorHP(phone) {
  phone = String(phone).trim()
  if (phone.startsWith('+62')) {
    phone = '0' + phone.slice(3)
  } else if (phone.startsWith('62')) {
    phone = '0' + phone.slice(2)
  }
  return phone.replace(/[- .]/g, '')
}

/**
 * Tes nomor HP lokal
 * @param {string} phone
 * @return {boolean}
 */
export function tesNomorHP(phone) {
  if (!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)) {
    return false
  }
  return true
}

/**
 * Deteksi operator seluler indonesia
 * @param {string} phone
 * @return {string?}
 */
export function deteksiOperatorSeluler(phone) {
  const prefix = phone.slice(0, 4)
  if (['0831', '0832', '0833', '0838'].includes(prefix)) return 'axis'
  if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) return 'three'
  if (['0817', '0818', '0819', '0859', '0878', '0877'].includes(prefix)) return 'xl'
  if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) return 'indosat'
  if (
    ['0812', '0813', '0852', '0853', '0821', '0823', '0822', '0851', '0811', '0854'].includes(
      prefix,
    )
  )
    return 'telkomsel'
  if (['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'].includes(prefix))
    return 'smartfren'
  return null
}

/**
 * Apakah nomor HP ini valid?
 * @param {string} phone
 * @return {boolean}
 */
export function validasiNomorSeluler(phone) {
  phone = normalisasiNomorHP(phone)
  return tesNomorHP(phone) && !!deteksiOperatorSeluler(phone)
}
export function validateEmail(mail) {
  return mail.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
export const twoDigits = (num) => String(num).padStart(2, '0')

export function useQuery() {
  return new URLSearchParams(window.location.search)
}

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}
