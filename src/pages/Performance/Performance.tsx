import { IoMdPerson } from 'react-icons/io';
import styles from './Performance.module.css';
import { useAppSelector } from '../../app/hooks';
import { IoStar } from 'react-icons/io5';
import type { Role } from '../../features/auth/authTypes';

const fakeStaffList: Record<Role, { name: string }[]> = {
    operations: [
        {
            name: 'Operation Name 1',
        },
        {
            name: 'Operation Name 2',
        },
        {
            name: 'Operation Name 3',
        }
    ],
    techsupport: [
        {
            name: 'Technical Support Name 1',
        },
        {
            name: 'Technical Support Name 2',
        },
        {
            name: 'Technical Support Name 3',
        }
    ],
    admin: [],
    user: []
}

export const Performance = () => {
    const user = useAppSelector(state => state.auth.user)!;

    return (
        <>
            <title>Performance | Helpdesk system</title>
            <div className={styles['performance-container']}>
                <h2>Performance</h2>

                <div className={styles['performance-display']}>
                    <div className={styles['user-performance']}>
                        <div className={styles['user-profile']}>
                            <div className={styles['user-profile-picture']}>
                                <IoMdPerson />
                            </div>
                            <div className={styles['user-details']}>
                                <h3>{user.name}</h3>
                                <div className={styles['user-contact']}>
                                    <p>Contact No: 0123456789</p>
                                    <p>Department: {user.role}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['user-ticket-details']}>
                            <div className={styles['user-ticket-detail-row']}>
                                <p>Total Ticket Handle</p>
                                <p>5</p>
                            </div>
                            <div className={styles['user-ticket-detail-row']}>
                                <p>Ticket Solved</p>
                                <p>2</p>
                            </div>
                            <div className={styles['user-ticket-detail-row']}>
                                <p>Ticket Pending</p>
                                <p>1</p>
                            </div>
                            <div className={styles['user-ticket-detail-row']}>
                                <p>Ticket in Progress</p>
                                <p>2</p>
                            </div>
                            <div className={styles['user-ticket-detail-row']}>
                                <p>Rating</p>
                                <div>
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['staff-list']}>
                        {fakeStaffList[user.role].map(staff => (
                            <div className={styles['staff-entry']}>
                                <div className={styles['staff-profile-picture']}>
                                    <IoMdPerson />
                                </div>
                                <div className={styles['staff-details']}>
                                    <p>{staff.name}</p>
                                    <button>View details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
