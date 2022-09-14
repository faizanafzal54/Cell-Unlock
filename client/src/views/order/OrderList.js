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
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from 'src/store/selector/order'

import { orderListAction } from 'src/store/actions/order'
const OrderList = () => {
  const [orders, setOrders] = useState(useSelector(orderList))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderListAction())
  }, [])
  console.log(orders, 'ssssssssssssss')
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
                    <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order</CTableHeaderCell>
                    <CTableHeaderCell scope="col">From</CTableHeaderCell>
                    <CTableHeaderCell scope="col">To</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">IMEI</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {orders?.map((order) => {
                    return (
                      <CTableRow key={order._id}>
                        {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
                        <CTableDataCell>{order.service}</CTableDataCell>
                        <CTableDataCell>{order.status}</CTableDataCell>
                        <CTableDataCell>{order?.userId.firstName}</CTableDataCell>
                        <CTableDataCell>{order.orderNumber}</CTableDataCell>
                        <CTableDataCell>{order.fromDate}</CTableDataCell>
                        <CTableDataCell>{order.toDate}</CTableDataCell>
                        {/* <CTableDataCell>
                          {order.imeiNumbers.map((number) => (
                            <ul>
                              <li>{number}</li>
                            </ul>
                          ))}
                        </CTableDataCell> */}
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
