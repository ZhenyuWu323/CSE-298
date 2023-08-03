import { VStack, Text, HStack, Image, Button, Box, Heading, Icon, Link, Badge, Card, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, IconButton} from "@chakra-ui/react"
import { GameDetail } from "../models/GamePageModel"
import { useState } from "react";
import { PlatformIcon } from "./PlatformList";
import { CommentGrid } from "./CommentGrid";
import { UserInfo } from "./Home";
import buyIcon from "../assets/flying-money.png";
import maybeIcon from "../assets/review.png";
import trashIcon from "../assets/delete.png";


interface Props{
    gameInfo: GameDetail
    user: UserInfo | null
}

const GameInfoGrid = ({ gameInfo, user }: Props) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    // Function to toggle show/hide full description
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
    const ResizeImage = (url: string) => {
        const index = url.indexOf("media/") + "media/".length;
        return url.slice(0, index) + "crop/600/400/" + url.slice(index);
    };
  
    return (
    <Box>
        <VStack spacing={50} paddingLeft={5} paddingTop={50} align="start">
            <VStack spacing={10} paddingEnd={10}>
                <HStack>
                {gameInfo && gameInfo.name && (
                <Text fontSize="6xl" fontWeight="bold" mb="4px">
                    {gameInfo.name}
                </Text>
                )}
                {gameInfo && gameInfo.image && gameInfo.image != "" &&(
                    <Card key={gameInfo.name} borderRadius={10} overflow="hidden">
                        <Image src={ResizeImage(gameInfo.image)} />
                    </Card>
                )}
                </HStack>
                {gameInfo && gameInfo.description && (
                <Box>
                    <Text
                        fontSize="xl"
                        mb="4px"
                        noOfLines={showFullDescription ? undefined : 3}
                    >
                        About: {gameInfo.description}
                    </Text>
                    <Button variant="solid" onClick={toggleDescription}>
                        {showFullDescription ? 'Show Less' : 'Show More'}
                    </Button>
                </Box>
                )}
            </VStack>
            <Box>
                <HStack spacing="350px"  alignItems="start">
                    <Box >
                        <Stat>
                            <StatLabel fontSize={20} textColor={"green.400"}>Take My Money</StatLabel>
                            <StatNumber fontSize={50}>345,670</StatNumber>
                            <StatHelpText>
                            <StatArrow type='increase' />
                                23.36%
                            </StatHelpText>
                        </Stat>
                        <Button
                        leftIcon={<Image boxSize={10} src={buyIcon} alt="Buy" />}
                        colorScheme="green"
                        variant='outline'
                        >
                            Rate
                        </Button>
                    </Box>
                    <Box>
                        <Stat>
                            <StatLabel fontSize={20} textColor={"orange.400"}>Maybe</StatLabel>
                            <StatNumber fontSize={50}>45</StatNumber>
                            <StatHelpText>
                            <StatArrow type='decrease' />
                                9.05%
                            </StatHelpText>
                        </Stat>
                        <Button
                        leftIcon={<Image boxSize={10} src={maybeIcon} alt="Maybe" />}
                        colorScheme="orange"
                        variant='outline'
                        >
                            Rate
                        </Button>
                    </Box>
                    <Box>
                        <Stat>
                            <StatLabel fontSize={20} textColor={"red.400"}>Trash</StatLabel>
                            <StatNumber fontSize={50}>345,670</StatNumber>
                            <StatHelpText>
                            <StatArrow type='increase' />
                                23.36%
                            </StatHelpText>
                        </Stat>
                        <Button
                        leftIcon={<Image boxSize={10} src={trashIcon} alt="trash" />}
                        colorScheme="red"
                        variant='outline'
                        >
                            Rate
                        </Button>
                    </Box>
                </HStack>
            </Box>
            <Box>
                <HStack spacing="350px"  alignItems="start">
                    <Box width={300}>
                        <Heading>
                            <Text fontSize="xl" fontWeight="bold" mb="4px" color={"gray"}>
                                Genres
                            </Text>
                            {gameInfo && gameInfo.genre && (
                                <Text fontSize="xl" mb="4px" >{gameInfo.genre.join(', ')}</Text>
                            )}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading>
                            <Text fontSize="xl" fontWeight="bold" mb="4px" color={"gray"}>
                                Platforms
                            </Text>
                            <HStack marginRight={2}>
                            {gameInfo && gameInfo.platform && gameInfo.platform.map((platform) => (
                                <Icon key={platform} as={PlatformIcon[platform]} boxSize={7} />
                            ))}
                            </HStack>
                        </Heading>
                    </Box>
                </HStack>
            </Box>
            <Box>
                <HStack spacing="350px"  alignItems="start">
                    <Box width={300}>
                        <Heading>
                            <Text fontSize="xl" fontWeight="bold" mb="4px" color={"gray"}>
                                Tags
                            </Text>
                            {gameInfo && gameInfo.tag && (
                                <Text fontSize="xs" mb="4px" >{gameInfo.tag.join(', ')}</Text>
                            )}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading>
                            <Text fontSize="xl" fontWeight="bold" mb="4px" color={"gray"}>
                                Metacritic
                            </Text>
                            {gameInfo && gameInfo.metacritic && (
                                <Badge
                                colorScheme={parseInt(gameInfo.metacritic) > 75 ? "green" : parseInt(gameInfo.metacritic) > 60 ? "yellow" : "red"}
                                fontSize="30px"
                                paddingX={2}
                                borderRadius="4px"
                            >
                                {gameInfo.metacritic}
                            </Badge>
                            )}
                        </Heading>
                    </Box>
                </HStack>
            </Box>
            <Box>
                <HStack spacing="350px"  alignItems="start">
                    <Box width={300}>
                        <Heading>
                            <Text fontSize="xl" fontWeight="bold" mb="4px" color={"gray"}>
                                Stores
                            </Text>
                            {gameInfo && gameInfo.stores && gameInfo.stores.map((store) => (
                                <HStack key={store.name}>
                                    <Text fontSize="sm" fontWeight="bold" mb="4px">{store.name}: </Text>
                                    <Link fontSize="xs" fontWeight="bold" mb="4px"  href={gameInfo.webpage}>{store.domin}</Link>
                                </HStack>
                            ))}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading>
                            <Text fontSize="xl" fontWeight="bold" mb="4px" color={"gray"}>
                                WebSite
                            </Text>
                            {gameInfo && gameInfo.webpage && (
                                <Link fontSize="xl" fontWeight="bold" mb="4px" href={gameInfo.webpage}>
                                {gameInfo.webpage}
                                </Link>
                            )}
                        </Heading>
                    </Box>
                    
                </HStack>
            </Box>
            <Box width={300}>
                <Heading>
                    <Text fontSize="xl" fontWeight="bold" mb="4px" color={"gray"}>
                        Release Time
                    </Text>
                    {gameInfo && gameInfo.released && (
                        <Text fontSize="xl" fontWeight="bold" mb="4px">
                            {gameInfo.released}
                        </Text>
                    )}
                </Heading>
            </Box>
            {gameInfo && gameInfo.name && (<CommentGrid user={user} game={gameInfo.name} />)}
        </VStack>
    </Box>
    );
  };

export default GameInfoGrid