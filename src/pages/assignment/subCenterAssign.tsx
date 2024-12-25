import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BorderWithTitle from '../../components/common/borderWithTitle'
import PaginatedTable from '../../components/common/TableWithPagination'
import DistrictModal from '../../components/common/modals/districtModal'
import axiosInstance from '../../axiosInstance'
import SpinnerLoder from '../../components/common/spinnerLoder'
import './assignment.css'
import SelectPhco from '../../components/common/assignmentSelect/selectPhco'
import SelectSubCenter from '../../components/common/assignmentSelect/selectSubCenter'
import userSelectedValue from '../../components/common/customHooks/userSelectedValue'
import useAccess from '../../components/common/customHooks/useAccess'

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
    label: 'SubCenter Name',
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

export default function PhcoAssign() {
  const [loading, setLoading] = useState(false)
  const [isBloading, setBLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const [{ loginAuthAccess, mobileAuthAccess }] = useAccess();
    const [{ Mobile }] = userSelectedValue();

  const fecthIntialData = async () => {
    setLoading(true)
    let { data } = await axiosInstance.post('getAssignedMasters', {
      ReqType: loginAuthAccess,
      DataType: 'SubCenter',
      Mobile: mobileAuthAccess ? Mobile : "",
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
    values['ReqType'] = 2;
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
        title={'SubCenter Modal'}
        formData={formData}
      />
    )
  }

  const handleClickModify = (data: any) => {
    setFormData(data)
    setVisible(!visible)
  };

  return (
    <div>
      {visible && openModalForm()}
      <SpinnerLoder loading={loading} />
      <BorderWithTitle title={'Assignment'}>
        <SelectSubCenter handleSubmitForm={handleClickAdd} loading={isBloading} />
      </BorderWithTitle>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'SubCenter Data'}
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
