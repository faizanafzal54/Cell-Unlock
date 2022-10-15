import { cilMagnifyingGlass, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CPagination,
  CPaginationItem,
  CContainer,
} from '@coreui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { orderListAction } from 'src/store/actions/order'
import { userByIdAction } from 'src/store/actions/user'
import { orderList } from 'src/store/selector/order'

function UserView() {
  const dispatch = useDispatch()
  const params = useParams()
  const [user, setUser] = useState(null)

  const orders = useSelector(orderList)

  useEffect(() => {
    dispatch(orderListAction())
  }, [orderListAction])

  useEffect(async () => {
    const data = await dispatch(userByIdAction(params.id))

    setUser(data)
  }, [userByIdAction])

  return (
    <>
      <CContainer className="">
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="">
                <strong>User Details - {user?._id}</strong>
              </CCardHeader>
              <CCardBody>
                <CContainer>
                  <CRow>
                    <CCol className="order-detail-tag" xs={6}>
                      <div className="d-flex">
                        <p className="fw-bold ">First Name:</p>
                        <p className="ps-2 ">{user?.firstName}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">Last Name:</p>
                        <p className=" ps-2">{user?.lastName}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">Email:</p>
                        <p className=" ps-2">{user?.email}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">Gender:</p>
                        <p className=" ps-2">{user?.gender}</p>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="d-flex">
                        <p className="fw-bold ">Role:</p>
                        <p className=" ps-2">{user?.user}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">User Type:</p>
                        <p className=" ps-2">{user?.userType}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">User Status:</p>
                        <p className=" ps-2">{user?.isActive ? 'Active' : 'Inactive'}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">Stripe Status:</p>
                        <p className=" ps-2">
                          {user?.isStripeAccountActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                </CContainer>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard className="mb-4">
              <CCardHeader className="">
                <strong>Orders </strong>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Order Number</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                      {/* {

                    <CTableHeaderCell scope="col">IMEI Numbers</CTableHeaderCell>
                    } */}
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {orders?.map((order) => {
                      return (
                        <CTableRow key={order._id}>
                          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
                          <CTableDataCell>{order.orderNumber}</CTableDataCell>
                          <CTableDataCell>{order?.service?.name}</CTableDataCell>
                          <CTableDataCell>
                            {new Date(order?.fromDate).toISOString().split('T')[0]}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(order.toDate).toISOString().split('T')[0]}
                          </CTableDataCell>
                          {/* {
                          <CTableDataCell>
                            <ul>
                              {order.imeiNumbers.map((number, index) => (
                                <li key={index}>{number}</li>
                              ))}
                            </ul>
                          </CTableDataCell>
                        } */}
                          <CTableDataCell>
                            {order.status === 'Confirmed' ? (
                              <CBadge className="pt-2 pb-2" color="warning">
                                {order.status}
                              </CBadge>
                            ) : order.status === 'Completed' ? (
                              <CBadge className="pt-2 pb-2" color="success">
                                {order.status}
                              </CBadge>
                            ) : (
                              <CBadge className="pt-2 pb-2" color="danger">
                                {order.status}
                              </CBadge>
                            )}
                          </CTableDataCell>
                          <CTableDataCell>
                            <Link to={`/admin/orders/edit/${order._id}`}>
                              <CIcon className="text-secondary" icon={cilPencil} />
                            </Link>
                            &nbsp;&nbsp;
                            <Link to={`/admin/orders/${order._id}`}>
                              <CIcon className="text-secondary " icon={cilMagnifyingGlass} />
                            </Link>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="">
                <strong>Sales Report - {user?._id}</strong>
              </CCardHeader>
              <CCardBody>
                <CContainer>
                  <CRow>
                    <CCol className="order-detail-tag" xs={6}>
                      <div className="d-flex">
                        <p className="fw-bold ">Order Placed:</p>
                        <p className="ps-2 ">{orders?.length}</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-bold ">Total Price:</p>
                        {/* <p className=" ps-2">{user?.lastName}</p> */}
                      </div>
                    </CCol>
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

export default UserView
