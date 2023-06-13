import { all } from 'redux-saga/effects'
import Login from './loginSaga'
import Project from './projectSaga'
import Country from './countrySaga'
import CountriesCurrencies from './countrieCurrenciesSaga'
import ProjectCategories from './projectCategoriesSaga'
import InfraChecklist from './infraChecklistSaga'
import GenericEquipment from './genericEquipmentSaga'
import ProjectRepresentation from './projectRepresentationSaga'
import Roster from './rosterSaga'
import Constant from './constantSaga'
import Navigation from './navigationSaga'
import LevyCategories from './levyCategorySaga'
import Levy from './leviesSaga'
import FinanceCostIndices from './financeCostIndicesSaga'
import FinanceExchangeRate from './financeExchangeRateSaga'
import ResourcesMaterials from './resourcesMaterialsSaga'
import ResourcesEmployeeType from './resourcesEmployeeTypeSaga'
import Equipment from './equipmentSaga'
import ResourcesInfrastructure from './resourcesInfrastructureSaga'
import IndexContingency from './indexContingencySaga'
import Equipmentcc from './equipmentccSaga'
import Personelcc from './personelccSaga'
import Materialcc from './materialccSaga'
import Infrastructurecc from './infrastructureccSaga'
import CostCentre from './costCentreSaga'
import EquipmentScheduleOH from './equipmentScheduleOHSaga'
import User from './userSaga'
import Company from './companySaga'
import Role from './roleSaga'
import ProductionFactor from './productionFactorSaga'
import ProductionSchedule from './productionScheduleSaga'
import EquipmentSchedulePA from './equipmentSchedulePASaga'
import EquipmentScheduleRoster from './equipmentScheduleRosterSaga'
import FunctionPersonnel from './functionPersonnelSaga'
import FunctionGeneral from './functionGeneralSaga'
import FunctionCostCentre from './functionCostCentreSaga'
import MaterialFunction from './materialFunctionSaga'
import FunctionBuilder from './functionBuilderSaga'
import PhysicalOutput from './physicalOutputSaga'
import CostOutput from './costOutputSaga'
import Analysis from './analysisSaga'

export default function* rootSaga() {
  yield all([
    Login(),
    Project(),
    Country(),
    CountriesCurrencies(),
    ProjectCategories(),
    InfraChecklist(),
    GenericEquipment(),
    ProjectRepresentation(),
    Roster(),
    Constant(),
    Navigation(),
    LevyCategories(),
    Levy(),
    FinanceCostIndices(),
    FinanceExchangeRate(),
    ResourcesMaterials(),
    ResourcesEmployeeType(),
    Equipment(),
    ResourcesInfrastructure(),
    IndexContingency(),
    Equipmentcc(),
    Personelcc(),
    Materialcc(),
    Infrastructurecc(),
    CostCentre(),
    EquipmentScheduleOH(),
    EquipmentSchedulePA(),
    User(),
    Company(),
    Role(),
    ProductionFactor(),
    ProductionSchedule(),
    EquipmentScheduleRoster(),
    FunctionPersonnel(),
    FunctionGeneral(),
    FunctionCostCentre(),
    MaterialFunction(),
    FunctionBuilder(),
    PhysicalOutput(),
    CostOutput(),
    Analysis(),
  ])
}
