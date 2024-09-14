import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import {RiBarChart2Line,
        RiMessage2Line,
        RiVolumeUpLine,
        RiUserLocationLine,
        RiLineChartLine} from 'react-icons/ri'

export const Navigation = () => {
    return <div>
        <ul>
            <li><NavLink to="/Overview"><RiBarChart2Line/> Загальна статистика</NavLink></li>
            <li><NavLink to="/messages"><RiMessage2Line/> Повідомлення</NavLink></li>
            <li><NavLink to="/voice"><RiVolumeUpLine/> Голосові канали</NavLink></li>
            <li><NavLink to="/status"><RiUserLocationLine/> Статус</NavLink></li>
            <li><NavLink to="/economic"><RiLineChartLine/>Економіка</NavLink></li>
        </ul>
    </div>
}