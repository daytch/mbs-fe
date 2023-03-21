import React, { useState } from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { ReactComponent as Logo } from 'src/assets/images/logoimg.svg'
import { ReactComponent as LabelLogo } from 'src/assets/images/logolabel.svg'
import { useSelector } from 'react-redux'

const AppSidebar = () => {
  const [unfoldable, SetUnfoldable] = useState(true)
  const [sidebarShow, SetSidebarShow] = useState(true)

  const listMenu = useSelector((state) => state.Navigation.listMenu)

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
          <AppSidebarNav items={listMenu} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => SetUnfoldable(!unfoldable)} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
