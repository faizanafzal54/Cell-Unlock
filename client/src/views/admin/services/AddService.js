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
  CFormSwitch,
  CInputGroup,
  CFormCheck,
  CContainer,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'

import 'react-toastify/dist/ReactToastify.css'
const AddService = () => {
  const [servicetype, setServicetype] = useState('IMEI')
  const [fieldType, setFieldType] = useState('SINGLE')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [costPrice, setCostPrice] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [orderCancelTime, setOrderCancelTime] = useState('')
  const [orderVerfiyTime, setOrderVerfiyTime] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [responseDelayTime, setResponseDelayTime] = useState('')
  const [dealerPrice, setDealerPrice] = useState('')
  const [resellerPrice, setResellerPrice] = useState('')
  const [userPrice, setUserPrice] = useState('')
  const [tremsCond, settremsCond] = useState(false)
  const [orderVerification, setOrderVerification] = useState(false)
  const [pendingOrderCancel, setPendingOrderCancel] = useState(false)
  const [duplicateIMEI, setDuplicateIMEI] = useState(false)
  const [disable, setDisable] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const submitHandler = (e) => {
    e.preventDefault()
  }
  const callback = () => {
    navigate('/admin/services')
  }

  const selectField = (e) => {
    setFieldType(e.target.value)
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Creat New Service</strong>
            </CCardHeader>
            <CCardBody>
              <CContainer className=" mt-3 mb-5">
                <CForm onSubmit={submitHandler}>
                  <CRow className=" justify-content-center ">
                    <CCol className="">
                      <div></div>
                      <div className="d-flex mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Service Type</CFormLabel>

                        <div className="ms-2">
                          <CFormCheck
                            //   className="ps-5"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            label="IMEI"
                            onChange={(e) => setServicetype(e.target.value)}
                            value="IMEI"
                            defaultChecked
                          />
                        </div>
                        <div>
                          <CFormCheck
                            type="radio"
                            className="ms-2"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            label="Server"
                            onChange={(e) => setServicetype(e.target.value)}
                            value="SERVER"
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Service Name</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Service Name" 
                        onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Price</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Price"
                        onChange={(e) => setPrice(e.target.value)}
                        
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Delivery Time</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Delivery Time"
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Response Delay Time
                        </CFormLabel>
                        <CFormInput type="number" placeholder="Enter Redirect Url" 
                        onChange={(e) => setResponseDelayTime(e.target.value)}
                        
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Reseller</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Reseller Price" 
                        onChange={(e) => setResellerPrice(e.target.value)}
                        
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Terms & conditions"
                          id="formSwitchCheckChecked"
                          //   defaultChecked
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Pending Order Cancellation"
                          id="formSwitchCheckChecked"
                          //   defaultChecked
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Order Varification"
                          id="formSwitchCheckChecked"
                          //   defaultChecked
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Allow Duplicate IMEI"
                          id="formSwitchCheckChecked"
                          //   defaultChecked
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Disable"
                          id="formSwitchCheckChecked"
                          //   defaultChecked
                        />
                      </div>
                    </CCol>
                    <CCol className="">
                      <div className="d-flex mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Field Type</CFormLabel>

                        <div className="ms-2">
                          <CFormCheck
                            //   className="ps-5"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            label="Single"
                          />
                        </div>
                        <div>
                          <CFormCheck
                            type="radio"
                            className="ms-2"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            label="Both"
                          />
                        </div>
                        <div>
                          <CFormCheck
                            type="radio"
                            className="ms-2"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            label="Multiple"
                          />
                        </div>
                        <div>
                          <CFormCheck
                            type="radio"
                            className="ms-2"
                            value="CUSTOM"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            label="Custom"
                            onChange={(e) => selectField(e)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Supplier</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Supplier" />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Cost Price</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Cost Price" />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Redirect Url</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Redirect Url" />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Dealer</CFormLabel>
                        <CFormInput type="text" placeholder="Enter Dealer Price" />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">User</CFormLabel>
                        <CFormInput type="text" placeholder="Enter User Price" />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Order Cancel Time
                        </CFormLabel>
                        <CFormInput type="number" placeholder="Enter Order Cancel Time" />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Order Verfiy Time
                        </CFormLabel>
                        <CFormInput type="number" placeholder="Enter Order Verify Time" />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Features</CFormLabel>

                        <CFormCheck
                          id="flexCheckDefault"
                          label="Refund available if code is not found"
                        />
                        <CFormCheck
                          id="flexCheckChecked"
                          label="Service availble 24x7"
                          defaultChecked
                        />
                        <CFormCheck id="flexCheckChecked" label="Unlock guranteed" />
                        <CFormCheck id="flexCheckChecked" label="No refund for bad requests" />
                        <CFormCheck
                          id="flexCheckChecked"
                          label="Working on business days only"
                          defaultChecked
                        />
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

export default AddService
