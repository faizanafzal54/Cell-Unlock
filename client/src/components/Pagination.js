import CIcon from '@coreui/icons-react'
import { CPagination, CPaginationItem } from '@coreui/react'
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const pageArray = Array.from(Array(totalPages).keys())
  return (
    <CPagination aria-label="Page navigation example">
      <CPaginationItem className="cursor-pointer" onClick={handlePrevious}>
        <span aria-hidden="true">&laquo;</span>{' '}
      </CPaginationItem>
      {pageArray.map((page) => (
        <CPaginationItem
          className={`cursor-pointer ${currentPage == page + 1 ? 'active' : null}`}
          key={page + 1}
          onClick={() => setCurrentPage(page + 1)}
        >
          {page + 1}
        </CPaginationItem>
      ))}
      <CPaginationItem className="cursor-pointer" onClick={handleNext}>
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  )
}

export default Pagination
