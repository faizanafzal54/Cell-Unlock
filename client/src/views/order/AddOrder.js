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
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
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
import Select from 'react-select'
import 'react-toastify/dist/ReactToastify.css'
import parse from 'html-react-parser'
const AddOrder = () => {
  const services = useSelector(serviceList)
  const userDetail = useSelector(user)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [service, setService] = useState('')
  const [imeiNumber, setImeiNumber] = useState([])
  const [serverFields, setServerFields] = useState([])
  const [fieldType, setFieldType] = useState('')
  const [customFields, setCustomFields] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [serialNumber, setSerialNumber] = useState('')
  const [selectedServiceDetail, setSelectedServiceDetail] = useState('')

  const options = services
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
      setFieldType(data?.fieldType.type)
      setCustomFields(data?.fieldType.customFields)
      setServerFields(data?.serverFields)
    }
  }, [orderByIdAction])

  const submitHandler = (e) => {
    e.preventDefault()
    if (service === '' || !fromDate || serialNumber === '')
      return toastify('error', 'Please fill all fields')

    if (!imeiNumber ? imeiNumber.match(/^\d+(,\d+)*$/) : null)
      return toastify('error', 'Enter valid IMEI number according to format')

    let imeiNumbers = !Array.isArray(imeiNumber) ? imeiNumber.split(',') : imeiNumber
    imeiNumbers = imeiNumbers.slice(0, imeiNumbers.length)

    const fields = customFields?.map((field) => {
      return {
        name: field?.name,
        value: field?.value,
      }
    })
    if (params.mode !== 'new') {
      dispatch(
        updateOrderAction(
          params.mode,
          {
            service,
            toDate,
            fromDate,
            imeiNumbers,
            serialNumber,
            serverFields,
            fieldType: {
              type: fieldType,
              customFields: fields,
            },
          },
          callback,
        ),
      )
    } else {
      dispatch(
        addOrderAction(
          {
            service,
            userId: userDetail._id,
            toDate,
            fromDate,
            imeiNumbers,
            serialNumber,
            serverFields,
            fieldType: {
              type: fieldType,
              customFields: fields,
            },
          },
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
    dispatch(serviceListAction(params.type))
  }, [serviceListAction])

  const selectService = (selectedService) => {
    // return
    // const serviceId = e.target.value
    // const service = services.find((item) => item._id === serviceId)

    if (!selectedService) return setFieldType('NONE')

    if (selectedService) {
      setService(selectedService._id)
      setFieldType(selectedService?.fieldType.type)
      selectedService?.fieldType?.customFields.length !== 0
        ? setCustomFields(selectedService?.fieldType?.customFields)
        : setCustomFields([])
      setSelectedOption(selectedService)
      setSelectedServiceDetail(selectedService)
    }
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Create Order ({params.type})</strong>
            </CCardHeader>
            <CCardBody>
              <CContainer className=" mt-3 mb-5">
                <CForm onSubmit={submitHandler}>
                  <CRow className=" justify-content-center ">
                    <CCol xs={6} className="">
                      <div className="mb-3 ">
                        <CFormLabel htmlFor="exampleFormControlText">Select Service</CFormLabel>
                        <Select
                          defaultValue={selectedOption}
                          onChange={(value) => selectService(value)}
                          options={options}
                        />

                      </div>

                      {selectedOption ? (
                        <CAccordion activeItemKey={1} className="mb-2">
                          <CAccordionItem itemKey={1}>
                            <CAccordionBody>
                              <CRow>
                                <CCol className="order-detail-tag" xs={6}>
                                  <div className="d-flex">
                                    <p className="fw-bold ">Name:</p>
                                    <p className="ps-2 ">{selectedOption?.name}</p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="fw-bold ">Type:</p>
                                    <p className="ps-2 ">{selectedOption?.serviceType}</p>
                                  </div>
                                  {/* <div className="d-flex">
                                    <p className="fw-bold ">Supplier Name:</p>
                                    <p className="ps-2 ">{selectedOption?.supplier}</p>
                                  </div> */}
                                  {/* <div className="d-flex">
                                    <p className="fw-bold ">Response Delay Time:</p>
                                    <p className=" ps-2">{selectedOption?.responseDelayTime}</p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="fw-bold ">Order Verify Time:</p>
                                    <p className=" ps-2">{selectedOption?.orderVerfiyTime}</p>
                                  </div> */}
                                </CCol>
                                <CCol className="order-detail-tag" xs={6}>
                                  <div className="d-flex">
                                    <p className="fw-bold ">Price:</p>
                                    <p className=" ps-2">
                                      {selectedServiceDetail?.credits[userDetail?.userType]}
                                    </p>
                                  </div>
                                  {/* <div className="d-flex">
                                    <p className="fw-bold ">Cost Price:</p>
                                    <p className=" ps-2">{selectedOption?.costPrice}</p>
                                  </div> */}
                                  <div className="d-flex">
                                    <p className="fw-bold ">Status:</p>
                                    <p className="ps-2">
                                      {!selectedOption?.isDeleted ? (
                                        <span className="badge bg-info ms-auto ">Active</span>
                                      ) : (
                                        <span className="badge bg-danger ms-auto">In-Active</span>
                                      )}
                                    </p>
                                  </div>
                                  {/* <div className="d-flex">
                                    <p className="fw-bold ">Order Cancel Time:</p>
                                    <p className=" ps-2">{selectedOption?.orderCancelTime}</p>
                                  </div>
                                  */}
                                  <div className="d-flex">
                                    <p className="fw-bold ">Delivery Time:</p>
                                    <p className=" ps-2">{selectedOption?.deliveryTime}</p>
                                  </div>
                                </CCol>
                                <hr />

                                <div>
                                  <p className="fw-bold ">Description:</p>
                                  <p className="ps-2 text-break">{parse(selectedOption?.description)}</p>
                                </div>
                              </CRow>
                            </CAccordionBody>
                          </CAccordionItem>
                        </CAccordion>
                      ) : null}
                    </CCol>
                    <CCol className="">
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
                            <CFormLabel htmlFor="exampleFormControlTextarea1">
                              Server Field
                            </CFormLabel>
                            <CFormTextarea
                              id="exampleFormControlTextarea1"
                              rows="3"
                              value={serverFields}
                              placeholder="Enter server code"
                              onChange={(e) => setServerFields(e.target.value)}
                            // required
                            ></CFormTextarea>
                            {/* <span>seprate IMEI number with ","</span> */}
                          </div>
                        </div>
                      ) : fieldType === 'CUSTOM' ? (
                        customFields?.map((field, index) => (
                          <div key={index} className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">{field.name}</CFormLabel>
                            <CFormInput
                              type={field.dataType}
                              placeholder="Enter value"
                              onBlur={(e, name = field.name) => {
                                const updatedFields = customFields?.reduce((result, item) => {
                                  if (item.name === name) {
                                    result = [...result, { ...item, value: e.target.value }]
                                    return result
                                  } else {
                                    result = [...result, item]
                                    return result
                                  }
                                }, [])
                                setCustomFields(updatedFields)
                              }}
                            />
                          </div>
                        ))
                      ) : null}

                      {/* <div className="mb-3">
                        <CFormLabel>End Date</CFormLabel>
                        <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
                      </div> */}
                      {selectedOption && <div className="mb-3">
                        <CFormLabel>Serial Number</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Enter serial number"
                          aria-label="lg input example"
                          onChange={(e) => setSerialNumber(e.target.value)}
                        />
                      </div>}
                      <div className="mb-3">
                        <CFormLabel>Start Date</CFormLabel>
                        <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
                      </div>
                      <div className=" pt-3  text-end">
                        <CButton
                          type="submit"
                          color="secondary"
                          variant="outline"
                          className="text-end"
                        >
                          {params.mode !== 'new' ? 'Save' : 'Place Order'}
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
