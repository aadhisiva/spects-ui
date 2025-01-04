import React from 'react'
import { CFooter } from '@coreui/react'
// import "./sidebar.css";

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
          Reserved
        <span className="ms-1">&copy; 2024 Mobile One.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed by</span>
        <a href="https://edcs.karnataka.gov.in/" target="_blank" rel="noopener noreferrer">
          Directorate of EDCS        
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
