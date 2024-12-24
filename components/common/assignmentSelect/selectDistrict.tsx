import { CRow } from '@coreui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SelectOption from '../form/select'
import { RURAL_URBAN } from '../../utils/constants'
import ButtonWithLoader from '../button'
import useForm from '../form/formValidation'
import axiosInstance from '../../../axiosInstance'

interface ISelectDistrict {
  handleSubmitForm?: any | void
  loading?: boolean
}

export default function SelectDistrict({ handleSubmitForm, loading }: ISelectDistrict) {
  const [isLoading, setLoading] = useState(false)
  const [districtDropdown, setDistrictDropdown] = useState([])

  const initialValues: any = {
    Type: '',
    DistrictCode: '',
  }

  const handleTypeDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...values,
        Type: e.target.value 
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 1,
      Type: e.target.value
    })
    setLoading(false)
    setDistrictDropdown(data.data)
  }

  const validationSchema = {
    Type: {
      validate: (value: string) => {
        if (!value) {
          return 'Type is required'
        }
        return null
      },
    },
    DistrictCode: {
      validate: (value: string) => {
        if (!value) {
          return 'DistrictCode is required'
        }
        return null
      },
    },
  }

  const onSubmit = (values: any) => {
    // Handle form submission logic, e.g., API call
    handleSubmitForm(values)
  }

  const handleClearFilter = () => {
    setValues({})
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  })
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CRow style={{ rowGap: 15}}>
          <SelectOption
            options={RURAL_URBAN}
            name={'Type'}
            value={values.Type}
            label={'Type'}
            onChange={handleTypeDropdown}
            onBlur={handleBlur}
            errors={touched.Type && Boolean(errors.Type) ? 'is-invalid' : ''}
            helperText={touched.Type && errors.Type}
          />

          <SelectOption
            options={districtDropdown}
            name={'DistrictCode'}
            value={values.DistrictCode}
            label={'District Name'}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={touched.DistrictCode && Boolean(errors.DistrictCode) ? 'is-invalid' : ''}
            helperText={touched.DistrictCode && errors.DistrictCode}
          />
          <ButtonWithLoader
            title={'Add Officer'}
            loading={loading}
            type={"submit"}
            // handleClick={handleSubmitForm}
          />
          <ButtonWithLoader title={'Clear Filters'} handleClick={handleClearFilter} />
        </CRow>
      </form>
    </div>
  )
}
