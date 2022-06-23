/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react'
import './../../scss/home/home.scss'
import slider1 from 'src/assets/images/sectiontwo/slider1.svg'
import slider2 from 'src/assets/images/sectiontwo/slider2.svg'
import slider3 from 'src/assets/images/sectiontwo/slider3.svg'
import slider4 from 'src/assets/images/sectiontwo/slider4.svg'
import slider5 from 'src/assets/images/sectiontwo/slider5.svg'
import slider6 from 'src/assets/images/sectiontwo/slider6.svg'

import slider31 from 'src/assets/images/sectionthree/s3-01.svg'
import slider32 from 'src/assets/images/sectionthree/s3-02.svg'
import slider33 from 'src/assets/images/sectionthree/s3-03.svg'
import slider34 from 'src/assets/images/sectionthree/s3-04.svg'

import forecast from 'src/assets/images/forecast.svg'
import custom from 'src/assets/images/custom-algoritm.svg'
import project from 'src/assets/images/project.svg'
import mlstate from 'src/assets/images/stateML.svg'

import gear from 'src/assets/images/sectionfive/gear.svg'
import alarm from 'src/assets/images/sectionfive/alarm.svg'
import cctv from 'src/assets/images/sectionfive/cctv.svg'
import secure from 'src/assets/images/sectionfive/secure.svg'

import map from 'src/assets/images/sectionsix/usa-map.svg'
import logoMBS from 'src/assets/images/sectioneight/logo-mbs.svg'

import { ReactComponent as Logo } from 'src/assets/images/logoimg.svg'
import { ReactComponent as LabelLogo } from 'src/assets/images/logolabel.svg'
import Carousel from '../../components/Carousel/Carousel'
import Carousell from '../../components/Carousell/Carousell'
import CarouselSix from '../../components/CarouselSix/CarouselSix'
import {
  CContainer,
  CRow,
  CCol,
  CModal,
  CCardGroup,
  CCard,
  CForm,
  CInputGroup,
  CCardBody,
  CFormInput,
  CLink,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CFormTextarea,
} from '@coreui/react'
import { ReactComponent as LogoLogin } from 'src/assets/images/logoimg.svg'
import { ReactComponent as LabelLogoLogin } from 'src/assets/images/logolabel.svg'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin, forgotPassword } from '../../redux/actions'
import CIcon from '@coreui/icons-react'
import { cilX } from '@coreui/icons'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import axios from 'axios'
import { URL } from '../../constants'
import { useHistory } from 'react-router-dom'
// import Spinner from '../../components/Spinner'

const MyToast = (color, message) => {
  return (
    <CToast className="align-items-center" color={color}>
      <div className="d-flex">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )
}

