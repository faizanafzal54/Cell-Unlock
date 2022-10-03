import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormSelect,
  CContainer,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { userByIdAction } from 'src/store/actions/user'

import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'

import 'react-toastify/dist/ReactToastify.css'
const UserEdit = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [status, setStatus] = useState('')
  const [credits, setCredits] = useState(0)
  const [stripeAccount, setStripeAccount] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(async () => {
    const data = await dispatch(userByIdAction(params.id))

    setFirstName(data?.firstName)
    setLastName(data?.lastName)
    setStatus(data?.isActive)
    setCredits(data?.credits)
    setStripeAccount(data?.isStripeAccountActive)
  }, [userByIdAction])

  const submitHandler = (e) => {
    e.preventDefault()

    if (params.mode !== 'new') {
      dispatch(
        updateUserAction(
          params.mode,
          {
            firstName,
            lastName,
            isActive: status,
            credits,
            isStripeAccountActive: stripeAccount,
          },
          callback,
        ),
      )
    }
  }
  const callback = () => {
    navigate('/admin/users')
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit User</strong>
            </CCardHeader>
            <CCardBody>
              <CContainer className=" mt-3 mb-5">
                <CForm onSubmit={submitHandler}>
                  <CRow className=" justify-content-center ">
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">First Name</CFormLabel>
                        <CFormInput
                          type="text"
                          value={firstName}
                          placeholder="Enter First Name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Credits</CFormLabel>
                        <CFormInput
                          type="text"
                          value={credits}
                          placeholder="Enter First Name"
                          onChange={(e) => setCredits(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 ">
                        <CFormLabel htmlFor="exampleFormControlText">Status</CFormLabel>
                        <CFormSelect
                          onChange={(e) => setStatus(e.target.value)}
                          required
                          id="validationCustom01"
                        >
                          <option>Select Status</option>

                          <option value={true}> Active</option>
                          <option value={false}> InActive</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Last Name</CFormLabel>
                        <CFormInput
                          type="text"
                          value={lastName}
                          placeholder="Enter Last Name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>

                      <div className="mb-3 ">
                        <CFormLabel htmlFor="exampleFormControlText">
                          Select Account Status{' '}
                        </CFormLabel>
                        <CFormSelect
                          onChange={(e) => setStripeAccount(e.target.value)}
                          required
                          id="validationCustom01"
                        >
                          <option>Select Status</option>

                          <option value={true}> Active</option>
                          <option value={false}> Disable</option>
                        </CFormSelect>
                      </div>
                      <div className=" pt-3  text-end">
                        <CButton
                          type="submit"
                          color="secondary"
                          variant="outline"
                          className="text-end"
                        >
                          Save
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  )
}

export default UserEdit
