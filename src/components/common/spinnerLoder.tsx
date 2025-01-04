import React from 'react'
import { CSpinner } from '@coreui/react'
import "./spinnerLoader.css";

interface ISpinnerLoder {
  loading?: boolean
}

export default function SpinnerLoder({ loading }: ISpinnerLoder) {
  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}
    </>
  )
}
