import { ServerMembers } from "components/ServerMembers/ServerMembers"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { fetchStatistics } from "../redux/statistics/operation";

export const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Виконуємо fetch при завантаженні компонента
        dispatch(fetchStatistics());
    }, [dispatch]);
    return (
        <>
            <h1>Ви на головній сторінці по статистиці боту</h1>
            <ServerMembers />
        </>


    )
}