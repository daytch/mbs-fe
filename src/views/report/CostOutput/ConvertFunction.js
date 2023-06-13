export function combineDataByCostCentreCode(data) {
    const combinedData = {};

    data.forEach((item) => {
        if (item.costCentreCode in combinedData) {
            combinedData[item.costCentreCode].periods = [
                ...combinedData[item.costCentreCode].periods,
                {
                    fleetName: item.fleetName,
                        rptEquipmentCostPeriodDtos: item.rptEquipmentCostPeriodDtos.map((costPeriod) => ({
                            value: costPeriod.value,
                            periodName: costPeriod.periodName,
                        })),
                    total: item.rptEquipmentCostPeriodDtos.reduce((acc, curr) => acc + curr.value, 0)
                }
            ]
        } else {

            combinedData[item.costCentreCode] = {
                costCentreCode: item.costCentreCode,
                costCentreName: item.costCentreName,
                periods: [
                    {
                        fleetName: item.fleetName,
                        rptEquipmentCostPeriodDtos: item.rptEquipmentCostPeriodDtos.map((costPeriod) => ({
                            value: costPeriod.value,
                            periodName: costPeriod.periodName,
                        })),
                        total: item.rptEquipmentCostPeriodDtos.reduce((acc, curr) => acc + curr.value, 0)
                    }

                ]
            };
        }
    });

    // convert the combinedData object to an array of objects and return it
    return Object.values(combinedData);
}