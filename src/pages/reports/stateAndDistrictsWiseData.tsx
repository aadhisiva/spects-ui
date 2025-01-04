import React, { useEffect, useState } from 'react'
import SpinnerLoder from '../../components/common/spinnerLoder'
import BorderWithTitle from '../../components/common/borderWithTitle'
import SelectStateAndDisReports from '../../components/common/assignmentSelect/selectStateAndDisReports'
import userSelectedValue from '../../components/common/customHooks/userSelectedValue'
import { postRequest, PostRequestWithdownloadFile } from '../../components/services/apiServices'
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
    id: 'benf_name',
    numeric: false,
    disablePadding: true,
    label: 'Benf Name',
  },
  {
    id: 'phone_number',
    numeric: false,
    disablePadding: true,
    label: 'Mobile',
  },
  {
    id: 'refractionist_mobile',
    numeric: false,
    disablePadding: true,
    label: 'Refractionist Mobile',
  },
  {
    id: 'refractionist_name',
    numeric: false,
    disablePadding: true,
    label: 'Refractionist Name',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'Action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]

export default function SecondaryScreeningReports() {
  const [totalCount, setTotalCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [copyOfTableData, setCopyOfTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const [searchObject, setSearchObject] = useState<any>({})
  const [searching, setSearching] = useState(false)

  const [{ UserId }] = userSelectedValue()

  useEffect(() => {
    if (searching) {
      getDataFromApi()
    }
  }, [rowsPerPage, currentPage, searching, searchObject])

  const getDataFromApi = async () => {
    const { DataType, DistrictCode, TalukCode, FromDate, ToDate } =
      searchObject
    let response = await postRequest(
      'fetchStateOrDistrictReports',
      {
        DataType: DataType || null,
        DistrictCode: DistrictCode || null,
        TalukCode: TalukCode || null,
        FromDate: FromDate || null,
        ToDate: ToDate || null,
        PageNumber: currentPage,
        RowsPerPage: rowsPerPage,
      },
      setLoading,
    )
    setTableData(response?.data.TotalData)
    setCopyOfTableData(response?.data.TotalData)
    setTotalCount(response?.data.TotalCount)
    setLoading(false)
    // setSearching(false)
  }

  const handleSearchData = (values: any) => {
    setSearchObject(values)
    setSearching(true)
  }

  const handleDownloadReports = async (values: any) => {
    const { DataType, DistrictCode, TalukCode, FromDate, ToDate } =
      values
    await PostRequestWithdownloadFile(
      'downloadStateOrDistrictReports',
      {
        DataType: DataType || null,
        DistrictCode: DistrictCode || null,
        TalukCode: TalukCode || null,
        FromDate: FromDate || null,
        ToDate: ToDate || null,
        PageNumber: currentPage,
        RowsPerPage: rowsPerPage,
      },
      `spectacles_${new Date().toJSON().split('T')[0]}`,
    )
  }
  const handleClickModify = () => {}
  return (
    <div>
      <SpinnerLoder loading={loading} />
      <BorderWithTitle title={'Search Reports'}>
        <SelectStateAndDisReports
          handleSubmitForm={handleSearchData}
          handleDownloadReports={handleDownloadReports}
        />
      </BorderWithTitle>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'Searched Deatailed Data'}
        originalData={tableData}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        pagination={true}
      />
    </div>
  )
}
