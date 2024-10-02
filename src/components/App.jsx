import { NavLink, Outlet } from 'react-router-dom';
import { Status } from '../pages/Status';
import Login from './Login/Login';
import { Navigation } from './Navigation/Navigation';
import { nanoid } from 'nanoid';
import TopChannels from './Tops/Tops';
import Header from './Header/Header';
import { ServerMembers } from './ServerMembers/ServerMembers';
import { MessagesChart } from './MessagesChart/MessagesChart';
import { StatusChart } from './StatusChart/StatusChart';

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

export const App = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />

      <TopChannels topArr={testTop} />
      <ServerMembers />
      <MessagesChart />
      <StatusChart />
    </>
  );
};
