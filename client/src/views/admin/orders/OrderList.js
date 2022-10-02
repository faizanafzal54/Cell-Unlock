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
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { cilPencil, cilMagnifyingGlass } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { adminOrderList, pages } from 'src/store/selector/order'
import { orderListAction, adminOrderListAction } from 'src/store/actions/order'
import { Link } from 'react-router-dom'
const OrderList = () => {
  const orders = useSelector(adminOrderList)
  const totalPages = useSelector(pages)
  const dispatch = useDispatch()
  const [limit, setLimit] = useState(3)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(adminOrderListAction(limit, page))
  }, [orderListAction, page])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/* <CCardHeader className="text-end">
              <Link to="/orders/edit/new">
                <CTooltip content="Add New Order">
                  <CIcon
                    className="me-3 border border-secondary text-secondary rounded-circle"
                    icon={cilPlus}
                  />
                </CTooltip>
              </Link>
            </CCardHeader> */}
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Order Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">IMEI Numbers</CTableHeaderCell> */}
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
                        <CTableDataCell className="text-center ">
                          <Link to={`/admin/orders/edit/${order._id}`}>
                            <CIcon className="text-secondary " icon={cilPencil} />
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

        <CCol className="" xs={12}>
          <CPagination className="justify-content-end" aria-label="Page navigation example">
            <CPaginationItem
              aria-label="Previous"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                }
              }}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <CPaginationItem key={page} onClick={() => setPage(page)}>
                {page}
              </CPaginationItem>
            ))}

            <CPaginationItem aria-label="Next">
              <span
                aria-hidden="true"
                onClick={() => {
                  if (page < totalPages) {
                    setPage(page + 1)
                  }
                }}
              >
                &raquo;
              </span>
            </CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>
    </>
  )
}

export default OrderList
