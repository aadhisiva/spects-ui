import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMobile } from '@coreui/icons'
import ButtonWithLoader from '../../components/common/button'
import axiosInstance from '../../axiosInstance'
import { decryptData } from '../../components/utils/decrypt'
import { VerifiOtp } from './verifyOtp'

const Login = () => {
  const [Mobile, setMobile] = useState('')
  const [errors, setErrors] = useState({ Mobile: '' })
  const [otpPage, setIsOtpPage] = useState(false)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const validateMobile = () => {
    if (!Mobile) {
      setErrors((prev) => ({ ...prev, Mobile: 'Mobile number is required' }))
      return false
    } else if (!/^\d{10}$/.test(Mobile)) {
      setErrors((prev) => ({ ...prev, Mobile: 'Invalid mobile number' }))
      return false
    } else {
      setErrors((prev) => ({ ...prev, Mobile: '' }))
      return true
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isMobileValid = validateMobile()
    setIsOtpPage(false)
    setLoading(true)
    if (isMobileValid) {
      try {
        let resposne = await axiosInstance.post('/checkMobileLogin', { Mobile })
        let decrypt = decryptData(resposne.data.data)
        setFormData(decrypt?.UserData)
        setIsOtpPage(true)
        setLoading(false)
      } catch (e) {
        setIsOtpPage(false)
        setLoading(false)
      }
    }
    setLoading(false)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CCardBody>
                  {!otpPage && (
                    <CForm onSubmit={handleSubmit}>
                      <h1>Login Auth</h1>
                      <p className="text-body-secondary">Sign In to Spectacles Account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilMobile} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Mobile"
                          autoComplete="Mobile"
                          value={Mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          onBlur={validateMobile}
                          invalid={!!errors.Mobile}
                        />
                        <CFormFeedback invalid>{errors.Mobile}</CFormFeedback>
                      </CInputGroup>
                      <CRow>
                        <ButtonWithLoader
                          type={'submit'}
                          title="Send OTP"
                          isModal={true}
                          loading={loading}
                        />
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Resend OTP?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  )}
                  {otpPage && <VerifiOtp userData={formData} Mobile={Mobile} />}
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: '44%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Spectacles Distribution</h2>
                    <p>
                    The Government of Karnataka has initiated a Free Spectacle Distribution Program to address vision-related issues among school 
                    students and eligible beneficiaries, including citizens from economically weaker sections. This program is part of the state’s 
                    larger health and welfare initiative aimed at enhancing the quality of life and ensuring accessible eye care for all.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
