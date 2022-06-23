import { combineReducers } from 'redux'
import { getLogin } from './loginReducer'
import { CountriesCurrencies } from './countriesCurrenciesReducer'
import { ProjectCategories } from './projectCategoriesReducer'
import { Project } from './projectReducer'
import { Country } from './countryReducer'
import { InfraChecklist } from './infraChecklistReducer'
import { GenericEquipment } from './genericEquipmentReducer'
import { ProjectRepresentation } from './projectRepresentationReducer'
import { Navigation } from './navigationReducer'
import { Roster } from './rosterReducer'
import { Constant } from './constantReducer'
import { LevyCategory } from './levyCategoryReducer'
import { Levy } from './leviesReducer'
import { FinanceCostIndices } from './financeCostIndicesReducer'
import { FinanceExchangeRate } from './financeExchangeRateReducer'
import { ResourcesMaterials } from './resourcesMaterialsReducer'
import { ResourcesEmployeeType } from './resourcesEmployeeTypeReducer'
import { Equipment } from './equipmentReducer'
import { ResourcesInfrastructure } from './resourcesInfrastructureReducer'
import { IndexContingency } from './indexContingencyReducer'
import { Equipmentcc } from './equipmentccReducer'
import { Personelcc } from './personelccReducer'
import { Materialcc } from './materialccReducer'
import { Infrastructurecc } from './infrastructreccReducer'
import { CostCentre } from './costCentreReducer'
import { EquipmentScheduleOH } from './equipmentScheduleOHReducer'
import { User } from './userReducer'
import { Company } from './companyReducer'
import { Role } from './roleReducer'
import { ProductionSchedule } from './productionScheduleReducer'
import { ProductionFactor } from './productionFactorReducer'

const appReducer = combineReducers({
  getLogin,
  CountriesCurrencies,
  ProjectCategories,
  Country,
  Project,
  InfraChecklist,
  GenericEquipment,
  ProjectRepresentation,
  Navigation,
  Roster,
  Constant,
  LevyCategory,
  Levy,
  FinanceCostIndices,
  FinanceExchangeRate,
  ResourcesMaterials,
  ResourcesEmployeeType,
  Equipment,
  ResourcesInfrastructure,
  IndexContingency,
  Equipmentcc,
  Personelcc,
  Materialcc,
  Infrastructurecc,
  CostCentre,
  EquipmentScheduleOH,
  User,
  Company,
  Role,
  ProductionFactor,
  ProductionSchedule,
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
