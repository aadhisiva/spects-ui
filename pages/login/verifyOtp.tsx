import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilMobile, cilUser } from '@coreui/icons'
import ButtonWithLoader from '../../components/common/button'
import { otpValid } from '../../components/common/form/validations'
import axiosInstance from '../../axiosInstance'
import { decryptData } from '../../components/utils/decrypt'
import SpinnerLoder from '../../components/common/spinnerLoder'
import UserSelectedValue from '../../components/common/customHooks/userSelectedValue'
import { useDispatch } from 'react-redux'
import { userLoggedIn } from '../redux/features/userReducer'

interface IVerifiOtp {
  userData?: any
  Mobile?: string
}

export const VerifiOtp = ({ userData, Mobile }: IVerifiOtp) => {
  const [RoleId, setRoleId] = useState('')
  const [Otp, setOtp] = useState('')
  const [errors, setErrors] = useState({ Otp: '', RoleId: '' })
  const [formData, setFormData] = useState<any>({})
  const [data] = UserSelectedValue()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const validateOtp = () => {
    if (!Otp) {
      setErrors((prev) => ({ ...prev, Otp: 'Otp is required' }))
      return false
    } else if (Boolean(otpValid(Otp))) {
      let sdf: any = otpValid(Otp)
      setErrors((prev) => ({ ...prev, Otp: sdf }))
      return false
    } else {
      setErrors((prev) => ({ ...prev, Otp: '' }))
      return true
    }
  }

  const validateRole = () => {
    if (!RoleId) {
      setErrors((prev) => ({ ...prev, RoleId: 'Role is required' }))
      return false
    } else {
      setErrors((prev) => ({ ...prev, RoleId: '' }))
      return true
    }
  }

  const handleChangeRole = async (e: ChangeEvent<HTMLInputElement> | any) => {
    let value = e.target.value
    if (!value) return null;
    setRoleId(value)
    try {
      let resposne = await axiosInstance.post('/getDataAccess', { Mobile, Id: value })
      let decrypt = decryptData(resposne.data.data)
      setFormData(decrypt)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isOtpValid = validateOtp()
    const isRoleValid = validateRole()
    setLoading(true);
    if (isRoleValid && isOtpValid) {
      try {
        let resposne = await axiosInstance.post('/verifyOtp', { Otp, Id: formData.UserId })
        let decrypt = decryptData(resposne.data.data)
        const user: any = {
          Mobile,
          Token: decrypt.Token,
          Access: formData.access,
          RoleId: RoleId,
          RoleName: userData.find((obj: any) => obj.RoleId == RoleId)?.RoleName,
        }
        dispatch(userLoggedIn(user))
        setLoading(false)
        navigate("/", {replace: true});
      } catch (e) {
        setLoading(false)
      }
    }
    setLoading(false)
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <SpinnerLoder loading={loading} />
      <h1>Login Auth</h1>
      <p className="text-body-secondary">Sign In to Spectacles Account</p>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={cilMobile} />
        </CInputGroupText>
        <CFormInput placeholder="Mobile" autoComplete="Mobile" value={Mobile} disabled={true} />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilUser} />
        </CInputGroupText>
        <CFormSelect
          placeholder="Role Name"
          autoComplete="current-RoleId"
          value={RoleId}
          // onChange={(e) => setRoleId(e.target.value)}
          onChange={handleChangeRole}
          onBlur={validateRole}
          invalid={!!errors.RoleId}
        >
          <option value={''}>{'select'}</option>
          {(userData || []).map((obj: any, i: number) => (
            <option key={obj.RoleId + i} value={obj.RoleId}>
              {obj.RoleName}
            </option>
          ))}
        </CFormSelect>
        <CFormFeedback invalid>{errors.RoleId}</CFormFeedback>
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
        <CFormInput
          type="text"
          placeholder="OTP"
          autoComplete="current-Otp"
          value={Otp}
          onChange={(e) => setOtp(e.target.value)}
          onBlur={validateOtp}
          invalid={!!errors.Otp}
        />
        <CFormFeedback invalid>{errors.Otp}</CFormFeedback>
      </CInputGroup>
      <CRow>
        <ButtonWithLoader type={'submit'} title="Validate OTP" isModal={true} loading={loading} />
        <CCol xs={6} className="text-right">
          <CButton color="link" className="px-0">
            Resend OTP?
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}
