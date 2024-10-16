import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import {RiBarChart2Line,
        RiMessage2Line,
        RiVolumeUpLine,
        RiUserLocationLine,
        RiLineChartLine} from 'react-icons/ri'

export const Navigation = () => {
    return <div>
        <ul className={s.navigationList}>
            <li className={s.navigationItem}><NavLink to="/Overview"><RiBarChart2Line/> Загальна статистика</NavLink></li>
            <li className={s.navigationItem}><NavLink to="/messages"><RiMessage2Line/> Повідомлення</NavLink></li>
            <li className={s.navigationItem}><NavLink to="/voice"><RiVolumeUpLine/> Голосові канали</NavLink></li>
            <li className={s.navigationItem}><NavLink to="/status"><RiUserLocationLine/> Статус</NavLink></li>
            <li className={s.navigationItem}><NavLink to="/economic"><RiLineChartLine/>Економіка</NavLink></li>
        </ul>
    </div>
}