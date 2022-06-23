import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CLink,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { ReactComponent as Logo } from 'src/assets/images/logoimg.svg'
import { ReactComponent as LabelLogo } from 'src/assets/images/logolabel.svg'
import { useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import './Login.css'
// import { doLogin } from '../../../redux/actions'
import axios from 'axios'
import { URL } from 'src/constants'

const Login = () => {
  // const dispatch = useDispatch()
  const [email, setEmail] = useState('') //('user@example.com')
  const [password, setPassword] = useState('') //('Test123')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const history = useHistory()
  function validateForm() {
    return email.length > 0 && password.length > 0
  }
  function emailValidation() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    /* const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      return false
    }
    return true
    */
  }
  useEffect(() => {
    const token = localStorage.getItem('idToken')
    if (token === undefined || token === '' || token === 'undefined' || token === null) {
      localStorage.clear()
    }
  }, [])

  function loginSubmit() {
    setError('')
    if (!validateForm()) {
      setVisible(true)
      setError('Email & Password cannot be empty')
      return
    }
    if (!emailValidation()) {
      setVisible(true)
      setError('Email is not Valid')
      return
    }
    let payload = { email: email, password: password }
    // dispatch(doLogin(payload))
    // history.push('/dashboard')

    axios
      .post(URL.LOGIN, payload)
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          localStorage.setItem('idToken', res.token)
          localStorage.setItem('user', JSON.stringify(res))
          history.push('/dashboard')
        } else if (res.status === 401) {
          setError('Your Email or Password is wrong.')
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError('Your Email or Password is wrong.')
        }
        return err
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Error</CModalTitle>
          </CModalHeader>
          <CModalBody>{error}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </>
      <CContainer className="login-font">
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4 login-card">
                <CCardBody>
                  <div className="login-header">
                    <LabelLogo />
                    <Logo className="login-logo" />
                  </div>
                  <div className="login-title">
                    <h4>Mine Budgeting System</h4>
                  </div>
                  <div className="login-sub-title">
                    <h5>Please sign in with your registered email address</h5>
                  </div>
                  <hr className="solid" />
                  <CForm onSubmit={loginSubmit}>
                    <p className="text-body">E-mail Addres</p>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <p className="text-body">Password</p>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="login-forgot-password">
                      <CLink href="#" target="_blank">
                        forgot your password?
                      </CLink>
                    </div>
                    <CRow>
                      <CCol xl={12}>
                        <button type="button" className="login-button-login" onClick={loginSubmit}>
                          Sign In
                        </button>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
