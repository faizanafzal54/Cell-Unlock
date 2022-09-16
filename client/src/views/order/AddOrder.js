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
} from 'src/store/actions/order'
import { serviceList, user, order } from 'src/store/selector/order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AddOrder = () => {
  const [validated, setValidated] = useState(false)
  const services = useSelector(serviceList)
  const userDetail = useSelector(user)
  const orderDetail = useSelector(order)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [service, setService] = useState('')
  const [imeiNumber, setImeiNumber] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  // if (params.mode !== 'new') {
  // }

  useEffect(async () => {
    if (params.mode !== 'new') {
      const data = await dispatch(orderByIdAction(params.mode))
      setImeiNumber(data?.imeiNumbers)
      setService(data?.service?._id)
      setFromDate(new Date(data?.fromDate))
      setToDate(new Date(data?.toDate))
    }
  }, [orderByIdAction])

  const submitHandler = (e) => {
    e.preventDefault()

    let imeiNumbers = !Array.isArray(imeiNumber) ? imeiNumber.split(',') : imeiNumber
    imeiNumbers = imeiNumbers.slice(0, imeiNumbers.length)

    if (params.mode !== 'new') {
      dispatch(
        updateOrderAction(
          params.mode,
          {
            service,
            toDate,
            fromDate,
            imeiNumbers,
          },
          callback,
        ),
      )
    } else {
      dispatch(
        addOrderAction(
          { service, userId: userDetail._id, toDate, fromDate, imeiNumbers },
          callback,
        ),
      )
    }
  }
  const callback = () => {
    setImeiNumber('')
    navigate('/orders')
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
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={submitHandler}
                >
                  <div className="mb-3 ">
                    <CFormLabel htmlFor="exampleFormControlText">Select Service</CFormLabel>
                    {/* <CInputGroup className="has-validation"> */}
                    <CFormSelect
                      onChange={(e) => setService(e.target.value)}
                      required
                      id="validationCustom01"
                    >
                      <option>Select Service</option>
                      {services?.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                    </CFormSelect>
                    {/* </CInputGroup> */}
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Start Date</CFormLabel>
                    <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>End Date</CFormLabel>
                    <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Enter IMEI Numbers
                    </CFormLabel>
                    <CFormTextarea
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={imeiNumber}
                      placeholder="seprate IMEI number with ,"
                      onChange={(e) => setImeiNumber(e.target.value)}
                      required
                    ></CFormTextarea>
                    {/* <span>seprate IMEI number with ","</span> */}
                  </div>

                  <div className=" pt-3  text-end">
                    <CButton type="submit" color="secondary" variant="outline" className="text-end">
                      {params.mode !== 'new' ? 'Save' : 'Add Order'}
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
