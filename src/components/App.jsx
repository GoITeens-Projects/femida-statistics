import { Status } from '../pages/Status';
import Login from './Login/Login';
import TopChannels from './Tops/Tops';
import { nanoid } from 'nanoid';

const testTop = [
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'name',
    messagesQuantity: 12345,
    id: nanoid()
  },
];

export const App = () => {
  return (
    <>
      <Login />
      <Status />
      <TopChannels topArr={testTop} />
    </>
  );
};
