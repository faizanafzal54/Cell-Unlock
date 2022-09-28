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
import { serviceList } from 'src/store/selector/service'
import { serviceListAction } from 'src/store/actions/service'
import { Link } from 'react-router-dom'
const ServiceList = () => {
  const services = useSelector(serviceList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(serviceListAction())
  }, [serviceListAction])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-end">
              <Link to="/admin/services/edit">
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
                        <CTableDataCell>{service?.servicetype}</CTableDataCell>
                        <CTableDataCell>{service?.name}</CTableDataCell>
                        <CTableDataCell>{service?.price}</CTableDataCell>
                        <CTableDataCell>{service?.costPrice}</CTableDataCell>
                        <CTableDataCell>{service?.supplier}</CTableDataCell>

                        {/* <CTableDataCell>{service?.orderVerfiyTime}</CTableDataCell> */}
                        {/* <CTableDataCell>{service?.orderCancelTime}</CTableDataCell> */}
                        <CTableDataCell>
                          {service?.isDeleted === false ? 'Enabled' : 'Disabled'}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          <Link to="*">
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
      </CRow>
    </>
  )
}

export default ServiceList
