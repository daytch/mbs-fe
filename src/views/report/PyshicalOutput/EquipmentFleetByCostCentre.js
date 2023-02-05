import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header } from './Styles'
import { calculateLastCol, renderLastCol } from './GeneralFunction'

// Create Document Component
const EquipmentFleetByCostCentre = (props) => {
  const {
    dtEquipmentFleetByCostCentre,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
    lastColumn,
    decimalPoint,
  } = props

  const listPeriods = dtEquipmentFleetByCostCentre[0]?.rptEquipmentSchedulePeriodDtos?.map((x) => {
    return { periodId: x.periodId, positionN: x.positionN, periodName: x.periodName }
  })
  const listParent = []
  dtEquipmentFleetByCostCentre.forEach((item, idx) => {
    let i = listParent.filter((x) => x.costCentreCode === item.costCentreCode)
    if (i.length < 1) {
      listParent.push({ costCentreCode: item.costCentreCode, costCentreName: item.costCentreName })
    }
  })

  const HeaderTable = ({ col }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View style={{ flexDirection: 'column', width: '35px', marginRight: '5px' }}>
        <Text>Code</Text>
      </View>

      <View style={{ flexDirection: 'column', width: '135px', marginRight: '5px' }}>
        <Text>Description</Text>
      </View>

      {listPeriods &&
        listPeriods.map((item, idx) => {
          return (
            <View key={idx} style={{ flexDirection: 'column', flex: 1 }}>
              <Text>{item.periodName}</Text>
            </View>
          )
        })}
      {listPeriods && renderLastCol[col]()}
    </View>
  )
  HeaderTable.propTypes = {
    col: PropTypes.string,
  }
  function renderChild(data) {
    return (
      <>
        <View style={{ flexDirection: 'column', width: '135px', marginRight: '5px' }}>
          <Text>{data.fleetName}</Text>
        </View>
        {data.rptEquipmentSchedulePeriodDtos &&
          data.rptEquipmentSchedulePeriodDtos.map((item, idx) => {
            return (
              <View
                key={idx}
                style={{ flexDirection: 'column', width: '50px', marginRight: '5px' }}
              >
                <Text style={{ textAlign: 'right' }}>
                  {item.value < 1
                    ? ''
                    : item.value.toString().indexOf('.') > -1
                    ? item.value.toFixed(decimalPoint)
                    : item.value}
                </Text>
              </View>
            )
          })}

        <View style={{ flexDirection: 'column', width: '50px', marginRight: '5px' }}>
          <Text style={{ textAlign: 'right' }}>
            {data.rptEquipmentSchedulePeriodDtos.reduce((x, i) => x + i.value, 0) > 0
              ? calculateLastCol[lastColumn](data.rptEquipmentSchedulePeriodDtos, decimalPoint)
              : ''}
          </Text>
        </View>
      </>
    )
  }
  // eslint-disable-next-line react/prop-types
  const BodyTable = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            fontSize: 12,
            padding: 3,
          }}
        >
          <View style={{ flexDirection: 'column', width: '35px', marginRight: '5px' }}>
            <Text style={{ fontWeight: 600 }}>{item.costCentreCode}</Text>
          </View>

          <View style={{ flexDirection: 'column', width: '135px', marginRight: '5px' }}>
            <Text style={{ fontWeight: 600 }}>{item.costCentreName}</Text>
          </View>
        </View>

        {dtEquipmentFleetByCostCentre.map((i, idx) => {
          if (i.costCentreCode === item.costCentreCode) {
            return (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  fontSize: 12,
                  padding: 3,
                  marginLeft: '40px',
                }}
              >
                {renderChild(i)}
              </View>
            )
          } else {
            return null
          }
        })}
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

        {showHeader && Header('Equipment Disposal Expired By Cost Centre')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable col={lastColumn} />
          {listParent.map((item, idx) => {
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

EquipmentFleetByCostCentre.propTypes = {
  dtEquipmentFleetByCostCentre: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  lastColumn: PropTypes.string,
  decimalPoint: PropTypes.number,
}

export default EquipmentFleetByCostCentre
