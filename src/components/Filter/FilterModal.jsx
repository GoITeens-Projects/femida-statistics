import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../redux/filter/operation";
import { selectFilterInterval, selectFilterPeriod, selectFilterUnit } from "../../redux/filter/selectors";


export const FilterModal = ({delince}) => {
    const dispatch = useDispatch()
    const selInterval = useSelector(selectFilterInterval);
    const selUnit = useSelector(selectFilterUnit);
    const selPeriod = useSelector(selectFilterPeriod)

    const [interval, setIntervals] = useState(selInterval)
    const [unit, setUnit] = useState(selUnit)
    const [period, setPeriod] = useState(selPeriod)

    const changeFilter = () => {
        dispatch(updateFilter({
            interval,
            unit,
            period
        }))
    }


    return <div>
        <div>
        <button onClick={delince}>Назад</button>
        <button onClick={changeFilter}>Зберегти</button>
        <h5>Фільтр: час</h5>
        </div>
        <div>
            <h5>Інтервали</h5>
            <p>Як час відображається на шкалі</p>
            <ul>
                <li><button onClick={()=>setIntervals("hours")}>Години {interval === "hours" && "^"}</button></li>
                <li><button onClick={()=>setIntervals("days")}>Дні  {interval === "days" && "^"}</button></li>
                <li><button onClick={()=>setIntervals("weeks")}>Тижні  {interval === "weeks" && "^"}</button></li>
                <li><button onClick={()=>setIntervals("mounth")}>Місяці  {interval === "mounth" && "^"}</button></li>
            </ul>
        </div>
        <div>
            <h5>Одиниці часу</h5>
            <p>В яких одиницях відображаться активність голосових каналів</p>
            <ul>
                <li><button onClick={()=>setUnit("minutes")}>Хвилини {unit === "minutes" && "^"}</button></li>
                <li><button onClick={()=>setUnit("hours")}>Години {unit === "hours" && "^"}</button></li>
                <li><button onClick={()=>setUnit("days")}>Дні {unit === "days" && "^"}</button></li>
            </ul>
        </div>
        <div>
            <h5>Проміжок часу</h5>
            <p>Проміжок часу статистики</p>
            <input type="range" min="1" max="30" value={period} onChange={(e)=>setPeriod(e.target.value)}></input>
            <p>{period}</p>
        </div>
        
    </div>
}