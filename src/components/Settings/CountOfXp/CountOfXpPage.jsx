import { PeriodsSettings } from "../PeriodsSettings/PeriodsSettings."
import styles from './CountOfXPPage.module.css'
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';

export const CountOfXPPage = () => {

    const save = () => {};

    return<>
    <div className={styles['navigation-container']}>
        <SettingsNavigation onHandleSave={save} />
      </div>
    <PeriodsSettings/>
    </>
}