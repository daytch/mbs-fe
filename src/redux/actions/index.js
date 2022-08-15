import { doLogin, doRegister /*, getUser */ } from './loginAction'
import {
  getCountriesCurrencies,
  setCountriesCurrencies,
  addCountriesCurrencies,
  setMessageCountriesCurrencies,
  setCurrencyAbbr,
  setCountryName,
  setCurrencyName,
  setModalShowMessage,
  setEmptyCountriesCurrenciesData,
  deleteCountriesCurrencies,
} from './countriesCurrencies'

import {
  getProjectCategories,
  getProjectSubCategories,
  postProject,
  putProject,
  getProjects,
  getProjectDashboard,
  deleteProject,
  getDropdownProjects,
} from './projectAction'
import { getProjectCountry, getCurrencies } from './countryAction'

import {
  getListProjectCategories,
  postProjectCategory,
  putProjectCategory,
  deleteProjectCategory,
  postProjectSubCategory,
  putProjectSubCategory,
  deleteProjectSubCategory,
  getListProjectSubCategories,
} from './projectCategoriesAction'
import {
  getInfraChecklist,
  postInfraChecklist,
  putInfraChecklist,
  deleteInfraChecklist,
} from './infraChecklistAction'
import {
  getGenericEquipment,
  postGenericEquipment,
  putGenericEquipment,
  deleteGenericEquipment,
  updateEquipmentType,
} from './genericEquipmentAction'

import {
  getPeriod,
  getProjectRepresentation,
  postProjectRepresentation,
  putProjectRepresentation,
  deleteProjectRepresentation,
  putProjectRepresentationCalendar,
  deleteProjectRepresentationCalendar,
  putPeriodShorten,
  putPeriodExtend,
  putPeriodCustom,
  putPeriodEditDate,
} from './projectRepresentationAction'

import { getRoster, postRoster, putRoster, deleteRoster } from './rosterAction'

import { getConstant, postConstant, putConstant, deleteConstant } from './constantsAction'

import { setProject, setProjectRepresentation } from './navigationAction'

import {
  getLevyCategories,
  postLevyCategory,
  putLevyCategory,
  deleteLevyCategory,
  getLevyCategoryOption,
} from './levyCategoriesAction'

import { deleteLevy, getLevies, postLevy, putLevy } from './leviesAction'
import {
  getCostIndices,
  postCostIndices,
  putCostIndices,
  deleteCostIndices,
} from './financeCostIndicesAction'
import {
  getExchangeRate,
  postExchangeRate,
  putExchangeRate,
  deleteExchangeRate,
} from './financeExchangeRateAction'
import {
  getMaterials,
  postMaterials,
  putMaterials,
  deleteMaterials,
} from './resourcesMaterialsAction'
import {
  getEmployeeType,
  postEmployeeType,
  putEmployeeType,
  deleteEmployeeType,
} from './resourcesEmployeeTypeAction'
import {
  getFleets,
  postFleets,
  putFleets,
  deleteFleets,
  getEquipmentTypes,
  getFleetMaterialService,
} from './equipmentAction'
import {
  getResourcesInfra,
  postResourcesInfra,
  putResourcesInfra,
  deleteResourcesInfra,
} from './resourcesInfrastructureAction'
import { getProjectRepresentationDetail, putIndexAllocation } from './indexAllocationAction'
import {
  postEquipmentcc,
  getEquipmentcc,
  putEquipmentcc,
  deleteEquipmentcc,
} from './equipmentccAction'
import { postPersonelcc, getPersonelcc, putPersonelcc, deletePersonelcc } from './personelccAction'

import { postMaterialcc, getMaterialcc, putMaterialcc, deleteMaterialcc } from './materialccAction'
import { postCostCentre, getCostCentre, putCostCentre, deleteCostCentre } from './costCentreAction'

import {
  postInfrastructurecc,
  getInfrastructrecc,
  putInfrastructurecc,
  deleteInfrastructurecc,
} from './infrastructureccAction'

import { getEquipmentScheduleOH, postEquipmentScheduleOH } from './equipmentScheduleOHAction'

import {
  getRole,
  getUser,
  postUser,
  putUser,
  deleteUser,
  uploadFile,
  updatePassword,
  updateRole,
  forgotPassword,
} from './userAction'
import { getCompany, postCompany, putCompany, deleteCompany } from './companyAction'
import { postRole, putRole, deleteRole } from './roleAction'

