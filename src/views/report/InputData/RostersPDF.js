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

const RostersPDF = (props) => {
  const { rosters, project, projectRepresentation, showHeader, showFooter } = props

  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ margin: '0 5 0 15', width: 130 }}>
        <Text style={stylez.tableHeader}>Roster Name</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableHeader}>Hours per Shift </Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableHeader}>Shifts per Day</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 80 }}>
        <Text style={stylez.tableHeader}>Employee Relative Time On</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 80 }}>
        <Text style={stylez.tableHeader}>Employee Relative Time Off</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 80 }}>
        <Text style={stylez.tableHeader}>Relative Production Time</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 80 }}>
        <Text style={stylez.tableHeader}>Relative Non Production Time</Text>
      </View>

      <View style={{ margin: '0 5 0 5', width: 40 }}>
        <Text style={stylez.tableHeader}>Notes</Text>
      </View>
    </View>
  )

  const NineColumnLayout = ({
    no,
    name,
    hoursPerShift,
    numShiftsPerDay,
    timeOn,
    timeOff,
    relProdTime,
    relNonProdTime,
    notes,
  }) => (
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

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 120, width: 25 }}>
        <Text style={stylez.tableContent}>{hoursPerShift}</Text>
      </View>

      <View style={{ marginLeft: 30, width: 90 }}>
        <Text style={stylez.tableContent}>{numShiftsPerDay}</Text>
      </View>

      <View style={{ marginLeft: 20, width: 70 }}>
        <Text style={stylez.tableContent}>{timeOn}</Text>
      </View>

      <View style={{ marginLeft: 20, width: 70 }}>
        <Text style={stylez.tableContent}>{timeOff}</Text>
      </View>

      <View style={{ marginLeft: 20, width: 70 }}>
        <Text style={stylez.tableContent}>{relProdTime}</Text>
      </View>

      <View style={{ marginLeft: 20, width: 70 }}>
        <Text style={stylez.tableContent}>{relNonProdTime}</Text>
      </View>

      <View style={{ marginLeft: 20, width: 70 }}>
        <Text style={stylez.tableContent}>{notes}</Text>
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

        {showHeader && Header('Rosters')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {rosters.map((item, idx) => {
            return (
              <NineColumnLayout
                key={idx}
                no={idx + 1}
                name={item.rosterName}
                hoursPerShift={item.hoursPerShift}
                numShiftsPerDay={item.numShiftsPerDay}
                timeOn={item.timeOn}
                timeOff={item.timeOff}
                relProdTime={item.relProdTime}
                relNonProdTime={item.relNonProdTime}
                notes={item.notes}
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

RostersPDF.propTypes = {
  rosters: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default RostersPDF
