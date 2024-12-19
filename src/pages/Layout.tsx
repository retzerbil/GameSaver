import { Container, Group, Text } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<>
			<section className="layoutBody">
				<header>
					<h1 className="headerTitle">GameSaver</h1>

					<nav className="navBar">
						<ul>
							<li>
								<NavLink to={"/Home"}>Home</NavLink>
							</li>
							<li>
								<NavLink to={"/Deals"}>Deals</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<main>
					<Outlet />
				</main>
				<footer
					style={{
						marginTop: "1rem",
						padding: "2rem 0",
						backgroundColor: "#f8f8f8",
					}}
				>
					<Container>
						<Group justify="space-between">
							<Text size="sm" color="dimmed">
								Retzerbil coding LLC
							</Text>
							<Text size="xs" color="dimmed" mt="xs">
								Disclaimer: The deals shown on this page are updated
								periodically. Prices and availability may change quickly, and
								deals can expire without notice. GameSaver recommends checking
								the store's website for the most accurate and current
								information. Please note that games with ended sales may take
								time to be removed from the API and may show up as 0% discounts.
								Please take note before purchasing that some deals and games may
								not be available in your region.
							</Text>
						</Group>
					</Container>
				</footer>
			</section>
		</>
	);
};
