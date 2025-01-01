import { Container, Text } from "@mantine/core";

export const About = () => {
	return (
		<>
			<Container size="md">
				<section className="aboutBody">
					<h1>About</h1>
					<Text p={10}>
						GameSaver is a web application that helps users find the best deals
						on video games on a variety of different stores. The app uses the{" "}
						<a href="https://apidocs.cheapshark.com/">
							{" "}
							<u>CheapShark API</u>
						</a>{" "}
						to fetch games and deals to display them in a list. The user can
						search for games, sort the results, and find the cheapest prices for
						their favorite games. The app is built with React, TypeScript,
						Mantine UI library and Tabler icons.
					</Text>
				</section>
			</Container>
		</>
	);
};
