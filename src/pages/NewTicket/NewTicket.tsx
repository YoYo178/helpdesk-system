import { LabelledTextBox } from '../../components/LabelledTextBox/LabelledTextBox'
import styles from './NewTicket.module.css'

export const NewTicket = () => {
    return (
        <>
            <title>Create new ticket | Helpdesk system</title>
            <div className={styles['new-ticket-container']}>
                <h1 className={styles['new-ticket-title']}>Create New Ticket</h1>

                <form onSubmit={(e) => e.preventDefault()} className={styles['new-ticket-form']}>
                    <div className={styles['ticket-details']}>
                        <div className={styles['ticket-details-input-pair']}>
                            <LabelledTextBox name='ticket-no' label='Ticket No.' inline />
                            <LabelledTextBox name='name' label='Name' inline />
                        </div>
                        <div className={styles['ticket-details-input-pair']}>
                            <LabelledTextBox name='date' label='Date' inline />
                            <LabelledTextBox name='department' label='Department' inline />
                        </div>
                    </div>

                    <div className={styles['ticket-details']}>
                        <LabelledTextBox name='subject' label='Subject' />
                    </div>

                    <div className={styles['ticket-details']}>
                        <div style={{ width: '48%' }}>
                            <LabelledTextBox name='category' label='Category' />
                            <LabelledTextBox name='type' label='Type' />
                            <LabelledTextBox name='priority' label='Priority' />
                        </div>
                        <div style={{ width: '48%' }}>
                            <LabelledTextBox name='description' label='Description' useTextArea />
                        </div>
                    </div>

                    <div className={styles['ticket-details']}>
                        <img src="assets/fake-captcha.png" alt="" width='400' />
                        <button className={styles['ticket-submit-btn']}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}