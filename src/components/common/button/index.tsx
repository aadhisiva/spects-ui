import { CButton, CCol, CSpinner } from '@coreui/react'

interface IButtonWithLoader {
  loading?: boolean
  isModal?: boolean
  handleClick?: any
  title?: string;
  type?: "submit" | "button" | "reset";
}
export default function ButtonWithLoader({ loading, handleClick, title, type, isModal }: IButtonWithLoader) {
  return (
    <CCol sm={4} md={isModal ? 6 : 3} xs={6} style={{display: 'flex', alignItems: 'end'}}>
      <CButton
        color="primary"
        onClick={handleClick}
        disabled={loading}
        type={type || "button"}
        className="d-flex align-items-center"
      >
        {loading && <CSpinner size="sm" className="me-2" />}
        {loading ? 'Loading...' : title}
      </CButton>
    </CCol>
  )
}
