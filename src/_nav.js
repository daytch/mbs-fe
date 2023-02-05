import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilCalendar,
  cilLayers,
  cilFeaturedPlaylist,
  // cilGraph,
  cibMathworks,
  cilChartLine,
  cilStorage,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Management',
    to: '/user',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Master Data',
    to: '/base',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'General Data',
        to: '/base',
        items: [
          {
            component: CNavItem,
            name: 'Countries & Currencies',
            to: '/countriescurrencies',
          },
          {
            component: CNavItem,
            name: 'Project Categories',
            to: '/projectcategories',
          },
          {
            component: CNavItem,
            name: 'Generic Equipment',
            to: '/genericequipment',
          },
          {
            component: CNavItem,
            name: 'Infrastructure Checklist',
            to: '/infrachecklist',
          },
        ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Projects',
    to: '/project',
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Current Project',
        to: '/currentproject',
      },
      {
        component: CNavItem,
        name: 'Project Representation',
        to: '/projectrepresentation',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Project Data',
    to: '/project/data',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Base Data',
        to: '/basedata',
        items: [
          {
            component: CNavItem,
            name: 'Roster',
            to: '/roster',
          },
          {
            component: CNavItem,
            name: 'Constant',
            to: '/constant',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Resources',
        to: '/project/data/resources',
        items: [
          {
            component: CNavItem,
            name: 'Materials & Service',
            to: '/materials',
          },
          {
            component: CNavItem,
            name: 'Employee Types',
            to: '/employeetypes',
          },
          {
            component: CNavItem,
            name: 'Equipment',
            to: '/equipment',
          },
          {
            component: CNavItem,
            name: 'Infrastructure',
            to: '/infrastructure',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Cost Center',
        to: '/costcentre',
        // items: [
        //   {
        //     component: CNavItem,
        //     name: 'Equipment',
        //     to: '/equipmentcc',
        //   },
        //   {
        //     component: CNavItem,
        //     name: 'Personnel',
        //     to: '/personnelcc',
        //   },
        //   {
        //     component: CNavItem,
        //     name: 'Material & Services',
        //     to: '/materialcc',
        //   },
        //   {
        //     component: CNavItem,
        //     name: 'Infrastructure',
        //     to: '/infrastructurecc',
        //   },
        // ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Schedules',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Production',
        to: '/production',
      },
      {
        component: CNavItem,
        name: 'Equipment',
        to: '/scheduleequipment',
      },
      {
        component: CNavItem,
        name: 'Functions',
        to: '/function',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Financial Data',
    icon: <CIcon icon={cibMathworks} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Levy',
        to: '/base',
        items: [
          {
            component: CNavItem,
            name: 'Levy Categories',
            to: '/levycategories',
          },
          {
            component: CNavItem,
            name: 'Levies',
            to: '/levies',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Exchange Rate',
        to: '/exchangerateschedules',
      },
      {
        component: CNavItem,
        name: 'Index & Contingency',
        to: '/indexcontingency',
      },
      {
        component: CNavItem,
        name: 'Cost Indices',
        to: '/costindicesschedules',
      },
      {
        component: CNavItem,
        name: 'Cost Spreading',
        to: '/capitalcostspreading',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Analysis',
  //   to: '/analysis',
  //   icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Report',
    to: '/report',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
]

export default _nav
