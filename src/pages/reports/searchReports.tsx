import React, { useState } from 'react'
import SelectForReports from '../../components/common/assignmentSelect/selectForReports'
import BorderWithTitle from '../../components/common/borderWithTitle'
import PaginatedTable from '../../components/common/TableWithPagination'

const headCells = [
  {
    id: 'DistrictName',
    numeric: false,
    disablePadding: true,
    label: 'District Name',
  },
  {
    id: 'TalukName',
    numeric: false,
    disablePadding: true,
    label: 'Taluk Name',
  },
  {
    id: 'PhcoName',
    numeric: false,
    disablePadding: true,
    label: 'Phco Name',
  },
  {
    id: 'RoleName',
    numeric: false,
    disablePadding: true,
    label: 'Role Name',
  },
  {
    id: 'Type',
    numeric: false,
    disablePadding: true,
    label: 'Type',
  },
  {
    id: 'Action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]

export default function SearchReports() {
  const [totalCount, setTotalCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const handleSearchData = () => {}
  const handleClickModify = () => {}
  return (
    <div>
      <BorderWithTitle title={'Search Reports'}>
        <SelectForReports handleSubmitForm={handleSearchData} />
      </BorderWithTitle>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'Searched Data'}
        originalData={tableData}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  )
}
