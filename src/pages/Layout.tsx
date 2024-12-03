import { NavLink, Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <>
    <header>
        <h1>GameSaver</h1>

        <nav>
            <ul>
                <li>
                    <NavLink to={"/"}>Start</NavLink>
                </li>
                <li>
                    <NavLink to={"/Home"}>Home</NavLink>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <Outlet />
    </main>
    <footer>Retzerbil coding LLC</footer>
    </>
  )
}