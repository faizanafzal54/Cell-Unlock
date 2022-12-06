import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
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
import { cilPencil, cilPlus, cilMagnifyingGlass, cilCheckCircle, cilBan } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { userList, totalRecords } from 'src/store/selector/user'
import { userListAction, userListClearAction } from 'src/store/actions/user'
import { Link } from 'react-router-dom'
import Loader from 'src/components/Loader'

const UserList = () => {
  const users = useSelector(userList)
  const total = useSelector(totalRecords)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [statusFilter, setStatusFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const dispatch = useDispatch(limit, page)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    dispatch(
      userListAction(
        { limit, page, isActive: statusFilter, email: emailFilter, name: nameFilter },
        loadingCallback,
      ),
    )

    return () => {
      dispatch(userListClearAction())
    }
  }, [userListAction, page])

  const loadingCallback = () => {
    setLoading(false)
  }
  const handleSubmit = (e) => {
    setLoading(true)

    e.preventDefault()
    console.log({ statusFilter })
    dispatch(
      userListAction(
        { limit, page, isActive: statusFilter, email: emailFilter, name: nameFilter },
        loadingCallback,
      ),
    )
  }

  const clearFilters = () => {
    setLoading(true)

    setStatusFilter('')
    setEmailFilter('')
    setNameFilter('')

    dispatch(userListAction({ limit, page, isActive: '', email: '', name: '' }, loadingCallback))
  }
  return (
    <>
      <Loader loading={loading}></Loader>

      <CRow>
        <CForm onSubmit={handleSubmit}>
          <CRow className=" row pb-3" xs={12}>
            <div className="col-md-3">
              <CFormInput
                value={emailFilter}
                type="text"
                placeholder="Enter user email"
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <CFormInput
                value={nameFilter}
                type="text"
                placeholder="Enter user name"
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <CFormSelect
                aria-label="Default select example"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option disabled value="">
                  {' '}
                  Status
                </option>
                <option value={true}>Active</option>
                <option value={false}>Disabled</option>
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
                    <CTableHeaderCell scope="col">Stripe Account</CTableHeaderCell>
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

                        <CTableDataCell>
                          {user?.isActive ? (
                            <CIcon className="text-success" icon={cilCheckCircle} />
                          ) : (
                            <CIcon className="text-danger" icon={cilBan} />
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {user?.isStripeAccountActive ? (
                            <CIcon className="text-success" icon={cilCheckCircle} />
                          ) : (
                            <CIcon className="text-danger" icon={cilBan} />
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <Link to={`/admin/users/edit/${user._id}`}>
                            <CIcon className="text-secondary " icon={cilPencil} />
                          </Link>
                          <Link className="ms-3" to={`/admin/users/view/${user._id}`}>
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

export default UserList
