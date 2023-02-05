import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header } from './Styles'

// Create Document Component
const EmployeeExcludingReliefSummary = (props) => {
  const {
    dtEmployeeExcludingReliefSummary,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
  } = props

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
        <Text>No </Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1, width: 30 }}>
        <Text>Country Name</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>Full Currency Name</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>Currency Abbreviation</Text>
      </View>
    </View>
  )
  // eslint-disable-next-line react/prop-types
  const FourColumnLayout = ({ no, name, fullname, abbr }) => (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, padding: 3 }}
    >
      <View style={{ flexDirection: 'column', width: 25 }}>
        <Text style={{ textAlign: 'left' }}>{no}.</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1, width: 50 }}>
        <Text>{name}</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>{fullname}</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>{abbr}</Text>
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

        {showHeader && Header('Equipment Total Disposal Summary')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {dtEmployeeExcludingReliefSummary.map((item, idx) => {
            return (
              <FourColumnLayout
                key={idx}
                no={idx + 1}
                name={item.countryName}
                fullname={item.currencyName}
                abbr={item.currencyAbbr}
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

EmployeeExcludingReliefSummary.propTypes = {
  dtEmployeeExcludingReliefSummary: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default EmployeeExcludingReliefSummary
