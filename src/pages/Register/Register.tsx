import { Link } from 'react-router-dom';
import styles from './Register.module.css';

export const Register = () => {
    return (
        <>
            <title>Register | Helpdesk system</title>
            <div className={styles['register-modal']}>
                <p className={styles['register-heading']}>Helpdesk System</p>
                <p className={styles['register-text']}>Sign up here</p>

                <div className={styles['register-fields']}>
                    <input type="text" name="" id="" placeholder='Username' />
                    <input type="text" name="" id="" placeholder='Password' />
                    <input type="text" name="" id="" placeholder='Email' />
                </div>

                <button className={styles['register-button']}>Sign Up</button>

                <div className={styles['references']}>
                    <Link to="/forgot-password" className={styles['forgot-password-redirect-button']}>Forgot password</Link>
                    <Link to="/login" className={styles['login-redirect-button']}>Sign In</Link>
                </div>
            </div>
        </>
    )
}