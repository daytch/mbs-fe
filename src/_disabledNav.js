import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilLayers, cilFeaturedPlaylist, cilPeople } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _disabledNav = [
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
  // {
  //   component: CNavGroup,
  //   name: 'Project Data',
  //   to: '/project/data',
  //   icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavGroup,
  //       name: 'Base Data',
  //       to: '#', // to: '/basedata',
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Roster',
  //           to: '#', // to: '/roster',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Constant',
  //           to: '#', // to: '/constant',
  //         },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Resources',
  //       to: '/project/data/resources',
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Materials & Service',
  //           to: '#', // to: '/materials',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Employee Types',
  //           to: '#', // to: '/employeetypes',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Equipment',
  //           to: '#', // to: '/equipment',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Infrastructure',
  //           to: '#', // to: '/infrastructure',
  //         },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Cost Center',
  //       to: '/base',
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: 'Equipment',
  //           to: '#', // to: '/equipmentcc',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Personnel',
  //           to: '#', // to: '/personnelcc',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Material & Services',
  //           to: '#', // to: '/materialcc',
  //         },
  //         {
  //           component: CNavItem,
  //           name: 'Infrastructure',
  //           to: '#', // to: '/infrastructurecc',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Schedules',
  //   icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Production',
  //       to: '#', // to: '/production',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Equipment',
  //       to: '#', // to: '/scheduleequipment',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Functions',
  //       to: '#', // to: '/function',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Financial Data',
  //   to: '#', // to: '/financialdata',
  //   icon: <CIcon icon={cibMathworks} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Analysis',
  //   to: '#', // to: '/analysis',
  //   icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Report',
  //   to: '#', // to: '/report',
  //   icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  // },
]

export default _disabledNav
