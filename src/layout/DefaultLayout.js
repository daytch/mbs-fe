import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useSelector } from 'react-redux'

const DefaultLayout = (props) => {
  const project = useSelector((state) => state.Navigation.project)
  const projectRepresentation = useSelector((state) => state.Navigation.projectRepresentation)
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(count + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, projectRepresentation])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
