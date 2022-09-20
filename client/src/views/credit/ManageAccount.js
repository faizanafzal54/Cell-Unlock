import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'
import CreditCardInput from 'react-credit-card-input'
import { user } from 'src/store/selector/order'

import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { addStripeAction } from 'src/store/actions/credit'
const ManageAccount = () => {
  const [cardNumber, setCardNumber] = useState([])
  const [cvc, setCvc] = useState('')
  const [expiry, setExpiry] = useState('')

  const userDetail = useSelector(user)

  const dispatch = useDispatch()
  // dispatch(addStripeAction({ cardNumber, expiry, cvc, userId: userDetail._id }))
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
                <CContainer className="mt-5 mb-5">
                  <CreditCardInput
                    cardNumberInputProps={{
                      value: cardNumber,
                      onChange: () => console.log('card number'),
                    }}
                    cardExpiryInputProps={{ value: expiry, onChange: () => console.log('expiry') }}
                    cardCVCInputProps={{ value: cvc, onChange: () => console.log('cvc') }}
                    fieldClassName="input"
                  />
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
