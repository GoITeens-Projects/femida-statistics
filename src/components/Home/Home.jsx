import { NavLink } from "react-router-dom"

export const Home = () => {
    return (
        <>
            <h1>Ви на сайті статстики боту Femida, щоб переглянути статистику увійдіть!</h1>
            <NavLink to='/login'><button>login</button></NavLink>
        </>


    )
}