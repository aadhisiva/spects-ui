import { CCol, CFormInput } from '@coreui/react'

interface ISelectDate {
  type?: string
  name?: string
  value?: string
  label?: string
  onChange?: any
  defaultValue?: string
  required?: boolean
  onBlur?: string
  errors?: string
  helperText?: string
  isModal?: boolean
}

export default function SelectDate({
  type,
  name,
  value,
  label,
  onChange,
  defaultValue,
  required,
  onBlur,
  errors,
  helperText,
  isModal,
}: ISelectDate) {
  return (
    <CCol md={isModal ? 6 : 3} sm={6} xs={6} lg={3}>
      <CFormInput
        type="date"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </CCol>
  )
}
