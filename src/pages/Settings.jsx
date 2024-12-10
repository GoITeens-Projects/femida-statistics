import { BadWord } from "components/BadWord/BadWord"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../redux/settings/operation";

export const Settings = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.settings);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;

    return (
        <>
            <h1>Налаштування</h1>
            <pre>{data ? JSON.stringify(data, null, 2) : 'Немає даних'}</pre>
            <BadWord />
        </>
    );
};