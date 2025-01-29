import { AutoModerationFilter } from "components/Settings/BadWord/AutoModerationFilter"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../redux/settings/operation";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import s from '../components/Main.module.css';
import { ClimbingBoxLoader } from 'react-spinners';
import { Limits } from "components/Settings/Limit/Limits";


export const Settings = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;
  return <>
    {/* <motion.div
             initial={{ opacity: 0, y: -50 }} // Початковий стан
             animate={{ opacity: 1, y: 0 }}   // Анімований стан
             exit={{ opacity: 0, y: 50 }}     // Стан при зникненні
             transition={{ duration: 1.5 }}   // Тривалість переходу
           > */}
    <AutoModerationFilter 
    moderationTitle='Погані слова'
    moderationList= 'Мат, небажані вирази'
    endpoint = 'badword'
    nameForUpdate = 'badwords'
    />
    <AutoModerationFilter 
    moderationTitle='Ліміти'
    moderationList= 'Редагувати ліміти'
    endpoint = 'limits'
    nameForUpdate = 'badwords'
    />
    {/* </motion.div> */}

  </>
}
