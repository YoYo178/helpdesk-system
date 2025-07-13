import { Outlet } from "react-router-dom"
import type { Role } from "../../features/auth/authTypes"
import { useAppSelector } from "../../app/hooks";
import type { FC } from "react";

interface RoleProtectedRouteLayoutProps {
    roles: Role[];
    element: React.ReactNode;
}

export const RoleProtectedRouteLayout: FC<RoleProtectedRouteLayoutProps> = ({ roles, element }) => {
    const user = useAppSelector(state => state.auth.user)!;

    return (
        roles.includes(user.role) ? (
            <Outlet />
        ) : (
            <>
                {element}
            </>
        )
    )
}