const dataSlider = [
  {
    id: 1,
    image: slider1,
    title: 'Mining Budget Forecasting',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 2,
    image: slider2,
    title: 'Mining Solution Service',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 3,
    image: slider3,
    title: 'Pre-Feasibility & Feasibility',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 4,
    image: slider4,
    title: 'Cost Reporting',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 5,
    image: slider5,
    title: 'Human Activity Recognition',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 6,
    image: slider6,
    title: 'Object Detection',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
]
const dataSliderS3 = [
  {
    id: 1,
    image: slider31,
    title: 'Project Templates',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 2,
    image: slider32,
    title: 'Pivot Reporting',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 3,
    image: slider33,
    title: 'Manpower Planning',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 4,
    image: slider34,
    title: 'Equipment Training',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 1,
    image: slider31,
    title: 'Project Templates',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 2,
    image: slider32,
    title: 'Pivot Reporting',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 3,
    image: slider33,
    title: 'Manpower Planning',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 4,
    image: slider34,
    title: 'Equipment Training',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
]
const dataFeatures = [
  {
    id: 1,
    image: forecast,
    title: 'Forecast Budgeting',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 2,
    image: custom,
    title: 'Customizable Algorithm',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 3,
    image: project,
    title: 'Project Versioning',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    id: 4,
    image: mlstate,
    title: 'State of the ML performance',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
]
const dataEasySetup = [
  {
    id: 1,
    image: gear,
    title: 'Apply MB$ Subscription',
    total: 1,
  },
  {
    id: 2,
    image: cctv,
    title: 'Choose hundred of our Templates',
    total: 2,
  },
  {
    id: 3,
    image: alarm,
    title: 'Customize as you need',
    total: 3,
  },
  {
    id: 4,
    image: secure,
    title: 'Verifying data and AI will work the rest!',
    total: 4,
  },
]
const dataAchievement = [
  {
    id: 1,
    title: 'The Best AI Software for Mining Project Financial Budgeting',
    text: '“These are companies, like MB$, that are actually working to get our data onto personal servers so we own it, not the companies”',
    source: 'Forbes',
    url: 'https://www.forbes.com/',
  },
  {
    id: 2,
    title: 'The Best AI Software for Mining Project Financial Budgeting 2020 & 2021',
    text: '“These are companies, like MB$, that are actually working to get our data onto personal servers so we own it, not the companies”',
    source: 'The Wall Street Journal',
    url: 'https://www.wsj.com/',
  },
]
const Home = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('') //('user@example.com')
  const [password, setPassword] = useState('') //('Test123')
  const [emailForgot, setEmailForgot] = useState('')
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const history = useHistory()
  // const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleRequestDemo, setVisibleRequestDemo] = useState(false)
  const [reqType, setReqType] = useState('')
  const [loading, setLoading] = useState(false) // useSelector((state) => state.getLogin.loading)
  const [nameContactUs, setNameContactUs] = useState('')
  const [emailContactUs, setEmailContactUs] = useState('')
  const [contentContactUs, setContentContactUs] = useState('')
  function validateForm() {
    return email.length > 0 && password.length > 0
  }
  function emailValidation() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  const errorData = useSelector((state) => state.getLogin.error)

  useEffect(() => {
    const token = localStorage.getItem('idToken')
    if (token === undefined || token === '' || token === 'undefined' || token === null) {
      localStorage.clear()
    }
    //showErrorMessage(loading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const forgotPasswordz = () => {
    setLoading(true)
    axios({
      url: URL.ACCOUNT + '/forgotPassword',
      method: 'post',
      data: { email: emailForgot },
    })
      .then((res) => {
        setLoading(false)
        Swal.fire({
          title: 'Success',
          text: 'Please check your inbox!',
          icon: 'success',
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sendEmail = () => {
    setLoading(true)
    axios({
      url: URL.ACCOUNT + '/SendMail',
      method: 'post',
      data: {
        email: emailContactUs,
        name: nameContactUs,
        contentMail: contentContactUs,
        subjectMail: reqType === 'requestDemo' ? 'Request Demo' : 'Contact Us',
      },
    })
      .then((res) => {
        setLoading(false)
        Swal.fire({
          title: 'Success',
          text: 'Your request has been sent!',
          icon: 'success',
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function loginSubmit() {
    if (!validateForm()) {
      setVisible(true)
      Swal.fire({
        title: 'Validation Error',
        text: 'Email & Password cannot be empty!',
        icon: 'error',
      })
      return
    }
    if (!emailValidation()) {
      setVisible(true)
      Swal.fire({
        title: 'Validation Error',
        text: 'Email is not valid!',
        icon: 'error',
      })
      return
    }

    setLoading(true)
    let payload = { email: email, password: password }
    // dispatch(doLogin(payload))

    axios
      .post(URL.LOGIN, payload)
      .then((respon) => {
        setLoading(false)
        if (respon.status === 201 || respon.status === 200) {
          var res = respon.data
          localStorage.setItem('idToken', res.token)
          localStorage.setItem('user', JSON.stringify(res))
          window.location.href = '/dashboard'
        } else if (respon.status === 401) {
          Swal.fire({
            title: 'Validation Error',
            text: 'Your Email or Password wrong!',
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.status === 401) {
          Swal.fire({
            title: 'Validation Error',
            text: 'Your Email or Password wrong!',
            icon: 'error',
          })
        }
        return err
      })
  }

  const onClickforgotPassword = (e) => {
    let payload = { email: emailForgot }
    if (emailForgot) {
      // dispatch(forgotPassword(payload))
      forgotPasswordz()
    } else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please input an email!',
        icon: 'warning',
      })
    }
    return
  }

  const renderCarousel = () => {
    return (
      <Carousel show={4} className="carousel">
        {dataSlider.map((item, index) => (
          <div className={`mx-4 card`} key={index}>
            <img src={item.image} className="card-img-top" alt="slider" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.text}</p>
            </div>
          </div>
        ))}
      </Carousel>
    )
  }

  const renderCarouselS3 = () => {
    return (
      <Carousell show={4} className="carousel">
        {dataSliderS3.map((item, index) => (
          <div className={`card-s3 card`} key={index}>
            <img src={item.image} className="card-img-top" alt="slider" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.text}</p>
            </div>
          </div>
        ))}
      </Carousell>
    )
  }

  const renderCarouselS6 = () => {
    return (
      <CarouselSix show={1} className="carousel">
        {dataAchievement.map((item, index) => (
          <div
            key={index}
            className={`${index > 0 ? 'wrapper-content-s6-2' : 'wrapper-content-s6-1'}`}
          >
            <p className="source">{item.source}</p>
            <p className="title-s6">{item.title}</p>
            <p className="text-s6">{item.text}</p>
            <a className="url-s6" href="#" onClick={() => window.open(item.url, '_blank')}>
              Read More
            </a>
          </div>
        ))}
      </CarouselSix>
    )
  }

  const changeContent = (name) => {
    console.log(name)
  }

  const renderModalLogin = () => {
    return (
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        className="login-card"
      >
        <CCol md={12}>
          <button className="btn-close-login" onClick={() => setVisible(false)}>
            <CIcon icon={cilX} size="xl" />
          </button>
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
                    <CLink
                      onClick={() => {
                        setVisiblePassword(true)
                        setVisible(false)
                      }}
                      href="#"
                    >
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
      </CModal>
    )
  }

  const renderModalForgotPassword = () => {
    return (
      <CModal
        alignment="center"
        scrollable
        visible={visiblePassword}
        onClose={() => setVisiblePassword(false)}
        className="login-card"
      >
        <CCol md={12}>
          <button className="btn-close-login" onClick={() => setVisiblePassword(false)}>
            <CIcon icon={cilX} size="xl" />
          </button>
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
                  <h5>Forgot Password</h5>
                </div>
                <CForm onSubmit={onClickforgotPassword}>
                  <hr className="solid" />
                  <p className="text-body">E-mail Address</p>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Email"
                      value={emailForgot}
                      onChange={(e) => setEmailForgot(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xl={12}>
                      <button
                        type="button"
                        className="login-button-login"
                        onClick={(e) => onClickforgotPassword(e)}
                      >
                        Submit
                      </button>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CModal>
    )
  }
  const resetFieldRequestDemo = () => {
    setNameContactUs('')
    setEmailContactUs('')
    setContentContactUs('')
  }
  const renderModalRequestDemo = () => {
    return (
      <CModal
        alignment="center"
        scrollable
        visible={visibleRequestDemo}
        onClose={() => {
          resetFieldRequestDemo()
          setVisibleRequestDemo(false)
        }}
        className="login-card"
      >
        <CCol md={12}>
          <button className="btn-close-login" onClick={() => setVisibleRequestDemo(false)}>
            <CIcon icon={cilX} size="xl" />
          </button>
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
                  {reqType === 'requestDemo' ? <h5>Request Demo</h5> : <h5>Contact Us</h5>}
                </div>
                <CForm onSubmit={onClickforgotPassword}>
                  <hr className="solid" />
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Name"
                      value={nameContactUs}
                      onChange={(e) => setNameContactUs(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Email"
                      value={emailContactUs}
                      onChange={(e) => setEmailContactUs(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormTextarea
                      placeholder="Content"
                      value={contentContactUs}
                      onChange={(e) => setContentContactUs(e.target.value)}
                      rows="3"
                    ></CFormTextarea>
                  </CInputGroup>
                  <CRow>
                    <CCol xl={12}>
                      <button
                        type="button"
                        className="login-button-login"
                        onClick={(e) => sendEmail(e)}
                      >
                        Submit
                      </button>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CModal>
    )
  }

  return (
    <React.Fragment>
      <Spinner loading={loading} />
      {renderModalLogin()}
      {renderModalForgotPassword()}
      {renderModalRequestDemo()}
      <section id="one" className="section-one">
        <div className="header">
          <div>
            <li>
              <LabelLogo />
              <Logo className="login-logo" />
            </li>
            <li>
              <a className="solution" href="#two">
                Solution
              </a>
            </li>
            <li>
              <a className="products" href="#three">
                Products
              </a>
            </li>
            <li>
              <a className="feature" href="#four">
                Features
              </a>
            </li>
            <li>
              <a className="contact" href="#six">
                Contact
              </a>
            </li>
          </div>
          <div>
            <button
              className="bt-signin"
              onClick={() => {
                setVisible(true)
                setVisiblePassword(false)
              }}
            >
              Sign in
            </button>
            <button
              className="bt-demo"
              onClick={() => {
                setReqType('requestDemo')
                setVisibleRequestDemo(true)
              }}
            >
              Request a demo
            </button>
          </div>
        </div>
        <div className="wrapper-text-header">
          <p className="text-header">
            Unlocking the World’s Milion Mining Financial Budgeting Data with MB$ App Platform
          </p>
          <button
            className="bt-demo-left"
            onClick={() => {
              setReqType('requestDemo')
              setVisibleRequestDemo(true)
            }}
          >
            Request a demo
          </button>
        </div>
      </section>

      <section id="two" className="section-two">
        <div className="container-putih">
          <div className="line-left"></div>
          <div className="title-container">
            <p className="solution-title">Solutions</p>
          </div>
          <div className="container-hitam">
            <p className="text-container-hitam">
              Drive significant business results using machine learning that precisely calculates
              and forecasts your project costs and assets
            </p>
          </div>
          {renderCarousel()}
          <div className={`row align-items-center wrapper-desc`}>
            <div className={`col-6 desc-text`}>
              MB$ is a software application for costing any mining project to any degree of detail
              including pre-feasibility and feasibility studies, budgets, expenditure re-forecasts,
              audits and cost models
            </div>
            <div className={`col-4 row p-2`}>
              <div className={`col-6 col-sm-3  p-2 mx-5`}>
                <p className="count">169</p>
                <p className="count-desc">Clients</p>
              </div>
              <div className={`col-6 col-sm-3 p-2 mx-5`}>
                <p className="count">265</p>
                <p className="count-desc">Countries</p>
              </div>

              <div className="w-100"></div>

              <div className={`col-6 col-sm-3 p-2 mx-5`}>
                <p className="count">159</p>
                <p className="count-desc">Deployments</p>
              </div>
              <div className={`col-6 col-sm-3 p-2 mx-5`}>
                <p className="count">265</p>
                <p className="count-desc">Cases</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="three" className="section-three">
        <div className="wrapper-s-three">
          <div className="line-left-three"></div>
          <p className="product-title">Products</p>
          <div className="navbar-s3">
            <ul>
              <li>
                <button className="button-nav" onClick={() => changeContent(this)}>
                  Ready-To-Use Models
                </button>
              </li>
              <li>
                <button className="button-nav" onClick={() => changeContent(this)}>
                  Use Cases
                </button>
              </li>
            </ul>
          </div>
          <div>{renderCarouselS3()}</div>
        </div>
      </section>

      <section id="four" className="section-four">
        <div className="wrapper-putih-s4">
          <div className="line-left-s4"></div>
          <div className="title-container">
            <p className="solution-title">Features</p>
          </div>
          <div className="wrapper-features">
            {dataFeatures &&
              dataFeatures.map((item, index) => (
                <div className={`mx-4 card`} key={index}>
                  <img src={item.image} className={`icon-s4`} alt="slider" />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="five" className="section-five">
        <div className="line-left-s5"></div>
        <div className="title-container-s5">
          <p className="solution-title-s5">Easy Setup</p>
        </div>
        <div className="wrapper-setup">
          {dataEasySetup &&
            dataEasySetup.map((item, index) => (
              <div key={index} className="wrapper-content-s4">
                <img src={item.image} className="icon-s4" alt="Images" />
                <div className="footer-card-s5">
                  <div className="badge-s5">
                    <span className="badge-font">{item.total}</span>
                  </div>
                  <p className="title-card-s5">{item.title}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section id="six" className="section-six">
        <img src={map} className="usa-map" alt="Achievement" />
        <div className="wrapper-putih-s6">{renderCarouselS6()}</div>
      </section>

      <section id="seven" className="section-seven">
        <CContainer>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }} className="wrapper-s7">
              <p className="title-s7">
                Ready to unlock Machine Learning Solutions for your mining business?
              </p>
              <div className="wrapper-content-s7">
                <p className="content-s7">
                  Contact us to learn how MB$ can help you improve by precisely calculate your
                  financial budgeting
                </p>
              </div>
              <button type="button" className="button-s7">
                <span
                  className="text-btn-s7"
                  onClick={() => {
                    setReqType('requestDemo')
                    setVisibleRequestDemo(true)
                  }}
                >
                  Request a demo
                </span>
              </button>
            </CCol>
          </CRow>
        </CContainer>
      </section>

      <section id="eight" className="section-eight">
        <div className="row p-5 position-absolute wrapper-s8">
          <div className="col-6 mr-8 contact-us">
            <img src={logoMBS} alt="logo MB$" />
            <p>
              <a
                href="#"
                onClick={() => {
                  setReqType('contactUs')
                  setVisibleRequestDemo(true)
                }}
              >
                Contact Us
              </a>
            </p>
            <a>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore
            </a>
          </div>
          <div className="col-1 flex flex-column product-s8">
            <p>Product</p>
            <a>Overview</a>
            <br />
            <a>Solutions</a>
            <br />
            <a>Features</a>
            <br />
            <a>Pricing</a>
          </div>
          <div className="col-1 company">
            <p>Company</p>
            <a>About Us</a>
          </div>
          <div className="col-1 support">
            <p>Support</p>
            <a>Help</a>
            <br />
            <a>Cookie Policy</a>
            <br />
            <a>Privacy Policy</a>
            <br />
            <a>Terms & Conditions</a>
          </div>
          <div className="col-1 follow-us">
            <p>Follow Us</p>
            <a href="#" onClick={() => window.open('https://www.twitter.com/', '_blank')}>
              Twitter
            </a>
            <br />
            <a href="#" onClick={() => window.open('https://www.linkedin.com/', '_blank')}>
              LinkedIn
            </a>
            <br />
            <a href="#" onClick={() => window.open('https://www.facebook.com/', '_blank')}>
              Facebook
            </a>
          </div>
        </div>
      </section>

      <footer>
        <center>© 2022 Digital Transformasi Indonesia</center>
      </footer>
    </React.Fragment>
  )
}

export default Home
