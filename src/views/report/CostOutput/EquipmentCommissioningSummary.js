import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header } from './Styles'
import { calculateLastCol, renderLastCol } from '../PyshicalOutput/GeneralFunction'

// Create Document Component
const EquipmentCommissioningSummary = (props) => {
  const {
    dtEquipmentCommissioningSummary,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
    lastColumn,
    decimalPoint,
  } = props

  const arrPeriodValues = dtEquipmentCommissioningSummary?.map((x) => {
    return x.rptEquipmentCostSummaryPeriodDtos?.reduce((data, x) => {
      data[x.periodName] = x.value
      return data
    }, {})
  })

  const listPeriods = dtEquipmentCommissioningSummary[0]?.rptEquipmentCostSummaryPeriodDtos?.map(
    (x) => {
      return { value: x.value, periodName: x.periodName }
    },
  )

  const HeaderTable = ({ col }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 12,
        paddind: 3,
      }}
    >
      <View style={{ flexDirection: 'column', width: '115px', marginRight: '5px' }}>
        <Text style={{ fontWeight: 800 }}>Fleet Name</Text>
      </View>

      {listPeriods &&
        listPeriods.map((item, idx) => {
          return (
            <View key={idx} style={{ flexDirection: 'column', flex: 1, marginRight: '5px' }}>
              <Text style={{ fontWeight: 800 }}>{item.periodName}</Text>
            </View>
          )
        })}
      {listPeriods && renderLastCol[col]()}
    </View>
  )
  HeaderTable.propTypes = {
    col: PropTypes.string,
  }

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
          <View style={{ flexDirection: 'row', width: '115px', marginRight: '5px' }}>
            <Text>{item.groupName}</Text>
          </View>

          {item.rptEquipmentCostSummaryPeriodDtos.map((i, idx) => (
            <View key={idx} style={{ flexDirection: 'row', flex: 1 }}>
              <Text>{i.value && i.value > 0 ? i.value : ''}</Text>
            </View>
          ))}

          <View style={{ flexDirection: 'column' }}>
            <Text>
              {item?.rptEquipmentCostSummaryPeriodDtos?.length > 0
                ? calculateLastCol[lastColumn](item.rptEquipmentCostSummaryPeriodDtos, decimalPoint)
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
  const GrandTotal = () => {
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
          <View style={{ flexDirection: 'row', width: '115px', marginRight: '5px' }}>
            <Text style={{ fontFamily: 'bold font' }}>GRAND TOTAL</Text>
          </View>

          {listPeriods.map((i, idx) => {
            const sum = arrPeriodValues.reduce((accumulator, object) => {
              return accumulator + object[i.periodName]
            }, 0)
            return (
              <View key={idx} style={{ flexDirection: 'row', flex: 1 }}>
                <Text>{sum && sum > 0 ? sum : ''}</Text>
              </View>
            )
          })}
          {/* 
          <View style={{ flexDirection: 'column' }}>
            <Text>
              {item?.rptEquipmentCostSummaryPeriodDtos?.length > 0
                ? calculateLastCol[lastColumn](item.rptEquipmentCostSummaryPeriodDtos, decimalPoint)
                : ''}
            </Text>
          </View> */}
        </View>
      </>
    )
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

        {showHeader && Header('Equipment Disposal Expired Summary')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable col={lastColumn} />
          {dtEquipmentCommissioningSummary.map((item, idx) => {
            return <BodyTable key={idx} item={item} />
          })}
          <GrandTotal />
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

EquipmentCommissioningSummary.propTypes = {
  dtEquipmentCommissioningSummary: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  lastColumn: PropTypes.string,
  decimalPoint: PropTypes.number,
}

export default EquipmentCommissioningSummary
