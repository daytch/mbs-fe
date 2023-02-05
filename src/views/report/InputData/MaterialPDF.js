/* eslint-disable react/prop-types */
import React from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, divider, Header } from './Styles'

const stylez = StyleSheet.create({
  tableHeader: { fontSize: 10, fontFamily: 'Sans', fontWeight: 'bold' },
  tableContent: { fontSize: 10, fontFamily: 'Sans' },
})

const MaterialPDF = (props) => {
  const { materials, project, projectRepresentation, showHeader, showFooter } = props
  // console.log('materials: ', materials)
  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        fontFamily: 'Sans',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3,
      }}
    >
      {/* <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View> */}

      <View style={{ margin: '0 5 0 0', width: 130 }}>
        <Text style={stylez.tableHeader}>Material/Service Name</Text>
      </View>

      <View style={{ margin: '0 5 0 115', width: 40 }}>
        <Text style={stylez.tableHeader}>Units </Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 60 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableHeader}>Cost</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 90 }}>
        <Text style={stylez.tableHeader}>Levy Category</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableHeader}>Cost Index</Text>
      </View>
    </View>
  )

  const SixColumnLayout = ({ name, units, currency, cost, levy, indexname }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ margin: '0 5 0 0', width: 130 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ margin: '0 5 0 115', width: 40 }}>
        <Text style={stylez.tableContent}>{units}</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 60 }}>
        <Text style={stylez.tableContent}>{currency}</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableContent}>{cost}</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 90 }}>
        <Text style={stylez.tableContent}>{levy}</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableContent}>{indexname}</Text>
      </View>
    </View>
  )

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <View style={styles.project}>
            <Text style={styles.labelProject}>Project:</Text>
            <Text style={styles.projectName}>{project.projectName}</Text>
          </View>
          <View style={styles.projRep}>
            <Text style={styles.labelProjRep}>Project Representation:</Text>
            <Text style={styles.projRepName}>
              {projectRepresentation.projectRepresentationName}
            </Text>
          </View>
        </View>

        {showHeader && Header('Materials and Services')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {materials.map((item, idx) => {
            return (
              <SixColumnLayout
                key={idx}
                // no={idx + 1}
                name={item.resourceName}
                units={item.units}
                currency={item.currencyAbbr}
                cost={item.resourceCost}
                levy={item.levyCategoryName}
                indexname={item.costIndexName}
              />
            )
          })}
        </View>
        {showFooter && (
          <>
            <Text style={styles.tanggal} render={() => moment().format('LLLL')} fixed />
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
              fixed
            />
          </>
        )}
      </Page>
    </Document>
  )
}

MaterialPDF.propTypes = {
  materials: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default MaterialPDF
