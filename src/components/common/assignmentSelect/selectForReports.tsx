import { CRow } from '@coreui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SelectOption from '../form/select'
import { RURAL_URBAN, statusOptions } from '../../utils/constants'
import ButtonWithLoader from '../button'
import useForm from '../form/formValidation'
import axiosInstance from '../../../axiosInstance'
import userSelectedValue from '../customHooks/userSelectedValue'
import useAccess from '../customHooks/useAccess'

interface ISelectDistrict {
  handleSubmitForm?: any;
  loading?: boolean;
  handleDownloadReports?: any;
}

export default function SelectForReports({ handleSubmitForm, loading, handleDownloadReports }: ISelectDistrict) {
  const [isLoading, setLoading] = useState(false)
  const [districtDropdown, setDistrictDropdown] = useState([])
  const [talukDropdown, setTalukDropdown] = useState([])
  const [phcoDropdown, setPhcoDropdown] = useState([])
  const [subCenterDropdown, setSubCenterDropdown] = useState([])

  const [values, setValues] = useState({
    Type: '',
    DistrictCode: '',
    TalukCode: '',
    PhcoCode: '',
    SubCenterCode: '',
    Status: '',
  })

  const [{ Mobile }] = userSelectedValue()
  const [{ dropDownAuthAccess, talukAcces, phcoAcces, subCenterAcces, authValues }] = useAccess()

  const handleTypeDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      Type: e.target.value,
      DistrictCode: '',
      TalukCode: '',
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 1,
      Type: e.target.value,
      loginType: authValues.DistrictLevel,
      ListType: dropDownAuthAccess,
      Mobile,
    })
    setLoading(false)
    setDistrictDropdown(data.data)
  }

  const handleDistictDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      DistrictCode: e.target.value,
      TalukCode: '',
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 2,
      Type: values.Type,
      UDCode: e.target.value,
      loginType: authValues.TalukLevel,
      ListType: dropDownAuthAccess,
      Mobile,
    })
    setLoading(false)
    setTalukDropdown(data.data)
  }

  const handleTalukDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      TalukCode: e.target.value,
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 3,
      Type: values.Type,
      UDCode: values.DistrictCode,
      UTCode: e.target.value,
      loginType: authValues.PhcoLevel,
      ListType: dropDownAuthAccess,
      Mobile,
    })
    setLoading(false)
    setPhcoDropdown(data.data)
  }

  const handlePhcoDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      PhcoCode: e.target.value,
      SubCenterCode: '',
      Status: '',
    })
    setLoading(true)
    let { data } = await axiosInstance.post('getMasterDropDown', {
      ReqType: 4,
      Type: values.Type,
      UDCode: values.DistrictCode,
      UTCode: values.TalukCode,
      UPCode: e.target.value,
    })
    setLoading(false)
    setSubCenterDropdown(data.data)
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...values,
        Status: e.target.value,
      })
  };

  const handleClearFilter = () => {
    setValues({
      Type: "",
      DistrictCode: '',
      TalukCode: '',
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
    })
  };

  return (
    <div>
      <CRow style={{ rowGap: 15 }}>
        <SelectOption
          options={RURAL_URBAN}
          name={'Type'}
          value={values.Type}
          label={'Type'}
          onChange={handleTypeDropdown}
        />
        <SelectOption
          options={districtDropdown}
          name={'DistrictCode'}
          value={values.DistrictCode}
          label={'District Name'}
          onChange={handleDistictDropdown}
        />
        <SelectOption
          options={talukDropdown}
          name={'TalukCode'}
          value={values.TalukCode}
          label={'Taluk Name'}
          onChange={handleTalukDropdown}
        />
        <SelectOption
          options={phcoDropdown}
          name={'PhcoCode'}
          value={values.PhcoCode}
          label={'Phco Name'}
          onChange={handlePhcoDropdown}
        />
        <SelectOption
          options={subCenterDropdown}
          name={'SubCenterCode'}
          value={values.SubCenterCode}
          label={'SubCenter Name'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValues({...values, SubCenterCode: e.target.value})}
        />
        <SelectOption
          options={statusOptions}
          name={'Status'}
          value={values.Status}
          label={'Status'}
          onChange={handleChangeStatus}
        />
        <ButtonWithLoader title={'Search Reports'} loading={loading} handleClick={handleSubmitForm} />
        <ButtonWithLoader title={'Download Reports'} handleClick={handleDownloadReports} />
        <ButtonWithLoader title={'Clear Filters'} handleClick={handleClearFilter} />
      </CRow>
    </div>
  )
}
