import { Container, Group, Image, Text } from "@mantine/core";
import {
	IconBasketDiscount,
	IconHome,
	IconInfoSquareRounded,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import "../app.scss";
import Logo from "../assets/images/gameSaverLogo.png"
import { useEffect, useState } from "react";

export const Layout = () => {
		const [isFooterVisible, setFooterVisible] = useState(false);
	  
		useEffect(() => {
		  const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const threshold = 0;
			setFooterVisible(scrollPosition > threshold);
		  };
	  
		  window.addEventListener('scroll', handleScroll);
		  return () => window.removeEventListener('scroll', handleScroll);
		}, []);

	return (
		<>
			<section className="layoutBody">
				<header>
					<nav className="navBar">
						<Group>
							<NavLink to={"/Home"}>
								<Group>
									<Image
										src={Logo}
										h={75}
										w={75}
										alt="GameSaver logotype"
									/>
									<h1 className="headerTitle">GameSaver</h1>
								</Group>
							</NavLink>
							<ul className="navLinks">
								<li>
									<NavLink to={"/Home"}>
										<Group className="navLink">
											<IconHome />
											Home
										</Group>
									</NavLink>
								</li>
								<li>
									<NavLink to={"/Deals"}>
										<Group className="">
											<IconBasketDiscount />
											Deals
										</Group>
									</NavLink>
								</li>
								<li>
									<NavLink to={"/About"}>
										<Group className="">
											<IconInfoSquareRounded />
											About
										</Group>
									</NavLink>
								</li>
							</ul>
						</Group>
					</nav>
				</header>
				<main>
					<Outlet />
				</main>
				<footer
					className="footer"
					style={{
						bottom: 0,
						width: '100%',
						transition: 'background-color 1s ease',
						visibility: isFooterVisible ? 'visible' : 'hidden',
						opacity: isFooterVisible ? 1 : 0,
						zIndex: 1000,
						marginTop: 'auto',
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
