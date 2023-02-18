import React from 'react'
import { View, Text } from '@react-pdf/renderer'

export const calculateLastCol = {
  min: (listPeriod, decimalPoint) => {
    let min = listPeriod.reduce((prev, curr) => (prev.value < curr.value ? prev : curr))
    return min.value < 1
      ? ''
      : min.value.toString().indexOf('.') > -1
      ? min.value.toFixed(decimalPoint)
      : min.value
  },
  max: (listPeriod, decimalPoint) => {
    let res = listPeriod.reduce((prev, curr) => (prev.value > curr.value ? prev : curr))
    return res.value < 1
      ? ''
      : res.value.toString().indexOf('.') > -1
      ? res.value.toFixed(decimalPoint)
      : res.value
  },
  avg: (listPeriod, decimalPoint) => {
    let r = listPeriod.reduce((a, b) => a + b.value, 0) / listPeriod.length
    return r < 1
      ? ''
      : r.value.toString().indexOf('.') > -1
      ? r.value.toFixed(decimalPoint)
      : r.value
  },
  total: (listPeriod, decimalPoint) => {
    let t = listPeriod.reduce((a, b) => a + b.value, 0)
    return t < 1 ? '' : t.value.toString().indexOf('.') > -1 ? t.toFixed(decimalPoint) : t.value
  },
}
export const renderLastCol = {
  max: () => (
    <View style={{ flexDirection: 'column', width: '35px', marginRight: '5px' }}>
      <Text>Max</Text>
    </View>
  ),
  min: () => (
    <View style={{ flexDirection: 'column', width: '35px', marginRight: '5px' }}>
      <Text>Min</Text>
    </View>
  ),
  avg: () => (
    <View style={{ flexDirection: 'column', width: '35px', marginRight: '5px' }}>
      <Text>Avg</Text>
    </View>
  ),
  total: () => (
    <View style={{ flexDirection: 'column', width: '35px', marginRight: '5px' }}>
      <Text>Total</Text>
    </View>
  ),
}
