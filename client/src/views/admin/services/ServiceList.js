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
  CForm,
  CTooltip,
  CFormInput,
  CFormSelect,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { cilPencil, cilPlus, cilMagnifyingGlass } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { serviceList, pages } from 'src/store/selector/service'
import { serviceListAction } from 'src/store/actions/service'
import { Link } from 'react-router-dom'
const ServiceList = () => {
  const services = useSelector(serviceList)
  const dispatch = useDispatch()
  const totalPages = useSelector(pages)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState(null)
  const [serviceTypeFilter, setServiceTypeFilter] = useState('')
  const [serviceNameFilter, setServiceNameFilter] = useState('')

  useEffect(() => {
    dispatch(
      serviceListAction({
        page,
        limit,
        isDeleted: statusFilter,
        name: serviceNameFilter,
        serviceType: serviceTypeFilter,
      }),
    )
  }, [serviceListAction, page])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      serviceListAction({
        page,
        limit,
        isDeleted: statusFilter,
        name: serviceNameFilter,
        serviceType: serviceTypeFilter,
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
                value={serviceNameFilter}
                type="text"
                placeholder="Enter Service Name"
                onChange={(e) => setServiceNameFilter(e.target.value)}
              />
            </div>
            <div className="col-3 m-2">
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setServiceTypeFilter(e.target.value)}
              >
                <option value="">Select Service Type</option>
                <option value="IMEI">IMEI</option>
                <option value="SERVER">SERVER</option>
              </CFormSelect>
            </div>
            <div className="col-3 m-2">
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value={false}>Active</option>
                <option value={true}>Disabled</option>
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
            <CCardHeader className="text-end">
              <Link to="/admin/services/add">
                <CTooltip content="Add New Service">
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
                    <CTableHeaderCell scope="col">Service Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cost Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Supplier</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Order Veriy Time</CTableHeaderCell> */}
                    {/* <CTableHeaderCell scope="col">Order Cancel Time</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {services?.map((service) => {
                    return (
                      <CTableRow key={service._id}>
                        {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
                        <CTableDataCell>{service?.serviceType}</CTableDataCell>
                        <CTableDataCell>{service?.name}</CTableDataCell>
                        <CTableDataCell>{service?.price}</CTableDataCell>
                        <CTableDataCell>{service?.costPrice}</CTableDataCell>
                        <CTableDataCell>{service?.supplier}</CTableDataCell>

                        {/* <CTableDataCell>{service?.orderVerfiyTime}</CTableDataCell> */}
                        {/* <CTableDataCell>{service?.orderCancelTime}</CTableDataCell> */}
                        <CTableDataCell>
                          {service?.isDeleted === false ? 'Enabled' : 'Disabled'}
                        </CTableDataCell>

                        <CTableDataCell>
                          <Link to={`/admin/services/${service._id}`}>
                            <CIcon className="text-secondary" icon={cilPencil} />
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

export default ServiceList
