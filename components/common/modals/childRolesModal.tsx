import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import useForm from '../form/formValidation'
import axiosInstance from '../../../axiosInstance';
import SelectOption from '../form/select';
import { typeOptions, YES_NO } from '../../utils/constants';
import { decryptData } from '../../utils/decrypt';

interface IRolesModal {
  visible: boolean
  setVisible: void | any
  title?: string;
  handleSubmitModal?: void | any;
  formData?: any;
}

export default function ChildRoleModal({
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
    ChildId: formData.ChildId,
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
    ChildId: {
      validate: (value: string) => {
        if (!value) {
          return 'Child Name is required';
        }
        return null;
      },
    },
  };

  useEffect(() => {
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
              label={'Child Role'}
              name={'ChildId'}
              value={values.ChildId}
              onChange={handleChange}
              onBlur={handleBlur}
              options={roleOptions.filter((obj: any) => obj.value !== values.RoleId)}
              errors={touched.ChildId && Boolean(errors.ChildId)}
              helperText={touched.ChildId && errors.ChildId}
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
