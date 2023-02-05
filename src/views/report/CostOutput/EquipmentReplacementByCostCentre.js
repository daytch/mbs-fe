import React from 'react'
import { Page, View, Text, Document } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header } from './Styles'
import { calculateLastCol, renderLastCol } from '../PyshicalOutput/GeneralFunction'

// Create Document Component
const EquipmentReplacementByCostCentre = (props) => {
  const {
    dtEquipmentReplacementByCostCentre,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
    lastColumn,
    decimalPoint,
  } = props

  let lastCol = []
  const listPeriods = dtEquipmentReplacementByCostCentre[0].rptEquipmentSchedulePeriodDtos.map(
    (x) => {
      return { periodId: x.periodId, positionN: x.positionN, periodName: x.periodName }
    },
  )
  const listParent = []
  dtEquipmentReplacementByCostCentre.forEach((item, idx) => {
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
  const getLastColValue = (data) => {
    let val =
      data.rptEquipmentSchedulePeriodDtos.reduce((x, i) => x + i.value, 0) > 0
        ? calculateLastCol[lastColumn](data.rptEquipmentSchedulePeriodDtos, decimalPoint)
        : ''
    lastCol.push({ costCentreCode: data.costCentreCode, value: val })

    return val && val.toString().indexOf('.') > -1 ? parseFloat(val).toFixed(decimalPoint) : val
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
              <View key={idx} style={{ flexDirection: 'column', width: '50px' }}>
                <Text style={{ textAlign: 'right' }}>
                  {item.value < 1
                    ? ''
                    : item.value.toString().indexOf('.') > -1
                    ? parseFloat(item.value).toFixed(decimalPoint)
                    : item.value}
                </Text>
              </View>
            )
          })}

        <View style={{ width: '50px' }}>
          <Text style={{ textAlign: 'right' }}>{getLastColValue(data)}</Text>
        </View>
      </>
    )
  }
  // eslint-disable-next-line react/prop-types
  const getValuePeriod = ({ costCentreCode, periodName }) => {
    if (costCentreCode) {
      const arrFiltered = dtEquipmentReplacementByCostCentre.filter(
        (x) => x.costCentreCode === costCentreCode,
      )
      if (arrFiltered.length > 0) {
        const a = arrFiltered.reduce((a, b) => {
          return (
            a +
            b.rptEquipmentSchedulePeriodDtos
              .filter((x) => x.periodName === periodName)
              .reduce((q, w) => q + w.value, 0)
          )
        }, 0)

        return a < 1 ? '' : a.toString().indexOf('.') > -1 ? parseFloat(a).toFixed(decimalPoint) : a
      } else {
        return 0
      }
    } else {
      if (dtEquipmentReplacementByCostCentre.length > 0) {
        const a = dtEquipmentReplacementByCostCentre.reduce((a, b) => {
          return (
            a +
            b.rptEquipmentSchedulePeriodDtos
              .filter((x) => x.periodName === periodName)
              .reduce((q, w) => q + w.value, 0)
          )
        }, 0)

        return a < 1 ? '' : a.toString().indexOf('.') > -1 ? parseFloat(a).toFixed(decimalPoint) : a
      } else {
        return 0
      }
    }
  }
  // eslint-disable-next-line react/prop-types
  const BodyTable = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
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

        {dtEquipmentReplacementByCostCentre.map((i, idx) => {
          if (i.costCentreCode === item.costCentreCode) {
            return (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
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

        <View
          style={{
            flexDirection: 'row',
            fontSize: 12,
            padding: 3,
            marginLeft: '35px',
            border: 1,
          }}
        >
          <View style={{ flexDirection: 'column', width: '135px' }}>
            <Text
              style={{
                textAlign: 'right',
                paddingRight: '25px',
                fontWeight: 'bold',
                fontFamily: 'Sans',
                fontSize: 12,
              }}
            >
              SUB TOTAL :
            </Text>
          </View>

          {listPeriods &&
            listPeriods.map((x, idx) => {
              return (
                <View
                  key={idx}
                  style={{ textAlign: 'right', flexDirection: 'column', width: '50px' }}
                >
                  <Text>
                    {getValuePeriod({
                      costCentreCode: item.costCentreCode,
                      periodName: x.periodName,
                    })}
                  </Text>
                </View>
              )
            })}

          <View style={{ textAlign: 'right', flexDirection: 'column', width: '50px' }}>
            <Text>{getSubtotalLastCol(item.costCentreCode)}</Text>
          </View>
        </View>
      </>
    )
  }
  BodyTable.propTypes = {
    item: PropTypes.any,
  }

  const RenderGrandTotal = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          fontSize: 12,
          padding: 3,
          marginLeft: '35px',
          border: 1,
        }}
      >
        <View style={{ flexDirection: 'column', width: '135px' }}>
          <Text
            style={{
              textAlign: 'right',
              paddingRight: '25px',
              fontWeight: 'bold',
              fontFamily: 'Sans',
              fontSize: 12,
            }}
          >
            GRAND TOTAL :
          </Text>
        </View>

        {listPeriods &&
          listPeriods.map((x, idx) => {
            return (
              <View
                key={idx}
                style={{ textAlign: 'right', flexDirection: 'column', width: '50px' }}
              >
                <Text>
                  {getValuePeriod({
                    costCentreCode: '',
                    periodName: x.periodName,
                  })}
                </Text>
              </View>
            )
          })}

        <View style={{ textAlign: 'right', flexDirection: 'column', width: '50px' }}>
          <Text>{getSubtotalLastCol('')}</Text>
        </View>
      </View>
    )
  }

  const getSubtotalLastCol = (costCentreCode) => {
    if (costCentreCode) {
      const arrLS = lastCol.filter((x) => x.costCentreCode === costCentreCode)
      let result = arrLS.reduce((o, p) => o + Number(p.value), 0)
      return result.toString().indexOf('.') > -1 ? parseFloat(result).toFixed(decimalPoint) : result
    } else {
      let val = 0

      dtEquipmentReplacementByCostCentre.forEach((data) => {
        val += parseFloat(
          data.rptEquipmentSchedulePeriodDtos.reduce((x, i) => x + i.value, 0) > 0
            ? calculateLastCol[lastColumn](data.rptEquipmentSchedulePeriodDtos, decimalPoint)
            : '',
        )
      })

      return val.toString().indexOf('.') > -1 ? parseFloat(val).toFixed(decimalPoint) : val
    }
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

        {showHeader && Header('Equipment Replacement By Cost Centre')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <HeaderTable col={lastColumn} />
          {listParent.map((item, idx) => {
            return <BodyTable key={idx} item={item} />
          })}
          <hr />
          {RenderGrandTotal()}
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

EquipmentReplacementByCostCentre.propTypes = {
  dtEquipmentReplacementByCostCentre: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  lastColumn: PropTypes.string,
  decimalPoint: PropTypes.number,
}

export default EquipmentReplacementByCostCentre
