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
  const [search, setSearch] = useState('')

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

  function searchFor(term) {
    return function (x) {
      return (
        x.orderNumber.toLowerCase().includes(term.toLowerCase()) ||
        x.userId?.firstName.toLowerCase().includes(term.toLowerCase()) ||
        x.serviceType.toLowerCase().includes(term.toLowerCase()) ||
        x.service?.name.toLowerCase().includes(term.toLowerCase()) ||
        !term
      );
    };
  }
  return (
    <>
      <Loader loading={loading}></Loader>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader >
              <div className='row'>
                <div className='col-md-6'>
                  <div className='d-flex'>
                    <input className='form-control me-2' placeholder='search' onChange={e => setSearch(e.target.value)} />
                    <CButton onClick={() => setSearch('')} type="button" color="secondary" variant="outline">
                      Clear
                    </CButton>
                  </div>
                </div>
                <div className='col-md-6 text-end'>
                  <Link to="/orders/edit/new/IMEI">
                    <CButton color="secondary" variant="outline">
                      IMEI Order
                    </CButton>
                  </Link>
                  <Link to="/orders/edit/new/SERVER">
                    <CButton className="ms-2" color="secondary" variant="outline">
                      Server Order
                    </CButton>
                  </Link>
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <div className='table-responsive'>
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
                    {orders?.filter(searchFor(search)).map((order) => {
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
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default OrderList
