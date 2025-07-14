import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAppDispatch } from '../../app/hooks';
import { useState } from 'react';
import { login } from '../../features/auth/authSlice';
import users from '../../features/auth/users.json'
import type { User } from '../../features/auth/authTypes';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleLogin = () => {
        const user = users.find(usr => usr.username === username && usr.password === password);

        if (user) {
            const userObj = {
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                id: user.id
            }
            dispatch(login(userObj as Omit<User, 'password'>))
            navigate('/dashboard')
        } else {
            setError("Invalid credentials")
        }
    }

    return (
        <>
            <title>Login | Helpdesk system</title>
            <div className={styles['login-modal']}>
                <p className={styles['login-heading']}>Helpdesk System</p>

                <div className={styles['login-fields']}>
                    <input type='text' placeholder='Username' onChange={(e) => { setError(''); setUsername(e.target.value.trim()) }} value={username} />
                    <input type='password' placeholder='Password' onChange={(e) => { setError(''); setPassword(e.target.value.trim()) }} value={password} />
                </div>

                <button className={styles['login-button']} onClick={handleLogin}>Sign In</button>

                <div className={styles['references']}>
                    <Link to="/forgot-password" className={styles['forgot-password-redirect-button']}>Forgot password</Link>
                    <Link to="/register" className={styles['register-redirect-button']}>Sign Up</Link>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    )
}