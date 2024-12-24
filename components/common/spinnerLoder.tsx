import React from 'react'
import { CSpinner } from '@coreui/react'

interface ISpinnerLoder {
  loading?: boolean
}

export default function SpinnerLoder({ loading }: ISpinnerLoder) {
  return (
    <>
      {loading && (
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" className="text-align" />
        </div>
      )}
    </>
  );
};
