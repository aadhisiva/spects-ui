import React, { useEffect, useState } from 'react'
import { CCol, CRow, CSpinner } from '@coreui/react'
import SelectOption from '../../components/common/form/select'
import { RURAL_URBAN } from '../../components/utils/constants'
import './assignment.css'
import BorderWithTitle from '../../components/common/borderWithTitle'
import ButtonWithLoader from '../../components/common/button'
import PaginatedTable from '../../components/common/TableWithPagination'
import useForm from '../../components/common/form/formValidation'
import SelectDistrict from '../../components/common/assignmentSelect/selectDistrict'
import DistrictModal from '../../components/common/modals/districtModal'
import axiosInstance from '../../axiosInstance'
import { toast } from 'react-toastify'
import SpinnerLoder from '../../components/common/spinnerLoder'
import { postRequest } from '../../components/services/apiServices'

const headCells = [
  {
    id: 'DistrictName',
    numeric: false,
    disablePadding: true,
    label: 'District Name',
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
    id: 'Name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'Mobile',
    numeric: false,
    disablePadding: false,
    label: 'Mobile',
  },
  {
    id: 'Action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]

export default function DistrictAssign() {
  const [loading, setLoading] = useState(false)
  const [isBloading, setBLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const fecthIntialData = async () => {
    let result = await postRequest(
      'getAssignedMasters',
      {
        ReqType: 'District',
        DataType: '',
        Mobile: '987',
      },
      setLoading,
    )
    setTableData(result.data)
    setTotalCount(result?.length || 0)
  }

  useEffect(() => {
    fecthIntialData()
  }, [])

  const handleClickAdd = (values: any) => {
    setFormData(values)
    setVisible(!visible)
  }

  const handleSubmitModal = async (values: any) => {
    setLoading(true)
    values['ListType'] = 'District'
    values['ReqType'] = 1
    let { data } = await axiosInstance.post('assignmentProcess', values)
    if (data.code == 200) {
      await fecthIntialData()
      setVisible(false)
      setLoading(false)
    } else {
      setVisible(false)
      setLoading(false)
      toast.info(data.message || 'please try again')
    }
  }

  const openModalForm = () => {
    return (
      <DistrictModal
        setVisible={setVisible}
        visible={visible}
        handleSubmitModal={handleSubmitModal}
        title={'District Modal'}
        formData={formData}
      />
    )
  }

  const handleClickModify = (data: any) => {
    setFormData(data)
    setVisible(!visible)
  }

  return (
    <div>
      {visible && openModalForm()}
      <SpinnerLoder loading={loading} />
      <BorderWithTitle title={'Assignment'}>
        <SelectDistrict handleSubmitForm={handleClickAdd} loading={isBloading} />
      </BorderWithTitle>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'District Data'}
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
