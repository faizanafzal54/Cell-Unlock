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
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import TagsInput from 'src/components/TagsInput'

const AddOrder = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const dispatch = useDispatch()

  //   useEffect(() => {
  //     dispatch()
  //   }, [])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Creat New Order</strong>
            </CCardHeader>
            <CCardBody>
              <CCol xs={4} className="m-auto mt-3">
                <CForm>
                  <div className="mb-3 ">
                    <CFormLabel>Service Name</CFormLabel>
                    <CFormInput type="text" placeholder="Enter Service" />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>From Date</CFormLabel>
                    <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>To Date</CFormLabel>
                    <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
                  </div>
                  <div className="mb-3">
                    <TagsInput />
                  </div>
                </CForm>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddOrder
