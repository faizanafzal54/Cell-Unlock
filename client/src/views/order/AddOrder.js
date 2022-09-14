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
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { serviceListAction, addOrderAction } from 'src/store/actions/order'
import { serviceList, user } from 'src/store/selector/order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AddOrder = () => {
  const services = useSelector(serviceList)
  const userDetail = useSelector(user)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [service, setService] = useState('')
  const [imeiNumber, setImeiNumber] = useState('')

  const dispatch = useDispatch()
  const params = useParams()

  const submitHandler = (e) => {
    e.preventDefault()
    let imeiNumbers = imeiNumber.split(';')
    imeiNumbers = imeiNumbers.slice(0, imeiNumbers.length)

    dispatch(
      addOrderAction({ service, userId: userDetail._id, toDate, fromDate, imeiNumbers }, callback),
    )
  }
  const callback = () => {
    setImeiNumber('')
  }
  useEffect(() => {
    dispatch(serviceListAction())
  }, [serviceListAction])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Creat New Order</strong>
            </CCardHeader>
            <CCardBody>
              <CCol xs={4} className="m-auto mt-3 mb-5">
                <CForm onSubmit={submitHandler}>
                  <div className="mb-3 ">
                    <CFormLabel htmlFor="exampleFormControlText">Select Service</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option>Select Service</option>

                      {services?.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Enter IMEI Numbers
                    </CFormLabel>
                    <CFormTextarea
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={imeiNumber}
                      placeholder="seprate IMEI number with ;"
                      onChange={(e) => setImeiNumber(e.target.value)}
                    ></CFormTextarea>
                    {/* <span>seprate IMEI number with ","</span> */}
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Start Date</CFormLabel>
                    <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>End Date</CFormLabel>
                    <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
                  </div>
                  <div className=" pt-3">
                    <CButton type="submit" color="secondary">
                      Add Order
                    </CButton>
                  </div>
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

export default AddOrder
