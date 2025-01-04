import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import InputOption from '../form/input'
import useForm from '../form/formValidation'
import { mobileNoValid, nameValid } from '../form/validations'
import axiosInstance from '../../../axiosInstance'
import SelectOption from '../form/select'
import userSelectedValue from '../customHooks/userSelectedValue'
import useAccess from '../customHooks/useAccess'
import { toast } from 'react-toastify'
import { decryptData } from '../../utils/decrypt'
import { NGO_GOV } from '../../utils/constants'

interface IDistrictModal {
  visible: boolean
  setVisible: void | any
  title?: string
  handleSubmitModal?: void | any
  formData?: any
  isLastAssign?: boolean
}

export default function DistrictModal({
  visible,
  setVisible,
  title,
  handleSubmitModal,
  formData,
  isLastAssign = false,
}: IDistrictModal) {
  const [loading, setLoading] = React.useState(false)
  const [roleOption, setRolesOption] = React.useState([])

  const [{ RoleId, Mobile, RoleName }] = userSelectedValue()
  const [{ loginAuthAccess }] = useAccess()

  let initialValues = {
    Mobile: formData.Mobile || '',
    Name: formData.Name || '',
    NgoOrGov: formData.NgoOrGov || '',
  }

  useEffect(() => {
    fecthIntialData()
  }, [])

  const fecthIntialData = async () => {
    setLoading(true)
    // let response = await axiosInstance.post('getChildBasedOnParent', {
    //   RoleId: RoleId,
    // })
    let response = await axiosInstance.post('addOrGetRoles', {
      ReqType: 'Get',
    })
    if (response?.data.code == 200) {
      let decrypt = decryptData(response.data.data)
      setRolesOption(decrypt)
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
    },
  }

  const onSubmit = (values: any) => {
    values.RoleId =
      loginAuthAccess == 'District'
        ? roleOption[2]['id']
        : loginAuthAccess == 'Taluk'
          ? roleOption[3]['id']
          : loginAuthAccess == 'Phco'
            ? roleOption[4]['id']
            : loginAuthAccess == 'SubCenter'
              ? roleOption[5]['id']
              : ''
    if (!values.RoleId) return toast.info('RoleId is empty.')
    values.UserId = formData?.UserId
    values.CreatedMobile = Mobile
    values.CreatedRole = RoleName;
    if(isLastAssign){
      if(!values.NgoOrGov) toast.info('NgoOrGov is empty. Select one of the options.');
    };
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
            <SelectOption
              label={'NgoOrGov'}
              name={'NgoOrGov'}
              value={values.NgoOrGov}
              onChange={handleChange}
              onBlur={handleBlur}
              options={NGO_GOV}
              errors={touched.NgoOrGov && Boolean(errors.NgoOrGov)}
              helperText={touched.NgoOrGov && errors.NgoOrGov}
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
