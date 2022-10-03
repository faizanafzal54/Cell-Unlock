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
import { cilPencil, cilPlus, cilMagnifyingGlass } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { userList, pages } from 'src/store/selector/user'
import { userListAction } from 'src/store/actions/user'
import { Link } from 'react-router-dom'
const UserList = () => {
  const users = useSelector(userList)
  const totalPages = useSelector(pages)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)

  const dispatch = useDispatch(limit, page)

  useEffect(() => {
    dispatch(userListAction(limit, page))
  }, [userListAction, page])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Credits</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">StripeAccount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users?.map((user) => {
                    return (
                      <CTableRow key={user._id}>
                        <CTableDataCell>{user?.firstName}</CTableDataCell>
                        <CTableDataCell>{user?.lastName}</CTableDataCell>
                        <CTableDataCell>{user?.email}</CTableDataCell>
                        <CTableDataCell>{user?.gender}</CTableDataCell>
                        <CTableDataCell>{user?.credits}</CTableDataCell>
                        <CTableDataCell>{user?.isActive ? 'Active' : 'InActive'}</CTableDataCell>
                        <CTableDataCell>
                          {user?.isStripeAccountActive ? 'Active' : 'Disabled'}
                        </CTableDataCell>
                        <CTableDataCell className="text-center ">
                          <Link to={`/admin/users/edit/${user._id}`}>
                            <CIcon className="text-secondary " icon={cilPencil} />
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

export default UserList
