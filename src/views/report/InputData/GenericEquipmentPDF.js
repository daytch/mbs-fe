import React from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, Header } from './Styles'

const stylez = StyleSheet.create({
  labelFirst: {
    width: 176,
    textAlign: 'right',
    fontFamily: 'Sans',
    fontWeight: 'bold',
    fontSize: 12,
  },
  valueFirst: { marginLeft: 10, fontFamily: 'Sans', fontWeight: 'bold', fontSize: 12 },
  label: { width: 176, textAlign: 'right', fontFamily: 'Sans', fontSize: 12 },
  value: { marginLeft: 10, fontFamily: 'Sans', fontSize: 12 },
  wrapper: { display: 'flex', flexDirection: 'row', marginLeft: 0, marginTop: 5 },
  wrapperColumn: {
    display: 'inline-block',
    justifyContent: 'start',
    flexDirection: 'row',
    marginTop: 5,
  },
  tableHeader: { fontSize: 12, fontFamily: 'Sans', fontWeight: 'bold' },
  tableContent: { fontSize: 12, fontFamily: 'Sans' },
})

// Create Document Component
const GenericEquipmentPDF = (props) => {
  const { listequipment, currencies, project, projectRepresentation, showHeader, showFooter } =
    props

  const getAbbr = (countryId) => {
    let c = currencies.filter((x) => x.countryId === countryId)
    return c[0]?.currencyAbbr
  }

  const HeaderTable = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        padding: 3,
      }}
    >
      <View style={{ width: 10 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginLeft: 15, width: 190 }}>
        <Text style={stylez.tableHeader}>Main Cost Component Name</Text>
      </View>

      <View style={{ marginLeft: 100, width: 30 }}>
        <Text style={stylez.tableHeader}>Unit</Text>
      </View>

      <View style={{ marginLeft: 20, width: 60 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ marginLeft: 15, width: 40 }}>
        <Text style={stylez.tableHeader}>Cost/Unit</Text>
      </View>
    </View>
  )
  // eslint-disable-next-line react/prop-types
  const FiveColumnLayout = ({ no, name, unit, currency, cost }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 15 }}>
        <Text style={{ textAlign: 'left' }}>{no}.</Text>
      </View>

      <View style={{ marginLeft: 15, width: 190 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 100, width: 30 }}>
        <Text style={stylez.tableContent}>{unit}</Text>
      </View>

      <View style={{ marginLeft: 20, width: 60 }}>
        <Text style={stylez.tableContent}>{currency}</Text>
      </View>

      <View style={{ marginLeft: 15, width: 40 }}>
        <Text style={stylez.tableContent}>{cost}</Text>
      </View>
    </View>
  )

  return (
    <Document>
      {listequipment.map((item, idx) => {
        return (
          <Page style={styles.body} key={idx}>
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

            {showHeader && Header('Generic Equipment')}

            <View style={{ flex: 1, marginTop: 15 }}>
              <View style={stylez.wrapper}>
                <Text style={stylez.labelFirst}>Equipment Model Name:</Text>
                <Text style={stylez.valueFirst}>{item.equipmentModelName}</Text>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Equipment Type:</Text>
                <Text style={stylez.value}>{item.equipmentTypeName}</Text>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Specifications:</Text>
                <Text style={stylez.value}>{item.specifications}</Text>
              </View>
              <View style={stylez.wrapperColumn}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ fontFamily: 'Sans', fontSize: 12 }}>
                    Maintenance Manhour Method:
                  </Text>
                  <Text style={{ fontFamily: 'Sans', fontSize: 12, marginLeft: 10 }}>
                    {item.mmm}
                  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>
                  <Text style={{ width: 75, fontFamily: 'Sans', fontSize: 12, textAlign: 'right' }}>
                    MMR:
                  </Text>
                  <Text style={{ fontFamily: 'Sans', fontSize: 12, marginLeft: 10 }}>
                    {item.mmrEstimated}
                  </Text>
                </View>
              </View>
              <View style={stylez.wrapperColumn}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={stylez.label}>Physical Availability:</Text>
                  <Text style={stylez.value}>{item.paEstimated}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>
                  <Text style={{ width: 75, fontFamily: 'Sans', fontSize: 12, textAlign: 'right' }}>
                    Life(hrs):
                  </Text>
                  <Text style={{ fontFamily: 'Sans', fontSize: 12, marginLeft: 10 }}>
                    {item.lifeEstimated}
                  </Text>
                </View>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Maximum Utilisation:</Text>
                <Text style={stylez.value}>{item.muEstimated}</Text>
              </View>
              <View style={stylez.wrapperColumn}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={stylez.label}>Disposal Value Method:</Text>
                  <Text style={stylez.value}>{item.disposalValueMethod}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>
                  <Text style={{ width: 75, fontFamily: 'Sans', fontSize: 12, textAlign: 'right' }}>
                    Currency:
                  </Text>
                  <Text style={{ fontFamily: 'Sans', fontSize: 12, marginLeft: 10 }}>
                    {item.currencyAbbr}
                  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 30 }}>
                  <Text style={{ fontFamily: 'Sans', fontSize: 12, textAlign: 'right' }}>
                    Disposal Value:
                  </Text>
                  <Text style={{ fontFamily: 'Sans', fontSize: 12, marginLeft: 10 }}>
                    {item.disposalValue}
                  </Text>
                </View>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Spares Cost Method:</Text>
                <Text style={stylez.value}>{item.sparesCostMethod}</Text>
              </View>

              {item.equipmentModelCosts.length > 0 && (
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 0,
                      marginTop: 25,
                      backgroundColor: 'gray',
                      padding: 5,
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Sans' }}>
                      Main Cost Components
                    </Text>
                  </View>
                  <View>
                    <HeaderTable />
                    {item.equipmentModelCosts.map((i, id) => (
                      <FiveColumnLayout
                        key={id}
                        no={id + 1}
                        name={i.costComponentName}
                        unit={i.quantity}
                        currency={
                          i.countryId && !i.currencyAbbr ? getAbbr(i.countryId) : i.currencyAbbr
                        }
                        cost={i.componentCost ? i.componentCost.toLocaleString() : i.componentCost}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>

            {showFooter && (
              <View>
                <Text style={styles.tanggal} render={() => moment().format('LLLL')} fixed />
                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
                  fixed
                />
              </View>
            )}
          </Page>
        )
      })}
    </Document>
  )
}

GenericEquipmentPDF.propTypes = {
  listequipment: PropTypes.array,
  currencies: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default GenericEquipmentPDF
