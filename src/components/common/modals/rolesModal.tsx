import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import InputOption from '../form/input'
import useForm from '../form/formValidation'
import { mobileNoValid, nameValid } from '../form/validations'
import axiosInstance from '../../../axiosInstance'
import SelectOption from '../form/select'
import { YES_NO } from '../../utils/constants'

interface IRolesModal {
  visible: boolean
  setVisible: void | any
  title?: string
  handleSubmitModal?: void | any
  formData?: any
}

export default function RolesModal({
  visible,
  setVisible,
  title,
  handleSubmitModal,
  formData,
}: IRolesModal) {
  const [loading, setLoading] = useState(false);

  let initialValues = {
    RoleName: formData.RoleName,
    IsMobile: formData.IsMobile,
  };

  const validationSchema = {
    RoleName: {
      validate: (value: string) => {
        if (!value) {
          return 'RoleName is required'
        }
        return nameValid(value)
      },
    },
    IsMobile: {
      validate: (value: string) => {
        if (!value) {
          return 'IsMobile is required'
        }
        return null
      },
    },
  };

  const onSubmit = (values: any) => {
    values.id = formData.id
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
              label={'RoleName'}
              name={'RoleName'}
              value={values.RoleName}
              onChange={handleChange}
              type="text"
              required={true}
              onBlur={handleBlur}
              errors={touched.RoleName && Boolean(errors.RoleName)}
              helperText={touched.RoleName && errors.RoleName}
              isModal={true}
            />
            <SelectOption
              label={'Is Mobile Login'}
              name={'IsMobile'}
              value={values.IsMobile}
              onChange={handleChange}
              onBlur={handleBlur}
              options={YES_NO}
              errors={touched.IsMobile && Boolean(errors.IsMobile)}
              helperText={touched.IsMobile && errors.IsMobile}
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
