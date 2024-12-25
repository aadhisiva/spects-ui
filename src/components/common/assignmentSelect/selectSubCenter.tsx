import { CRow } from '@coreui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SelectOption from '../form/select'
import { RURAL_URBAN } from '../../utils/constants'
import ButtonWithLoader from '../button'
import useForm from '../form/formValidation'
import axiosInstance from '../../../axiosInstance'
import userSelectedValue from '../customHooks/userSelectedValue'
import useAccess from '../customHooks/useAccess'

interface ISelectDistrict {
  handleSubmitForm?: any | void
  loading?: boolean
}

export default function SelectSubCenter({ handleSubmitForm, loading }: ISelectDistrict) {
  const [isLoading, setLoading] = useState(false)
  const [districtDropdown, setDistrictDropdown] = useState([]);
  const [talukDropdown, setTalukDropdown] = useState([]);
  const [phcoDropdown, setPhcoDropdown] = useState([]);
  const [subCenterDropdown, setSubCenterDropdown] = useState([]);

    const [{ Mobile }] = userSelectedValue();
    const [{ dropDownAuthAccess, talukAcces, phcoAcces, subCenterAcces, authValues }] = useAccess();

  const initialValues: any = {
    Type: '',
    DistrictCode: '',
    TalukCode: "",
    PhcoCode: "",
    SubCenterCode: ""
  };

  const handleTypeDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...values,
        Type: e.target.value
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 1,
      Type: e.target.value,
      loginType: authValues.DistrictLevel,
      ListType: dropDownAuthAccess,
      Mobile 
    })
    setLoading(false)
    setDistrictDropdown(data.data)
  }

  const handleDistictDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...values,
        DistrictCode: e.target.value 
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 2,
      Type: values.Type,
      UDCode: e.target.value,
      loginType: authValues.TalukLevel, 
      ListType: dropDownAuthAccess,
      Mobile 
    })
    setLoading(false)
    setTalukDropdown(data.data)
  };

  const handleTalukDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...values,
        TalukCode: e.target.value 
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 3,
      Type: values.Type,
      UDCode: values.DistrictCode,
      UTCode: e.target.value,
      loginType: authValues.PhcoLevel,
      ListType: dropDownAuthAccess,
      Mobile 
    })
    setLoading(false)
    setPhcoDropdown(data.data)
  };

  const handlePhcoDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...values,
        PhcoCode: e.target.value 
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 4,
      Type: values.Type,
      UDCode: values.DistrictCode,
      UTCode: values.TalukCode,
      UPCode: e.target.value
    })
    setLoading(false)
    setSubCenterDropdown(data.data)
  };

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
          return 'District Name is required'
        }
        return null
      },
    },
    TalukCode: {
      validate: (value: string) => {
        if (!value) {
          return 'Taluk Name is required'
        }
        return null
      },
    },
    PhcoCode: {
      validate: (value: string) => {
        if (!value) {
          return 'Phco Name is required'
        }
        return null
      },
    },
    SubCenterCode: {
      validate: (value: string) => {
        if (!value) {
          return 'SubCenter Name is required'
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
        <CRow style={{rowGap: 15}}>
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
            onChange={handleDistictDropdown}
            onBlur={handleBlur}
            errors={touched.DistrictCode && Boolean(errors.DistrictCode) ? 'is-invalid' : ''}
            helperText={touched.DistrictCode && errors.DistrictCode}
          />
          <SelectOption
            options={talukDropdown}
            name={'TalukCode'}
            value={values.TalukCode}
            label={'Taluk Name'}
            onChange={handleTalukDropdown}
            onBlur={handleBlur}
            errors={touched.TalukCode && Boolean(errors.TalukCode) ? 'is-invalid' : ''}
            helperText={touched.TalukCode && errors.TalukCode}
          />
          <SelectOption
            options={phcoDropdown}
            name={'PhcoCode'}
            value={values.PhcoCode}
            label={'Phco Name'}
            onChange={handlePhcoDropdown}
            onBlur={handleBlur}
            errors={touched.PhcoCode && Boolean(errors.PhcoCode) ? 'is-invalid' : ''}
            helperText={touched.PhcoCode && errors.PhcoCode}
          />
          <SelectOption
            options={subCenterDropdown}
            name={'SubCenterCode'}
            value={values.SubCenterCode}
            label={'SubCenter Name'}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={touched.SubCenterCode && Boolean(errors.SubCenterCode) ? 'is-invalid' : ''}
            helperText={touched.SubCenterCode && errors.SubCenterCode}
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
