import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { ToastContainer } from 'react-toastify'
import { toastify } from 'src/store/services/toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CForm,
  CCardBody,
  CCardHeader,
  CFormLabel,
  CButton,
  CCol,
  CRow,
  CFormTextarea,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { cilPencil, cilMagnifyingGlass } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCategoryAction,
  categoryListAction,
  categoryByIdAction,
  updateCategoryAction,
} from 'src/store/actions/category'
import { categoryList } from 'src/store/selector/category'

import { Link } from 'react-router-dom'
const CategoryList = () => {
  const dispatch = useDispatch()
  const categories = useSelector(categoryList)
  const [categoryId, setCategoryId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [visible, setVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(categoryListAction())
  }, [categoryListAction])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || name === '') return toastify('error', 'Category name is mandatory')

    if (isEdit) {
      dispatch(updateCategoryAction(categoryId, { name, description }, callback))
    } else {
      dispatch(addCategoryAction({ name, description }, callback))
    }
    setVisible(false)
    setIsEdit(false)
    setName('')
    setDescription('')
    setCategoryId(null)
  }
  const callback = () => {
    dispatch(categoryListAction())
  }

  const editCategory = async (categoryId) => {
    const categoryData = await dispatch(categoryByIdAction(categoryId))
    setCategoryId(categoryId)
    setName(categoryData?.name)
    setDescription(categoryData.description)
    setIsEdit(true)
    setVisible(true)
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="text-end">
              {/* <Link to="/admin/services/add"> */}
              <CButton
                type="submit"
                onClick={() => setVisible(true)}
                color="secondary"
                variant="outline"
              >
                Add New
              </CButton>
              {/* </Link> */}
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {categories?.map((category) => {
                    return (
                      <CTableRow key={category._id}>
                        <CTableDataCell>{category?.name}</CTableDataCell>
                        <CTableDataCell>
                          {category?.description.length > 10
                            ? `${category?.description.substring(0, 10)}...`
                            : category?.description}
                        </CTableDataCell>

                        <CTableDataCell>
                          {new Date(category?.createdAt).toISOString().split('T')[0]}
                        </CTableDataCell>
                        <CTableDataCell>
                          <Link to="#" className="ms-3">
                            <CIcon
                              className="text-secondary ,edit-model-open"
                              icon={cilPencil}
                              onClick={() => editCategory(category._id)}
                            />
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

        <CModal
          backdrop="static"
          keyboard={false}
          visible={visible}
          onClose={() => {
            setVisible(false), setIsEdit(false), setName(''), setDescription('')
            setCategoryId(null)
          }}
        >
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>
              <CModalTitle>
                {isEdit ? 'Edit' : 'Add'} Category {isEdit ? 'true' : 'fale'}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={description}
                  placeholder=".... "
                  onChange={(e) => setDescription(e.target.value)}
                ></CFormTextarea>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" color="secondary" variant="outline">
                {isEdit ? 'Save' : 'Add'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CRow>
      <ToastContainer />
    </>
  )
}

export default CategoryList
