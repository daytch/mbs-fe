import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectDashboard } from '../../redux/actions'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import DataTable from 'react-data-table-component'

const Dashboard = () => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const dispatch = useDispatch()

  const dashboardColumns = [
    {
      name: 'Project Name',
      selector: (row) => row.projectName,
      sortable: true,
    },
    {
      name: 'Country',
      selector: (row) => row.countryName,
      sortable: true,
    },
    {
      name: 'Sub category',
      selector: (row) => {
        if (row.subCategory.toLowerCase().indexOf('cooper') !== -1) {
          return (
            <Fragment>
              <i style={{ color: '#B87333' }}>{row.subCategory} </i>
            </Fragment>
          )
        } else if (row.subCategory.toLowerCase().indexOf('gold') !== -1) {
          return (
            <Fragment>
              <i style={{ color: '#FFD700' }}>{row.subCategory} </i>
            </Fragment>
          )
        } else if (row.subCategory.toLowerCase().indexOf('silver') !== -1) {
          return (
            <Fragment>
              <i style={{ color: '#C0C0C0' }}>{row.subCategory} </i>
            </Fragment>
          )
        } else if (row.subCategory.toLowerCase().indexOf('platinum') !== -1) {
          return (
            <Fragment>
              <i style={{ color: '#D3D3D3' }}>{row.subCategory} </i>
            </Fragment>
          )
        } else if (row.subCategory.toLowerCase().indexOf('coal') !== -1) {
          return (
            <Fragment>
              <i style={{ color: '#151716' }}>{row.subCategory} </i>
            </Fragment>
          )
        } else {
          return row.subCategory
        }
      },
      sortable: false,
    },
  ]

  useEffect(() => {
    dispatch(getProjectDashboard())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const projects = useSelector((state) => state.Project.dataProjectDashboard.projects)
  const arrLabelTotalProject = useSelector((state) => {
    if (state.Project.dataProjectDashboard.projectWeekly) {
      let dataWeekly = state.Project.dataProjectDashboard.projectWeekly
      let arrWeek = []
      for (var item in dataWeekly) {
        arrWeek.push(item)
      }
      return arrWeek
    }
  })
  const arrDataTotalProject = useSelector((state) => {
    if (state.Project.dataProjectDashboard.projectWeekly) {
      let dataWeekly = state.Project.dataProjectDashboard.projectWeekly
      let arrValueWeek = []
      for (let i = 0; i < arrLabelTotalProject.length; i++) {
        arrValueWeek.push(dataWeekly[arrLabelTotalProject[i]])
      }
      return arrValueWeek
    }
  })
  const totalProject = useSelector((state) => state.Project.dataProjectDashboard.totalProject)
  const percProject = useSelector((state) => {
    return state.Project.dataProjectDashboard.percentage
      ? state.Project.dataProjectDashboard.percentage
      : 0
  })
  let p = random(0, 100)
  return (
    <>
      <CRow>
        <CCol sm="12" lg="6">
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm="3">
                  Total Project Created
                  <h1>{totalProject}</h1>
                </CCol>
                <CCol sm="7">
                  {arrDataTotalProject && arrLabelTotalProject && (
                    <CChartLine
                      style={{ height: '300px', marginTop: '40px' }}
                      data={{
                        labels: arrLabelTotalProject,
                        datasets: [
                          {
                            label: 'Total Project Created',
                            backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                            borderColor: getStyle('--cui-info'),
                            pointHoverBackgroundColor: getStyle('--cui-info'),
                            borderWidth: 2,
                            data: arrDataTotalProject,
                            fill: true,
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            grid: {
                              drawOnChartArea: false,
                            },
                          },
                          y: {
                            ticks: {
                              beginAtZero: true,
                              maxTicksLimit: 5,
                              stepSize: Math.ceil(250 / 5),
                              max: 250,
                            },
                          },
                        },
                        elements: {
                          line: {
                            tension: 0.4,
                          },
                          point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4,
                            hoverBorderWidth: 3,
                          },
                        },
                      }}
                    />
                  )}
                </CCol>
                <CCol sm="2">
                  {percProject.toString().indexOf('-') === -1 ? (
                    <center style={{ verticalAlign: 'middle' }}>
                      <h3 style={{ color: 'green' }}>{percProject}%</h3>
                    </center>
                  ) : (
                    <center style={{ verticalAlign: 'middle' }}>
                      <h3 style={{ color: 'red' }}>{percProject}%</h3>
                    </center>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12" lg="6">
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm="3">
                  Total Project Budget Cost
                  <h1>${random(1, 9)}M</h1>
                </CCol>
                <CCol sm="7">
                  {arrDataTotalProject && arrLabelTotalProject && (
                    <CChartLine
                      style={{ height: '300px', marginTop: '40px' }}
                      data={{
                        labels: arrLabelTotalProject,
                        datasets: [
                          {
                            label: 'Total Project Budget Cost',
                            backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                            borderColor: getStyle('--cui-success'),
                            pointHoverBackgroundColor: getStyle('--cui-success'),
                            borderWidth: 2,
                            data: [random(0, 7), random(0, 10), random(0, 5), random(0, 9)],
                            fill: true,
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            grid: {
                              drawOnChartArea: false,
                            },
                          },
                          y: {
                            ticks: {
                              beginAtZero: true,
                              maxTicksLimit: 5,
                              stepSize: Math.ceil(250 / 5),
                              max: 250,
                            },
                          },
                        },
                        elements: {
                          line: {
                            tension: 0.4,
                          },
                          point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4,
                            hoverBorderWidth: 3,
                          },
                        },
                      }}
                    />
                  )}
                </CCol>
                <CCol sm="2">
                  {p.toString().indexOf('-') === -1 ? (
                    <center style={{ verticalAlign: 'middle' }}>
                      <h3 style={{ color: 'green' }}>{p}%</h3>
                    </center>
                  ) : (
                    <center style={{ verticalAlign: 'middle' }}>
                      <h3 style={{ color: 'red' }}>{p}%</h3>
                    </center>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm="12">
                  {/* <CurrentProject pageType="dashboard" /> */}
                  <DataTable columns={dashboardColumns} data={projects} pagination />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
