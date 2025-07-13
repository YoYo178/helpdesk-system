import styles from './EditProfile.module.css'

const options = {
    'username': { label: 'Username', type: 'text' },
    'current-password': { label: 'Current Password', type: 'password' },
    'new-password': { label: 'New Password', type: 'password' },
    'confirm-password': { label: 'Confirm Password', type: 'password' },
    'email': { label: 'Email', type: 'email' },
    'real-name': { label: 'Real Name', type: 'text' },
    'access-level': { label: 'Access Level', type: 'text' },
    'project-access-level': { label: 'Project Access Level', type: 'text' }
}

export const EditProfile = () => {
    return (
        <div className={styles['edit-profile-container']}>
            <h1 className={styles['edit-profile-header']}>User Profile</h1>
            <div className={styles['edit-profile-title']}>Edit Account</div>
            <div className={styles['edit-profile-fields-container']}>
                {Object.entries(options).map(([name, obj]) => {
                    return (
                        <div className={styles['profile-field-pair']}>
                            <p className={styles['profile-field-label']}>{obj.label}</p>
                            <input name={name} type={obj.type} className={styles['profile-field-input']} />
                        </div>
                    )
                })}
                <button className={styles['profile-field-submit-btn']}>Update User</button>
            </div>
        </div>
    )
}
