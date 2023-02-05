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

const EmployeeTypePDF = (props) => {
  const { employeetypes, currencies, project, projectRepresentation, showHeader, showFooter } =
    props
  // console.log('employeetypes: ', employeetypes)
  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddind: 3,
        fontFamily: 'Sans',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginRight: 10, width: 90 }}>
        <Text style={stylez.tableHeader}>Employee Type Name</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Cover Leave?</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Roster</Text>
      </View>

      <View style={{ width: 70 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Annual Cost</Text>
      </View>

      <View style={{ width: 80 }}>
        <Text style={stylez.tableHeader}>Annual Leave (days)</Text>
      </View>

      <View style={{ width: 80 }}>
        <Text style={stylez.tableHeader}>Annual Sickness Leave</Text>
      </View>

      <View style={{ width: 80 }}>
        <Text style={stylez.tableHeader}>Annual Other Leave</Text>
      </View>
    </View>
  )
  const NineColumnLayout = ({
    no,
    name,
    annualCost,
    annualLeave,
    otherLeave,
    rosterName,
    sicknessLeave,
    isCoverLeave,
    currency,
  }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ width: 90 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{isCoverLeave ? 'Yes' : 'No'}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{rosterName}</Text>
      </View>

      <View style={{ width: 50 }}>
        <Text style={stylez.tableContent}>{currency}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{annualCost}</Text>
      </View>

      <View style={{ width: 80 }}>
        <Text style={stylez.tableContent}>{annualLeave}</Text>
      </View>

      <View style={{ width: 80 }}>
        <Text style={stylez.tableContent}>{sicknessLeave}</Text>
      </View>

      <View style={{ width: 40 }}>
        <Text style={stylez.tableContent}>{otherLeave}</Text>
      </View>
    </View>
  )

  const getAbbr = (countryId) => {
    let c = currencies.filter((x) => x.countryId === countryId)
    return c[0]?.currencyAbbr
  }

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

        {showHeader && Header('Employee Types')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {employeetypes.map((item, idx) => {
            return (
              <NineColumnLayout
                key={idx}
                no={idx + 1}
                name={item.employeeTypeName}
                annualCost={item.listEmployeeTypeRostered[0].annualCost}
                annualLeave={item.listEmployeeTypeRostered[0].annualLeave}
                otherLeave={item.listEmployeeTypeRostered[0].otherLeave}
                rosterName={item.listEmployeeTypeRostered[0].rosterName}
                sicknessLeave={item.listEmployeeTypeRostered[0].sicknessLeave}
                isCoverLeave={item.listEmployeeTypeRostered[0].coverLeave}
                currency={getAbbr(item.listEmployeeTypeRostered[0].countryId)}
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

EmployeeTypePDF.propTypes = {
  employeetypes: PropTypes.array,
  currencies: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default EmployeeTypePDF
