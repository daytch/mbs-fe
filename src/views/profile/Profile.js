import React, { useState, useEffect, useRef } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CCardFooter,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import frLocale from 'date-fns/locale/fr'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCountriesCurrencies,
  getCompany,
  getRole,
  putUser,
  uploadFile,
  updateRole,
  updatePassword,
} from '../../redux/actions'
import CreatableSelect from 'react-select/creatable'
import UploadAvatar from './UploadAvatar'
import Swal from 'sweetalert2'
import Spinner from '../../components/Spinner'
import { isEmptyNullOrUndefined } from '../../functions'

const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
const mediumRegex = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
)

const Profile = () => {
  const dispatch = useDispatch()
  const [defaultImage] = useState('http://cdn.onlinewebfonts.com/svg/img_264570.png')
  const user = JSON.parse(localStorage.getItem('user'))
  const [mypic, setMypic] = useState(user.image ? user.image : defaultImage)
  console.log(user)
  const [fullname, setFullname] = useState(user.name ? user.name : '')
  const [email, setEmail] = useState(user.email ? user.email : '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [birthdate, setBirthdate] = useState(user.birthDate ? user.birthDate : '')
  const [country, setCountry] = useState(user.countryId ? user.countryId : '')
  const [occupation, setOccupation] = useState(user.occupation ? user.occupation : '')
  const [role, setRole] = useState('')
  const [roleName, setRoleName] = useState(user.role ? user.role : '')
  const [visible, setVisible] = useState(false)
  const [activeKey, setActiveKey] = useState(1)
  const [currpassword, setCurrPassword] = useState('')
  const [companySource, setCompanySource] = useState(
    user.companySourceId ? user.companySourceId : '',
  )
  const [toast, addToast] = useState(0)

  const [msgColor, setMsgColor] = useState('')
  const [msgPassword1, setMsgPassword1] = useState('')
  const [msgPassword2, setMsgPassword2] = useState('')
  const toaster = useRef()

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

  const ToastSuccess = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been saved!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

  const ToastSuccessDelete = (
    <CToast className="align-items-center" color="success">
      <div className="d-flex">
        <CToastBody>Data has been deleted!</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )

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
  useEffect(() => {
    dispatch(getCountriesCurrencies())
    dispatch(getCompany())
    dispatch(getRole())
    setMessageProcess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, err])

  function passwordChange(e) {
    if (strongRegex.test(e.target.value)) {
      setMsgColor('#0F9D58')
      setMsgPassword1('Strong password, good job!')
    } else if (mediumRegex.test(e.target.value)) {
      setMsgColor('#F4B400')
      setMsgPassword1('Weak password!')
    } else {
      setMsgColor('#DB4437')
      setMsgPassword1('8-character minimum, case sensitive')
      setMsgPassword1('Minimum of 1 symbol, 1 capital letter, and 1 numeric')
    }
  }

  function confirmPasswordChange(e) {
    if (strongRegex.test(e.target.value)) {
      setMsgColor('#0F9D58')
      setMsgPassword2('Strong password,good job!')
    } else if (mediumRegex.test(e.target.value)) {
      setMsgColor('#F4B400')
      setMsgPassword2('Weak password!')
    } else {
      setMsgColor('#DB4437')
      setMsgPassword2('8-character minimum, case sensitive')
      setMsgPassword2('Minimum of 1 symbol, 1 capital letter, and 1 numeric')
    }
  }

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
  const url_uploaded = useSelector((state) => state.User.image)
  const loading = useSelector((state) => state.User.loading)

  useEffect(() => {
    setMypic(url_uploaded)
  }, [url_uploaded])

  const onSaveTab1 = (payload) => {
    var isError = true
    //let msgErr = ''
    if (fullname === '') {
      //msgErr = 'Fullname is required'
    } else if (birthdate === '') {
      //msgErr = 'Birthdate is required'
    } else if (country === '') {
      //msgErr = 'Country is required'
    } else if (occupation === '') {
      //msgErr = 'Occupation is required'
    } else if (companySource === '') {
      //msgErr = 'Company is required'
    } else {
      isError = false
    }
    if (isError) {
      //
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in the required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    } else {
      dispatch(putUser(payload))
    }
  }

  const onSaveTab2 = (payload) => {
    let msgErr = ''
    if (role === '') {
      msgErr = 'Role is required'
      Swal.fire({
        title: 'Validation Error',
        text: msgErr,
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    } else {
      dispatch(updateRole(payload))
    }
  }

  const onSaveTab3 = () => {
    if (
      isEmptyNullOrUndefined(currpassword) ||
      isEmptyNullOrUndefined(password) ||
      isEmptyNullOrUndefined(confirmPassword)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
      })
    } else if (!strongRegex.test(confirmPassword) || !strongRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password is too weak!',
      })
    } else if (confirmPassword !== password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password and Confirmation Password does not match!',
      })
    } else {
      var payload = {
        email: user.email,
        password: currpassword,
        newPassword: password,
      }
      dispatch(updatePassword(payload))
    }
  }

  const onClickSave = () => {
    let payload = {}
    switch (activeKey) {
      case 1:
        payload = {
          name: fullname,
          token: user.token,
          email: user.email,
          image: mypic ? mypic : user.image,
          role: role,
          birthDate: birthdate,
          occupation: occupation,
          companySourceID: companySource,
          countryId: country,
        }
        onSaveTab1(payload)
        break
      case 2:
        payload = {
          email: user.email,
          roleId: role,
          roleName: roleName,
        }
        onSaveTab2(payload)
        break
      case 3:
        onSaveTab3()
        break
      default:
    }
  }

  const onClickUploadImage = () => {
    if (mypic) {
      console.log('onClickUploadImage')
      dispatch(uploadFile(mypic))
    } else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please select an image!.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
    }
  }

  const renderTabsAdmin = () => {
    return (
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Personal Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 2} onClick={() => setActiveKey(2)}>
              Role
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#!"
              active={activeKey === 3}
              onClick={() => {
                setActiveKey(3)
              }}
            >
              Password
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="equipment-tab" visible={activeKey === 1}>
            <div className="p-5">
              <center className="mb-5">
                {mypic ? (
                  <CAvatar src={mypic} size="xl" onClick={() => setVisible(true)} />
                ) : user.image ? (
                  <CAvatar src={user.image} size="xl" onClick={() => setVisible(true)} />
                ) : (
                  <CAvatar src={defaultImage} size="xl" onClick={() => setVisible(true)} />
                )}
              </center>
              <CForm>
                <div className="mb-3">
                  <div className="form-group row">
                    <CFormLabel htmlFor="fullname" className="col-sm-3">
                      Full Name <span className="text-danger">*</span>
                    </CFormLabel>
                    <div className="col-sm-9">
                      <CFormInput
                        onChange={(e) => setFullname(e.currentTarget.value)}
                        value={fullname}
                        rows="3"
                        placeholder="Full Name"
                      />
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
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email"
                        autoComplete="email"
                        readOnly={true}
                      />
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
                          value={birthdate}
                          onChange={(newValue) => {
                            setBirthdate(newValue)
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
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
                        onChange={(e) => setCountry(e ? e.value : '')}
                        value={countries.filter((item) => item.value === country)}
                        options={countries}
                      />
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
                        onChange={(e) => setCompanySource(e ? e.value : '')}
                        value={company.filter((item) => item.value === companySource)}
                        options={company}
                      />
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
                        value={occupation}
                        onChange={(e) => setOccupation(e.currentTarget.value)}
                        rows="3"
                        placeholder="Occupation"
                      />
                    </div>
                  </div>
                </div>
              </CForm>
            </div>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="personnel-tab" visible={activeKey === 2}>
            <CForm className="p-5">
              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="role" className="col-sm-3">
                    Role <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CreatableSelect
                      isClearable
                      onChange={(e) => {
                        setRole(e ? e.value : '')
                        setRoleName(e ? e.label : '')
                      }}
                      value={roles.filter((item) => item.label === roleName)}
                      options={roles}
                    />
                  </div>
                </div>
              </div>
            </CForm>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="materials-tab" visible={activeKey === 3}>
            <CForm className="p-5">
              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="currpassword" className="col-sm-3">
                    Current Password <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CFormInput
                      value={currpassword}
                      onChange={(e) => setCurrPassword(e.currentTarget.value)}
                      rows="3"
                      type="password"
                      placeholder="Current Password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="password" className="col-sm-3">
                    Password <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CFormInput
                      value={password}
                      onChange={(e) => {
                        passwordChange(e)
                        setPassword(e.currentTarget.value)
                      }}
                      rows="3"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    <p
                      className="font-light text-base mt-3 text-center"
                      style={{ color: msgColor }}
                    >
                      {msgPassword1}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="repassword" className="col-sm-3">
                    Confirmation Password <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CFormInput
                      value={confirmPassword}
                      onChange={(e) => {
                        confirmPasswordChange(e)
                        setConfirmPassword(e.currentTarget.value)
                      }}
                      rows="3"
                      type="password"
                      placeholder="Confirmation Password"
                      autoComplete="new-password"
                    />
                    <p className="font-light text-base text-center" style={{ color: msgColor }}>
                      {msgPassword2}
                    </p>
                  </div>
                </div>
              </div>
            </CForm>
          </CTabPane>
        </CTabContent>
      </>
    )
  }

  const renderTabsNonAdmin = () => {
    return (
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink href="#!" active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Personal Data
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#!"
              active={activeKey === 3}
              onClick={() => {
                setActiveKey(3)
              }}
            >
              Password
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="equipment-tab" visible={activeKey === 1}>
            <div className="p-5">
              <center className="mb-5">
                {mypic ? (
                  <CAvatar src={mypic} size="xl" onClick={() => setVisible(true)} />
                ) : user.image ? (
                  <CAvatar src={user.image} size="xl" onClick={() => setVisible(true)} />
                ) : (
                  <CAvatar src={defaultImage} size="xl" onClick={() => setVisible(true)} />
                )}
              </center>
              <CForm>
                <div className="mb-3">
                  <div className="form-group row">
                    <CFormLabel htmlFor="fullname" className="col-sm-3">
                      Full Name <span className="text-danger">*</span>
                    </CFormLabel>
                    <div className="col-sm-9">
                      <CFormInput
                        onChange={(e) => setFullname(e.currentTarget.value)}
                        value={fullname}
                        rows="3"
                        placeholder="Full Name"
                      />
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
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email"
                        autoComplete="email"
                        readOnly={true}
                      />
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
                          value={birthdate}
                          onChange={(newValue) => {
                            setBirthdate(newValue)
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
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
                        onChange={(e) => setCountry(e ? e.value : '')}
                        value={countries.filter((item) => item.value === country)}
                        options={countries}
                      />
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
                        onChange={(e) => setCompanySource(e ? e.value : '')}
                        value={company.filter((item) => item.value === companySource)}
                        options={company}
                      />
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
                        value={occupation}
                        onChange={(e) => setOccupation(e.currentTarget.value)}
                        rows="3"
                        placeholder="Occupation"
                      />
                    </div>
                  </div>
                </div>
              </CForm>
            </div>
          </CTabPane>

          <CTabPane role="tabpanel" aria-labelledby="materials-tab" visible={activeKey === 3}>
            <CForm className="p-5">
              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="currpassword" className="col-sm-3">
                    Current Password <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CFormInput
                      value={currpassword}
                      onChange={(e) => setCurrPassword(e.currentTarget.value)}
                      rows="3"
                      type="password"
                      placeholder="Current Password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="password" className="col-sm-3">
                    Password <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CFormInput
                      value={password}
                      onChange={(e) => {
                        passwordChange(e)
                        setPassword(e.currentTarget.value)
                      }}
                      rows="3"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    <p
                      className="font-light text-base mt-3 text-center"
                      style={{ color: msgColor }}
                    >
                      {msgPassword1}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group row">
                  <CFormLabel htmlFor="repassword" className="col-sm-3">
                    Confirmation Password <span className="text-danger">*</span>
                  </CFormLabel>
                  <div className="col-sm-9">
                    <CFormInput
                      value={confirmPassword}
                      onChange={(e) => {
                        confirmPasswordChange(e)
                        setConfirmPassword(e.currentTarget.value)
                      }}
                      rows="3"
                      type="password"
                      placeholder="Confirmation Password"
                      autoComplete="new-password"
                    />
                    <p className="font-light text-base text-center" style={{ color: msgColor }}>
                      {msgPassword2}
                    </p>
                  </div>
                </div>
              </div>
            </CForm>
          </CTabPane>
        </CTabContent>
      </>
    )
  }

  return (
    <CRow>
      <Spinner loading={loading} />
      <CCol xs={12}>
        <CToaster ref={toaster} push={toast} placement="bottom-end" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User Profile</strong>
          </CCardHeader>
          <CCardBody>
            <CModal alignment="center" scrollable visible={visible} size="lg">
              <CModalHeader>
                <CModalTitle>Upload Avatar</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <UploadAvatar setMypic={setMypic} />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)} size="sm">
                  Close
                </CButton>
                <CButton color="primary" onClick={onClickUploadImage} size="sm">
                  Save changes
                </CButton>
              </CModalFooter>
            </CModal>

            {isEmptyNullOrUndefined(user.role) || user.role.toLowerCase().indexOf('admin') === -1
              ? renderTabsNonAdmin()
              : renderTabsAdmin()}
          </CCardBody>
          <CCardFooter>
            <CButton color="primary" onClick={onClickSave} type="submit" size="sm">
              Save changes
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
