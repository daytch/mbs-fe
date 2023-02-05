import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header } from './Styles'
// import { isEmptyNullOrUndefined } from '../../../functions/index'

// Create Document Component
const EquipmentRequiredByCostCentre = (props) => {
  const {
    dtEquipmentRequiredByCostCentre,
    groupDtEquipmentRequiredByCostCentre,
    // fleets,
    // costCentres,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
  } = props
  // console.log('fleets: ', fleets)
  // console.log('costCentres: ', costCentres)
  // console.log('groupDtEquipmentRequiredByCostCentre: ', groupDtEquipmentRequiredByCostCentre)
  // const groupCostCentre =
  const listPeriodName =
    dtEquipmentRequiredByCostCentre.length < 1
      ? []
      : projectRepresentation.periods
          .map((x) =>
            dtEquipmentRequiredByCostCentre[0].periods.map((z) => z.periodId).indexOf(x.periodId) >
            -1
              ? x.periodName
              : '',
          )
          .filter((e) => String(e).trim())

  const HeaderTable = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          borderBottom: '1px groovy gray',
          borderLeft: '1px groovy gray',
          borderTop: '1px groovy gray',
          textAlign: 'center',
          width: '25vw',
        }}
      >
        <Text>Cost Centre </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          borderBottom: '1px groovy gray',
          borderLeft: '1px groovy gray',
          borderRight: '1px groovy gray',
          borderTop: '1px groovy gray',
          textAlign: 'center',
          width: '75vw',
        }}
      >
        <Text>Period</Text>
      </View>
    </View>
  )
  const HeaderTable1 = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 14,
        paddind: 3,
      }}
    >
      <View
        style={{
          borderBottom: '1px groovy gray',
          borderLeft: '1px groovy gray',
          textAlign: 'center',
          width: '9vw',
        }}
      >
        <Text>Code </Text>
      </View>

      <View
        style={{
          borderBottom: '1px groovy gray',
          borderLeft: '1px groovy gray',
          textAlign: 'center',
          width: '16vw',
        }}
      >
        <Text>Description</Text>
      </View>

      {listPeriodName.map((x, idx) => (
        <View
          key={idx}
          style={
            idx === listPeriodName.length - 1
              ? {
                  borderBottom: '1px groovy gray',
                  borderLeft: '1px groovy gray',
                  borderRight: '1px groovy gray',
                  width: 75 / listPeriodName.length + 'vw',
                  textAlign: 'center',
                }
              : {
                  borderBottom: '1px groovy gray',
                  borderLeft: '1px groovy gray',
                  width: 75 / listPeriodName.length + 'vw',
                  textAlign: 'center',
                }
          }
        >
          <Text>{x}</Text>
        </View>
      ))}
    </View>
  )

  function getContentData(item) {
    return dtEquipmentRequiredByCostCentre.filter((x) => x.costCentreCode === item.costCentreCode)
  }

  const ContentTable = ({ item }) => {
    // console.log('item.costCentreCode', item.costCentreCode)
    const dtContent = getContentData(item)
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 12,
            padding: 3,
            marginLeft: 15,
          }}
        >
          <View style={{ width: '9vw' }}>
            <Text style={{ textAlign: 'left' }}>{item.costCentreCode}</Text>
          </View>

          <View style={{ width: '16vw' }}>
            <Text style={{ textAlign: 'left' }}>{item.costCentreName}</Text>
          </View>
          <View style={{ width: '75vw' }}>
            {/* <Text style={{ textAlign: 'left' }}>{item.costCentreName}</Text> */}
          </View>
        </View>
        {dtContent.length > 0 && dtContent.map((x, idx) => <SubContent key={idx} period={x} />)}
      </>
    )
  }
  ContentTable.propTypes = {
    item: PropTypes.shape({
      costCentreCode: PropTypes.string,
      costCentreName: PropTypes.string,
    }),
  }

  const SubContent = ({ period }) => (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, padding: 3 }}
    >
      <View style={{ width: '9vw' }}>
        {/* <Text style={{ textAlign: 'left' }}>{period.fleetName}</Text> */}
      </View>
      <View style={{ width: '16vw' }}>
        <Text style={{ textAlign: 'left' }}>{period.fleetName}</Text>
      </View>
      {period.periods.map((x, idx) => (
        <View key={idx} style={{ width: 75 / period.periods.length + 'vw' }}>
          <Text style={{ textAlign: 'right' }}>{x.value}</Text>
        </View>
      ))}
    </View>
  )
  SubContent.propTypes = {
    period: PropTypes.shape({ fleetName: PropTypes.string, periods: PropTypes.array }),
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

        {showHeader && Header('Equipment Required By Cost Centre')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable />
          <HeaderTable1 />
          {groupDtEquipmentRequiredByCostCentre.map((item, idx) => (
            <ContentTable key={idx} item={item} />
          ))}
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

EquipmentRequiredByCostCentre.propTypes = {
  dtEquipmentRequiredByCostCentre: PropTypes.array,
  groupDtEquipmentRequiredByCostCentre: PropTypes.array,
  fleets: PropTypes.array,
  costCentres: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default EquipmentRequiredByCostCentre
