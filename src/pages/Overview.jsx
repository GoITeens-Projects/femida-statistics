import { ServerMembers } from "components/ServerMembers/ServerMembers"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStatistics } from "../redux/statistics/operation";
import { MessagesChart } from "components/MessagesChart/MessagesChart";
export const Overview = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Виконуємо fetch при завантаженні компонента
        dispatch(fetchStatistics());
    }, [dispatch]);
    return (
        <>
            <ServerMembers/>
            <MessagesChart/>
        </>


    )
}