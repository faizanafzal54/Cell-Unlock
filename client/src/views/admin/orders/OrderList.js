import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CForm,
  CCardBody,
  CFormSelect,
  CButton,
  CCol,
  CRow,
  CFormInput,
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
import { adminOrderList, pages, adminUsers } from 'src/store/selector/order'
import {
  orderListAction,
  adminOrderListAction,
  adminUsersListAction,
} from 'src/store/actions/order'
import { Link } from 'react-router-dom'
const OrderList = () => {
  const orders = useSelector(adminOrderList)
  const users = useSelector(adminUsers)
  const totalPages = useSelector(pages)
  const dispatch = useDispatch()
  const [statusFilter, setStatusFilter] = useState(null)
  const [userFilter, setUserFilter] = useState(null)
  const [orderFilter, setOrderFilter] = useState('')
  const [limit, setLimit] = useState(3)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(adminUsersListAction())
  }, [])

  useEffect(() => {
    dispatch(
      adminOrderListAction({
        limit,
        page,
        status: statusFilter,
        userId: userFilter,
        orderNumber: orderFilter,
      }),
    )
  }, [orderListAction, page])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ statusFilter, userFilter, orderFilter })
    dispatch(
      adminOrderListAction({
        limit,
        page,
        status: statusFilter,
        userId: userFilter,
        orderNumber: orderFilter,
      }),
    )
  }

  return (
    <>
      <CRow>
        <CForm onSubmit={handleSubmit}>
          <CCol className="d-flex mb-3  border" xs={12}>
            <div className="col-3 m-2">
              <CFormInput
                value={orderFilter}
                type="text"
                placeholder="Enter Order Number"
                onChange={(e) => setOrderFilter(e.target.value)}
              />
            </div>
            <div className="col-3 m-2">
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setUserFilter(e.target.value)}
              >
                <option value="">Select User</option>
                {users?.map((user) => (
                  <option key={user?._id} value={user?._id}>
                    {user?.firstName}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div className="col-3 m-2">
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </CFormSelect>
            </div>

            <div className="col-2 pt-2">
              <CButton type="submit" color="secondary" variant="outline">
                Search
              </CButton>
            </div>
          </CCol>
        </CForm>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Order Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {orders?.map((order) => {
                    return (
                      <CTableRow key={order._id}>
                        <CTableDataCell>{order.orderNumber}</CTableDataCell>
                        <CTableDataCell>{order?.service?.name}</CTableDataCell>
                        <CTableDataCell>{order?.userId?.firstName}</CTableDataCell>
                        <CTableDataCell>
                          {new Date(order?.fromDate).toISOString().split('T')[0]}
                        </CTableDataCell>
                        <CTableDataCell>
                          {new Date(order.toDate).toISOString().split('T')[0]}
                        </CTableDataCell>

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
