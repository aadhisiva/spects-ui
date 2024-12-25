import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import InputOption from '../form/input'
import useForm from '../form/formValidation'
import { mobileNoValid, nameValid } from '../form/validations'
import axiosInstance from '../../../axiosInstance'
import SelectOption from '../form/select'
import userSelectedValue from '../customHooks/userSelectedValue'

interface IDistrictModal {
  visible: boolean
  setVisible: void | any
  title?: string
  handleSubmitModal?: void | any
  formData?: any
}

export default function DistrictModal({
  visible,
  setVisible,
  title,
  handleSubmitModal,
  formData,
}: IDistrictModal) {
  const [loading, setLoading] = React.useState(false);
  const [roleOption, setRolesOption] = React.useState([]);

  const [{ RoleId, Mobile, RoleName }] = userSelectedValue();

  let initialValues = {
    Mobile: formData.Mobile || '',
    Name: formData.Name || ''
  }

  useEffect(() => {
    fecthIntialData()
  }, [])

  const fecthIntialData = async () => {
    setLoading(true)
    let response = await axiosInstance.post('getChildBasedOnParent', {
      RoleId: RoleId,
    })
    if (response?.data.code == 200) {
      setRolesOption(response.data.data)
      setLoading(false)
    } else {
      setLoading(false)
      alert(response.data.message || 'please try again')
    }
  }

  const validationSchema = {
    Mobile: {
      validate: (value: string) => {
        if (!value) {
          return 'Mobile is required'
        }
        return mobileNoValid(value)
      },
    },
    Name: {
      validate: (value: string) => {
        if (!value) {
          return 'Name is required'
        }
        return nameValid(value)
      },
    }
  };

  const onSubmit = (values: any) => {
    values.RoleId = roleOption[0]['value'];
    values.UserId = formData?.UserId;
    values.CreatedMobile = Mobile;
    values.Role = RoleName;
    let formValues = { ...formData, ...values }
    handleSubmitModal(formValues)
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  })
  return (
    <>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel">{title}</CModalTitle>
        </CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody>
            <InputOption
              label={'Mobile'}
              name={'Mobile'}
              value={values.Mobile}
              onChange={handleChange}
              type="text"
              required={true}
              onBlur={handleBlur}
              errors={touched.Mobile && Boolean(errors.Mobile)}
              helperText={touched.Mobile && errors.Mobile}
              isModal={true}
            />
            <InputOption
              label={'Name'}
              name={'Name'}
              value={values.Name}
              onChange={handleChange}
              type="text"
              required={true}
              onBlur={handleBlur}
              errors={touched.Name && Boolean(errors.Name)}
              helperText={touched.Name && errors.Name}
              isModal={true}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  )
}
