import { useEffect, useState } from 'react'
import SpinnerLoder from '../../components/common/spinnerLoder'
import userSelectedValue from '../../components/common/customHooks/userSelectedValue'
import { postRequest } from '../../components/services/apiServices'
import PaginatedTable from '../../components/common/TableWithPagination'
import { CCol, CRow } from '@coreui/react'

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
    id: 'SubCenterName',
    numeric: false,
    disablePadding: true,
    label: 'Sub Center Name',
  },
  {
    id: 'TotalPSCompleted',
    numeric: false,
    disablePadding: true,
    label: 'Total primary Screening Completed',
  },
  {
    id: 'TotalSSRequired',
    numeric: false,
    disablePadding: true,
    label: 'Total Secondary Screening Pending',
  }
]

export default function PrimaryScreeningReports() {
  const [totalCount, setTotalCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [copyOfTableData, setCopyOfTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const [{ UserId }] = userSelectedValue()

  useEffect(() => {
      getDataFromApi()
  }, [])

  const getDataFromApi = async () => {
    let response = await postRequest(
      'fetchPrimaryScreeningReports',
      {
        ReqType: "District",
        UserId: UserId || null,
      },
      setLoading,
    );
    setTableData(response?.data)
    setCopyOfTableData(response?.data)
    setTotalCount(response?.data?.length || 0)
    setLoading(false)
    // setSearching(false)
  }
  const handleClickModify = () => {};
  const TotalSSRequired = (tableData || []).reduce((acc, item: any) => acc + Number(item.TotalSSRequired), 0);
  const TotalPSCompleted = (tableData || []).reduce((acc, item: any) => acc + Number(item.TotalPSCompleted), 0);    
  return (
    <div>
      <SpinnerLoder loading={loading} />
      <CRow>
        <CCol style={{color: 'black', fontSize: '20px'}}>Primary Screening : {TotalPSCompleted}</CCol>
        <CCol style={{color: 'black', fontSize: '20px'}}>Secondary Screening : {TotalSSRequired}</CCol>
      </CRow>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'Primary Screening Data'}
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
