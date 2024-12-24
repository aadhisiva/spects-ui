import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import InputOption from '../form/input'
import useForm from '../form/formValidation'
import { mobileNoValid, nameValid } from '../form/validations'
import axiosInstance from '../../../axiosInstance'
import SelectOption from '../form/select'
import { typeOptions, YES_NO } from '../../utils/constants'
import { decryptData } from '../../utils/decrypt'

interface IRolesModal {
  visible: boolean
  setVisible: void | any
  title?: string;
  handleSubmitModal?: void | any;
  formData?: any;
}

export default function RolesAccessModal({
  visible,
  setVisible,
  title,
  handleSubmitModal,
  formData,
}: IRolesModal) {
  const [loading, setLoading] = useState(false);
  const [roleOptions, setRoleOptions] = React.useState([]);

  const initialValues = {
    RoleId: formData.RoleId,
    District: formData.District,
    Taluk: formData.Taluk,
    Phco: formData.Phco,
    SubCenter: formData.SubCenter,
    Type: formData.Type,
  };

  React.useEffect(() => {
    fecthIntialData();
  }, []);


  const fecthIntialData = async () => {
    setLoading(true);
    let { data } = await axiosInstance.post('addOrGetRoles', { ReqType: 'Dd' });
    let decrypt = decryptData(data.data);
    if (data?.code == 200) {
      setRoleOptions(decrypt);
      setLoading(false);
    } else {
      setLoading(false);
      alert(data.message || 'please try again');
    }
  };

const validationSchema = {
    RoleId: {
      validate: (value: string) => {
        if (!value) {
          return 'RoleName is required';
        }
        return null;
      },
    },
    District: {
      validate: (value: string) => {
        if (!value) {
          return 'District is required';
        }
        return null;
      },
    },
    Taluk: {
      validate: (value: string) => {
        if (!value) {
          return 'Taluk is required';
        }
        return null;
      },
    },
    Phco: {
      validate: (value: string) => {
        if (!value) {
          return 'PHCO is required';
        }
        return null;
      },
    },
    SubCenter: {
      validate: (value: string) => {
        if (!value) {
          return 'PHCO is required';
        }
        return null;
      },
    },
    Type: {
      validate: (value: string) => {
        if (!value) {
          return 'Type is required';
        }
        return null;
      },
    },
  };

  const onSubmit = (values: any) => {
    values.id = formData.id;
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
          <CModalTitle id="ScrollingLongContentExampleLabel">{title || "Add/Modify"}</CModalTitle>
        </CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody>
            <SelectOption
              label={'Role Name'}
              name={'RoleId'}
              value={values.RoleId}
              onChange={handleChange}
              onBlur={handleBlur}
              options={roleOptions}
              errors={touched.RoleId && Boolean(errors.RoleId)}
              helperText={touched.RoleId && errors.RoleId}
              isModal={true}
            />
            <SelectOption
              label={'District'}
              name={'District'}
              value={values.District}
              onChange={handleChange}
              onBlur={handleBlur}
              options={YES_NO}
              errors={touched.District && Boolean(errors.District)}
              helperText={touched.District && errors.District}
              isModal={true}
            />
            <SelectOption
              label={'Taluk'}
              name={'Taluk'}
              value={values.Taluk}
              onChange={handleChange}
              onBlur={handleBlur}
              options={YES_NO}
              errors={touched.Taluk && Boolean(errors.Taluk)}
              helperText={touched.Taluk && errors.Taluk}
              isModal={true}
            />
            <SelectOption
              label={'Phco'}
              name={'Phco'}
              value={values.Phco}
              onChange={handleChange}
              onBlur={handleBlur}
              options={YES_NO}
              errors={touched.Phco && Boolean(errors.Phco)}
              helperText={touched.Phco && errors.Phco}
              isModal={true}
            />
            <SelectOption
              label={'SubCenter'}
              name={'SubCenter'}
              value={values.SubCenter}
              onChange={handleChange}
              onBlur={handleBlur}
              options={YES_NO}
              errors={touched.SubCenter && Boolean(errors.SubCenter)}
              helperText={touched.SubCenter && errors.SubCenter}
              isModal={true}
            />
             <SelectOption
              label={'Type'}
              name={'Type'}
              value={values.Type}
              onChange={handleChange}
              onBlur={handleBlur}
              options={typeOptions}
              errors={touched.Type && Boolean(errors.Type)}
              helperText={touched.Type && errors.Type}
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
