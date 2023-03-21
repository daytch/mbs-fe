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
]

export default _disabledNav
