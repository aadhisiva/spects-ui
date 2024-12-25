import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'

const WidgetsDropdown = () => {
  return (
    <CRow xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA color="danger" value={<>1000000</>} title="Total" />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA color="warning" value={<>440000</>} title="Pending" />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA color="info" value={<>300000</>} title="Delivered" />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA color="primary" value={<>10000</>} title="Ready For Develivery" />
      </CCol>
    </CRow>
  )
};

export default WidgetsDropdown
