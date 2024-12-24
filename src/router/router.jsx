import { App } from "components/App";
import { Overview } from "pages/Overview";
import Login from "components/Login/Login";
import PrivateRoute from "components/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import RestrictedRouter from "../components/RestrictedRout";
import { Messages } from "pages/Messages";
import { Voice } from "pages/Voice";
import { Status } from "pages/Status";
import { Economic } from "pages/Economic";
import { Stage } from "pages/Stage";
import { Settings } from "pages/Settings";
import { BadWordPage } from '../components/BadWord/BadWordModal'

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [


                {
                    path: '/overview',
                    element: <PrivateRoute component={Overview} redirectTo='/' />
                },
                {
                    path: '/',
                    element: <RestrictedRouter component={Login} redirectTo='/Overview' />
                },

                {
                    path: '/messages',
                    element: <PrivateRoute component={Messages} redirectTo='/' />
                },
                {
                    path: '/voice',
                    element: <PrivateRoute component={Voice} redirectTo='/' />
                },
                {
                    path: '/stage',
                    element: <PrivateRoute component={Stage} redirecTo='/' />
                },
                {
                    path: '/status',
                    element: <PrivateRoute component={Status} redirectTo='/' />
                },
                {
                    path: '/economic',
                    element: <PrivateRoute component={Economic} redirectTo='/' />
                },
                {
                    path: '/settings',
                    element: <PrivateRoute component={Settings} redirecTo='/' />
                },
                {
                    path: '/settings/badword',
                    element: <PrivateRoute component={BadWordPage} redirecTo='/' />
                },

            ]
        }
    ]
)
