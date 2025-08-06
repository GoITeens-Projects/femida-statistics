import { App } from 'components/App';
import { Overview } from 'pages/Overview';
import Login from 'components/Login/Login';
import PrivateRoute from 'components/PrivateRoute';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RestrictedRouter from '../components/RestrictedRout';
import { Messages } from 'pages/Messages';
import { Voice } from 'pages/Voice';
import { Status } from 'pages/Status';
import { Economic } from 'pages/Economic';
import { Stage } from 'pages/Stage';
import { Settings } from 'pages/Settings';
import { BasicXPPage } from 'components/Settings/BasicXP/BasicXPPage';
import { BadWordPage } from 'components/Settings/BadWord/BadWordModal';
import { SpamPage } from 'components/Settings/Spam/Spam';
import { EventsPage} from 'components/Settings/Events/EventsPage';
import LinksPage from 'components/LinksPage/LinksPage';
import { CommandsPage } from 'components/Settings/Commands/CommandsPage';
import { Emojis } from 'components/Settings/Emojis/Emojis';
import { GiftPage } from 'components/Settings/Gift&TicketSettings/Gift/GiftPage';
import { TicketToolPage } from 'components/Settings/Gift&TicketSettings/TicketTool/TicketToolPage';
import { GiftManage } from 'components/Settings/Gift&TicketSettings/Gift/GiftManage/GiftManage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // 🔄 Якщо користувач заходить на "/", перекидаємо його на /overview
      {
        index: true, // те саме що path: "/"
        element: <Navigate to="/overview" />,
      },
      {
        path: 'login',
        element: <RestrictedRouter component={Login} redirectTo="/overview" />,
      },
      {
        path: 'overview',
        element: <PrivateRoute component={Overview} redirectTo="/login" />,
      },
      {
        path: 'messages',
        element: <PrivateRoute component={Messages} redirectTo="/login" />,
      },
      {
        path: 'voice',
        element: <PrivateRoute component={Voice} redirectTo="/login" />,
      },
      {
        path: 'stage',
        element: <PrivateRoute component={Stage} redirectTo="/login" />,
      },
      {
        path: 'status',
        element: <PrivateRoute component={Status} redirectTo="/login" />,
      },
      {
        path: 'economic',
        element: <PrivateRoute component={Economic} redirectTo="/login" />,
      },
      {
        path: 'settings',
        element: <PrivateRoute component={Settings} redirectTo="/login" />,
      },
      {
        path: 'settings/badword',
        element: <PrivateRoute component={BadWordPage} redirectTo="/login" />,
      },
      {
        path: 'settings/basic-xp',
        element: <PrivateRoute component={BasicXPPage} redirectTo="/login" />,
      },
      {
        path: 'settings/spam',
        element: <PrivateRoute component={SpamPage} redirectTo="/login" />,
      },
      {
        path: 'settings/events',
        element: <PrivateRoute component={EventsPage} redirectTo="/login" />,
      },
      {
        path: 'settings/links',
        element: <PrivateRoute component={LinksPage} redirectTo="/login" />,
      },
      {
        path: 'settings/commands',
        element: <PrivateRoute component={CommandsPage} redirectTo="/login" />,
      },
      {
        path: 'settings/emojis',
        element: <PrivateRoute component={Emojis} redirectTo="/login" />,
      },
        {
        path: 'settings/gift-requests',
        element: <PrivateRoute component={GiftPage} redirectTo="/login" />,
      },
       {
        path: 'settings/ticket-tool',
        element: <PrivateRoute component={TicketToolPage} redirectTo="/login" />,
      },
      {
        path: 'settings/gift',
        element: <PrivateRoute component={GiftManage} redirectTo="/login" />,
      },
    ],
  },
]);