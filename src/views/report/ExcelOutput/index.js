import EmployeeExcludingReliefByCostCentre from './EmployeeExcludingReliefByCostCentre'
import EmployeeExcludingReliefSummary from './EmployeeExcludingReliefSummary'
import EmployeeRequiredReliefByCostCentre from './EmployeeRequiredReliefByCostCentre'
import EmployeeRequiredReliefSummary from './EmployeeRequiredReliefSummary'
import EmployeeTotalByCostCentre from './EmployeeTotalByCostCentre'
import EmployeeTotalSummary from './EmployeeTotalSummary'
import EquipmentDisposalExpiredByCostCentre from './EquipmentDisposalExpiredByCostCentre'
import EquipmentDisposalExpiredSummary from './EquipmentDisposalExpiredSummary'
import EquipmentDisposalNotRequiredByCostCentre from './EquipmentDisposalNotRequiredByCostCentre'
import EquipmentDisposalNotRequiredSummary from './EquipmentDisposalNotRequiredSummary'
import EquipmentFleetByCostCentre from './EquipmentFleetByCostCentre'
import EquipmentFleetSummary from './EquipmentFleetSummary'
import EquipmentReplacementByCostCentre from './EquipmentReplacementByCostCentre'
import EquipmentReplacementSummary from './EquipmentReplacementSummary'
import EquipmentRequiredByCostCentre from './EquipmentRequiredByCostCentre'
import EquipmentRequiredSummary from './EquipmentRequiredSummary'
import EquipmentTotalDisposalByCostCentre from './EquipmentTotalDisposalByCostCentre'
import EquipmentTotalDisposalSummary from './EquipmentTotalDisposalSummary'
import EquipmentUtilisationByCostCentre from './EquipmentUtilisationByCostCentre'
import EquipmentUtilisationSummary from './EquipmentUtilisationSummary'
import GeneralFunction from './GeneralFunctionPDF'
import MaterialsByCostCentre from './MaterialsByCostCentre'
import MaterialsServicesByCostCentre from './MaterialsServicesByCostCentre'
import MaterialsServicesConsumedByEquipment from './MaterialsServicesConsumedByEquipment'
import MaterialsServicesSummary from './MaterialsServicesSummary'
import ServicesByCostCentre from './ServicesByCostCentre'

export const callExport = {
  EmployeeExcludingReliefByCostCentre: (data) => EmployeeExcludingReliefByCostCentre(data),
  EmployeeExcludingReliefSummary: (data) => EmployeeExcludingReliefSummary(data),
  EmployeeRequiredReliefByCostCentre: (data) => EmployeeRequiredReliefByCostCentre(data),
  EmployeeRequiredReliefSummary: (data) => EmployeeRequiredReliefSummary(data),
  EmployeeTotalByCostCentre: (data) => EmployeeTotalByCostCentre(data),
  EmployeeTotalSummary: (data) => EmployeeTotalSummary(data),
  EquipmentDisposalExpiredByCostCentre: (data) => EquipmentDisposalExpiredByCostCentre(data),
  EquipmentDisposalExpiredSummary: (data) => EquipmentDisposalExpiredSummary(data),
  EquipmentDisposalNotRequiredByCostCentre: (data) =>
    EquipmentDisposalNotRequiredByCostCentre(data),
  EquipmentDisposalNotRequiredSummary: (data) => EquipmentDisposalNotRequiredSummary(data),
  EquipmentFleetByCostCentre: (data) => EquipmentFleetByCostCentre(data),
  EquipmentFleetSummary: (data) => EquipmentFleetSummary(data),
  EquipmentReplacementByCostCentre: (data) => EquipmentReplacementByCostCentre(data),
  EquipmentReplacementSummary: (data) => EquipmentReplacementSummary(data),
  EquipmentRequiredByCostCentre: (data) => EquipmentRequiredByCostCentre(data),
  EquipmentRequiredSummary: (data) => EquipmentRequiredSummary(data),
  EquipmentTotalDisposalByCostCentre: (data) => EquipmentTotalDisposalByCostCentre(data),
  EquipmentTotalDisposalSummary: (data) => EquipmentTotalDisposalSummary(data),
  EquipmentUtilisationByCostCentre: (data) => EquipmentUtilisationByCostCentre(data),
  EquipmentUtilisationSummary: (data) => EquipmentUtilisationSummary(data),
  GeneralFunction: (data) => GeneralFunction(data),
  MaterialsByCostCentre: (data) => MaterialsByCostCentre(data),
  MaterialsServicesByCostCentre: (data) => MaterialsServicesByCostCentre(data),
  MaterialsServicesConsumedByEquipment: (data) => MaterialsServicesConsumedByEquipment(data),
  MaterialsServicesSummary: (data) => MaterialsServicesSummary(data),
  ServicesByCostCentre: (data) => ServicesByCostCentre(data),
}
