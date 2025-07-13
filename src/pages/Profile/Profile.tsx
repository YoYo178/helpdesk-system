import { FaEdit } from 'react-icons/fa'
import styles from './Profile.module.css'
import { useNavigate } from 'react-router-dom'
import { IoPersonCircle } from 'react-icons/io5';
import { useAppSelector } from '../../app/hooks';
import { MdOutlineStarBorder } from 'react-icons/md';

export const Profile = () => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user)!;

    return (
        <div className={styles['profile-container']}>
            <h1 className={styles['profile-header']}>User Profile</h1>
            <div className={styles['profile-section']}>
                <div className={styles['profile-card']}>
                    <FaEdit className={styles['profile-edit-btn']} onClick={() => navigate('/profile/edit')} />
                    <IoPersonCircle className={styles['profile-photo']} />
                    <div className={styles['profile-user-details']}>
                        <p>Username: {user.username || 'No username!'}</p>
                        <p>Contact Number: No contact number!</p>
                        <p>Email: {user.email}</p>
                        <p>Department: {user.role}</p>
                    </div>
                </div>
                <div className={styles['profile-feedback']}>
                    <p className={styles['profile-feedback-header']}>Give Your Feedback</p>
                    <textarea className={styles['profile-feedback-text']}></textarea>
                    <div className={styles['profile-feedback-ratings']}>
                        <MdOutlineStarBorder />
                        <MdOutlineStarBorder />
                        <MdOutlineStarBorder />
                        <MdOutlineStarBorder />
                        <MdOutlineStarBorder />
                        <MdOutlineStarBorder />
                    </div>
                    <button className={styles['profile-feedback-submit-btn']}>Submit Feedback</button>
                </div>
            </div>
        </div>
    )
}
