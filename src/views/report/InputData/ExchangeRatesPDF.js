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
const ExchangeRatesPDF = (props) => {
  const {
    exchangeRates,
    listEchangeCountries,
    currencies,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
  } = props
  console.log('listEchangeCountries:', listEchangeCountries)
  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View style={{ marginLeft: 5, width: 20 }}>
        <Text style={stylez.tableHeader}>No</Text>
      </View>

      <View style={{ marginLeft: 10, width: 150 }}>
        <Text style={stylez.tableHeader}>Full Currency Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 80 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ marginLeft: 10, width: 70 }}>
        <Text style={stylez.tableHeader}>Period Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 90 }}>
        <Text style={stylez.tableHeader}>Exchange Rate</Text>
      </View>
    </View>
  )

  const renderPeriod = (periods, tipe) => {
    if (tipe === 'name') {
      return periods.map((i, idx) => {
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
            {i.exchRate}
          </Text>
        )
      })
    }
  }

  const getDataExchanges = (countryId) => {
    return exchangeRates.filter((x) => x.countryId === countryId)
  }

  const FourColumnLayout = ({ no, name, abbr, countryId }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'start', fontSize: 12, padding: 3 }}>
      <View style={{ marginLeft: 5, width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 150 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 80 }}>
        <Text style={stylez.tableContent}>{abbr}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 70 }}>
        {getDataExchanges(countryId)?.length > 0
          ? renderPeriod(getDataExchanges(countryId), 'name')
          : ''}
      </View>

      <View style={{ marginLeft: 10, width: 90 }}>
        {getDataExchanges(countryId)?.length > 0
          ? renderPeriod(getDataExchanges(countryId), 'value')
          : ''}
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

        {showHeader && Header('Exchange Rates Schedules')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          {divider()}
          {listEchangeCountries.map((item, idx) => {
            let current = currencies.filter((x) => x.countryId === item)
            if (current?.length > 0) {
              return (
                <FourColumnLayout
                  key={idx}
                  no={idx + 1}
                  name={current[0].currencyName}
                  abbr={current[0].currencyAbbr}
                  countryId={item}
                />
              )
            } else {
              return null
            }
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

ExchangeRatesPDF.propTypes = {
  exchangeRates: PropTypes.array,
  listEchangeCountries: PropTypes.array,
  currencies: PropTypes.array,
  personnelFunctions: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default ExchangeRatesPDF
