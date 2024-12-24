import { CCol, CFormLabel, CFormSelect, CFormText, CInputGroup } from '@coreui/react'

interface ISelectOption {
  options: any
  name: string
  value: string
  label: string
  onChange?: void | any
  touched?: any
  onBlur?: any
  errors?: any;
  helperText?: any;
  isModal?: boolean;
}

export default function SelectOption({
  options,
  name,
  value,
  label,
  onChange,
  onBlur,
  isModal,
  errors,
  helperText
}: ISelectOption) {
  return (
    <CCol xs={12} md={isModal ? 12 : 3} sm={4}>
        <CFormLabel>{`Select ${label}`}</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          onChange={onChange}
          name={name}
          value={value}
          onBlur={onBlur}
          className={errors ? 'is-invalid' : ''}
        >
          <option value={''}>{'select'}</option>
          {(options || []).map((obj: any, i: number) => (
            <option key={value + i} value={obj.value}>{obj.name}</option>
          ))}
        </CFormSelect>
        {errors && (
          <CFormText color="danger" style={{color: 'red'}}>{helperText}</CFormText>
        )}
    </CCol>
  )
}
