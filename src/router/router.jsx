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
                    element: <PrivateRoute component={Messages} redirecTo='/' />
                },
                {
                    path: '/voice',
                    element: <PrivateRoute component={Voice} redirecTo='/' />
                },
                {
                    path: '/status',
                    element: <PrivateRoute component={Status} redirecTo='/' />
                },
                {
                    path: '/economic',
                    element: <PrivateRoute component={Economic} redirecTo='/' />
                },
                // {
                //     path: '/settings',
                //     element: <PrivateRoute component={ } redirecTo='/' />
                // },
            ]
        }
    ]
)
