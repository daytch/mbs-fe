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
const LevyPDF = (props) => {
  const { levies, project, projectRepresentation, showHeader, showFooter } = props

  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginLeft: 10, width: 170 }}>
        <Text style={stylez.tableHeader}>Levy Category Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableHeader}>Notes</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableHeader}>Levy Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 100 }}>
        <Text style={stylez.tableHeader}>Levy Type</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableHeader}>Rate (%)</Text>
      </View>
    </View>
  )
  // eslint-disable-next-line react/prop-types
  const FourColumnLayout = ({ no, category, name, notes, tipe, rate }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', fontSize: 12, padding: 3 }}>
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}.</Text>
      </View>

      <View style={{ marginLeft: 10, width: 170 }}>
        <Text style={stylez.tableContent}>{category}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableContent}>{notes}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 100 }}>
        <Text style={stylez.tableContent}>{tipe}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableContent}>{rate}</Text>
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

        {showHeader && Header('Levies')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {levies.map((item, idx) => {
            return (
              <FourColumnLayout
                key={idx}
                no={idx + 1}
                category={item.levyCategoryName}
                notes={item.levyCategoryNotes}
                name={item.levyName}
                tipe={item.levyType}
                rate={item.levyRate}
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

LevyPDF.propTypes = {
  levies: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default LevyPDF
