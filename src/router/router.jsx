import { App } from 'components/App';
import { Overview } from 'pages/Overview';
import Login from 'components/Login/Login';
import PrivateRoute from 'components/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';
import RestrictedRouter from '../components/RestrictedRout';
import { Messages } from 'pages/Messages';
import { Voice } from 'pages/Voice';
import { Status } from 'pages/Status';
import { Economic } from 'pages/Economic';
import { Stage } from 'pages/Stage';
import { Settings } from 'pages/Settings';
import { LimitsPage } from 'components/Settings/Limit/LimitsModal';
import { BadWordPage } from 'components/Settings/BadWord/BadWordModal';
import { SpamPage } from 'components/Settings/Spam/Spam';
import { CountOfXPPage } from 'components/Settings/CountOfXp/CountOfXpPage';
import LinksPage from 'components/LinksPage/LinksPage';
import { CommandsPage } from 'components/Settings/Commands/CommandsPage';
import { Emojis } from 'components/Settings/Emojis/Emojis';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/overview',
        element: <PrivateRoute component={Overview} redirectTo='/' />,
      },
      {
        path: '/',
        element: <RestrictedRouter component={Login} redirectTo='/overview' />,
      },
      {
        path: '/messages',
        element: <PrivateRoute component={Messages} redirectTo='/' />,
      },
      {
        path: '/voice',
        element: <PrivateRoute component={Voice} redirectTo='/' />,
      },
      {
        path: '/stage',
        element: <PrivateRoute component={Stage} redirectTo='/' />,
      },
      {
        path: '/status',
        element: <PrivateRoute component={Status} redirectTo='/' />,
      },
      {
        path: '/economic',
        element: <PrivateRoute component={Economic} redirectTo='/' />,
      },
      {
        path: '/settings',
        element: <PrivateRoute component={Settings} redirectTo='/' />,
      },
      {
        path: '/settings/badword',
        element: <PrivateRoute component={BadWordPage} redirectTo='/' />,
      },
      {
        path: '/settings/limits',
        element: <PrivateRoute component={LimitsPage} redirectTo='/' />,
      },
      {
        path: '/settings/spam',
        element: <PrivateRoute component={SpamPage} redirectTo='/' />,
      },
      {
        path: '/settings/number-of-xp',
        element: <PrivateRoute component={CountOfXPPage} redirectTo='/' />,
      },
      {
        path: '/settings/links',
        element: <PrivateRoute component={LinksPage} redirectTo='/' />,
      },
      {
        path: '/settings/commands',
        element: <PrivateRoute component={CommandsPage} redirectTo='/' />,
      },
      {
        path: '/settings/emojis',
        element: <PrivateRoute component={Emojis} redirectTo='/' />,
      }
    ],
  },
]);
