import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from "../../assets/images/avatars/dummy.png"
import { useDispatch } from 'react-redux'
import { userLoggedOut } from '../../pages/redux/features/userReducer'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

  const handleClick = () =>{
    dispatch(userLoggedOut());
    navigate("/", { replace: true });  
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="#" onClick={handleClick}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
          {/* <CBadge color="info" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
