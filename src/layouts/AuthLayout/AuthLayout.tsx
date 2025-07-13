import { Outlet } from "react-router-dom"
import styles from './AuthLayout.module.css';
import { useState } from "react";
import users from '../../features/auth/users.json'

export const AuthLayout = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (

        <div className={styles['auth-bg']}>
            {isModalVisible ? (
                <div className={styles['auth-mock-users-list-backdrop']} onClick={() => setIsModalVisible(false)}>
                    <div className={styles['auth-mock-users-list']} onClick={(e) => e.stopPropagation()}>
                        <h1 style={{ textAlign: 'center' }}>Mock users list</h1>
                        <table style={{ tableLayout: 'fixed', width: '100%', textAlign: 'center' }}>
                            <thead>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Role</th>
                            </thead>
                            <br></br>
                            <tbody>
                                {users.map(user => (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <button className={styles['auth-mock-users-list-btn']} onClick={() => setIsModalVisible(true)}>Click here to view the list of mock users</button>
            )}
            <Outlet />
        </div >
    )
}