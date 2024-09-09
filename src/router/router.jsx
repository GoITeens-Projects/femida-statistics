import { App } from "components/App";
import { Home } from "pages/Home";
import Login from "components/Login/Login";
import PrivateRoute from "components/PrivateRoute";
import { ServerMembers } from "components/ServerMembers/ServerMembers";
import { createBrowserRouter } from "react-router-dom";
import RestrictedRouter from "../components/RestrictedRout";


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [


                {
                    path: '/Home',
                    element: <PrivateRoute component={Home} redirectTo='/' />
                },
                {
                    path: '/',
                    element: <RestrictedRouter component={Login} redirectTo='/Home' />
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
