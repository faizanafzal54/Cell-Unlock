import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import 'react-toastify/dist/ReactToastify.css'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import { cilPencil, cilPlus } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { order } from 'src/store/selector/order'
import { orderByIdAction } from 'src/store/actions/order'
import { useParams } from 'react-router-dom'
const ViewOrder = () => {
  const [order, setOrder] = useState(null)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(async () => {
    const order = await dispatch(orderByIdAction(params.id))
    setOrder(order)
    console.log(order)
  }, [orderByIdAction])
  return (
    <>
      <CContainer className="">
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="">
                <strong>Order Detail</strong>
              </CCardHeader>
              <CCardBody>
                <CContainer>
                  <CRow>
                    <CCol className="order-detail-tag" xs={6}>
                      <div className="d-flex">
                        <p className="fw-bold ">Service Name:</p>
                        <p className="ps-2 ">{order?.service?.name}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">Order Number:</p>
                        <p className=" ps-2">{order?.orderNumber}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">Customer Name:</p>
                        <p className=" ps-2">{order?.userId?.firstName}</p>
                      </div>
                      {order?.imeiNumbers?.length !== 0 ? (
                        <div className="d-flex">
                          <p className="fw-bold ">IMEI Numbers:</p>
                          <p className=" ps-2">
                            {order?.imeiNumbers?.map((number, index) => (
                              <li key={index}>{number}</li>
                            ))}
                          </p>
                        </div>
                      ) : null}
                      {order?.serverFields?.length !== 0 ? (
                        <div className="d-flex">
                          <p className="fw-bold ">Server Field:</p>
                          <p className=" ps-2">
                            {order?.serverFields?.map((number, index) => (
                              <li key={index}>{number}</li>
                            ))}
                          </p>
                        </div>
                      ) : null}

                      {order?.fieldType.customFields?.length !== 0 ? (
                        <div className="d-flex">
                          <p className="fw-bold ">Custom Fields:</p>
                          <p className=" ps-2">
                            {order?.fieldType.customFields?.map((field, index) => (
                              <li key={index}>
                                {field.name} : {field.value}
                              </li>
                            ))}
                          </p>
                        </div>
                      ) : null}
                    </CCol>
                    <CCol className="order-detail-tag" xs={6}>
                      <div className="d-flex">
                        <p className="fw-bold ">Status:</p>
                        <p className=" ps-2">{order?.status}</p>
                      </div>

                      <div className="d-flex">
                        <p className="fw-bold ">Start Date:</p>
                        <p className=" ps-2">
                          {order?.fromDate
                            ? new Date(order?.fromDate).toISOString().split('T')[0]
                            : null}
                        </p>
                      </div>

                      <div className="d-flex">
                        <p className="fw-bold ">End Date:</p>
                        <p className=" ps-2">
                          {order?.toDate
                            ? new Date(order?.toDate).toISOString().split('T')[0]
                            : null}
                        </p>
                      </div>
                    </CCol>
                    <hr />
                    <div className="d-flex">
                      <p className="fw-bold ">Code:</p>
                      <p className=" ps-2">{order?.code}</p>
                    </div>
                    <div className="d-flex">
                      <p className="fw-bold ">Description:</p>
                      <p className=" ps-2">{order?.description}</p>
                    </div>
                  </CRow>
                </CContainer>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default ViewOrder
