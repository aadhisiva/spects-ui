import { CCol, CFormInput, CFormLabel, CFormSelect, CFormText } from '@coreui/react'

interface ISelectOption {
  name: string;
  value: string;
  label: string;
  onChange?: void | any;
  onBlur?: void | any;
  errors?: any;
  type?: string
  defaultValue?: string;
  helperText?: string | any;
  required?: boolean;
  isModal?: boolean;
}

export default function InputOption({
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
  isModal
}: ISelectOption) {
  return (
    <CCol xs={12} md={isModal ? 12 : 3} sm={4}>
      <CFormInput
        type={type}
        id="validationDefault01"
        label={label}
        defaultValue={defaultValue}
        required={required}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        className={errors ? 'is-invalid' : ''}
      />
      {errors && (
        <CFormText color="danger" style={{ color: 'red' }}>
          {helperText}
        </CFormText>
      )}
    </CCol>
  )
}
