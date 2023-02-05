/* eslint-disable react/prop-types */
import React from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header, divider } from './Styles'

const stylez = StyleSheet.create({
  tableHeader: { fontSize: 10, fontFamily: 'Sans', fontWeight: 'bold' },
  tableContent: { fontSize: 10, fontFamily: 'Sans' },
})
// Create Document Component
const CostIndicesPDF = (props) => {
  const { costIndices, project, projectRepresentation, showHeader, showFooter } = props
  console.log('costIndices:', costIndices)
  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View style={{ marginLeft: 5, width: 20 }}>
        <Text style={stylez.tableHeader}>No</Text>
      </View>

      <View style={{ marginLeft: 10, width: 150 }}>
        <Text style={stylez.tableHeader}>Cost Index Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 70 }}>
        <Text style={stylez.tableHeader}>Period Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableHeader}>Annual Index Value</Text>
      </View>
    </View>
  )

  const renderPeriod = (periods) => {
    return periods.map((i, idx) => {
      let period = projectRepresentation.periods.filter((x) => x.periodId === i.periodId)
      let name = period.length > 0 ? period[0].periodName : ''
      return (
        <>
          <View style={{ marginLeft: 10, width: 70 }}>
            <Text style={stylez.tableContent}>{name}</Text>
          </View>

          <View style={{ marginLeft: 10, width: 90 }}>
            <Text style={stylez.tableContent}>{name ? i.costIndexValue : ''}</Text>
          </View>
        </>
      )
    })
  }

  const FourColumnLayout = ({ no, name, periods }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', fontSize: 12, padding: 3 }}>
      <View style={{ marginLeft: 5, width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 150 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 70 }}>
        {periods.length > 0 ? renderPeriod(periods, 'name') : ''}
      </View>

      <View style={{ marginLeft: 10, width: 90 }}>
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

        {showHeader && Header('Cost Indices Schedules')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {costIndices.map((item, idx) => {
            return (
              <FourColumnLayout
                key={idx}
                no={idx + 1}
                name={item.costIndexName}
                periods={item.costIndexValues}
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

CostIndicesPDF.propTypes = {
  costIndices: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default CostIndicesPDF
