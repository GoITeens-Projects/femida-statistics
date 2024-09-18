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

    const chooseInterval = (int) => {
        setIntervals(int)
        switch (int) {
            case "hours":
                if(period > 24) setPeriod(24)
                break;
            case "days":
                if(period > 30) setPeriod(30)
                 break;
            case "weeks":
                if(period > 24) setPeriod(24)
                break;
            case "mounth":
                if(period > 6) setPeriod(6)
                break;
        
            default:
                break;
        }
    }


    return <div>
        <div>
        <button onClick={delince}>Назад</button>
        <h5>Фільтр: час</h5>
        </div>
        <div>
            <h5>Інтервали</h5>
            <p>Як час відображається на шкалі</p>
            <ul>
                <li><button onClick={()=>chooseInterval("hours")}>Години {interval === "hours" && "^"}</button></li>
                <li><button onClick={()=>chooseInterval("days")}>Дні  {interval === "days" && "^"}</button></li>
                <li><button onClick={()=>chooseInterval("weeks")}>Тижні  {interval === "weeks" && "^"}</button></li>
                <li><button onClick={()=>chooseInterval("mounth")}>Місяці  {interval === "mounth" && "^"}</button></li>
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
            {interval === "hours" && <input type="range" min="1" max="24" value={period} onChange={(e)=>setPeriod(e.target.value)}></input>}
            {interval === "days" && <input type="range" min="1" max="30" value={period} onChange={(e)=>setPeriod(e.target.value)}></input>}
            {interval === "weeks" && <input type="range" min="1" max="24" value={period} onChange={(e)=>setPeriod(e.target.value)}></input>}
            {interval === "mounth" && <input type="range" min="1" max="6" value={period} onChange={(e)=>setPeriod(e.target.value)}></input>}
            <p>{period}</p>
        </div>
        <button onClick={changeFilter}>Зберегти</button>
        
    </div>
}