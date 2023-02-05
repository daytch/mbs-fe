/* eslint-disable react/prop-types */
import React from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, divider, Header } from './Styles'

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

const EquipmentPDF = (props) => {
  const {
    fleets,
    levyCategories,
    currencies,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
  } = props
  console.log('fleets: ', fleets)

  const getLevyCategoryName = (id) => {
    if (levyCategories?.length > 0) {
      let c = levyCategories.filter((x) => x.id === id)
      return c.length < 1 ? '' : c[0]?.name
    } else {
      return ''
    }
  }

  const HeaderMainCost = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddind: 3,
        fontFamily: 'Sans',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginRight: 10, width: 90 }}>
        <Text style={stylez.tableHeader}>Main Cost Component Name</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Units</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Quantity</Text>
      </View>

      <View style={{ width: 70 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Cost/Unit</Text>
      </View>

      <View style={{ width: 80 }}>
        <Text style={stylez.tableHeader}>Levy Category</Text>
      </View>
    </View>
  )

  const MainCostContent = ({ no, name, unit, currency, cost, levyCategory, quantity }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ width: 90 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{unit}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{currency}</Text>
      </View>

      <View style={{ width: 50 }}>
        <Text style={stylez.tableContent}>{cost}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{quantity}</Text>
      </View>

      <View style={{ width: 80 }}>
        <Text style={stylez.tableContent}>{levyCategory}</Text>
      </View>
    </View>
  )

  const HeaderMaterialConsumption = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddind: 3,
        fontFamily: 'Sans',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginRight: 10, width: 90 }}>
        <Text style={stylez.tableHeader}>Material/Service</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Units</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Quantity per OH</Text>
      </View>
    </View>
  )
  const MaterialConsumtionContent = ({ no, name, units, quantityPerOh }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ width: 90 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{units}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{quantityPerOh}</Text>
      </View>
    </View>
  )

  const HeaderMaintenancePersonnel = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddind: 3,
        fontFamily: 'Sans',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginRight: 10, width: 90 }}>
        <Text style={stylez.tableHeader}>EmployeeType(Maintenance)</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Roster</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Proportion(%)</Text>
      </View>
    </View>
  )
  const MaintenancePersonnelContent = ({ no, name, roster, proportion }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ width: 90 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{roster}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{proportion}</Text>
      </View>
    </View>
  )

  const HeaderOperator = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddind: 3,
        fontFamily: 'Sans',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginRight: 10, width: 90 }}>
        <Text style={stylez.tableHeader}>EmployeeType(Operator)</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>No of Operators</Text>
      </View>
    </View>
  )
  const OperatorContent = ({ no, name, total }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ width: 90 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{total}</Text>
      </View>
    </View>
  )

  const HeaderSpare = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddind: 3,
        fontFamily: 'Sans',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginRight: 10, width: 90 }}>
        <Text style={stylez.tableHeader}>Spare Part Name</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Units</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Quantity</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Cost/Unit</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableHeader}>Levy Category</Text>
      </View>
    </View>
  )
  const SpareContent = ({ no, name, unit, quantity, currency, cost, levyCategory }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
      }}
    >
      <View style={{ width: 20 }}>
        <Text style={stylez.tableContent}>{no}</Text>
      </View>

      <View style={{ width: 90 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{unit}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{quantity}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{currency}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{cost}</Text>
      </View>

      <View style={{ width: 60 }}>
        <Text style={stylez.tableContent}>{levyCategory}</Text>
      </View>
    </View>
  )
  const getAbbr = (countryId) => {
    let c = currencies.filter((x) => x.countryId === countryId)
    return c[0]?.currencyAbbr
  }

  return (
    <Document>
      {fleets.map((item, idx) => {
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

            {showHeader && Header('Equipment')}

            <View style={{ flex: 1, marginTop: 15 }}>
              <View style={stylez.wrapper}>
                <Text style={stylez.labelFirst}>Fleet Name:</Text>
                <Text style={stylez.valueFirst}>{item.fleetName}</Text>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Equipment Type:</Text>
                <Text style={stylez.value}>{item.equipmentTypeName}</Text>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Equipment Model:</Text>
                <Text style={stylez.value}>{item.equipmentModelName}</Text>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Specifications:</Text>
                <Text style={stylez.value}>{item.specifications}</Text>
              </View>
              <View style={stylez.wrapper}>
                <Text style={stylez.label}>Equipment:</Text>
                <Text style={stylez.value}>{item.specifications}</Text>
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

              {item.mainCostComponent.length > 0 && (
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
                    <HeaderMainCost />
                    {divider()}
                    {item.mainCostComponent.map((i, id) => (
                      <MainCostContent
                        key={id}
                        no={id + 1}
                        name={i.costComponentName}
                        unit={i.quantity}
                        currency={
                          i.countryId && !i.currencyAbbr ? getAbbr(i.countryId) : i.currencyAbbr
                        }
                        cost={i.componentCost ? i.componentCost.toLocaleString() : i.componentCost}
                        levyCategory={getLevyCategoryName(i.levyCategoryId)}
                        quantity={i.quantity}
                      />
                    ))}
                  </View>
                </View>
              )}

              {item.materialConsumtion.length > 0 && (
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
                      Materials/Services Consumption
                    </Text>
                  </View>
                  <View>
                    <HeaderMaterialConsumption />
                    {divider()}
                    {item.mainCostComponent.map((i, id) => (
                      <MaterialConsumtionContent
                        key={id}
                        no={id + 1}
                        name={i.fleetResourceId}
                        unit="units"
                        quantityPerOh={i.quantityPerOh}
                      />
                    ))}
                  </View>
                </View>
              )}

              {item.maintenancePersonel.length > 0 && (
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
                      Maintenance Personnel
                    </Text>
                  </View>
                  <View>
                    <HeaderMaintenancePersonnel />
                    {divider()}
                    {item.maintenancePersonel.map((i, id) => (
                      <MaintenancePersonnelContent
                        key={id}
                        no={id + 1}
                        name={i.fleetResourceId}
                        roster="roster"
                        proportion={i.proportion}
                      />
                    ))}
                  </View>
                </View>
              )}

              {item.operators.length > 0 && (
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
                      Operators
                    </Text>
                  </View>
                  <View>
                    <HeaderOperator />
                    {divider()}
                    {item.operators.map((i, id) => (
                      <OperatorContent
                        key={id}
                        no={id + 1}
                        name={i.fleetResourceId}
                        total={i.numEmployees}
                      />
                    ))}
                  </View>
                </View>
              )}

              {item.spares.length > 0 && (
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
                      Spares
                    </Text>
                  </View>
                  <View>
                    <HeaderSpare />
                    {divider()}
                    {item.spares.map((i, id) => (
                      <SpareContent
                        key={id}
                        no={id + 1}
                        name={i.sparePartName}
                        unit={i.units}
                        quantity={i.quantity}
                        currency={
                          i.countryId && !i.currencyAbbr ? getAbbr(i.countryId) : i.currencyAbbr
                        }
                        cost={i.sparePartCost}
                        levyCategory={getLevyCategoryName(i.levyCategoryId)}
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

EquipmentPDF.propTypes = {
  fleets: PropTypes.array,
  levyCategories: PropTypes.array,
  currencies: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default EquipmentPDF
