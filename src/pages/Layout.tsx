import { Container, Group, Text } from "@mantine/core";
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
			<footer style={{ padding: "20px 0", backgroundColor: "#f8f8f8" }}>
				<Container>
					<Group justify="space-between">
						<Text size="sm" color="dimmed">
							Retzerbil coding LLC
						</Text>
					</Group>
					<Text size="xs" color="dimmed" mt="xs">
						Disclaimer: The deals shown on this page are updated periodically.
						Prices and availability may change quickly, and deals can expire
						without notice. GameSaver recommends checking the store's website for the
						most accurate and current information.
					</Text>
				</Container>
			</footer>
		</>
	);
};
