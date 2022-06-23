import React, { useState, useRef } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CModal,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'

import DataTable from 'react-data-table-component'

const renderButtonAction = () => {
  return (
    <>
      <CButton color="warning" variant="outline" className="mr-2">
        <CIcon icon={cilPencil} />
      </CButton>
      <CButton color="danger" variant="outline">
        <CIcon icon={cilTrash} />
      </CButton>
    </>
  )
}

const columns = [
  {
    name: 'Country',
    selector: (row) => row.country,
    sortable: true,
  },
  {
    name: 'Category',
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: 'Sub-category',
    selector: (row) => row.subcategory,
    sortable: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    sortable: false,
  },
]

const data = [
  {
    id: 1,
    country: 'Indonesia',
    category: 'Underground',
    subcategory: 'Gold',
    action: renderButtonAction(),
  },
  {
    id: 2,
    country: 'Indonesia',
    category: 'Open Pit',
    subcategory: 'Coal',
    action: renderButtonAction(),
  },
  {
    id: 3,
    country: 'Indonesia',
    category: 'Underground',
    subcategory: 'Gold',
    action: renderButtonAction(),
  },
  {
    id: 4,
    country: 'Indonesia',
    category: 'Open Pit',
    subcategory: 'Coal',
    action: renderButtonAction(),
  },
  {
    id: 5,
    country: 'Japan',
    category: 'Open Pit',
    subcategory: 'Gold',
    action: renderButtonAction(),
  },
  {
    id: 6,
    country: 'Japan',
    category: 'Open Pit',
    subcategory: 'Coal',
    action: renderButtonAction(),
  },
  {
    id: 7,
    country: 'Indonesia',
    category: 'Underground',
    subcategory: 'Coal',
    action: renderButtonAction(),
  },
  {
    id: 8,
    country: 'USA',
    category: 'Open Pit',
    subcategory: 'Silver',
    action: renderButtonAction(),
  },
]

const ExamplePage = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const Modal = () => {
    return (
      <CModal
        size="lg"
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Add Data</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="mb-3">
            <CFormLabel htmlFor="projectName" className="col-sm-2 col-form-label">
              Name
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput size="sm" placeholder="Please input project name" id="projectName" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="category" className="col-sm-2 col-form-label">
              Category
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect
                aria-label="Please select Category"
                options={[
                  'Please select Category',
                  { label: 'Open Pit', value: '1' },
                  { label: 'Undergroud', value: '2' },
                  { label: 'Mining', value: '3' },
                ]}
                size="sm"
                id="category"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="subCategory" className="col-sm-2 col-form-label">
              Sub-Category
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect
                aria-label="Please select Sub-Category"
                options={[
                  'Please select Sub-Category',
                  { label: 'Gold', value: '1' },
                  { label: 'Silver', value: '2' },
                  { label: 'Coal', value: '3' },
                  { label: 'Copper', value: '4' },
                  { label: 'Iron', value: '5' },
                ]}
                size="sm"
                id="subCategory"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="country" className="col-sm-2 col-form-label">
              Country
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect
                aria-label="Please select Country"
                options={[
                  'Please select Country',
                  { label: 'Australia', value: '1' },
                  { label: 'Indonesia', value: '2' },
                  { label: 'Japan', value: '3' },
                  { label: 'USA', value: '4' },
                  { label: 'Iron', value: '5' },
                ]}
                size="sm"
                id="country"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="notes" className="col-sm-2 col-form-label">
              Notes
            </CFormLabel>
            <CCol sm={10}>
              <CFormTextarea
                size="sm"
                id="notes"
                rows="3"
                placeholder="Please input Notes"
              ></CFormTextarea>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)} size="sm">
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              setVisible(false)
              addToast(Toast)
            }}
            size="sm"
          >
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }

  const Toast = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been saved!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CToaster ref={toaster} push={toast} placement="bottom-end" />
          <CCardHeader>
            <strong>Current Project</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
              Create New
            </CButton>
            <Modal />
            <DataTable columns={columns} data={data} pagination />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExamplePage
