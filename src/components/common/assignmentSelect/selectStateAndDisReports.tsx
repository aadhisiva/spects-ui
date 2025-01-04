import { CCol, CFormInput, CRow } from '@coreui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SelectOption from '../form/select'
import { DATATYPE_OPTIONS, RURAL_URBAN, statusOptions } from '../../utils/constants'
import ButtonWithLoader from '../button'
import useForm from '../form/formValidation'
import axiosInstance from '../../../axiosInstance'
import userSelectedValue from '../customHooks/userSelectedValue'
import useAccess from '../customHooks/useAccess'
import SelectDate from '../form/date'
import { CDatePicker } from '@coreui/react-pro'
import SpinnerLoder from '../spinnerLoder'
import { postRequest } from '../../services/apiServices'

interface ISelectDistrict {
  handleSubmitForm?: any
  loading?: boolean
  handleDownloadReports?: any
}

export default function SelectStateAndDisReports({
  handleSubmitForm,
  loading,
  handleDownloadReports,
}: ISelectDistrict) {
  const [isLoading, setLoading] = useState(false)
  const [districtDropdown, setDistrictDropdown] = useState([])
  const [talukDropdown, setTalukDropDown] = useState([])
  const [selectedDate, setSelectedDate] = useState<Date | null | any>(null)

  const [values, setValues] = useState({
    DataType: '',
    DistrictCode: '',
    TalukCode: '',
    FromDate: '',
    ToDate: '',
  })

  const [{ Mobile }] = userSelectedValue()
  const [{ dropDownAuthAccess, authValues, superAcces, districtAcces, talukAcces }] = useAccess()

  const handleDataTypeDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      DataType: e.target.value,
      DistrictCode: '',
      FromDate: '',
      ToDate: '',
    })
    let result = await postRequest(
      'getMasterDropDownForReports',
      {
        ReqType: 1,
        loginType: authValues.DistrictLevel,
        ListType: dropDownAuthAccess,
        Mobile,
      },
      setLoading,
    )
    setLoading(false)
    let newarray: any = [...[{ name: 'Select All', value: 'all' }, ...result.data]]
    setDistrictDropdown(newarray)
  }

  const handleDistictDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      DistrictCode: e.target.value,
      TalukCode: '',
      FromDate: '',
      ToDate: '',
    })
    setLoading(true)
    let result = await postRequest(
      'getMasterDropDownForReports',
      {
        ReqType: 2,
        UDCode: e.target.value,
        loginType: authValues.TalukLevel,
        ListType: dropDownAuthAccess,
        Mobile,
      },
      setLoading,
    )
    setLoading(false)
    let newarray: any = [...[{ name: 'Select All', value: 'all' }, ...result.data]]
    setTalukDropDown(newarray)
  }

  const handleChangeFromDate = (e: ChangeEvent<HTMLInputElement>): any => {
    setValues({
      ...values,
      FromDate: e.target.value,
      ToDate: '',
    })
  }

  const handleClearFilter = () => {
    setValues({
      DataType: '',
      DistrictCode: '',
      TalukCode: '',
      FromDate: '',
      ToDate: '',
    })
  }

  return (
    <div>
      <SpinnerLoder loading={loading} />
      <CRow style={{ rowGap: 15 }}>
        <SelectOption
          options={DATATYPE_OPTIONS}
          name={'DataType'}
          value={values.DataType}
          label={'DataType'}
          onChange={handleDataTypeDropdown}
        />
        <SelectOption
          options={districtDropdown}
          name={'DistrictCode'}
          value={values.DistrictCode}
          label={'District Name'}
          onChange={handleDistictDropdown}
        />
        {superAcces && districtAcces ? (
          ''
        ) : talukAcces ? (
          <SelectOption
            options={talukDropdown}
            name={'TalukCode'}
            value={values.TalukCode}
            label={'Taluk Name'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, TalukCode: e.target.value })
            }
          />
        ) : (
          ''
        )}
        <SelectDate
          label={'Select From Date'}
          value={selectedDate}
          isModal={true}
          onChange={handleChangeFromDate}
        />
        <SelectDate
          label={'Select To Date'}
          value={values.ToDate}
          name={'ToDate'}
          isModal={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, ToDate: e.target.value })
          }
        />
        <ButtonWithLoader
          title={'Search Reports'}
          loading={loading}
          handleClick={() => handleSubmitForm(values)}
        />
        <ButtonWithLoader
          title={'Download Reports'}
          handleClick={() => handleDownloadReports(values)}
        />
        <ButtonWithLoader title={'Clear Filters'} handleClick={handleClearFilter} />
      </CRow>
    </div>
  )
}
