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
  CInputGroup,
  CContainer,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'
import { buyCreditsAction, getUserCreditsAction } from 'src/store/actions/credits'
import { useDispatch, useSelector } from 'react-redux'
import { user } from 'src/store/selector/user'
import { userCredits } from 'src/store/selector/credits'

import 'react-toastify/dist/ReactToastify.css'
const BuyCredits = () => {
  const dispatch = useDispatch()
  const [credits, setCredits] = useState(0)
  const userDetail = useSelector(user)
  const Credits = useSelector(userCredits)

  useEffect(() => {
    dispatch(getUserCreditsAction(userDetail._id))
  }, [getUserCreditsAction])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(buyCreditsAction({ credits, userId: userDetail._id }, callback))
  }

  const callback = () => {
    setCredits('')
    dispatch(getUserCreditsAction(userDetail._id))
  }
  return (
    <>
      <CContainer className="">
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="">
                <strong>Order Detail</strong>
              </CCardHeader>
              <CCardBody>
                <CContainer>
                  <CRow className="order-detail-tag">
                    <div className="d-flex">
                      <p className=" ">Total credits you own:</p>
                      <strong className="ps-2 ">{Credits}</strong>
                    </div>
                    <CCol className="order-detail-tag  " xs={6}>
                      <CForm onSubmit={submitHandler}>
                        <div className="col-8">
                          <CFormLabel htmlFor="exampleFormControlInput1">Enter Credits</CFormLabel>
                          <CFormInput
                            type="number"
                            value={credits}
                            id="exampleFormControlInput1"
                            placeholder="Enter Amount"
                            onChange={(e) => setCredits(e.target.value)}
                          />
                        </div>

                        <div className="mt-2 col-8 text-end">
                          <CButton
                            type="submit"
                            color="secondary"
                            variant="outline"
                            className="text-end"
                          >
                            Buy
                          </CButton>
                        </div>
                      </CForm>
                    </CCol>
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

export default BuyCredits
