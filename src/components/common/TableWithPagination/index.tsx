import React, { useState, useEffect, ChangeEvent } from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CInputGroup,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CTooltip,
  CButton,
} from '@coreui/react'
import './TableWithPagination.css'
import CIcon from '@coreui/icons-react'
import { cilList, cilPencil } from '@coreui/icons'

const dataasf = {
  data: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ],
  totalItems: 12,
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface IPaginatedTable {
  headCells?: any
  handleClickModify?: any
  title?: string
  isButtonType?: string
  originalData: any
  totalCount?: number | any 
  currentPage?: number | string | any
  rowsPerPage?: number | string | any
  setCurrentPage?: void | any
  setRowsPerPage?: void | any
  pagination?: boolean
}
const PaginatedTable = ({
  headCells,
  handleClickModify,
  title,
  originalData = [],
  totalCount = 0,
  rowsPerPage,
  currentPage,
  setRowsPerPage,
  setCurrentPage,
  isButtonType,
  pagination
}: IPaginatedTable) => {
  // const [totalCount, setTotalCount] = useState(0); // Total number of items from the API
  const [searchTerm, setSearchTerm] = useState('') // Search term
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to the first page
  }

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    setRowsPerPage(Number(e.target.value))
    setCurrentPage(1) // Reset to the first page
  }

  const visibleRows = pagination ? originalData : React.useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage; // Calculate the starting index
    const endIndex = startIndex + rowsPerPage;         // Calculate the ending index
  
    return stableSort(originalData, getComparator(order, orderBy)).slice(
      startIndex,
      endIndex
    ); // Return rows only for the current page
  }, [order, orderBy, currentPage, rowsPerPage, originalData]);

  const totalPages = Math.ceil(totalCount / rowsPerPage) // Calculate total pages dynamically
  
  return (
    <div className="table-Pagination">
      <CRow className="title-and-search">
        <CCol md={4} xs={12}>
          <span className="title">{title || 'Table Data'}</span>
        </CCol>
        <CCol md={2} xs={12}>
          {/* Rows Per Page Selector */}
          <CFormSelect value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
          </CFormSelect>
        </CCol>
        <CCol className="search-term" md={4} xs={12}>
          {/* Search Bar */}
          <CInputGroup className="mb-3">
            <CFormInput placeholder="Search..." value={searchTerm} onChange={handleSearch} />
          </CInputGroup>
        </CCol>
      </CRow>

      {/* Table */}
      <CRow>
        <CTable small hover striped responsive>
          <CTableHead>
            <CTableRow>
              {(headCells || []).map((header: any) => {
                return (
                  <CTableHeaderCell className="text-center" key={header.id}>
                    {header.label}
                  </CTableHeaderCell>
                )
              })}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {visibleRows.map((row: any, index: string | number) => {
              const labelId = `enhanced-table-checkbox-${index}`
              return (
                <CTableRow tabIndex={-1} key={index} style={{ cursor: 'pointer', color: 'white' }}>
                  {headCells.map((headCell: any, index: string) => {
                    if (headCell.id == 'Action') {
                      return (
                        <CTableDataCell
                          key={labelId + '' + index}
                          onClick={() => handleClickModify(row)}
                          className="text-center"
                        >
                          <CTooltip content={isButtonType !== 'Edit' ? isButtonType : 'Edit'}>
                            <CButton color="primary" shape="square" size="sm">
                              <CIcon
                                icon={isButtonType !== 'Edit' ? cilList : cilPencil}
                                size="sm"
                              />
                            </CButton>
                          </CTooltip>
                        </CTableDataCell>
                      )
                    }
                    return (
                      <CTableDataCell
                        id={`${labelId}${index}`}
                        scope="row"
                        key={`${row[headCell.id]}${index}`}
                        style={{ cursor: 'pointer', fontWeight: 'normal' }}
                        className="text-center" // CoreUI uses classes for alignment
                      >
                        {row[headCell.id]}
                      </CTableDataCell>
                    )
                  })}
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CRow>

      {/* Pagination */}
      <CRow className="pagination">
        {/* Page Information */}
        <CCol md={6} sm={12}>
          <span>
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, totalCount)} -{' '}
            {Math.min(currentPage * rowsPerPage, totalCount)} of {totalCount} items
          </span>
        </CCol>
        <CCol md={6} sm={12}>
          <CPagination>
            {/* Previous Button */}
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
            >
              Previous
            </CPaginationItem>

            {/* First Page */}
            {currentPage > 2 && (
              <>
                <CPaginationItem onClick={() => setCurrentPage(1)}>1</CPaginationItem>
                {currentPage > 3 && <CPaginationItem disabled>...</CPaginationItem>}
              </>
            )}

            {/* Current and Surrounding Pages */}
            {[...Array(totalPages).keys()]
              .filter(
                (page) =>
                  page + 1 === currentPage ||
                  page + 1 === currentPage - 1 ||
                  page + 1 === currentPage + 1,
              )
              .map((page) => (
                <CPaginationItem
                  key={page}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </CPaginationItem>
              ))}

            {/* Last Page */}
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && <CPaginationItem disabled>...</CPaginationItem>}
                <CPaginationItem onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </CPaginationItem>
              </>
            )}

            {/* Next Button */}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>
    </div>
  )
}

export default PaginatedTable
