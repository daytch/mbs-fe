import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header } from './Styles'
import { calculateLastCol, renderLastCol } from './GeneralFunction'

// Create Document Component
const EmployeeTotalSummary = (props) => {
  const {
    dtEmployeeTotalSummary,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
    lastColumn,
    decimalPoint,
  } = props

  const listPeriods = dtEmployeeTotalSummary[0].rptEmployeeSchedulePeriodSummaryDtos.map((x) => {
    return { value: x.valu, periodName: x.periodName }
  })

  const HeaderTable = ({ col }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 12,
        paddind: 3,
      }}
    >
      <View style={{ flexDirection: 'column', width: '135px', marginRight: '5px' }}>
        <Text style={{ fontWeight: 800 }}>Employee Name</Text>
      </View>

      {listPeriods &&
        listPeriods.map((item, idx) => {
          return (
            <View key={idx} style={{ flexDirection: 'column', flex: 1, marginRight: '5px' }}>
              <Text style={{ fontWeight: 800, textAlign: 'center' }}>{item.periodName}</Text>
            </View>
          )
        })}
      {listPeriods && renderLastCol[col]()}
    </View>
  )
  HeaderTable.propTypes = {
    col: PropTypes.string,
  }

  // eslint-disable-next-line react/prop-types
  const BodyTable = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            fontSize: 10,
            justifyContent: 'space-around',
            padding: 3,
          }}
        >
          <View style={{ flexDirection: 'row', width: '135px', marginRight: '5px' }}>
            <Text>{item.groupName}</Text>
          </View>

          {item.rptEmployeeSchedulePeriodSummaryDtos.map((i, idx) => (
            <View key={idx} style={{ flexDirection: 'row', flex: 1, marginRight: '5px' }}>
              <Text style={{ textAlign: 'center' }}>{i.value && i.value > 0 ? i.value : ''}</Text>
            </View>
          ))}

          <View style={{ flexDirection: 'column', flex: 1, marginLeft: '5px' }}>
            <Text style={{ textAlign: 'right' }}>
              {item?.rptEmployeeSchedulePeriodSummaryDtos?.length > 0
                ? calculateLastCol[lastColumn](
                    item.rptEmployeeSchedulePeriodSummaryDtos,
                    decimalPoint,
                  )
                : ''}
            </Text>
          </View>
        </View>
      </>
    )
  }
  BodyTable.propTypes = {
    item: PropTypes.any,
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

        {showHeader && Header('Employee Total Summary')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable col={lastColumn} />
          {dtEmployeeTotalSummary.map((item, idx) => {
            return <BodyTable key={idx} item={item} />
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

EmployeeTotalSummary.propTypes = {
  dtEmployeeTotalSummary: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  lastColumn: PropTypes.string,
  decimalPoint: PropTypes.number,
}

export default EmployeeTotalSummary
