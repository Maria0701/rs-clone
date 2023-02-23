import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

interface IAllowedRoles {
    allowedRoles : number[];
}

export const RequireAuth = ({ allowedRoles }: IAllowedRoles ) => {
    const auth = useAppSelector((state) => state.auth.user);
    const location = useLocation();

    return (
        allowedRoles?.includes(auth?.role!)
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location}} replace />
    )
}