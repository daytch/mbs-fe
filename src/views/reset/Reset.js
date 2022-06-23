import React, { useRef, useState } from 'react'
import {
  CCol,
  CCard,
  CCardGroup,
  CToaster,
  CCardBody,
  CForm,
  CInputGroup,
  CFormInput,
  CRow,
  CContainer,
} from '@coreui/react'
import { ReactComponent as LogoLogin } from 'src/assets/images/logoimg.svg'
import { ReactComponent as LabelLogoLogin } from 'src/assets/images/logolabel.svg'
import './../pages/login/Login.css'
import { isEmptyNullOrUndefined } from '../../functions'
import axios from 'axios'
import { URL } from 'src/constants'
import Swal from 'sweetalert2'

const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
const mediumRegex = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
)

const Reset = () => {
  let search = window.location.search
  let params = new URLSearchParams(search)
  let token = params.get('token')
  let email = params.get('email')
  const toaster = useRef()
  const [toast /*, addToast*/] = useState(0)
  const [msgColor, setMsgColor] = useState('')
  const [msgPassword, setMsgPassword] = useState('')
  const [msgPasswordConfirm, setMsgPasswordConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function passwordChange(e) {
    if (strongRegex.test(e.target.value)) {
      setMsgColor('#0F9D58')
      setMsgPassword('Strong password, good job!')
    } else if (mediumRegex.test(e.target.value)) {
      setMsgColor('#F4B400')
      setMsgPassword('Weak password!')
    } else {
      setMsgColor('#DB4437')
      setMsgPassword('8-character minimum, case sensitive')
      setMsgPassword('Minimum of 1 symbol, 1 capital letter, and 1 numeric')
    }
  }

  function confirmPasswordChange(e) {
    if (strongRegex.test(e.target.value)) {
      setMsgColor('#0F9D58')
      setMsgPasswordConfirm('Strong password,good job!')
    } else if (mediumRegex.test(e.target.value)) {
      setMsgColor('#F4B400')
      setMsgPasswordConfirm('Weak password!')
    } else {
      setMsgColor('#DB4437')
      setMsgPasswordConfirm('8-character minimum, case sensitive')
      setMsgPasswordConfirm('Minimum of 1 symbol, 1 capital letter, and 1 numeric')
    }
  }

  const loginSubmit = () => {
    if (isEmptyNullOrUndefined(password) || isEmptyNullOrUndefined(confirmPassword)) {
      Swal.fire({
        title: 'Empty Validation',
        text: 'Please fill mandatory field',
        icon: 'warning',
      })
    } else if (password !== confirmPassword) {
      Swal.fire({
        title: 'Empty Validation',
        text: 'Password and Confirm Password do not match',
        icon: 'warning',
      })
    } else {
      let payload = {
        email: email,
        token: token.replace(/\s/g, '+'),
        newPassword: password,
      }

      axios
        .post(URL.ACCOUNT + '/resetPassword', payload)
        .then((res) => {
          let data = res.data
          if (data?.email) {
            Swal.fire({
              title: 'Success',
              text: 'Your password has been reset. Please login with your new password',
              icon: 'success',
            })
          } else {
            Swal.fire({
              title: 'Empty Validation',
              text: res.data?.errors.toString(),
              icon: 'warning',
            })
          }
        })
        .catch((err) => {
          return err
        })
    }
  }

  return (
    <CContainer className="login-font">
      <CRow className="justify-content-center mt-5">
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CToaster ref={toaster} push={toast} placement="bottom-end" />
              <CCardBody>
                <div className="login-header">
                  <LabelLogoLogin />
                  <LogoLogin className="login-logo" />
                </div>
                <div className="login-title">
                  <h4>Mine Budgeting System</h4>
                </div>
                <div className="login-sub-title">
                  <h5>Please sign in with your registered email address</h5>
                </div>
                <hr className="solid" />
                <CForm onSubmit={loginSubmit}>
                  <p className="text-body">Password</p>
                  <CInputGroup className="mb-1">
                    <CCol xs={12}>
                      <CFormInput
                        value={password}
                        onChange={(e) => {
                          passwordChange(e)
                          setPassword(e.currentTarget.value)
                        }}
                        rows="12"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                    </CCol>
                    <CCol xs={12}>
                      <p
                        className="font-light text-base mt-3 text-center"
                        style={{ color: msgColor }}
                      >
                        {msgPassword}
                      </p>
                    </CCol>
                  </CInputGroup>
                  <p className="text-body">Confirmation Password</p>
                  <CInputGroup className="mb-1">
                    <CCol xs={12}>
                      <CFormInput
                        value={confirmPassword}
                        onChange={(e) => {
                          confirmPasswordChange(e)
                          setConfirmPassword(e.currentTarget.value)
                        }}
                        rows="12"
                        type="password"
                        placeholder="Confirmation Password"
                        autoComplete="new-password"
                      />
                    </CCol>
                    <CCol xs={12}>
                      <p className="font-light text-base text-center" style={{ color: msgColor }}>
                        {msgPasswordConfirm}
                      </p>
                    </CCol>
                  </CInputGroup>
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
  )
}

export default Reset
