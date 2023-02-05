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

const ConstantsPDF = (props) => {
  const { constants, project, projectRepresentation, showHeader, showFooter } = props

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
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ margin: '0 5 0 15', width: 230 }}>
        <Text style={stylez.tableHeader}>Constant Name</Text>
      </View>

      <View style={{ margin: '0 5 0 155', width: 40 }}>
        <Text style={stylez.tableHeader}>Units </Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableHeader}>Value</Text>
      </View>
    </View>
  )

  const FourColumnLayout = ({ no, name, units, constantValue }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}.</Text>
      </View>

      <View style={{ margin: '0 5 0 15', width: 230 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ margin: '0 5 0 155', width: 40 }}>
        <Text style={stylez.tableContent}>{units}</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableContent}>{constantValue}</Text>
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

        {showHeader && Header('Constants')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {constants.map((item, idx) => {
            return (
              <FourColumnLayout
                key={idx}
                no={idx + 1}
                name={item.constantName}
                units={item.units}
                constantValue={item.constantValue}
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

ConstantsPDF.propTypes = {
  constants: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default ConstantsPDF
