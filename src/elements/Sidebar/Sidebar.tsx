import { IoIosArrowForward } from 'react-icons/io'
import { LuTicketPlus, LuTickets } from 'react-icons/lu'
import { MdOutlineDashboard } from 'react-icons/md'

import styles from './Sidebar.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import type { RootState } from '../../app/store'
import { useSelector } from 'react-redux'
import { GoGraph } from 'react-icons/go'
import { FaDatabase, FaGear, FaTicket } from 'react-icons/fa6'
import { AiOutlineAudit } from 'react-icons/ai'

const options = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: <MdOutlineDashboard />,
        roles: ['user', 'techsupport', 'operations', 'admin']
    },
    {
        id: 'new-ticket',
        name: 'New Ticket',
        icon: <LuTicketPlus />,
        roles: ['user']
    },
    {
        id: 'ticket-approval',
        name: 'Ticket Approval',
        icon: <FaTicket />,
        roles: ['operations']
    },
    {
        id: 'my-ticket',
        name: 'My Ticket',
        icon: <LuTickets />,
        roles: ['user', 'techsupport', 'operations']
    },
    {
        id: 'performance',
        name: 'Performance',
        icon: <GoGraph />,
        roles: ['techsupport', 'operations']
    },
    {
        id: 'database',
        name: 'Database',
        icon: <FaDatabase />,
        roles: ['admin']
    },
    {
        id: 'setting',
        name: 'Setting',
        icon: <FaGear />,
        roles: ['admin']
    },
    {
        id: 'user-log-history',
        name: 'User Log History',
        icon: <AiOutlineAudit />,
        roles: ['admin']
    }
]

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <div className={styles['sidebar']}>
            {options.map(opt => {
                const isActive = location.pathname.endsWith(opt.id)

                if (!opt.roles.includes(user!.role))
                    return (<></>);

                return (
                    <div className={styles['sidebar-option']}>
                        {isActive ? <IoIosArrowForward /> : <div />}
                        <div className={styles[`sidebar-option-pair`]} onClick={() => navigate(`/${opt.id}`)}>
                            {opt.icon}
                            <div className={styles['sidebar-option']}>{opt.name}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}