import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
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
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cilDelete, cilMedicalCross } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addServiceAction } from 'src/store/actions/service'

const AddService = () => {
  const [servicetype, setServicetype] = useState('IMEI')
  const [fieldType, setFieldType] = useState('SINGLE')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [supplier, setSupplier] = useState('')

  const [costPrice, setCostPrice] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [orderCancelTime, setOrderCancelTime] = useState('')
  const [orderVerfiyTime, setOrderVerfiyTime] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [responseDelayTime, setResponseDelayTime] = useState('')
  const [dealerPrice, setDealerPrice] = useState('')
  const [resellerPrice, setResellerPrice] = useState('')
  const [userPrice, setUserPrice] = useState('')
  const [tremsCond, setTremsCond] = useState(false)
  const [orderVerification, setOrderVerification] = useState(false)
  const [pendingOrderCancel, setPendingOrderCancel] = useState(false)
  const [duplicateIMEI, setDuplicateIMEI] = useState(false)
  const [disable, setDisable] = useState(false)
  const [customFields, setCustomFields] = useState([])
  const [fieldName, setFieldName] = useState('')
  const [fieldDataType, setFieldDataType] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      name: name,
      // description:
      isDeleted: disable,
      servicetype: servicetype,
      fieldType: {
        type: fieldType,
        customFields: customFields,
      },
      credits: {
        DEALER: dealerPrice,
        RESELLER: resellerPrice,
        USER: userPrice,
      },
      price: price,
      costPrice: costPrice,
      supplier: supplier,
      deliveryTime: deliveryTime,
      redirectUrl: redirectUrl,
      responseDelayTime: responseDelayTime,
      // serviceImage:
      // detail:
      tremsCond: tremsCond,
      pendingOrderCancel: pendingOrderCancel,
      orderCancelTime: orderCancelTime,
      orderVerification: orderVerification,
      orderVerfiyTime: orderVerfiyTime,
      duplicateIMEI: duplicateIMEI,
    }

    dispatch(addServiceAction(data, callback))
  }

  const callback = () => {
    navigate('/admin/services')
  }

  const addField = () => {
    setCustomFields([
      ...customFields,
      { name: fieldName, dataType: fieldDataType, id: Math.floor(100000 + Math.random() * 900000) },
    ])
    setFieldName('')
    setFieldDataType('')
  }

  const deleteField = (id) => {
    const updatedFields = customFields.filter((item) => item.id !== id)
    setCustomFields(updatedFields)
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
                            name="flexRadioDefault11"
                            id="IMEI1"
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
                            name="flexRadioDefault11"
                            id="Server1"
                            label="Server"
                            onChange={(e) => setServicetype(e.target.value)}
                            value="SERVER"
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Service Name</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Enter Service Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Price</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter Price"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Delivery Time</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Enter Delivery Time"
                          onChange={(e) => setDeliveryTime(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Response Delay Time
                        </CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter Response Delay Time"
                          onChange={(e) => setResponseDelayTime(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Reseller</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter Reseller Price"
                          onChange={(e) => setResellerPrice(e.target.value)}
                        />
                      </div>
                      <div className="d-flex mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Field Type</CFormLabel>

                        <div className="ms-2">
                          <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="Single1"
                            label="Single"
                            value="SINGLE"
                            onChange={(e) => setFieldType(e.target.value)}
                            // defaultChecked
                          />
                        </div>
                        <div>
                          <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="Both1"
                            label="Both"
                            value="BOTH"
                            onChange={(e) => setFieldType(e.target.value)}
                          />
                        </div>
                        <div>
                          <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="Multiple1"
                            label="Multiple"
                            value="MULTIPLE"
                            onChange={(e) => setFieldType(e.target.value)}
                          />
                        </div>
                        <div>
                          <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="custom1"
                            label="Custom"
                            value="CUSTOM"
                            onChange={(e) => setFieldType(e.target.value)}
                          />
                        </div>
                      </div>
                      {fieldType === 'CUSTOM' ? (
                        <>
                          <p>Pleae create your custom field</p>

                          <div className="d-flex">
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Field Name</CFormLabel>
                              <CFormInput
                                type="text"
                                placeholder="Enter Field Name"
                                value={fieldName}
                                onChange={(e) => setFieldName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Data Type</CFormLabel>
                              <CFormInput
                                type="text"
                                value={fieldDataType}
                                placeholder="i.e number/text"
                                onChange={(e) => setFieldDataType(e.target.value)}
                              />
                            </div>

                            <div className="mt-2 ms-1">
                              <CButton
                                className="mt-4 p-2"
                                color="light"
                                size="sm"
                                onClick={() => addField()}
                              >
                                <CIcon icon={cilMedicalCross} />
                              </CButton>
                            </div>
                          </div>

                          <ul>
                            {customFields?.map((field, index) => (
                              <li className="m-1" key={index}>
                                {field?.name}{' '}
                                <span>
                                  <CButton
                                    color="light"
                                    size="sm"
                                    onClick={() => deleteField(field.id)}
                                  >
                                    <CIcon icon={cilDelete} />
                                  </CButton>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </CCol>

                    <CCol className="">
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Supplier</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Enter Supplier"
                          onChange={(e) => setSupplier(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Cost Price</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter Cost Price"
                          onChange={(e) => setCostPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Redirect Url</CFormLabel>
                        <CFormInput
                          type="text"
                          placeholder="Enter Redirect Url"
                          onChange={(e) => setRedirectUrl(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Dealer</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter Dealer Price"
                          onChange={(e) => setDealerPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">User</CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter User Price"
                          onChange={(e) => setUserPrice(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Order Cancel Time
                        </CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter Order Cancel Time"
                          onChange={(e) => setOrderCancelTime(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Order Verfiy Time
                        </CFormLabel>
                        <CFormInput
                          type="number"
                          placeholder="Enter Order Verify Time"
                          onChange={(e) => setOrderVerfiyTime(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Terms & conditions"
                          id="formSwitchCheckChecked"
                          onChange={(e) => setTremsCond(!tremsCond)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Pending Order Cancellation"
                          id="formSwitchCheckChecked"
                          onChange={(e) => setPendingOrderCancel(!pendingOrderCancel)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Order Varification"
                          id="formSwitchCheckChecked"
                          onChange={(e) => setOrderVerification(!orderVerification)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Allow Duplicate IMEI"
                          id="formSwitchCheckChecked"
                          onChange={(e) => setDuplicateIMEI(!duplicateIMEI)}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormSwitch
                          label="Disable"
                          id="formSwitchCheckChecked"
                          onChange={(e) => setDisable(!disable)}
                        />
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
                      <div className="text-end">
                        <CButton type="submit" color="light" size="sm">
                          Create Service
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

export default AddService
