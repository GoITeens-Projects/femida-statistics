import { MessagesChart } from "components/MessagesChart/MessagesChart"
import TopChannels from "components/Tops/Tops"
import { nanoid } from 'nanoid';
import { fetchStatistics, completeMessagesLogs } from '../redux/statistics/operation';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import setTheme from 'utils/setTheme';
import updateTokens from 'utils/updateToken';
import { selectMessagesLogs, selectCompletedMessagesLogs } from '../redux/statistics/selectors';
import { useSelector } from "react-redux";

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
        dispatch(completeMessagesLogs());
        dispatch(fetchStatistics());
        updateTokens()
        setTheme();
      }
    }, [messagesLogs, dispatch, logs]);
    return <>
    <MessagesChart/>
    <TopChannels topArr={testTop}/>
    </>
}