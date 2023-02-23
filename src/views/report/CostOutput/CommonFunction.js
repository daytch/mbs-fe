import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import PropTypes from 'prop-types';

export const dummyData = [
    {
        costCentreCode: "CC001",
        costCentreName: "Cost Centre 1",
        rptEquipmentSchedulePeriodDtos: [
            { periodId: 1, positionN: 1, periodName: "P001", value: 10000 },
            { periodId: 2, positionN: 2, periodName: "P002", value: 15000 },
            { periodId: 3, positionN: 3, periodName: "P003", value: 10000 }
        ]
    },
    {
        costCentreCode: "CC002",
        costCentreName: "Cost Centre 2",
        rptEquipmentSchedulePeriodDtos: [
            { periodId: 1, positionN: 1, periodName: "P001", value: 7500 },
            { periodId: 2, positionN: 2, periodName: "P002", value: 12500 },
            { periodId: 3, positionN: 3, periodName: "P003", value: 17500 }
        ]
    }
];


function generateTable(data, type = 'cost') {
    const periods = data[0]?.rptEquipmentSchedulePeriodDtos || [];

    // Table header
    const header = (
        <View style={[styles.tableRow, styles.tableHeader]}>
            {
                type === 'cost' ?
                    <>
                        <View style={[styles.tableCell, { width: 70 }]}>
                            <Text>Code</Text>
                        </View>
                        <View style={[styles.tableCell, { width: 100 }]}>
                            <Text>Description</Text>
                        </View>
                    </>
                    :
                    <View style={[styles.tableCell, { width: 100 }]}>
                        <Text>{type}</Text>
                    </View>

            }
            <View style={styles.periodContainer}>
                {periods.map((period) => (
                    <View
                        key={period.periodId}
                        style={[styles.tableCell, { width: 70, textAlign: "center" }]}
                    >
                        <Text>{period.periodName}</Text>
                    </View>
                ))}
            </View>
            <View style={[styles.tableCell, { width: 70 }]}>
                <Text>Total</Text>
            </View>
        </View>
    );

    // Table content
    const content = data.map((item) => {
        const periodTotal = item.rptEquipmentSchedulePeriodDtos.reduce(
            (acc, curr) => acc + curr.value,
            0
        );

        return (
            <View style={styles.tableRow} key={item.costCentreCode}>
                {
                    type === 'cost' ?
                        <>
                            <View style={[styles.tableCell, { width: 70 }]}>
                                <Text>{item.costCentreCode}</Text>
                            </View>
                            <View style={[styles.tableCell, { width: 100 }]}>
                                <Text>{item.costCentreName}</Text>
                            </View>
                        </>
                        :
                        <View style={[styles.tableCell, { width: 100 }]}>
                            <Text>{item.costCentreName}</Text>
                        </View>

                }
                <View style={styles.periodContainer}>
                    {item.rptEquipmentSchedulePeriodDtos.map((period) => (
                        <View
                            key={period.periodId}
                            style={[styles.tableCell, { width: 70, textAlign: "right" }]}
                        >
                            <Text>{period.value}</Text>
                        </View>
                    ))}
                </View>
                <View style={[styles.tableCell, { width: 70, textAlign: "right" }]}>
                    <Text>{periodTotal}</Text>
                </View>
            </View>
        );
    });

    // Table footer
    const periodsSubtotal = periods.reduce((acc, curr) => {
        const periodTotal = data.reduce((acc2, curr2) => {
            const periodValue = curr2.rptEquipmentSchedulePeriodDtos.find(
                (p) => p.periodId === curr.periodId
            )?.value;

            return acc2 + (periodValue || 0);
        }, 0);

        return { ...acc, [curr.periodName]: periodTotal };
    }, {});

    const footer = (
        <View style={styles.tableRow}>
            {
                type === 'cost' ?
                    <>
                        <View style={[styles.tableCell, { width: 70 }]} />
                        <View style={[styles.tableCell, { width: 100 }]} >
                            <Text>Total</Text>
                        </View>
                    </>
                    :
                    <View style={[styles.tableCell, { width: 100 }]}>
                        <Text>Total</Text>
                    </View>

            }
            <View style={styles.periodContainer}>
                {periods.map((period, _, arrPeriods) => (
                    <View
                        key={period.periodId}
                        style={[styles.tableCell, { width: 70, textAlign: "right" }]}
                    >
                        <Text>{periodsSubtotal[period.periodName]}</Text>
                    </View>
                ))}
            </View>
            <View style={[styles.tableCell, styles.grandTotal, { width: 70, textAlign: "right" }]}>
                <Text>
                    {data.reduce(
                        (acc, curr) =>
                            acc +
                            curr.rptEquipmentSchedulePeriodDtos.reduce(
                                (acc2, curr2) => acc2 + curr2.value,
                                0
                            ),
                        0
                    )}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.table
        }>
            {header}
            {content}
            {footer}
        </View>
    );
}

// Example usage
const MyTable = (props) => {
    return <>{generateTable(dummyData, props.type)}</>;
};

MyTable.propTypes = {
    type: PropTypes.string
}

const styles = StyleSheet.create({
    table: {
        fontSize: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 20,
        overflow: "hidden",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    tableHeader: {
        backgroundColor: "#f0f0f0",
        fontWeight: "bold",
    },
    periodContainer: {
        flexDirection: 'row'
    },
    tableCell: {
        padding: 10,
    },
    grandTotal: {
        fontWeight: "bold",
    },
});

export default MyTable;  