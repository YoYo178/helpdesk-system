import { useState } from 'react';
import styles from './AccordionSection.module.css';

interface AccordionSectionProps {
    title: string;
    children: React.ReactNode;
}

export const AccordionSection = ({ title, children }: AccordionSectionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['accordion-section']}>
            <button className={styles['accordion-header']} onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▾</span>
            </button>
            {isOpen && <div className={styles['accordion-content']}> {children}</ div>}
        </div>
    );
};