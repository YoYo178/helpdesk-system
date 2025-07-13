import type { FC } from 'react';
import styles from './LabelledTextBox.module.css'

interface LabelledTextBoxProps {
    label: string;
    name: string;
    inline?: boolean;
    useTextArea?: boolean;
}

export const LabelledTextBox: FC<LabelledTextBoxProps> = ({ label, name, inline = false, useTextArea = false }) => {
    return (
        <div className={styles[`labelled-text-box-pair${inline ? '-inline' : ''}`]} style={{ height: useTextArea ? '100%' : 'unset' }}>
            <label htmlFor={name} className={styles[`labelled-text-box-label${inline ? '-inline' : ''}`]}>{label}:</label>

            {useTextArea ? (
                <textarea name={name} className={styles[`labelled-text-box-input${inline ? '-inline' : ''}`]} style={{ resize: 'none', height: useTextArea ? '100%' : 'unset' }} />
            ) : (
                <input name={name} type="text" className={styles[`labelled-text-box-input${inline ? '-inline' : ''}`]} />
            )}
        </div>
    )
}
