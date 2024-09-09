import { useDispatch, useSelector } from 'react-redux';
import styles from './ServerMembers.module.css';
import { useEffect } from 'react';
import { fetchStatistics } from '../../redux/statistics/operation';
import { CiFilter } from "react-icons/ci";

export const ServerMembers = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.statistics); // Замініть на правильний шлях до вашого стейту


    return (
        <>
            <h2>Скільки користувачів зайшло і вийшло на сервер</h2>
            <CiFilter />
            <p>filter</p>


        </>
    );
};