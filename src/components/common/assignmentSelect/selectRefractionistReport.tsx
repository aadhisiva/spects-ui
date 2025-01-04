import { CRow } from '@coreui/react'
import { ChangeEvent, useState } from 'react'
import ButtonWithLoader from '../button'
import SelectDate from '../form/date'
import SpinnerLoder from '../spinnerLoder'

interface ISelectDistrict {
  handleSubmitForm?: any
  loading?: boolean
  handleDownloadReports?: any
}

export default function SelectRefractionistReport({
  handleSubmitForm,
  loading,
  handleDownloadReports,
}: ISelectDistrict) {
  const [isLoading, setLoading] = useState(false)

  const [values, setValues] = useState({
    FromDate: '',
    ToDate: '',
  })

  const handleChangeFromDate = (e: ChangeEvent<HTMLInputElement>): any => {
    setValues({
      ...values,
      FromDate: e.target.value,
      ToDate: '',
    })
  }

  const handleClearFilter = () => {
    setValues({
      FromDate: '',
      ToDate: '',
    })
  }

  return (
    <div>
      <SpinnerLoder loading={loading} />
      <CRow style={{ rowGap: 15 }}>
        <SelectDate
          label={'Select From Date'}
          value={values.FromDate}
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
