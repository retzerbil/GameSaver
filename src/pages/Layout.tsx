import { Group, Image, } from "@mantine/core";
import {
	IconBasketDiscount,
	IconHome,
	IconInfoSquareRounded,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import "../app.scss";
import Logo from "../assets/images/gameSaverLogo.png"

export const Layout = () => {
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
			</section>
		</>
	);
};
