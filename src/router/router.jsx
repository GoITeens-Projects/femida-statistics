import { App } from "components/App";
import { Home } from "components/Home/Home";
import Login from "components/Login/Login";
import PrivateRoute from "components/PrivateRoute";
import { ServerMembers } from "components/ServerMembers/ServerMembers";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [


                {
                    path: '/Home',
                    element: <PrivateRoute component={Home} redirecTo='/' />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/statistics',
                    element: <PrivateRoute component={ServerMembers} redirecTo='/Home' />
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
