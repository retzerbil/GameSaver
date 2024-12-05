import { Anchor, Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IDealSearchResponse } from "../models/IDealSearchResponse";

interface IDealCardProps {
	deal: IDealSearchResponse;
}

export const DealCard = ({ deal }: IDealCardProps) => {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder w="300px">
			<Card.Section>
				<Image
					radius="md"
					src={deal.thumb}
					w="200px"
					fallbackSrc="https://placehold.co/600x400?text={deal.title}"
				/>

				<Group justify="space-between" mt="md" mb="xs">
					<Text>{deal.title}</Text>
					<Badge color="green">{Math.round(+deal.savings)}%</Badge>
				</Group>

				<Group justify="space-between">
					<Text td="line-through">${deal.normalPrice}</Text>
					<Text>${deal.salePrice}</Text>
				</Group>

				<Button color="orange" w="200px" mt="md" radius="md">
					<Anchor
						underline="never"
						href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
						target="_blank"
					>
						Go to store!
					</Anchor>
				</Button>
			</Card.Section>
		</Card>
	);
};
