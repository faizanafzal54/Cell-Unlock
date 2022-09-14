import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from 'src/store/selector/order'

import { orderListAction } from 'src/store/actions/order'
const OrderList = () => {
  const orders = useSelector(orderList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderListAction())
  }, [orderListAction])
  return (
    <>
      <CRow>
        {/* <CCol xs={12}>
          <DocsCallout name="Table" href="components/table" />
        </CCol> */}
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>React Table</strong> <small>Basic example</small>
            </CCardHeader>
            <CCardBody>
              {/* <p className="text-medium-emphasis small">
                Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
                tables look in CoreUI.
              </p> */}
              <CTable>
                <CTableHead>
                  <CTableRow>
                    {/* <CTableHeaderCell scope="col">#</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Order Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">IMEI Numbers</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
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
                        {
                          <CTableDataCell>
                            <CListGroup>
                              {order.imeiNumbers.map((number, index) => (
                                <CListGroupItem key={index}>{number}</CListGroupItem>
                              ))}
                            </CListGroup>
                          </CTableDataCell>
                        }
                        {/* <CTableDataCell>
                          {order.status === 'Pending' ? (
                            <span class="badge text-bg-warning">{order.status}</span>
                          ) : order.status === 'Delivered' ? (
                            <span class="badge text-bg-success">{order.status}</span>
                          ) : (
                            <span class="badge text-bg-danger">{order.status}</span>
                          )}
                        </CTableDataCell> */}

                        <CTableDataCell>
                          {order.status}
                          <span class="badge text-bg-warning">asdsa</span>
                          {/* {order.status === 'Pending' ? (
                          ) : (
                            'null'
                          )} */}
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
