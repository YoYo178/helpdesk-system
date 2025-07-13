import type { FC } from "react";
import styles from './DashboardCard.module.css'

interface DashboardCardProps {
    title: string;
    amount: number;
    bgColor: string;
}

export const DashboardCard: FC<DashboardCardProps> = ({ title, amount, bgColor }) => {
    return (
        <div className={styles['card-container']} style={{ backgroundColor: bgColor }}>
            <div className={styles['card-content']}>
                <div className={styles['card-title']}>{title}</div>
                <div className={styles['card-amount']}>{amount}</div>
            </div>
        </div>
    )
}