import {
  getProductionSchedule,
  postProductionSchedule,
  putProductionSchedule,
  deleteProductionSchedule,
} from './productionScheduleAction'
import {
  getProductionFactor,
  postProductionFactor,
  putProductionFactor,
  deleteProductionFactor,
} from './productionFactorAction'
import { getEquipmentRoster, postEquipmentRoster } from './equipmentScheduleRosterAction'
import { getEquipmentSchedulePA, postEquipmentSchedulePA } from './equipmentSchedulePAAction'

export {
  doLogin,
  doRegister,
  // getUser,
  getCountriesCurrencies,
  setCountriesCurrencies,
  addCountriesCurrencies,
  setMessageCountriesCurrencies,
  setCurrencyAbbr,
  setCountryName,
  setCurrencyName,
  setModalShowMessage,
  setEmptyCountriesCurrenciesData,
  deleteCountriesCurrencies,
  getProjectCategories,
  getProjectSubCategories,
  getProjectCountry,
  getProjects,
  postProject,
  putProject,
  deleteProject,
  getDropdownProjects,
  getListProjectCategories,
  postProjectCategory,
  putProjectCategory,
  deleteProjectCategory,
  postProjectSubCategory,
  putProjectSubCategory,
  deleteProjectSubCategory,
  getInfraChecklist,
  postInfraChecklist,
  putInfraChecklist,
  deleteInfraChecklist,
  getGenericEquipment,
  postGenericEquipment,
  putGenericEquipment,
  deleteGenericEquipment,
  getCurrencies,
  getPeriod,
  getProjectRepresentation,
  getProjectRepresentationDetail,
  postProjectRepresentation,
  putProjectRepresentation,
  deleteProjectRepresentation,
  getListProjectSubCategories,
  setProject,
  setProjectRepresentation,
  getRoster,
  postRoster,
  putRoster,
  deleteRoster,
  getConstant,
  postConstant,
  putConstant,
  deleteConstant,
  putProjectRepresentationCalendar,
  deleteProjectRepresentationCalendar,
  getLevyCategories,
  getLevyCategoryOption,
  postLevyCategory,
  putLevyCategory,
  deleteLevyCategory,
  deleteLevy,
  getLevies,
  postLevy,
  putLevy,
  putPeriodExtend,
  putPeriodCustom,
  putPeriodShorten,
  putPeriodEditDate,
  getCostIndices,
  postCostIndices,
  putCostIndices,
  deleteCostIndices,
  getExchangeRate,
  postExchangeRate,
  putExchangeRate,
  deleteExchangeRate,
  getMaterials,
  postMaterials,
  putMaterials,
  deleteMaterials,
  getEmployeeType,
  postEmployeeType,
  putEmployeeType,
  deleteEmployeeType,
  getFleets,
  postFleets,
  putFleets,
  deleteFleets,
  getResourcesInfra,
  postResourcesInfra,
  putResourcesInfra,
  deleteResourcesInfra,
  putIndexAllocation,
  getEquipmentcc,
  postEquipmentcc,
  putEquipmentcc,
  deleteEquipmentcc,
  getPersonelcc,
  postPersonelcc,
  putPersonelcc,
  deletePersonelcc,
  updateEquipmentType,
  postMaterialcc,
  getMaterialcc,
  putMaterialcc,
  deleteMaterialcc,
  getInfrastructrecc,
  postInfrastructurecc,
  putInfrastructurecc,
  deleteInfrastructurecc,
  postCostCentre,
  getCostCentre,
  putCostCentre,
  deleteCostCentre,
  getEquipmentScheduleOH,
  postEquipmentScheduleOH,
  getUser,
  postUser,
  putUser,
  deleteUser,
  getCompany,
  postCompany,
  putCompany,
  deleteCompany,
  getRole,
  postRole,
  putRole,
  deleteRole,
  uploadFile,
  updatePassword,
  updateRole,
  forgotPassword,
  getProjectDashboard,
  getEquipmentTypes,
  getProductionSchedule,
  postProductionSchedule,
  putProductionSchedule,
  deleteProductionSchedule,
  getProductionFactor,
  postProductionFactor,
  putProductionFactor,
  deleteProductionFactor,
  getEquipmentRoster,
  postEquipmentRoster,
  getEquipmentSchedulePA,
  postEquipmentSchedulePA,
  getFleetMaterialService,
}
