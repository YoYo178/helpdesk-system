import styles from './DashboardLayout.module.css'
import { LuLogOut } from "react-icons/lu";
import { Outlet, useNavigate } from 'react-router-dom';
import { FaBell, FaToggleOn } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

import { Sidebar } from '../../elements/Sidebar/Sidebar';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

export const DashboardLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className={styles['dashboard']}>
            <div className={styles['header']}>
                <div className={styles['branding']}>Helpdesk</div>
                <div className={styles['buttons']}>
                    <FaToggleOn className={styles['button-toggle']}></FaToggleOn>
                    <FaBell className={styles['button-notifications']}></FaBell>
                    <IoPerson className={styles['button-profile']} onClick={() => navigate('/profile')}></IoPerson>
                    <LuLogOut className={styles['button-logout']} onClick={() => dispatch(logout())}></LuLogOut>
                </div>
            </div>
            <div className={styles['dashboard-section']}>
                <Sidebar />
                <div className={styles['dashboard-body']}>
                    <div className={styles['main-content']}>
                        <Outlet />
                    </div>
                    <div className={styles['footer']}>Footer Area</div>
                </div>
            </div>
        </div>
    )
}