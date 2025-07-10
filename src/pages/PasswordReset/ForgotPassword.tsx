import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

export const ForgotPassword = () => {
    return (
        <div className={styles['forgot-password-modal']}>
            <p className={styles['forgot-password-text']}>Don't worry, Enter your email below and we will send you a link to change password.</p>

            <input className={styles['email-input']} type="text" name="" id="" placeholder='Email' />

            <button className={styles['submit-button']}>Submit</button>
            <Link to='/login' className={styles['login-redirect-button']}>Sign In</Link>
        </div>
    )
}