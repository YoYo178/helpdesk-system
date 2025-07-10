import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import type { RootState } from "../../app/store"

export const ProtectedRouteLayout = () => {
    const location = useLocation();

    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    return (
        !isAuthenticated || !user ? (
            <Navigate to='/login' state={{ from: location }} replace />
        ) : (
            <Outlet />
        )
    )
}