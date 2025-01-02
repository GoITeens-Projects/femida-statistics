import { MessagesChart } from "components/MessagesChart/MessagesChart"
import TopChannels from "components/Tops/Tops"
import { nanoid } from 'nanoid';
import { fetchStatistics, completeLogs } from '../redux/statistics/operation';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import setTheme from 'utils/setTheme';
import updateTokens from 'utils/updateToken';
import { selectMessagesLogs, selectCompletedMessagesLogs } from '../redux/statistics/selectors';
import { useSelector } from "react-redux";
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

export const Messages = () => {
  const dispatch = useDispatch();
  const messagesLogs = useSelector(selectMessagesLogs)
  const logs = useSelector(selectCompletedMessagesLogs);

  useEffect(() => {
      // Виконуємо fetch при завантаженні компонента
      if (logs.length === 0) {
        dispatch(completeLogs());
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
             <MessagesChart type='chat'/>
           </motion.div>
   
    <motion.div
             initial={{ opacity: 0, y: -50 }} // Початковий стан
             animate={{ opacity: 1, y: 0 }}   // Анімований стан
             exit={{ opacity: 0, y: 50 }}     // Стан при зникненні
             transition={{ duration: 1.5 }}   // Тривалість переходу
           >
            <TopChannels type='chat' topArr={testTop}/>
           </motion.div>
    
    </>
}