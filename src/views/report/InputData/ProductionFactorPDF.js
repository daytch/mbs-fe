/* eslint-disable react/prop-types */
import React from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header, divider } from './Styles'
import { isEmptyNullOrUndefined } from './../../../functions'

const stylez = StyleSheet.create({
  tableHeader: { fontSize: 10, fontFamily: 'Sans', fontWeight: 'bold' },
  tableContent: { fontSize: 10, fontFamily: 'Sans' },
})
// Create Document Component
const ProductionFactorPDF = (props) => {
  const { productionFactors, project, projectRepresentation, showHeader, showFooter } = props

  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View style={{ flexDirection: 'column', width: 25 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1, width: 175 }}>
        <Text style={stylez.tableHeader}>Product Factor Name</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={stylez.tableHeader}>Units</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={stylez.tableHeader}>Period Name</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={stylez.tableHeader}>Value</Text>
      </View>
    </View>
  )

  const renderPeriod = (periods, tipe) => {
    if (tipe === 'name') {
      return periods
        .filter((x) => !isEmptyNullOrUndefined(x.productFactorValue))
        .map((i, idx) => {
          let period = projectRepresentation.periods.filter((x) => x.periodId === i.periodId)
          let name = period.length > 0 ? period[0].periodName : ''
          return (
            <Text style={stylez.tableContent} key={idx}>
              {name}
            </Text>
          )
        })
    } else {
      return periods.map((i, idx) => {
        return (
          <Text style={stylez.tableContent} key={idx}>
            {i.productFactorValue}
          </Text>
        )
      })
    }
  }

  const FourColumnLayout = ({ no, name, unit, periods }) => (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, padding: 3 }}
    >
      <View style={{ flexDirection: 'column', width: 25 }}>
        <Text style={stylez.tableContent}>{no}.</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1, width: 175 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1, width: 50 }}>
        <Text style={stylez.tableContent}>{unit}</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        {periods.length > 0 ? renderPeriod(periods, 'name') : ''}
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        {periods.length > 0 ? renderPeriod(periods, 'value') : ''}
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

        {showHeader && Header('Production Factors')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {productionFactors.map((item, idx) => {
            return (
              <FourColumnLayout
                key={idx}
                no={idx + 1}
                name={item.productName}
                unit={item.units}
                periods={item.productFactorValueDtos}
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

ProductionFactorPDF.propTypes = {
  productionFactors: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default ProductionFactorPDF
