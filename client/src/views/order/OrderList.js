import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CTooltip,
  CLink,
} from '@coreui/react'
import { cilPencil, cilPlus, cilMagnifyingGlass } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from 'src/store/selector/order'
import { orderListAction } from 'src/store/actions/order'
import { Link } from 'react-router-dom'
const OrderList = () => {
  const orders = useSelector(orderList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderListAction())
  }, [orderListAction])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-end">
              <Link to="/orders/edit/new">
                <CTooltip content="Add New Order">
                  <CIcon
                    className="me-3 border border-secondary text-secondary rounded-circle"
                    icon={cilPlus}
                  />
                </CTooltip>
              </Link>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Order Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
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
                        <CTableDataCell>{order?.userId?.firstName}</CTableDataCell>
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
                        <CTableDataCell className="text-center">
                          <Link to={`/orders/edit/${order._id}`}>
                            <CIcon className="text-secondary" icon={cilPencil} />
                          </Link>
                          &nbsp;&nbsp;
                          <Link to={`/orders/${order._id}`}>
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
    </>
  )
}

export default OrderList
