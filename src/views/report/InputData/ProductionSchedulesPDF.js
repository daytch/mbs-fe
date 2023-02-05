/* eslint-disable react/prop-types */
import React from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, divider, Header } from './Styles'

const stylez = StyleSheet.create({
  tableHeader: { fontSize: 12, fontFamily: 'Sans', fontWeight: 'bold' },
  tableContent: { fontSize: 12, fontFamily: 'Sans' },
})

const ProductionSchedulesPDF = (props) => {
  const { productionschedules, project, projectRepresentation, showHeader, showFooter } = props

  const HeaderTable = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        padding: 3,
      }}
    >
      <View style={{ width: 10 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginLeft: 15, width: 130 }}>
        <Text style={stylez.tableHeader}>Production Name</Text>
      </View>

      <View style={{ marginLeft: 120, width: 25 }}>
        <Text style={stylez.tableHeader}>Units </Text>
      </View>

      <View style={{ marginLeft: 30, width: 90 }}>
        <Text style={stylez.tableHeader}>Period Name</Text>
      </View>

      <View style={{ marginLeft: 20, width: 70 }}>
        <Text style={stylez.tableHeader}>Quantity</Text>
      </View>
    </View>
  )

  const FiveColumnLayout = ({ no, name, units, detail }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 15 }}>
        <Text style={{ textAlign: 'left', fontSize: 12, fontFamily: 'Sans', fontWeight: 'bold' }}>
          {no}.
        </Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={{ fontSize: 12, fontFamily: 'Sans', fontWeight: 'bold' }}>{name}</Text>
      </View>

      <View style={{ marginLeft: 120, width: 25 }}>
        <Text style={{ fontSize: 12, fontFamily: 'Sans', fontWeight: 'bold' }}>{units}</Text>
      </View>

      <View style={{ marginLeft: 30, width: 90 }}>
        {detail?.map((x, i) => {
          return (
            <Text style={stylez.tableContent} key={i}>
              {x.periodId}
            </Text>
          )
        })}
      </View>

      <View style={{ marginLeft: 20, width: 70 }}>
        {detail?.map((x, i) => {
          return (
            <Text style={stylez.tableContent} key={i}>
              {x.productScheduleValueId}
            </Text>
          )
        })}
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

        {showHeader && Header('Production Schedules')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {productionschedules.map((item, idx) => {
            return (
              <FiveColumnLayout
                key={idx}
                no={idx + 1}
                name={item.productName}
                units={item.units}
                detail={item.productScheduleValueDtos}
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

ProductionSchedulesPDF.propTypes = {
  productionschedules: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default ProductionSchedulesPDF
