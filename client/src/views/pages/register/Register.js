import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { registerAction } from 'src/store/actions/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toastify } from 'src/store/services/toastify'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('Male')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault()
    if (email === '' || password === '' || firstName === '' || lastName === '')
      return toastify('error', 'Please fill all fields')

    dispatch(registerAction({ firstName, lastName, email, password, gender }, callback))
  }

  const callback = () => {
    navigate('/login')
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={registerHandler}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First Name"
                      autoComplete="username"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Last  Name"
                      autoComplete="username"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      value={email}
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      value={password}
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormCheck
                      type="radio"
                      className="radioButtons"
                      value="Male"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={(e) => setGender(e.target.value)}
                      label="Male"
                      defaultChecked
                    />
                    <CFormCheck
                      type="radio"
                      className="radioButtons"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      label="Femail"
                      onChange={(e) => setGender(e.target.value)}
                      value="Female"
                    />
                  </CInputGroup>

                  <div className="text-center pb-2">
                    Already a member? <Link to="/login">Login</Link>
                  </div>
                  <div className="d-grid pt-3">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default Register
