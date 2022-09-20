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

import 'react-toastify/dist/ReactToastify.css'
const BuyCredits = () => {
  const submitHandler = (e) => {
    e.preventDefault()
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
                      <p className="fw-bold ">Total credits you own:</p>
                      <p className="ps-2 ">20</p>
                    </div>
                    <CCol className="order-detail-tag  " xs={6}>
                      <CForm onSubmit={submitHandler}>
                        <div className="col-8">
                          <CFormLabel htmlFor="exampleFormControlInput1">Enter Credits</CFormLabel>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            placeholder="Enter Amount"
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
