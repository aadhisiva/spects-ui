// In ProtectedRoutes.js
import { Navigate, Outlet } from "react-router-dom";
type ProtectedRoutesProps = {
    loginUser?: any
}
const ProtectedRoutes:React.FC<ProtectedRoutesProps> = ({
    loginUser
}) => {
    return (!loginUser === false  ? <Outlet /> : <Navigate to="/" replace/>)
}
export default ProtectedRoutes;