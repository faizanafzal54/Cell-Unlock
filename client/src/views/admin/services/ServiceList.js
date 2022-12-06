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
import { cilPencil, cilPlus, cilMagnifyingGlass, cilCheckCircle, cilBan } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { serviceList, totalRecords } from 'src/store/selector/service'
import { serviceListAction, serviceListClearAction } from 'src/store/actions/service'
import { Link } from 'react-router-dom'
import Loader from 'src/components/Loader'

const ServiceList = () => {
  const services = useSelector(serviceList)
  const dispatch = useDispatch()
  const total = useSelector(totalRecords)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState(null)
  const [serviceTypeFilter, setServiceTypeFilter] = useState('')
  const [serviceNameFilter, setServiceNameFilter] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    dispatch(
      serviceListAction(
        {
          page,
          limit,
          isDeleted: statusFilter,
          name: serviceNameFilter,
          serviceType: serviceTypeFilter,
        },
        loadingCallback,
      ),
    )

    return () => {
      dispatch(serviceListClearAction())
    }
  }, [serviceListAction, page])

  const loadingCallback = () => {
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    dispatch(
      serviceListAction(
        {
          page,
          limit,
          isDeleted: statusFilter,
          name: serviceNameFilter,
          serviceType: serviceTypeFilter,
        },
        loadingCallback,
      ),
    )
  }

  const clearFilters = () => {
    setServiceNameFilter('')
    setStatusFilter('')
    setServiceTypeFilter('')
    setLoading(true)

    dispatch(
      serviceListAction(
        {
          page,
          limit,
          isDeleted: '',
          name: '',
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
          <CRow className=" row pb-3">
            <div className="col-md-3">
              <CFormInput
                value={serviceNameFilter}
                type="text"
                placeholder="Service Name"
                onChange={(e) => setServiceNameFilter(e.target.value)}
              />
            </div>
            <div className="col-md-3 ">
              <CFormSelect
                aria-label="Default select example"
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
              >
                <option disabled value="">
                  Service Type
                </option>
                <option value="IMEI">IMEI</option>
                <option value="SERVER">SERVER</option>
              </CFormSelect>
            </div>
            <div className="col-md-3 ">
              <CFormSelect
                aria-label="Default select example"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option disabled value="">
                  {' '}
                  Status
                </option>
                <option value={false}>Active</option>
                <option value={true}>Disabled</option>
              </CFormSelect>
            </div>

            <div className="col-md-3 text-end ms-auto">
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
                Clear
              </CButton>
            </div>
          </CRow>
        </CForm>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-end">
              <Link to="/admin/services/add">
                {/* <CTooltip content="Add New Service">
                  <CIcon
                    className="me-3 border border-secondary text-secondary rounded-circle"
                    icon={cilPlus}
                  />
                </CTooltip> */}
                <CButton type="submit" color="secondary" variant="outline">
                  Add New
                </CButton>
              </Link>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Service Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
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
                        <CTableDataCell>{service?.categoryId?.name}</CTableDataCell>
                        <CTableDataCell>{service?.name}</CTableDataCell>
                        <CTableDataCell>{service?.price}</CTableDataCell>
                        <CTableDataCell>{service?.costPrice}</CTableDataCell>
                        <CTableDataCell>{service?.supplier}</CTableDataCell>

                        {/* <CTableDataCell>{service?.orderVerfiyTime}</CTableDataCell> */}
                        {/* <CTableDataCell>{service?.orderCancelTime}</CTableDataCell> */}

                        <CTableDataCell>
                          {service?.isDeleted === false ? (
                            <CIcon className="text-success ms-2" icon={cilCheckCircle} />
                          ) : (
                            <CIcon className="text-danger ms-2" icon={cilBan} />
                          )}
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

export default ServiceList
