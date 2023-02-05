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
  tableHeader: { fontSize: 10, fontFamily: 'Sans', fontWeight: 'bold' },
  tableContent: { fontSize: 10, fontFamily: 'Sans' },
})

// Create Document Component
const InfrastructurePDF = (props) => {
  const {
    infrastructures,
    levyCategories,
    project,
    projectRepresentation,
    showHeader,
    showFooter,
  } = props

  const getLevyCategoryName = (id) => {
    if (levyCategories?.length > 0) {
      let c = levyCategories.filter((x) => x.id === id)
      return c.length < 1 ? '' : c[0]?.name
    } else {
      return ''
    }
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
      <View style={{ width: 5 }}>
        <Text style={stylez.tableHeader}>No </Text>
      </View>

      <View style={{ marginLeft: 15, width: 80 }}>
        <Text style={stylez.tableHeader}>Infrastructure Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 80 }}>
        <Text style={stylez.tableHeader}>Infrastructure Type</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Unit</Text>
      </View>

      <View style={{ marginLeft: 10, width: 60 }}>
        <Text style={stylez.tableHeader}>Disposal Value Method</Text>
      </View>

      <View style={{ marginLeft: 10, width: 60 }}>
        <Text style={stylez.tableHeader}>Disposal Percentage</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ marginLeft: 10, width: 60 }}>
        <Text style={stylez.tableHeader}>Disposal Value</Text>
      </View>

      <View style={{ marginLeft: 10, width: 40 }}>
        <Text style={stylez.tableHeader}>Notes</Text>
      </View>
    </View>
  )

  const HeaderChild = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        marginLeft: 85,
        padding: 2,
      }}
    >
      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableHeader}>Main Cost Components Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Unit</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableHeader}>Quantity</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableHeader}>Currency</Text>
      </View>

      <View style={{ marginLeft: 10, width: 40 }}>
        <Text style={stylez.tableHeader}>Cost/Unit</Text>
      </View>

      <View style={{ marginLeft: 10, width: 80 }}>
        <Text style={stylez.tableHeader}>Levy Category</Text>
      </View>
    </View>
  )

  const ContentChild = ({ name, unit, qty, cost, levy }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        marginLeft: 85,
        fontFamily: 'Sans',
        fontSize: 9,
        padding: 2,
      }}
    >
      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{unit}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableContent}>{qty}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 40 }}>
        <Text style={stylez.tableContent}>{cost}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 80 }}>
        <Text style={stylez.tableContent}>{levy}</Text>
      </View>
    </View>
  )

  const FiveColumnLayout = ({
    no,
    name,
    tipe,
    disposalValueMethod,
    disposalValueRatio,
    unit,
    currency,
    disposalValue,
    notes,
  }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'start',
        fontFamily: 'Sans',
        fontSize: 12,
        padding: 3,
        backgroundColor: 'gray',
      }}
    >
      <View style={{ width: 10 }}>
        <Text style={stylez.tableContent}>{no}.</Text>
      </View>

      <View style={{ marginLeft: 10, width: 80 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 80 }}>
        <Text style={stylez.tableContent}>{tipe}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableContent}>{unit}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 60 }}>
        <Text style={stylez.tableContent}>{disposalValueMethod}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 60 }}>
        <Text style={stylez.tableContent}>{disposalValueRatio}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableContent}>{currency}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 60 }}>
        <Text style={stylez.tableContent}>{disposalValue}</Text>
      </View>

      <View style={{ marginLeft: 5, width: 50 }}>
        <Text style={stylez.tableContent}>{notes}</Text>
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

        {showHeader && Header('Infrastructure')}

        <View style={{ flex: 1, marginTop: 15 }}>
          {infrastructures.length > 0 && (
            <>
              <HeaderTable />
              {divider()}
              {infrastructures.map((i, id) => (
                <>
                  <FiveColumnLayout
                    key={id}
                    no={id + 1}
                    name={i.infrastructureName}
                    tipe={i.infrastructureTypeName}
                    disposalValueMethod={i.disposalValueMethod}
                    disposalValueRatio={i.disposalValueRatio}
                    unit={i.quantity}
                    currency={i.currencyAbbr}
                    disposalValue={i.disposalValue}
                    notes={i.notes}
                    infrastructureCostComponents={i.infrastructureCostComponents}
                  />
                  {i.infrastructureCostComponents.length > 0 && (
                    <View className={{ display: 'flex', marginTop: 25 }}>
                      <HeaderChild />
                      {divider('0 0 1 90')}
                      {i.infrastructureCostComponents.map((x, idx) => {
                        return (
                          <ContentChild
                            key={idx}
                            name={x.costComponentName}
                            unit={x.units}
                            qty={x.quantity}
                            cost={x.componentCost}
                            levy={getLevyCategoryName(x.levyCategoryID)}
                          />
                        )
                      })}
                    </View>
                  )}
                </>
              ))}
            </>
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
    </Document>
  )
}

InfrastructurePDF.propTypes = {
  infrastructures: PropTypes.array,
  levyCategories: PropTypes.array,
  // listequipment: PropTypes.array,
  currencies: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default InfrastructurePDF
