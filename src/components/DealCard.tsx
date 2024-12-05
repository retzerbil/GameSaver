import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { IGameResponse } from "../models/IGameResponse";

interface IDealCardProps {
    game: IGameResponse;
}

const calculateDiscount = (retailPrice: number, salePrice: number) => {
    return Math.round(((retailPrice - salePrice) / retailPrice) * 100);
}
export const DealCard = ({game}: IDealCardProps) => {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
            {game.deal ? (
                    <>  
                        <Image 
                            radius="md" 
                            h={200} 
                            src={game.thumb} 
                            w="100%"
                            alt={game.external + "box art"}
                            style={{objectFit: 'cover'}}>
                        </Image>
                        <Group justify="space-between" mt="md" mb="xs">
                           <Text>{game.external}</Text> 
                           <Badge color="green">{calculateDiscount(+game.deal.gameInfo.retailPrice, +game.cheapest)}%</Badge>
                        </Group>
                        <Text td="line-through">${game.deal.gameInfo.retailPrice}</Text>
                        <Text>${game.cheapest}</Text>
                        <Button color="orange" fullWidth mt="md" radius="md"><a href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`} target="_blank">Go to store!</a></Button>
                    </>
                ) : (
                    <div>No deal available</div>
                )}
            </Card.Section>
        </Card>
    )
}