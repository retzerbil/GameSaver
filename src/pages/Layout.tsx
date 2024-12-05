import { Group } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";

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
			<footer>
                <Group>
				<small>Retzerbil coding LLC</small>
				<small style={{ fontSize: "0.8rem", color: "gray" }}>
					Disclaimer: The deals shown on this page are updated periodically.
					Prices and availability may change quickly, and deals can expire
					without notice. GameSaver recommend checking the store's website for the most
					accurate and current information.
				</small>
                </Group>
			</footer>
		</>
	);
};
