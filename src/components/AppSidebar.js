import React, { useState, useEffect } from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { ReactComponent as Logo } from 'src/assets/images/logoimg.svg'
import { ReactComponent as LabelLogo } from 'src/assets/images/logolabel.svg'
// sidebar nav config
import navigation from '../_nav'
import disabledNavigation from '../_disabledNav'
import { useSelector } from 'react-redux'
import { isEmptyNullOrUndefined, isObjectEmpty } from 'src/functions'

const AppSidebar = () => {
  const [unfoldable, SetUnfoldable] = useState(true)
  const [sidebarShow, SetSidebarShow] = useState(true)
  const project = useSelector((state) => state.Navigation.project)
  const projectRepresentation = useSelector((state) => state.Navigation.projectRepresentation)
  const user = JSON.parse(localStorage.getItem('user'))

  const [nav, setNav] = useState(
    isObjectEmpty(project) || isObjectEmpty(projectRepresentation)
      ? disabledNavigation
      : navigation,
  )

  useEffect(() => {
    setNav(
      nav.filter((x) => {
        if (isEmptyNullOrUndefined(user.role) || user.role.toLowerCase().indexOf('admin') === -1) {
          return x.to !== '/user'
        } else {
          return x
        }
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => SetSidebarShow(visible)}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <LabelLogo />
        <Logo />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={nav} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => SetUnfoldable(!unfoldable)} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
