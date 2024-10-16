import { MessagesChart } from "components/MessagesChart/MessagesChart"
import TopChannels from "components/Tops/Tops"
import { nanoid } from 'nanoid';

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
    return <>
    <MessagesChart/>
    <TopChannels topArr={testTop}/>
    </>
}