import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BorderWithTitle from '../../components/common/borderWithTitle'
import PaginatedTable from '../../components/common/TableWithPagination'
import SelectDistrict from '../../components/common/assignmentSelect/selectDistrict'
import DistrictModal from '../../components/common/modals/districtModal'
import axiosInstance from '../../axiosInstance'
import SpinnerLoder from '../../components/common/spinnerLoder'
import './assignment.css'
import SelectTaluk from '../../components/common/assignmentSelect/selectTaluk'

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

export default function TalukAssign() {
  const [loading, setLoading] = useState(false)
  const [isBloading, setBLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const fecthIntialData = async () => {
    setLoading(true)
    let { data } = await axiosInstance.post('getAssignedMasters', {
      ReqType: 'District',
      DataType: 'Taluk',
      Mobile: '987',
    })
    if (data?.code == 200) {
      setTableData(data.data)
      setTotalCount(data.data?.length || 0)
      setLoading(false)
    } else {
      setLoading(false)
      alert(data.message || 'please try again')
    }
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
    values['ListType'] = 'Taluk';
    values['ReqType'] = 1;
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
        title={'Taluk Modal'}
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
        <SelectTaluk handleSubmitForm={handleClickAdd} loading={isBloading} />
      </BorderWithTitle>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'Taluk Data'}
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
