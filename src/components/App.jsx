import { NavLink, Outlet } from 'react-router-dom';
import { Status } from '../pages/Status';
import Login from './Login/Login';
import { Navigation } from './Navigation/Navigation';
import { nanoid } from 'nanoid';
import TopChannels from './Tops/Tops';

const testTop = [
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid(),
  },
];

export const App = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <TopChannels topArr={testTop} />
    </>
  );
};
