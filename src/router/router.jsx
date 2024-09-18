import { App } from "components/App";
import { Overview } from "pages/Overview";
import Login from "components/Login/Login";
import PrivateRoute from "components/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import RestrictedRouter from "../components/RestrictedRout";


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [


                {
                    path: '/Overview',
                    element: <PrivateRoute component={Overview} redirectTo='/' />
                },
                {
                    path: '/',
                    element: <RestrictedRouter component={Login} redirectTo='/Overview' />
                },

                // {
                //     path: '/messages',
                //     element: <PrivateRoute component={ } redirecTo='/' />
                // },
                // {
                //     path: '/voice',
                //     element: <PrivateRoute component={ } redirecTo='/' />
                // },
                // {
                //     path: '/status',
                //     element: <PrivateRoute component={ } redirecTo='/' />
                // },
                // {
                //     path: '/economic',
                //     element: <PrivateRoute component={ } redirecTo='/' />
                // },
                // {
                //     path: '/settings',
                //     element: <PrivateRoute component={ } redirecTo='/' />
                // },
            ]
        }
    ]
)
