import { MessagesChart } from "components/MessagesChart/MessagesChart"
import TopChannels from "components/Tops/Tops"
import { nanoid } from 'nanoid';
import updateTokens from 'utils/updateToken';
import { selectMessagesLogs, selectCompletedMessagesLogs } from '../redux/statistics/selectors';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStatistics, completeLogs, fetchVoiceAndStage } from '../redux/statistics/operation';
import setTheme from 'utils/setTheme';
import { voiceData } from "./voiceData";
import { motion, AnimatePresence } from "framer-motion";
import s from '../components/Main.module.css';
import { ClimbingBoxLoader } from 'react-spinners';

const testTop = [
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
    {
      userAvatarUrl:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      userName: 'Імʼя користувача',
      messagesQuantity: 12345,
      id: nanoid(),
    },
  ];

export const Stage = () => {
    const messagesLogs = useSelector(selectMessagesLogs)
    const logs = useSelector(selectCompletedMessagesLogs);
    const dispatch = useDispatch()
  
    useEffect(() => {
      // Виконуємо fetch при завантаженні компонента
    
      if (logs.length === 0) {
        dispatch(completeLogs());
        // dispatch(fetchVoiceAndStage())
        // dispatch(fetchStatistics());
        // updateTokens()
        setTheme();
      }
    }, [messagesLogs, dispatch, logs]);
  
      return <>
       <motion.div
               initial={{ opacity: 0, y: -50 }} // Початковий стан
               animate={{ opacity: 1, y: 0 }}   // Анімований стан
               exit={{ opacity: 0, y: 50 }}     // Стан при зникненні
               transition={{ duration: 1.5 }}   // Тривалість переходу
             >
       <MessagesChart type='stage' include={voiceData}/>
       </motion.div>
       <motion.div
               initial={{ opacity: 0, y: -50 }} // Початковий стан
               animate={{ opacity: 1, y: 0 }}   // Анімований стан
               exit={{ opacity: 0, y: 50 }}     // Стан при зникненні
               transition={{ duration: 1.5 }}   // Тривалість переходу
             >
       <TopChannels type='stage' topArr={testTop}/>
       </motion.div>
       </>
}