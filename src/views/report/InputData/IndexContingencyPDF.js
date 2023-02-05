import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header, divider } from './Styles'

// Create Document Component
const IndexContingencyPDF = (props) => {
  const { indexContingency, project, projectRepresentation, showHeader, showFooter } = props
  console.log('indexContingency :', indexContingency)
  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View style={{ flexDirection: 'column', flex: 1, width: 30 }}>
        <Text>Cost Type</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>Cost Index</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>Contingency Rate</Text>
      </View>
    </View>
  )
  // eslint-disable-next-line react/prop-types
  const FourColumnLayout = ({ name, cost, rate }) => (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, padding: 3 }}
    >
      <View style={{ flexDirection: 'column', flex: 1, width: 50 }}>
        <Text>{name}</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>{cost}</Text>
      </View>

      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text>{rate}</Text>
      </View>
    </View>
  )

  const loopOverObj = () => {
    let arrValue = []
    for (const key in indexContingency) {
      if (Object.hasOwnProperty.call(indexContingency, key) && key !== 'projectDescription') {
        let element = key
        element = element
          .replace(element[0], element[0].toUpperCase())
          .match(/[A-Z][a-z]+/g)
          .join(' ')
        arrValue.push({ name: element, value: indexContingency[key] })
      }
    }
    return arrValue.map((item, idx) => {
      return <FourColumnLayout key={idx} name={item.name} cost={item.value} rate={item.value} />
    })
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

        {showHeader && Header('Index and Contingency Allocation')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {
            /* {
          indexContingency.map((item, idx) => {
            return (
              <FourColumnLayout
                key={idx}
                no={idx + 1}
                name={item.countryName}
                fullname={item.currencyName}
                abbr={item.currencyAbbr}
              />
            )
          })} */
            loopOverObj()
          }
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

IndexContingencyPDF.propTypes = {
  indexContingency: PropTypes.object,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default IndexContingencyPDF
