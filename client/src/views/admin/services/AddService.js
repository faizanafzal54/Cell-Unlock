import React, { useEffect, useState } from 'react'

import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

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
  CRow,
  CFormSwitch,
  CFormCheck,
  CContainer,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cilDelete, cilMedicalCross } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addServiceAction, serviceByIdAction, updateServiceAction } from 'src/store/actions/service'

const AddService = () => {
  const [serviceType, setServicetype] = useState('IMEI')
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
  const [tremsCond, setTremsCond] = useState(true)
  const [orderVerification, setOrderVerification] = useState(false)
  const [pendingOrderCancel, setPendingOrderCancel] = useState(false)
  const [duplicateIMEI, setDuplicateIMEI] = useState(false)
  const [disable, setDisable] = useState(false)
  const [customFields, setCustomFields] = useState([])
  const [fieldName, setFieldName] = useState('')
  const [fieldDataType, setFieldDataType] = useState('')
  const [features, setFeatures] = useState([])
  const [seoName, setSeoName] = useState('')
  const [seoHtml, setSeoHtml] = useState('')
  const [seoUrl, setSeoUrl] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryHtml, setCategoryHtml] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')

  useEffect(async () => {
    if (params.mode !== 'add') {
      const data = await dispatch(serviceByIdAction(params.mode))
      console.log(data)
      setServicetype(data?.serviceType)
      setName(data?.name)
      setPrice(data?.price)
      setSupplier(data?.price)
      setCostPrice(data?.costPrice)
      setDeliveryTime(data?.deliveryTime)
      setOrderCancelTime(data?.orderCancelTime)
      setOrderVerfiyTime(data?.orderVerfiyTime)
      setRedirectUrl(data?.redirectUrl)
      setResponseDelayTime(data?.responseDelayTime)
      setDealerPrice(data?.credits?.DEALER)
      setResellerPrice(data?.credits.RESELLER)
      setUserPrice(data?.credits.USER)
      setSeoName(data?.seoInfo?.name)
      setSeoHtml(data?.seoInfo.htmlTitle)
      setSeoUrl(data?.seoInfo.urlName)
      setCategoryName(data?.categoryInfo?.name)
      setCategoryHtml(data?.categoryInfo?.htmlTitle)
      setCategoryUrl(data?.categoryInfo?.urlName)
      setFieldType(data?.fieldType?.type)
      setCustomFields(data?.fieldType?.customFields)
      setFeatures(data?.features)

      setTremsCond(data?.tremsCond)
      setOrderVerification(data?.orderVerification)
      setPendingOrderCancel(data?.pendingOrderCancel)
      setDuplicateIMEI(data?.duplicateIMEI)
      setDisable(data?.isDeleted)
    }
  }, [serviceByIdAction])

  const [serviceDesc, setServiceDesc] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      name: name,
      description: serviceDesc,
      isDeleted: disable,
      serviceType,
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
      features: features,
      seoInfo: {
        name: seoName,
        htmlTitle: seoHtml,
        urlName: seoUrl,
        tags: [],
        keywords: [],
      },
      categoryInfo: {
        name: categoryName,
        htmlTitle: categoryHtml,
        urlName: categoryUrl,
        tags: [],
        keywords: [],
      },
    }

    if (params.mode === 'add') {
      dispatch(addServiceAction(data, callback))
    } else {
      dispatch(updateServiceAction(params.mode, data, callback))
    }
  }

  const callback = () => {
    navigate('/admin/services')
  }

  const addField = () => {
    if (fieldName === '' || fieldType === '') return toastify('error', 'Please fill  fields')
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
          <CForm onSubmit={submitHandler}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex">
                <div className="mt-2">
                  <strong>{params.mode === 'add' ? 'Add Service' : 'Edit Service'} </strong>
                </div>
                <div className="ms-auto">
                  <CButton className="m-auto" type="submit" color="light">
                    Save
                  </CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <CContainer className=" mt-3 mb-5">
                  <CRow className=" justify-content-center ">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          Genral
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="detail-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#detail"
                          type="button"
                          role="tab"
                          aria-controls="detail"
                          aria-selected="false"
                        >
                          Detail
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#contact"
                          type="button"
                          role="tab"
                          aria-controls="contact"
                          aria-selected="false"
                        >
                          Seo
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#category"
                          type="button"
                          role="tab"
                          aria-controls="contact"
                          aria-selected="false"
                        >
                          Category
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <CRow className=" justify-content-center mt-3">
                          <CCol>
                            <div className="d-flex mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">
                                Service Type
                              </CFormLabel>

                              <div className="ms-2">
                                {serviceType === 'IMEI' ? (
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
                                ) : (
                                  <CFormCheck
                                    //   className="ps-5"
                                    type="radio"
                                    name="flexRadioDefault11"
                                    id="IMEI1"
                                    label="IMEI"
                                    onChange={(e) => setServicetype(e.target.value)}
                                    value="IMEI"
                                  />
                                )}
                              </div>
                              <div>
                                {serviceType === 'SERVER' ? (
                                  <CFormCheck
                                    type="radio"
                                    className="ms-2"
                                    name="flexRadioDefault11"
                                    id="Server1"
                                    label="Server"
                                    onChange={(e) => setServicetype(e.target.value)}
                                    value="SERVER"
                                    defaultChecked
                                  />
                                ) : (
                                  <CFormCheck
                                    type="radio"
                                    className="ms-2"
                                    name="flexRadioDefault11"
                                    id="Server1"
                                    label="Server"
                                    onChange={(e) => setServicetype(e.target.value)}
                                    value="SERVER"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">
                                Service Name
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                value={name}
                                required
                                placeholder="Enter Service Name"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Price</CFormLabel>
                              <CFormInput
                                type="number"
                                value={price}
                                required
                                placeholder="Enter Price"
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Cost Price</CFormLabel>
                              <CFormInput
                                type="number"
                                value={costPrice}
                                required
                                placeholder="Enter Cost Price"
                                onChange={(e) => setCostPrice(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Supplier</CFormLabel>
                              <CFormInput
                                type="text"
                                value={supplier}
                                placeholder="Enter Supplier"
                                onChange={(e) => setSupplier(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">
                                Redirect Url
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                value={redirectUrl}
                                placeholder="Enter Redirect Url"
                                onChange={(e) => setRedirectUrl(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <CFormSwitch
                                label="Terms & conditions"
                                checked={tremsCond}
                                id="formSwitchCheckChecked"
                                onChange={(e) => setTremsCond(!tremsCond)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormSwitch
                                label="Pending Order Cancellation"
                                id="formSwitchCheckChecked"
                                checked={pendingOrderCancel}
                                onChange={(e) => setPendingOrderCancel(!pendingOrderCancel)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormSwitch
                                label="Order Varification"
                                id="formSwitchCheckChecked"
                                checked={orderVerification}
                                onChange={(e) => setOrderVerification(!orderVerification)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormSwitch
                                label="Allow Duplicate IMEI"
                                id="formSwitchCheckChecked"
                                checked={duplicateIMEI}
                                onChange={(e) => setDuplicateIMEI(!duplicateIMEI)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormSwitch
                                label="Disable"
                                checked={disable}
                                id="formSwitchCheckChecked"
                                onChange={(e) => setDisable(!disable)}
                              />
                            </div>

                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Features</CFormLabel>

                              <CFormCheck
                                id="feature1"
                                label="Refund available if code is not found"
                                value="Refund available if code is not found"
                                checked={
                                  features?.find(
                                    (item) => item === 'Refund available if code is not found',
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="feature2"
                                label="Service availble 24x7"
                                value="Service availble 24x7"
                                checked={
                                  features?.find((item) => item === 'Service availble 24x7')
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="feature3"
                                label="Unlock guranteed"
                                value="Unlock guranteed"
                                checked={
                                  features?.find((item) => item === 'Unlock guranteed')
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="feature4"
                                label="No refund for bad requests"
                                value="No refund for bad requests"
                                checked={
                                  features?.find((item) => item === 'No refund for bad requests')
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="feature5"
                                label="Working on business days only"
                                value="Working on business days only"
                                checked={
                                  features?.find((item) => item === 'Working on business days only')
                                    ? true
                                    : false
                                }
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                            </div>
                          </CCol>
                          <CCol>
                            <div className="d-flex mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Field Type</CFormLabel>

                              <div className="ms-2">
                                {fieldType === 'SINGLE' ? (
                                  <CFormCheck
                                    type="radio"
                                    className="me-1"
                                    name="flexRadioDefault"
                                    id="Single1"
                                    label="Single"
                                    value="SINGLE"
                                    onChange={(e) => setFieldType(e.target.value)}
                                    defaultChecked
                                  />
                                ) : (
                                  <CFormCheck
                                    type="radio"
                                    className="me-1"
                                    name="flexRadioDefault"
                                    id="Single1"
                                    label="Single"
                                    value="SINGLE"
                                    onChange={(e) => setFieldType(e.target.value)}
                                    // defaultChecked
                                  />
                                )}
                              </div>
                              <div>
                                {fieldType === 'BOTH' ? (
                                  <CFormCheck
                                    className="me-1"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="Both1"
                                    label="Both"
                                    value="BOTH"
                                    onChange={(e) => setFieldType(e.target.value)}
                                    defaultChecked
                                  />
                                ) : (
                                  <CFormCheck
                                    className="me-1"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="Both1"
                                    label="Both"
                                    value="BOTH"
                                    onChange={(e) => setFieldType(e.target.value)}
                                  />
                                )}
                              </div>
                              <div>
                                {fieldType === 'MULTIPLE' ? (
                                  <CFormCheck
                                    type="radio"
                                    className="me-1"
                                    name="flexRadioDefault"
                                    id="Multiple1"
                                    label="Multiple"
                                    value="MULTIPLE"
                                    onChange={(e) => setFieldType(e.target.value)}
                                    defaultChecked
                                  />
                                ) : (
                                  <CFormCheck
                                    type="radio"
                                    className="me-1"
                                    name="flexRadioDefault"
                                    id="Multiple1"
                                    label="Multiple"
                                    value="MULTIPLE"
                                    onChange={(e) => setFieldType(e.target.value)}
                                  />
                                )}
                              </div>
                              <div>
                                {fieldType === 'CUSTOM' ? (
                                  <CFormCheck
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="custom1"
                                    label="Custom"
                                    value="CUSTOM"
                                    defaultChecked
                                    onChange={(e) => setFieldType(e.target.value)}
                                  />
                                ) : (
                                  <CFormCheck
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="custom1"
                                    label="Custom"
                                    value="CUSTOM"
                                    onChange={(e) => setFieldType(e.target.value)}
                                  />
                                )}
                              </div>
                            </div>
                            {fieldType === 'CUSTOM' ? (
                              <>
                                <p>Pleae create your custom field</p>

                                <div className="d-flex">
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                      Field Name
                                    </CFormLabel>
                                    <CFormInput
                                      type="text"
                                      placeholder="Enter Field Name"
                                      value={fieldName}
                                      onChange={(e) => setFieldName(e.target.value)}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                      Data Type
                                    </CFormLabel>
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

                                <CTable>
                                  <CTableHead>
                                    <CTableRow>
                                      <CTableHeaderCell scope="col">Field Name</CTableHeaderCell>
                                      <CTableHeaderCell scope="col">Data Type</CTableHeaderCell>
                                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                    {customFields?.map((field, index) => (
                                      <CTableRow key={index}>
                                        <CTableHeaderCell>{field?.name}</CTableHeaderCell>
                                        <CTableDataCell>{field.dataType}</CTableDataCell>

                                        <CTableDataCell>
                                          <CButton
                                            color="light"
                                            size="sm"
                                            onClick={() => deleteField(field.id)}
                                          >
                                            <CIcon icon={cilDelete} />
                                          </CButton>
                                        </CTableDataCell>
                                      </CTableRow>
                                    ))}
                                  </CTableBody>
                                </CTable>
                              </>
                            ) : null}

                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">
                                Delivery Time
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                value={deliveryTime}
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
                                value={responseDelayTime}
                                placeholder="Enter Response Delay Time"
                                onChange={(e) => setResponseDelayTime(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Reseller</CFormLabel>
                              <CFormInput
                                type="number"
                                value={resellerPrice}
                                placeholder="Enter Reseller Price"
                                onChange={(e) => setResellerPrice(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Dealer</CFormLabel>
                              <CFormInput
                                type="number"
                                value={dealerPrice}
                                placeholder="Enter Dealer Price"
                                onChange={(e) => setDealerPrice(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">User</CFormLabel>
                              <CFormInput
                                type="number"
                                value={userPrice}
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
                                value={orderCancelTime}
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
                                value={orderVerfiyTime}
                                placeholder="Enter Order Verify Time"
                                onChange={(e) => setOrderVerfiyTime(e.target.value)}
                              />
                            </div>
                          </CCol>
                        </CRow>
                      </div>
                      <div
                        className="tab-pane fade mt-3"
                        id="detail"
                        role="tabpanel"
                        aria-labelledby="detail-tab"
                      >
                        <ReactQuill theme="snow" value={serviceDesc} onChange={setServiceDesc} />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      >
                        <CRow>
                          <CCol>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">File Name</CFormLabel>
                              <CFormInput
                                type="text"
                                value={seoName}
                                placeholder="Enter File Name"
                                onChange={(e) => setSeoName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Html Title</CFormLabel>
                              <CFormInput
                                type="text"
                                value={seoHtml}
                                placeholder="Enter Html Title"
                                onChange={(e) => setSeoHtml(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">
                                Seo Url Name
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                value={seoUrl}
                                placeholder="Enter Seo Name"
                                onChange={(e) => setSeoUrl(e.target.value)}
                              />
                            </div>
                          </CCol>
                          <CCol></CCol>
                        </CRow>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="category"
                        role="tabpanel"
                        aria-labelledby="category-tab"
                      >
                        <CRow>
                          <CCol>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                              <CFormInput
                                type="text"
                                value={categoryName}
                                placeholder="Enter Category"
                                onChange={(e) => setCategoryName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Html Title</CFormLabel>
                              <CFormInput
                                type="text"
                                value={categoryHtml}
                                placeholder="Enter Html Title"
                                onChange={(e) => setCategoryHtml(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">
                                Seo Url Name
                              </CFormLabel>
                              <CFormInput
                                type="text"
                                value={categoryUrl}
                                placeholder="Enter Seo Name"
                                onChange={(e) => setCategoryUrl(e.target.value)}
                              />
                            </div>
                          </CCol>
                          <CCol></CCol>
                        </CRow>
                      </div>
                    </div>
                  </CRow>
                </CContainer>
              </CCardBody>
            </CCard>
          </CForm>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  )
}

export default AddService
