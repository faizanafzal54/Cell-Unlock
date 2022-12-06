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
import { adminOrderList, adminUsers, totalRecords } from 'src/store/selector/order'
import {
  orderListAction,
  adminOrderListAction,
  adminUsersListAction,
  adminOrderListClearAction,
} from 'src/store/actions/order'
import { Link } from 'react-router-dom'
import Loader from 'src/components/Loader'

const OrderList = () => {
  const orders = useSelector(adminOrderList)
  const users = useSelector(adminUsers)
  const total = useSelector(totalRecords)
  const [statusFilter, setStatusFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')
  const [orderFilter, setOrderFilter] = useState('')
  const [serviceTypeFilter, setServiceTypeFilter] = useState('')

  const [limit, setLimit] = useState(50)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(adminUsersListAction())
  }, [])

  useEffect(() => {
    setLoading(true)
    dispatch(
      adminOrderListAction(
        {
          limit,
          page,
          status: statusFilter,
          userId: userFilter,
          orderNumber: orderFilter,
          serviceType: serviceTypeFilter,
        },
        loadingCallback,
      ),
    )

    return () => {
      dispatch(adminOrderListClearAction())
    }
  }, [orderListAction, page])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    dispatch(
      adminOrderListAction(
        {
          limit,
          page,
          status: statusFilter,
          userId: userFilter,
          orderNumber: orderFilter,
          serviceType: serviceTypeFilter,
        },
        loadingCallback,
      ),
    )
  }

  const loadingCallback = () => {
    setLoading(false)
  }

  const getBageColor = (orderStatus) => {
    const statusSchema = {
      Pending: 'secondary',
      Completed: 'success',
      Confirmed: 'success',
      InProgress: 'primary',
      Rejected: 'danger',
    }
    return statusSchema[orderStatus]
  }

  const clearFilters = async () => {
    setLoading(true)
    setStatusFilter('')
    setUserFilter('')
    setServiceTypeFilter('')
    setOrderFilter('')

    // console.log({ statusFilter, userFilter, orderFilter, serviceTypeFilter })

    await dispatch(
      adminOrderListAction(
        {
          limit,
          page,
          status: '',
          userId: '',
          orderNumber: '',
          serviceType: '',
        },
        loadingCallback,
      ),
    )
  }

  return (
    <>
      <Loader loading={loading}></Loader>
      <CRow>
        <CForm onSubmit={handleSubmit}>
          <CRow className="row pb-3">
            <div className="col-md-2 ">
              <CFormInput
                value={orderFilter}
                type="text"
                placeholder="Order Number"
                onChange={(e) => setOrderFilter(e.target.value)}
              />
            </div>
            <div className="col-md-2 ">
              <CFormSelect
                aria-label="Default select example"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              >
                <option disabled value="">
                  User
                </option>
                {users?.map((user) => (
                  <option key={user?._id} value={user?._id}>
                    {user?.firstName}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="col-md-2">
              <CFormSelect
                aria-label="Default select example"
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
              >
                <option disabled value="">
                  Service Type
                </option>
                <option value="">Both</option>
                <option value="IMEI">IMEI</option>
                <option value="SERVER">SERVER</option>
              </CFormSelect>
            </div>
            <div className="col-md-2 ">
              <CFormSelect
                aria-label="Default select example"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option disabled value="">
                  Status
                </option>
                <option value="">All</option>
                {['Pending', 'Confirmed', 'In Progress', 'Completed', 'Rejected'].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div className="col-md-2 text-end ms-auto">
              <CButton type="submit" color="secondary" variant="outline">
                Search
              </CButton>
              <CButton
                className="ms-2"
                type="button"
                color="secondary"
                variant="outline"
                onClick={clearFilters}
              >
                clear
              </CButton>
            </div>
          </CRow>
        </CForm>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody className="table-responsive">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Order Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Serial Numbers</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Credits</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {orders?.map((order) => {
                    return (
                      <CTableRow key={order._id}>
                        <CTableDataCell>{order.orderNumber}</CTableDataCell>
                        <CTableDataCell>{order?.service?.categoryId?.name}</CTableDataCell>
                        <CTableDataCell>{order?.service?.name}</CTableDataCell>
                        <CTableDataCell>{order?.userId?.firstName}</CTableDataCell>
                        <CTableDataCell>{order?.serialNumber}</CTableDataCell>
                        <CTableDataCell>{order?.creditsUsed}</CTableDataCell>
                        <CTableDataCell>
                          {new Date(order?.fromDate).toISOString().split('T')[0]}
                        </CTableDataCell>
                        {/* <CTableDataCell>
                          {new Date(order.toDate).toISOString().split('T')[0]}
                        </CTableDataCell> */}

                        <CTableDataCell>
                          <CBadge className="pt-2 pb-2" color={getBageColor(order?.status)}>
                            {order?.status}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
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

            {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1).map((_page) => (
              <CPaginationItem active={_page === page} key={_page} onClick={() => setPage(_page)}>
                {_page}
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
