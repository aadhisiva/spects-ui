import React, { useEffect, useState } from 'react'
import { CRow } from '@coreui/react'
import ButtonWithLoader from '../../components/common/button'
import PaginatedTable from '../../components/common/TableWithPagination'
import axiosInstance from '../../axiosInstance'
import RolesModal from '../../components/common/modals/rolesModal'
import { decryptData } from '../../components/utils/decrypt'
import RolesAccessModal from '../../components/common/modals/rolesAccessModal'
import ChildRoleModal from '../../components/common/modals/childRolesModal'

const headCells = [
    {
      id: 'RoleName',
      numeric: false,
      disablePadding: true,
      label: 'Role Name',
    },
    {
      id: 'ChildName',
      numeric: false,
      disablePadding: true,
      label: 'Child Role',
    },
    {
      id: 'Action',
      numeric: false,
      disablePadding: false,
      label: 'Action',
    },
  ];
export default function ChildRoles() {
  const [tableData, setTableData] = useState([])
  const [visible, setVisible] = React.useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [totalCount, setTotalCount] = useState(0)

  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const handleClickModify = (data: any) => {
    setVisible(!visible)
    setFormData(data)
  }

  const handleClickAdd = () => {
    setFormData({})
    setVisible(!visible)
  }
  const fecthIntialData = async () => {
    setLoading(true)
    let { data } = await axiosInstance.post('assignChildAndGet', { ReqType: 'Get' })
    let decrypt = decryptData(data.data)
    if (data?.code == 200) {
      setTableData(decrypt)
      setTotalCount(decrypt.length || 0)
      setLoading(false)
    } else {
      setLoading(false)
      alert(data.message || 'please try again')
    }
  }

  useEffect(() => {
    fecthIntialData()
  }, [])

  const handleSubmitForm = async (values: any) => {
    setLoading(true)
    values['ReqType'] = 'Add'
    let { data } = await axiosInstance.post('assignChildAndGet', values)
    if (data.code == 200) {
      await fecthIntialData()
      setVisible(!visible)
      setLoading(false)
    } else {
      setVisible(!visible)
      setLoading(false)
      alert(data.message || 'please try again')
    }
  }

  const renderDeoartModal = visible && (
    <ChildRoleModal
      visible={visible}
      formData={formData}
      setVisible={setVisible}
      handleSubmitModal={handleSubmitForm}
    />
  )

  return (
    <div>
      {renderDeoartModal}
      {/* <SpinnerLoader isLoading={loading} /> */}
      <CRow style={{ display: 'flex', justifyContent: 'end' }}>
        <ButtonWithLoader loading={false} title={'Add Child Role'} handleClick={handleClickAdd} />
      </CRow>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'Child Role Data'}
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
