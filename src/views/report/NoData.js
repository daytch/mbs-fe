/* eslint-disable react/prop-types */
import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import moment from 'moment'
import { styles } from './InputData/Styles'

// Create Document Component
const NoData = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <View
          style={{
            textAlign: 'center',
            marginTop: 25,
            fontFamily: 'Sans',
            fontSize: 18,
            fontWeight: 'bold',
            border: '2 dashed #0000',
            backgroundColor: 'yellow',
          }}
        >
          <Text>No Data</Text>
          {/* <View style={{ flex: 1, borderTop: '1 solid #0000', marginTop: 3 }}> */}
          <Text>Please Input data before you go to this page!</Text>
          {/* </View> */}
        </View>

        <Text style={styles.tanggal} render={() => moment().format('LLLL')} fixed />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}

export default NoData
