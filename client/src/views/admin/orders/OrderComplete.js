import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  serviceListAction,
  addOrderAction,
  orderByIdAction,
  updateOrderAction,
  adminUpdateOrderAction,
} from 'src/store/actions/order'
import { serviceList, user, order } from 'src/store/selector/order'
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'

import 'react-toastify/dist/ReactToastify.css'
const OrderComplete = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [service, setService] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [imeiNumber, setImeiNumber] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(async () => {
    const data = await dispatch(orderByIdAction(params.id))
    setImeiNumber(data?.imeiNumbers)
    setService(data?.service?.name)
    setFromDate(new Date(data?.fromDate))
    setToDate(new Date(data?.toDate))
  }, [orderByIdAction])

  const submitHandler = (e) => {
    e.preventDefault()
    if (code === '' || description === '') return toastify('error', 'Please fill all fields')

    dispatch(
      adminUpdateOrderAction(params.id, { code, description, status: 'Completed' }, callback),
    )
  }
  const callback = () => {
    navigate('/admin/orders')
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Update Order</strong>
            </CCardHeader>
            <CCardBody>
              <CCol className="m-auto mt-3 mb-5">
                <CForm onSubmit={submitHandler}>
                  <CRow>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Service</CFormLabel>
                        <CFormInput type="text" value={service} disabled />
                      </div>

                      <div className="mb-3">
                        <CFormLabel>Start Date</CFormLabel>
                        <DatePicker
                          selected={fromDate}
                          onChange={(date) => setFromDate(date)}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel>End Date</CFormLabel>
                        <DatePicker
                          selected={toDate}
                          onChange={(date) => setToDate(date)}
                          disabled
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlTextarea1">
                          Enter IMEI Numbers
                        </CFormLabel>
                        <CFormTextarea
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={imeiNumber}
                          placeholder="seprate IMEI number with , ex: 358265010779665,358265010779665   "
                          onChange={(e) => setImeiNumber(e.target.value)}
                          disabled
                        ></CFormTextarea>
                        {/* <span>seprate IMEI number with ","</span> */}
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Code</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Enter code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                        <CFormTextarea
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></CFormTextarea>
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
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  )
}

export default OrderComplete
