import React, { useEffect, useState } from 'react'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
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
  const [features, setFeatures] = useState([])
  const [seoName, setSeoName] = useState('')
  const [seoHtml, setSeoHtml] = useState('')
  const [seoUrl, setSeoUrl] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryHtml, setCategoryHtml] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
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

    dispatch(addServiceAction(data, callback))
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

  useEffect(() => {
    console.log(editorState)
  })

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CForm onSubmit={submitHandler}>
            <CCard className="mb-4">
              <CCardHeader className="d-flex">
                <div className="mt-2">
                  <strong>Add Service</strong>
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
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
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
                              <CFormLabel htmlFor="exampleFormControlInput1">
                                Service Name
                              </CFormLabel>
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
                              <CFormLabel htmlFor="exampleFormControlInput1">Cost Price</CFormLabel>
                              <CFormInput
                                type="number"
                                placeholder="Enter Cost Price"
                                onChange={(e) => setCostPrice(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Supplier</CFormLabel>
                              <CFormInput
                                type="text"
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
                                placeholder="Enter Redirect Url"
                                onChange={(e) => setRedirectUrl(e.target.value)}
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
                                id="flexCheckChecked"
                                label="Refund available if code is not found"
                                value="Refund available if code is not found"
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="flexCheckChecked"
                                label="Service availble 24x7"
                                value="Service availble 24x7"
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="flexCheckChecked"
                                label="Unlock guranteed"
                                value="Unlock guranteed"
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="flexCheckChecked"
                                label="No refund for bad requests"
                                value="No refund for bad requests"
                                onChange={(e) =>
                                  e.target.checked
                                    ? setFeatures([...features, e.target.value])
                                    : setFeatures(
                                        features?.filter((item) => item !== e.target.value),
                                      )
                                }
                              />
                              <CFormCheck
                                id="flexCheckChecked"
                                label="Working on business days only"
                                value="Working on business days only"
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
                              </div>
                              <div>
                                <CFormCheck
                                  className="me-1"
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
                                  className="me-1"
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
                          </CCol>
                        </CRow>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <Editor
                          initialEditorState={editorState}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          editorStyle={{
                            border: '1px solid black',
                          }}
                          onEditorStateChange={onEditorStateChange}
                        />
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
                                placeholder="Enter File Name"
                                onChange={(e) => setSeoName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Html Title</CFormLabel>
                              <CFormInput
                                type="text"
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
                                placeholder="Enter Category"
                                onChange={(e) => setCategoryName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <CFormLabel htmlFor="exampleFormControlInput1">Html Title</CFormLabel>
                              <CFormInput
                                type="text"
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
