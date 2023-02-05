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
const CostCentrePDF = (props) => {
  const { costCentres, project, projectRepresentation, showHeader, showFooter } = props

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
        <Text style={stylez.tableHeader}>Code</Text>
      </View>

      <View style={{ marginLeft: 10, width: 150 }}>
        <Text style={stylez.tableHeader}>Cost Centre Name</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableHeader}>Level</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableHeader}>Parent Cost Centre</Text>
      </View>
    </View>
  )

  const FiveColumnLayout = ({ no, name, code, level, parent }) => (
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
        <Text style={stylez.tableContent}>{code}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 150 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 50 }}>
        <Text style={stylez.tableContent}>{level}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableContent}>{parent}</Text>
      </View>
    </View>
  )

  const HeaderChild1 = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 11,
        padding: 2,
      }}
    >
      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableHeader}>Equipment</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableHeader}>Optional Fleet Group</Text>
      </View>
    </View>
  )

  const ContentChild1 = ({ name, optional }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 11,
        fontFamily: 'Sans',
        fontSize: 9,
        padding: 2,
      }}
    >
      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableContent}>{name}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 130 }}>
        <Text style={stylez.tableContent}>{optional}</Text>
      </View>
    </View>
  )

  const HeaderChild2 = () => (
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
        <Text style={stylez.tableHeader}>Equipment Type</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Roster</Text>
      </View>
    </View>
  )

  const ContentChild2 = ({ tipe, roster }) => (
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
        <Text style={stylez.tableContent}>{tipe}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{roster}</Text>
      </View>
    </View>
  )

  const HeaderChild3 = () => (
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
        <Text style={stylez.tableHeader}>Material / Service</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Units</Text>
      </View>
    </View>
  )

  const ContentChild3 = ({ material, units }) => (
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
        <Text style={stylez.tableContent}>{material}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{units}</Text>
      </View>
    </View>
  )

  const HeaderChild4 = () => (
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
        <Text style={stylez.tableHeader}>Infrastructure</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Units</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Quantity</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Employee Type</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Roster</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Material/Service</Text>
      </View>

      <View style={{ marginLeft: 10, width: 20 }}>
        <Text style={stylez.tableHeader}>Units</Text>
      </View>
    </View>
  )

  const ContentChild4 = ({ infra, units, qty, tipe, roster, material, unt }) => (
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
        <Text style={stylez.tableContent}>{infra}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{units}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{qty}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{tipe}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{roster}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{material}</Text>
      </View>

      <View style={{ marginLeft: 10, width: 30 }}>
        <Text style={stylez.tableContent}>{unt}</Text>
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

        {showHeader && Header('Cost Centre Structure')}

        <View style={{ flex: 1, marginTop: 15 }}>
          {costCentres.length > 0 && (
            <>
              <HeaderTable />
              {divider()}
              {costCentres.map((i, id) => (
                <>
                  <FiveColumnLayout
                    key={id}
                    no={id + 1}
                    name={i.costCentreName}
                    code={i.infrastructureTypeName}
                    level={i.levelOrder}
                    parent={i.infrastructureTypeName}
                  />
                  {i.costCentreStructureEquipmentDtos.length > 0 && (
                    <View className={{ display: 'flex', marginTop: 25 }}>
                      <HeaderChild1 />
                      {divider('0 0 1 13')}
                      {i.costCentreStructureEquipmentDtos.map((x, idx) => {
                        return (
                          <ContentChild1 key={idx} name={x.fleetName} optional={x.fleetGroupName} />
                        )
                      })}
                    </View>
                  )}
                  {i.costCentreStructurePersonelDtos.length > 0 && (
                    <View className={{ display: 'flex', marginTop: 25 }}>
                      <HeaderChild2 />
                      {divider('0 0 1 90')}
                      {i.costCentreStructurePersonelDtos.map((x, idx) => {
                        return (
                          <ContentChild2
                            key={idx}
                            tipe={x.employeeTypeName}
                            roster={x.rosterName}
                          />
                        )
                      })}
                    </View>
                  )}
                  {i.costCentreStructureMaterialDtos.length > 0 && (
                    <View className={{ display: 'flex', marginTop: 25 }}>
                      <HeaderChild3 />
                      {divider('0 0 1 90')}
                      {i.costCentreStructureMaterialDtos.map((x, idx) => {
                        return <ContentChild3 key={idx} material={x.resourceName} units={x.units} />
                      })}
                    </View>
                  )}
                  {i.costCentreStructureInfrastructureDtos.length > 0 && (
                    <View className={{ display: 'flex', marginTop: 25 }}>
                      <HeaderChild4 />
                      {divider('0 0 1 90')}
                      {i.costCentreStructureInfrastructureDtos.map((x, idx) => {
                        return (
                          <ContentChild4
                            key={idx}
                            infra={x.infraStructureName}
                            units={x.units}
                            qty={x.quantity}
                            tipe={x.costIndexType}
                            roster={'roster'}
                            material={'material'}
                            unt={'units'}
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

CostCentrePDF.propTypes = {
  costCentres: PropTypes.array,
  currencies: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default CostCentrePDF
