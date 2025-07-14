import { AccordionSection } from '../../components/AccordionSection/AccordionSection';
import styles from './Setting.module.css'

export const Setting = () => {
    return (
        <>
            <title>Settings | Helpdesk system</title>
            <div className={styles["settings-container"]}>
                <h2>Setting</h2>

                <AccordionSection title="General">
                    <div className={styles["setting-row"]}>
                        <span>Language</span>
                        <div>
                            <button className={styles["mini-button"]}>BM</button>
                            <button className={styles["mini-button"]}>BI</button>
                        </div>
                    </div>
                    <div className={styles["setting-row"]}>
                        <span>Data Backup</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                </AccordionSection>

                <AccordionSection title="Connect To">
                    <div className={styles["setting-row"]}>
                        <span>GoDash</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                    <div className={styles["setting-row"]}>
                        <span>SuperController</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                </AccordionSection>

                <AccordionSection title="Email">
                    <div className={styles["setting-row"]}>
                        <span>Enable SMTP</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                </AccordionSection>

                <AccordionSection title="Authorization">
                    <div className={styles["setting-row"]}>
                        <span>Edit Authorization</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                    <div className={styles["setting-row"]}>
                        <span>Authority Level</span>
                        <select>
                            <option value="admin">Admin</option>
                            <option value="operations">Operations</option>
                            <option value="techsupport">Tech Support</option>
                        </select>
                    </div>
                </AccordionSection>

                <AccordionSection title="Notification">
                    <div className={styles["setting-row"]}>
                        <span>Enable Notification</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                </AccordionSection>
            </div>
        </>
    );
}
