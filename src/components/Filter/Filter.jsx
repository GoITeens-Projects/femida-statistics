import styles from './Filter.module.css';
import {useState} from "react";
import {FilterModal} from "./FilterModal"

export const Filter = () => {
    const[ modalTreaker, setModalTreaker] = useState(false)

    const delince = () => {
        setModalTreaker(false)
    } 

    return <div>
        <p></p>
        <button onClick={()=>setModalTreaker(true)}>Фільтр: час</button>
        {modalTreaker && <FilterModal delince={delince}/>}
    </div>
}