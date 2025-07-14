import { VscGraph } from 'react-icons/vsc'
import { DashboardCard } from '../../components/DashboardCard/DashboardCard'
import styles from './Dashboard.module.css'
import { BiSupport } from 'react-icons/bi'
import { FaScrewdriverWrench } from 'react-icons/fa6'
import { IoStar, IoStarHalf } from 'react-icons/io5'
import { useAppSelector } from '../../app/hooks'

export const Dashboard = () => {
    // Non-null assertion because the user will only see this screen after logging in
    const user = useAppSelector(state => state.auth.user)!;

    return (
        <>
            <title>Dashboard | Helpdesk System</title>
            <div className={styles['dashboard-container']}>
                <h1 className={styles['dashboard-title']}>Dashboard</h1>

                <div className={styles['dashboard-cards']}>
                    <DashboardCard title='Total Tickets' amount={12} bgColor='#2f82ff' />
                    <DashboardCard title='Total Solved' amount={8} bgColor='#0bff68' />
                    <DashboardCard title='Total Awaiting Approval' amount={2} bgColor='#fe594e' />
                    <DashboardCard title='Total in Progress' amount={2} bgColor='#fcff6c' />
                </div>

                {['admin', 'operations', 'techsupport'].includes(user.role) ? (
                    <div className={styles['dashboard-statistics']}>
                        <div className={styles['dashboard-graph']}><VscGraph /></div>

                        <div className={styles['dashboard-internal-info']}>
                            <div className={styles['dashboard-staff']}>
                                <div className={styles['dashboard-staff-entry']}>
                                    <BiSupport className={styles['dashboard-staff-entry-icon']} />
                                    <p className={styles['dashboard-staff-entry-count']}>3</p>
                                    <p className={styles['dashboard-staff-entry-title']}>Technical Supports</p>
                                </div>
                                <div className={styles['dashboard-staff-entry']}>
                                    <FaScrewdriverWrench className={styles['dashboard-staff-entry-icon']} />
                                    <p className={styles['dashboard-staff-entry-count']}>4</p>
                                    <p className={styles['dashboard-staff-entry-title']}>Operation Team</p>
                                </div>
                            </div>
                            <div className={styles['dashboard-feedback']}>
                                <p className={styles['dashboard-feedback-title']}>Customer Feedback</p>
                                <div className={styles['dashboard-feedback-stars']}>
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStarHalf />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    null
                )}
            </div>
        </>
    )
}