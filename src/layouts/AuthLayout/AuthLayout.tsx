import { Outlet } from "react-router-dom"
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
    return (
        <div className={styles['auth-bg']}>
            <Outlet />
        </div>
    )
}