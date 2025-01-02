import { Button, Container, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

export const Home = () => {
	return (
		<>
			<Container size="md">
				<section className="homeBody">
					<h1>Welcome to GameSaver</h1>
					<Text p={10}>
						GameSaver is a website that allows you to search for the best deals
						on video games. You can search for games by title, and GameSaver
						will show you the best deals available from a variety of online
						stores. GameSaver is a great way to save money on video
						games and find the best deals available online.
					</Text>
					<NavLink to={"/Deals"}>
						<Button
							color="orange"
							variant="filled"
							mt="md"
							radius="md"
							size="xl"
							className="homeDealButton"
							m={50}
						>
							FIND ME DEALS!
						</Button>
					</NavLink>
				</section>
			</Container>
		</>
	);
};
