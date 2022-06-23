/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
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
  CToastBody,
  CToastClose,
  CToaster,
  CForm,
  CFormInput,
  CFormFeedback,
} from '@coreui/react'
import TextField from '@mui/material/TextField'
import CreatableSelect from 'react-select/creatable'
import { cilPencil, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { formatDate, dateToString, isEmptyNullOrUndefined } from '../../functions'
// import frLocale from 'date-fns/locale/fr'

import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import {
  getUser,
  getCountriesCurrencies,
  getCompany,
  getRole,
  postUser,
  putUser,
  deleteUser,
} from '../../redux/actions'

const User = () => {
  const [visible, setVisible] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const dispatch = useDispatch()
  const [firstLoad, setFirstLoad] = useState(true)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [country, setCountry] = useState('')
  const [occupation, setOccupation] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState('')
  const [roleName, setRoleName] = useState('')
  const [companySource, setCompanySource] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  // eslint-disable-next-line
  const [validated, setValidated] = useState(false)

  const isLoading = useSelector((state) => state.User.loading)

  const err = useSelector((state) => state.User.error)
  const msg = useSelector((state) => state.User.message)
  const isDeleted = useSelector((state) => state.User.isDeleted)

  const setMessageProcess = () => {
    if (err) {
      addToast(ToastError(err))
    } else if (msg && isDeleted) {
      addToast(ToastSuccessDelete)
    } else if (msg && !isDeleted) {
      addToast(ToastSuccess)
    }
  }

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
    } else {
      setMessageProcess()
    }
    // setMessageProcess()
    dispatch(getCountriesCurrencies())
    dispatch(getCompany())
    dispatch(getRole())
    dispatch(getUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, err])

  const countries = useSelector((state) => {
    if (state.Country.datas) {
      return state.Country.datas.map((item) => {
        return { value: item.countryId, label: item.countryName }
      })
    } else {
      return []
    }
  })
  const company = useSelector((state) => {
    if (state.Company.data) {
      return state.Company.data.map((item) => {
        return { value: item.companySourceId, label: item.companyName }
      })
    } else {
      return []
    }
  })
  const roles = useSelector((state) => {
    if (state.User.dataRole) {
      return state.User.dataRole.map((item) => {
        return { value: item.id, label: item.name }
      })
    } else {
      return []
    }
  })
  const datas = useSelector((state) => {
    if (state.User.data) {
      return state.User.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          birthDate: item.birthDate,
          country: item.countryId
            ? countries.find((country) => country.value === item.countryId)?.label
            : '',
          companySource: item.companySourceId
            ? company.find((company) => company.value === item.companySourceId)?.label
            : '',
          occupation: item.occupation,
          role: item.role,
          image: item.image,
        }
      })
    }
  })

  const onCloseResetAll = () => {
    setId('')
    setName('')
    setEmail('')
    setPassword('')
    setBirthdate('')
    setCountry('')
    setOccupation('')
    setRole('')
    setCompanySource('')
    setImage('')
    setIsEdit(false)
  }

  const onClickEdit = (row) => {
    setIsEdit(true)
    setId(row.id)
    setName(row.name)
    setEmail(row.email)
    setPassword(row.password)
    setBirthdate(row.birthDate)
    setCountry(row.country)

    setImage(row.image)
    if (row.country) {
      setSelectedCountry(countries.find((country) => country.label === row.country))
    }
    setOccupation(row.occupation)

    setRoleName(row.role)
    setRole(row.role)
    if (row.role) {
      setSelectedRole(roles.find((role) => role.label === row.role))
    }
    setCompanySource(row.companySource)
    if (row.companySource) {
      setSelectedCompany(company.find((company) => company.label === row.companySource))
    }
    setVisible(!visible)
  }

  const onClickDelete = (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let param = { email: row.email }
        dispatch(deleteUser(param))
      }
    })
  }

  const renderButtonAction = (row) => {
    return (
      <>
        <CButton
          color="warning"
          variant="outline"
          onClick={() => onClickEdit(row)}
          className="mx-1"
        >
          <CIcon icon={cilPencil} />
        </CButton>
        <CButton
          color="danger"
          variant="outline"
          onClick={() => onClickDelete(row)}
          className="mx-1"
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </>
    )
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Birthdate',
      selector: (row) => (row.birthDate ? formatDate(row.birthDate) : ''),
      sortable: true,
    },
    {
      name: 'Occupation',
      selector: (row) => row.occupation,
      sortable: true,
    },
    {
      name: 'Country',
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => renderButtonAction(row),
      sortable: false,
    },
  ]

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }
    if (form.checkValidity() === true) {
      let comp = company.find((item) => {
        if (isNaN(companySource)) {
          return item.label === companySource
        } else {
          return item.value === companySource
        }
      })
      let c = countries.find((item) => {
        if (isNaN(country)) {
          return item.label === country
        } else {
          return item.value === country
        }
      })

      let payload = {
        name: name,
        email: email,
        password: password,
        roleName: roleName,
        birthDate: birthdate,
        occupation: occupation,
        companySourceId: comp ? comp.value : '',
        countryId: c ? c.value : '',
        image: image,
      }

      if (
        isEmptyNullOrUndefined(payload.name) ||
        isEmptyNullOrUndefined(payload.email) ||
        // isEmptyNullOrUndefined(payload.password) ||
        isEmptyNullOrUndefined(payload.birthDate) ||
        isEmptyNullOrUndefined(payload.occupation) ||
        isEmptyNullOrUndefined(payload.companySourceId) ||
        isEmptyNullOrUndefined(payload.countryId)
      ) {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Please fill in all the fields!',
        // })
      } else {
        if (id) {
          let user = JSON.parse(localStorage.getItem('user'))
          if (user.email === payload.email) {
            payload.image = user.image
          }
          dispatch(putUser(payload))
        } else {
          dispatch(postUser(payload))
        }
      }
    }
  }

  const ToastSuccess = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been saved!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const ToastError = (errorText) => {
    return (
      <CToast className="align-items-center" color="warning">
        <div className="d-flex">
          <CToastBody>{errorText}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    )
  }

  const renderModal = () => {
    return (
      <CModal
        size="lg"
        alignment="center"
        scrollable
        backdrop="static"
        visible={visible}
        onClose={onCloseResetAll}
      >
        <CForm
          className="g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalHeader className="px-5">
            <CModalTitle>{id > 0 ? 'Update Data' : 'Add Data'}</CModalTitle>
          </CModalHeader>
          <CModalBody className="px-5">
            <div className="mb-3">
              <div className="form-group row">
                <CFormLabel htmlFor="name" className="col-sm-3">
                  Full Name <span className="text-danger">*</span>
                </CFormLabel>
                <div className="col-sm-9">
                  <CFormInput
                    onChange={(e) => setName(e.currentTarget.value)}
                    value={name ?? ''}
                    rows="3"
                    required
                    placeholder="Name"
                  />
                  <CFormFeedback invalid>Full Name is required</CFormFeedback>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-group row">
                <CFormLabel htmlFor="email" className="col-sm-3">
                  Email Address <span className="text-danger">*</span>
                </CFormLabel>
                <div className="col-sm-9">
                  <CFormInput
                    type="email"
                    value={email ?? ''}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder="Email"
                    autoComplete="email"
                    readOnly={id ? true : false}
                    required
                  />
                  <CFormFeedback invalid>Email Address is required</CFormFeedback>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="form-group row">
                <CFormLabel htmlFor="birthdate" className="col-sm-3">
                  Birthdate <span className="text-danger">*</span>
                </CFormLabel>
                <div className="col-sm-9">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Birthdate"
                      value={birthdate ?? new Date()}
                      onChange={(newValue) => {
                        setBirthdate(dateToString(newValue))
                      }}
                      required
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <CFormFeedback invalid>Birthdate is required</CFormFeedback>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-group row">
                <CFormLabel htmlFor="country" className="col-sm-3">
                  Country <span className="text-danger">*</span>
                </CFormLabel>
                <div className="col-sm-9">
                  <CreatableSelect
                    isClearable
                    onChange={(e) => {
                      setCountry(e ? e.value : '')
                      setSelectedCountry(e ? e : '')
                    }}
                    value={countries.filter((item) => item.value === selectedCountry.value)}
                    options={countries}
                    required
                  />
                  <CFormFeedback invalid>Country is required</CFormFeedback>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-group row">
                <CFormLabel htmlFor="company" className="col-sm-3">
                  Company Name <span className="text-danger">*</span>
                </CFormLabel>
                <div className="col-sm-9">
                  <CreatableSelect
                    isClearable
                    onChange={(e) => {
                      setCompanySource(e ? e.value : '')
                      setSelectedCompany(e ? e : '')
                    }}
                    value={company.filter((item) => item.value === selectedCompany.value)}
                    options={company}
                    required
                  />
                  <CFormFeedback invalid>Company Name is required</CFormFeedback>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-group row">
                <CFormLabel htmlFor="occupation" className="col-sm-3">
                  Occupation <span className="text-danger">*</span>
                </CFormLabel>
                <div className="col-sm-9">
                  <CFormInput
                    value={occupation ?? ''}
                    onChange={(e) => setOccupation(e.currentTarget.value)}
                    rows="3"
                    placeholder="Occupation"
                    required
                  />
                  <CFormFeedback invalid>Occupation is required</CFormFeedback>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-group row">
                <CFormLabel htmlFor="role" className="col-sm-3">
                  Role
                </CFormLabel>
                <div className="col-sm-9">
                  <CreatableSelect
                    isClearable
                    onChange={(e) => {
                      setRole(e ? e.value : '')
                      setRoleName(e ? e.label : '')
                      setSelectedRole(e ? e : '')
                    }}
                    value={roles.filter((item) => item.value === selectedRole.value)}
                    options={roles}
                  />
                </div>
              </div>
            </div>
            {!isEdit && (
              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="password" className="col-sm-3">
                    Password <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CFormInput
                      value={password ?? ''}
                      onChange={(e) => {
                        setPassword(e.currentTarget.value)
                      }}
                      rows="3"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)} size="sm">
              Close
            </CButton>
            <CButton color="primary" type="submit" size="sm">
              Save changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    )
  }

  return (
    <>
      <Spinner loading={isLoading} />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CToaster ref={toaster} push={toast} placement="bottom-end" />
            <CCardHeader>
              <strong>User Management</strong>
            </CCardHeader>
            <CCardBody>
              <CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
                Create New
              </CButton>
              {renderModal()}
              {datas && <DataTable columns={columns} data={datas} pagination />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default User
