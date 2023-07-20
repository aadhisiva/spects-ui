import { Navigate, Outlet } from "react-router";

const useAuth = () => {
    const getItem: any = localStorage.getItem('login_user');
    const user = JSON.parse(getItem);
    return user === null;
}

export const AuthMiddleware = (props: any) => {
    const isAuth = useAuth();
    return isAuth ? <Navigate to={"/"} replace={true} /> : <Outlet />;
};
