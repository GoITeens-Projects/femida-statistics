import { ServerMembers } from "components/ServerMembers/ServerMembers"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { fetchStatistics } from "../redux/statistics/operation";
import { Filter } from "components/Filter/Filter";

export const Overview = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Виконуємо fetch при завантаженні компонента
        dispatch(fetchStatistics());
    }, [dispatch]);
    return (
        <>

            <Filter />
        </>


    )
}