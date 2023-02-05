import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },

  project: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    fontSize: 12,
    fontFamily: 'Sans',
    fontWeight: 'bold',
  },
  labelProject: { width: 155 },
  projectName: {
    fontSize: 12,
    fontFamily: 'Sans',
    fontWeight: 'bold',
  },
  projRep: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    fontSize: 12,
    fontFamily: 'Sans',
    fontWeight: 'bold',
  },
  labelProjRep: { width: 155 },
  projRepName: {
    fontSize: 12,
    fontFamily: 'Sans',
    fontWeight: 'bold',
  },

  tanggal: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 20,
    right: 0,
    padding: 3,
    borderTop: '1 solid #808080',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 20,
    textAlign: 'right',
    borderTop: '1 solid #808080',
    padding: 3,
  },
  title: {
    textAlign: 'center',
    marginTop: 25,
    fontFamily: 'Sans',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export const divider = (margin) => {
  return margin ? (
    <View style={{ flex: 1, borderTop: '1 solid #0000', margin: margin }}></View>
  ) : (
    <View style={{ flex: 1, borderTop: '2 solid #0000', marginTop: 3 }}></View>
  )
}

export const Header = (title) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    {/* {divider()} */}
  </View>
)
