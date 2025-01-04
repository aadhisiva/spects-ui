import { useEffect, useState } from 'react'
import WidgetsDropdown from './widget'
import { postRequest } from '../components/services/apiServices'
import userSelectedValue from '../components/common/customHooks/userSelectedValue'
import useAccess from '../components/common/customHooks/useAccess'
import { CCol, CPopover, CRow, CWidgetStatsA } from '@coreui/react'
import { CButton } from '@coreui/react-pro'
import SpinnerLoder from '../components/common/spinnerLoder'

const styles: any = {
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}
const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [counts, setCounts] = useState<any>({})

  const [{ UserId }] = userSelectedValue()
  const [{ superAcces, districtAcces, talukAcces, phcoAcces }] = useAccess()

  useEffect(() => {
    fetchCountsByLogin()
  }, [])

  const fetchCountsByLogin = async () => {
    let response = await postRequest(
      'fetchCountsByLogin',
      {
        ReqType: superAcces
          ? 'Admin'
          : districtAcces
            ? 'Admin'
            : talukAcces
              ? 'District'
              : phcoAcces
                ? 'Taluk'
                : 'SubCenter',
        UserId: UserId,
      },
      setLoading,
    )
    setCounts(response?.data)
  }

  return (
    <CRow xs={{ gutter: 4 }}>
      <SpinnerLoder loading={loading} />
      <CCol sm={6} xl={4} xxl={3}>
        <CPopover
          content={
            <ul>
              <li>
                Student :{' '}
                {counts[0]?.StudentPending + counts[0]?.StudentReady + counts[0]?.StudentDelivered || 0}
              </li>
              <li>
                Benficiary :{' '}
                {counts[0]?.OtherPending + counts[0]?.OtherReady + counts[0]?.OtherDelivered || 0}
              </li>
            </ul>
          }
          placement="bottom"
          trigger={['hover', 'focus']}
        >
          <span tabIndex={0}>
            <CWidgetStatsA
              style={styles}
              color="success"
              value={counts[0]?.TotalCount || 0}
              title="Total Surveyed"
            />
          </span>
        </CPopover>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CPopover
          content={
            <ul>
              <li>Student : {counts[0]?.StudentPending || 0}</li>
              <li>Benficiary : {counts[0]?.OtherPending || 0}</li>
            </ul>
          }
          placement="bottom"
          trigger={['hover', 'focus']}
        >
          <span tabIndex={0}>
            <CWidgetStatsA style={styles} color="primary" value={counts[0]?.Pending} title="Pending" />
          </span>
        </CPopover>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CPopover
          content={
            <ul>
              <li>Student : {counts[0]?.StudentReady || 0}</li>
              <li>Benficiary : {counts[0]?.OtherReady || 0}</li>
            </ul>
          }
          placement="bottom"
          trigger={['hover', 'focus']}
        >
          <span tabIndex={0}>
            <CWidgetStatsA
              style={styles}
              color="warning"
              value={counts[0]?.Delivered || 0}
              title="Ready For Develivery"
            />
          </span>
        </CPopover>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CPopover
          content={
            <ul>
              <li>Student : {counts[0]?.StudentDelivered || 0}</li>
              <li>Benficiary : {counts[0]?.OtherDelivered || 0}</li>
            </ul>
          }
          placement="bottom"
          trigger={['hover', 'focus']}
        >
          <span tabIndex={0}>
            <CWidgetStatsA
              style={styles}
              color="info"
              value={counts[0]?.Ready || 0}
              title="Delivered"
            />
          </span>
        </CPopover>
      </CCol>
    </CRow>
  )
}

export default Dashboard
