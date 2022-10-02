import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'
import { user } from 'src/store/selector/order'

import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { addStripeAction } from 'src/store/actions/credits'
const ManageAccount = () => {
  const [cardNumber, setCardNumber] = useState([])
  const [cvc, setCvc] = useState('')
  const [expiry, setExpiry] = useState('')

  const userDetail = useSelector(user)

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(cardNumber, cvc, expiry)
    dispatch(addStripeAction({ cardNumber, cvc, expiry, userId: userDetail._id }, callback))
  }
  const callback = () => {
    setCardNumber('')
    setCvc('')
    setExpiry('')
  }
  return (
    <>
      <CContainer className="">
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="">
                <strong>Card Details</strong>
              </CCardHeader>
              <CCardBody>
                <CContainer className="mt-2 mb-5">
                  <CRow>
                    <CCol>
                      {' '}
                      <CForm onSubmit={submitHandler}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlInput1">Card Number</CFormLabel>
                          <CFormInput
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            maxLength={16}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlInput1">Expiry</CFormLabel>
                          <CFormInput
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlInput1">Cvc</CFormLabel>
                          <CFormInput
                            type="text"
                            placeholder="XXX"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                          />
                        </div>

                        <div className="text-end">
                          <CButton className="m-auto" type="submit" color="light">
                            Save
                          </CButton>
                        </div>
                      </CForm>
                    </CCol>
                    <CCol></CCol>
                  </CRow>
                </CContainer>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </>
  )
}

export default ManageAccount
