import lazyRetry from '@tdotcode/react-lazy-retry'

const Dashboard = lazyRetry(() => import('./views/dashboard/Dashboard'))

// Page MBS
const CurrentProject = lazyRetry(() => import('./views/currentproject/CurrentProject'))
const CountriesCurrency = lazyRetry(() => import('./views/countriescurrency/CountriesCurrencies'))
const ProjectCategories = lazyRetry(() => import('./views/projectcategories/ProjectCategories'))
const GenericEquipment = lazyRetry(() => import('./views/genericequipment/GenericEquipment'))
const InfraChecklist = lazyRetry(() => import('./views/infrachecklist/InfraChecklist'))
const ProjectRepresentation = lazyRetry(() =>
  import('./views/projectrepresentation/ProjectRepresentation'),
)
const BaseData = lazyRetry(() => import('./views/basedata/BaseData'))
const Employeetypes = lazyRetry(() => import('./views/employeetypes/EmployeeType'))
const Equipment = lazyRetry(() => import('./views/equipment/Equipment'))
const Equipmentcc = lazyRetry(() => import('./views/equipmentcc/Equipmentcc'))
const Infrastructure = lazyRetry(() => import('./views/infrastructure/Infrastructure'))
const Infrastructurecc = lazyRetry(() => import('./views/infrastructurecc/Infrastructurecc'))
const Materials = lazyRetry(() => import('./views/materials/Materials'))
const Materialcc = lazyRetry(() => import('./views/materialcc/Materialcc'))
const Personnelcc = lazyRetry(() => import('./views/personnelcc/Personnelcc'))
const Roster = lazyRetry(() => import('./views/roster/Roster'))
const Constants = lazyRetry(() => import('./views/constants/Constants'))
const Report = lazyRetry(() => import('./views/report/Report'))
const Analysis = lazyRetry(() => import('./views/analysis/Analysis'))
const Functions = lazyRetry(() => import('./views/function/Function'))
const Production = lazyRetry(() => import('./views/production/Production'))
const FinancialData = lazyRetry(() => import('./views/financialdata/FinancialData'))
const ScheduleEquipment = lazyRetry(() => import('./views/scheduleequipment/ScheduleEquipment'))
const CostIndicesSchedules = lazyRetry(() =>
  import('./views/costindicesschedules/CostIndicesSchedules'),
)
const ExchangeRateSchedules = lazyRetry(() =>
  import('./views/exchangerateschedules/ExchangeRateSchedules'),
)
const CostCentre = lazyRetry(() => import('./views/costcentre/CostCentre'))
const CostCentreTree = lazyRetry(() => import('./views/costcentre/CostCentreTree'))

//Financial
const Indexcontingency = lazyRetry(() => import('./views/indexcontingency/Indexcontingency'))
const LevyCateogries = lazyRetry(() => import('./views/levycategories/LevyCategories'))
const Levies = lazyRetry(() => import('./views/levies/Levies'))
//financial

// EquipmentSchedule

const EquipmentScheduleOHFunction = lazyRetry(() =>
  import('./views/equipmentOHFunction/EquipmentScheduleOHFunction'),
)
// equipmentSchedule
const Profile = lazyRetry(() => import('./views/profile/Profile'))

const Widgets = lazyRetry(() => import('./views/widgets/Widgets'))

const User = lazyRetry(() => import('./views/user/User'))
const Reset = lazyRetry(() => import('./views/reset/Reset'))
const CapitalCostSpreading = lazyRetry(() =>
  import('./views/capitalcostspreading/CapitalCostSpreading'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/countriescurrencies',
    name: 'Countries & Currencies',
    component: CountriesCurrency,
  },
  {
    path: '/projectcategories',
    name: 'Project Categories',
    component: ProjectCategories,
  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/widgets', name: 'Widgets', component: Widgets },

  { path: '/financialdata', name: 'Financial Data', component: FinancialData },
  { path: '/scheduleequipment', name: 'Equipment', component: ScheduleEquipment },
  { path: '/report', name: 'Report', component: Report },
  { path: '/analysis', name: 'Analysis', component: Analysis },
  { path: '/function', name: 'Function', component: Functions },
  { path: '/production', name: 'Production', component: Production },
  { path: '/currentproject', name: 'Current Project', component: CurrentProject },
  { path: '/projectcategories', name: 'Project Categories', component: ProjectCategories },
  { path: '/genericequipment', name: 'General Equipment', component: GenericEquipment },
  { path: '/infrachecklist', name: 'Infra Checklist', component: InfraChecklist },
  {
    path: '/projectrepresentation',
    name: 'Project Representation',
    component: ProjectRepresentation,
  },

  { path: '/basedata', name: 'Base Data', component: BaseData },
  { path: '/employeetypes', name: 'Employee Types', component: Employeetypes },
  { path: '/equipment', name: 'Equipment', component: Equipment },
  { path: '/equipmentcc', name: 'Equipment', component: Equipmentcc },
  { path: '/infrastructure', name: 'Infrastructure', component: Infrastructure },
  { path: '/infrastructurecc', name: 'Infrastructure', component: Infrastructurecc },
  { path: '/materials', name: 'Materials', component: Materials },
  { path: '/materialcc', name: 'Material', component: Materialcc },
  { path: '/personnelcc', name: 'Personnel', component: Personnelcc },
  { path: '/roster', name: 'Roster', component: Roster },
  { path: '/constant', name: 'Constants', component: Constants },
  { path: '/levycategories', name: 'Levy Categories', component: LevyCateogries },
  { path: '/levies', name: 'Levies', component: Levies },
  {
    path: '/costindicesschedules',
    name: 'Cost Indices Schedules',
    component: CostIndicesSchedules,
  },
  {
    path: '/exchangerateschedules',
    name: 'Exchange Rate Schedules',
    component: ExchangeRateSchedules,
  },
  { path: '/indexcontingency', name: 'Index Contingency', component: Indexcontingency },
  { path: '/costcentre', name: 'Cost Centre', component: CostCentre },
  { path: '/costcentretree', name: 'Cost Centre', component: CostCentreTree },
  {
    path: '/equipmentohfunction',
    name: 'Equipment OH Function',
    component: EquipmentScheduleOHFunction,
  },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/user', name: 'User', component: User },
  { path: '/resetPassword', name: 'Reset', component: Reset },
  {
    path: '/capitalcostspreading',
    name: 'Capital Cost Spreading',
    component: CapitalCostSpreading,
  },
]

export default routes
