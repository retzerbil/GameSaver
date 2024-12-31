import { Anchor, Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IDealSearchResponse } from "../models/IDealSearchResponse";
import { IStoreResponse } from "../models/IStoreResponse";
import "../styles/dealcard.scss";
interface IDealCardProps {
	deal: IDealSearchResponse;
	store?: IStoreResponse;
}

export const DealCard = ({ deal, store }: IDealCardProps) => {
	return (
		<Card
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			w="300px"
			className="dealCard"
		>
			<Card.Section className="dealCardContent">
				<section className="dealCardImageContainer">
					<Image
						radius="md"
						src={deal.thumb}
						w="200px"
						className="dealCardImage"
						fallbackSrc="https://placehold.co/600x400?text={deal.title}"
					/>
				</section>

				<Text className="dealCardTitle" pb="md">{deal.title}</Text>

				<Badge color="green" className="dealCardPercentage" ml="80%">{Math.round(+deal.savings)}%</Badge>

				<Group justify="space-between" pb="md">
					<Text td="line-through">${deal.normalPrice}</Text>
					<Text>${deal.salePrice}</Text>
				</Group>
				{store && (
					<Group>
						<Text>{store.storeName}</Text>
						{store?.images?.icon && (
							<Image
								src={`https://www.cheapshark.com${store.images.icon}`}
								alt={store.storeName}
								style={{ width: "20px", height: "20px" }}
								className="storeIcon"
								fallbackSrc="https://placehold.co/100x100?text=No+Image" // Fallback in case image doesn't load
							/>
						)}
					</Group>
				)}
			</Card.Section>
			<Button
				color="orange"
				variant="filled"
				w="200px"
				mt="md"
				radius="md"
				className="dealCardButton"
			>
				<Anchor
					className="storeButton"
					underline="never"
					href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
					target="_blank"
				>
					Go to store!
				</Anchor>
			</Button>
		</Card>
	);
};
