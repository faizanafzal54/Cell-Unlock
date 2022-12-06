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
  CButton,
} from '@coreui/react'
import { cilPencil, cilPlus, cilMagnifyingGlass } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from 'src/store/selector/order'
import { orderListAction, orderListClearAction } from 'src/store/actions/order'
import { Link } from 'react-router-dom'
import Loader from 'src/components/Loader'

const OrderList = () => {
  const orders = useSelector(orderList)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    dispatch(orderListAction(loadingCallback))

    return () => {
      dispatch(orderListClearAction())
    }
  }, [orderListAction])

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
  return (
    <>
      <Loader loading={loading}></Loader>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-end">
              <Link to="/orders/edit/new/IMEI">
                {/* <CTooltip content="Add New Order">
                  <CIcon
                    className="me-3 border border-secondary text-secondary rounded-circle"
                    icon={cilPlus}
                  />
                </CTooltip> */}
                <CButton type="submit" color="secondary" variant="outline">
                  IMEI Order
                </CButton>
              </Link>
              <Link to="/orders/edit/new/SERVER">
                {/* <CTooltip content="Add New Order">
                  <CIcon
                    className="me-3 border border-secondary text-secondary rounded-circle"
                    icon={cilPlus}
                  />
                </CTooltip> */}
                <CButton className="ms-2" type="submit" color="secondary" variant="outline">
                  Server Order
                </CButton>
              </Link>
            </CCardHeader>
            <CCardBody>
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
                        <CTableDataCell>{order?.service?.categoryId?.name}</CTableDataCell>
                        <CTableDataCell>{order?.service?.name}</CTableDataCell>
                        <CTableDataCell>{order?.userId?.firstName}</CTableDataCell>
                        <CTableDataCell>{order?.serialNumber}</CTableDataCell>
                        <CTableDataCell>{order?.creditsUsed}</CTableDataCell>
                        <CTableDataCell>
                          {new Date(order?.fromDate).toISOString().split('T')[0]}
                        </CTableDataCell>

                        {/* {
                          <CTableDataCell>
                            <ul>
                              {order.imeiNumbers.map((number, index) =>
                                number ? <li key={index}>{number}</li> : null,
                              )}
                            </ul>
                          </CTableDataCell>
                        } */}
                        <CTableDataCell>
                          <CBadge className="pt-2 pb-2" color={getBageColor(order?.status)}>
                            {order?.status}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          {/* <Link to={`/orders/edit/${order._id}`}>
                            <CIcon className="text-secondary" icon={cilPencil} />
                          </Link> */}
                          &nbsp;&nbsp;&nbsp;&nbsp;
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
