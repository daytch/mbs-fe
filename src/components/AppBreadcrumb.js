import React from 'react'
import { isObjectEmpty } from 'src/functions'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const AppBreadcrumb = () => {
  const project = useSelector((state) => state.Navigation.project)
  const projectRepresentation = useSelector((state) => state.Navigation.projectRepresentation)
  const onClickProjectPrep = () => {
    let projectz = JSON.parse(localStorage.getItem('project'))
    if (projectz) {
      window.location.href = '/projectrepresentation'
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Please select Current Project',
        icon: 'warning',
        confirmButtonText: 'Ok',
      })
    }
  }
  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/currentproject">
        {!isObjectEmpty(project) ? project.projectName : 'Please select Project'}
      </CBreadcrumbItem>
      <CBreadcrumbItem onClick={() => onClickProjectPrep()} href="#">
        {!isObjectEmpty(projectRepresentation)
          ? projectRepresentation.projectRepresentationName
          : 'Please select Representation'}
      </CBreadcrumbItem>
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
