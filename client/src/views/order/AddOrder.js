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
import { toastify } from 'src/store/services/toastify'

import 'react-toastify/dist/ReactToastify.css'
const AddOrder = () => {
  const services = useSelector(serviceList)
  const userDetail = useSelector(user)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [service, setService] = useState('')
  const [imeiNumber, setImeiNumber] = useState('')
  const [fieldType, setFieldType] = useState('')
  const [customFields, setCustomFields] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

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

    if (imeiNumber === '' || service === '' || !toDate || !fromDate)
      return toastify('error', 'Please fill all fields')

    if (!imeiNumber.match(/^\d+(,\d+)*$/))
      return toastify('error', 'Enter valid IMEI number according to format')

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

  // useEffect(() => {
  //   const selectedService = services.find((item) => item._id === service)
  // }, [service])

  const selectService = (e) => {
    const serviceId = e.target.value
    const service = services.find((item) => item._id === serviceId)

    if (!service) return setFieldType('NONE')

    if (service) {
      setService(serviceId)
      setFieldType(service?.fieldType.type)
      service?.fieldType?.customFields.length !== 0
        ? setCustomFields(service?.fieldType?.customFields)
        : setCustomFields([])
      console.log(customFields, 'customField')
    }
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Creat New Order</strong>
            </CCardHeader>
            <CCardBody>
              <CContainer className=" mt-3 mb-5">
                <CForm onSubmit={submitHandler}>
                  <CRow className=" justify-content-center ">
                    <CCol className="">
                      <div className="mb-3 ">
                        <CFormLabel htmlFor="exampleFormControlText">Select Service</CFormLabel>
                        {/* <CInputGroup className="has-validation"> */}
                        <CFormSelect
                          onChange={(e) => selectService(e)}
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
                      {fieldType === 'SINGLE' ? (
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlTextarea1">IMEI Field</CFormLabel>
                          <CFormTextarea
                            id="exampleFormControlTextarea1"
                            rows="3"
                            value={imeiNumber}
                            placeholder="seprate IMEI number with , ex: 358265010779665,358265010779665   "
                            onChange={(e) => setImeiNumber(e.target.value)}
                            // required
                          ></CFormTextarea>
                          {/* <span>seprate IMEI number with ","</span> */}
                        </div>
                      ) : fieldType === 'BOTH' ? (
                        <div>
                          <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlTextarea1">
                              IMEI Field
                            </CFormLabel>
                            <CFormTextarea
                              id="exampleFormControlTextarea1"
                              rows="3"
                              value={imeiNumber}
                              placeholder="seprate IMEI number with , ex: 358265010779665,358265010779665   "
                              onChange={(e) => setImeiNumber(e.target.value)}
                              // required
                            ></CFormTextarea>
                            {/* <span>seprate IMEI number with ","</span> */}
                          </div>
                          <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Server Field</CFormLabel>
                            <CFormInput type="text" placeholder="Enter value" />
                          </div>
                        </div>
                      ) : fieldType === 'CUSTOM' ? (
                        customFields?.map((field, index) => (
                          <div key={index} className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">{field.name}</CFormLabel>
                            <CFormInput type={field.dataType} placeholder="Enter value" />
                          </div>
                        ))
                      ) : null}
                    </CCol>
                    <CCol className="">
                      <div className="mb-3">
                        <CFormLabel>Start Date</CFormLabel>
                        <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
                      </div>
                      <div className="mb-3">
                        <CFormLabel>End Date</CFormLabel>
                        <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
                      </div>

                      <div className=" pt-3  text-end">
                        <CButton
                          type="submit"
                          color="secondary"
                          variant="outline"
                          className="text-end"
                        >
                          {params.mode !== 'new' ? 'Save' : 'Add Order'}
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

export default AddOrder
