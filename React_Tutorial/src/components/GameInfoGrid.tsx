import { VStack, Text, HStack, Image, Button, Box, Heading, Icon, Link, Badge, Stack} from "@chakra-ui/react"
import { GameDetail } from "../models/GamePageModel"
import { useState } from "react";
import { PlatformIcon } from "./PlatformList";

interface Props{
    gameInfo: GameDetail
}

const GameInfoGrid = ({ gameInfo }: Props) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    // Function to toggle show/hide full description
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
  
    return (
      <VStack spacing={50} paddingLeft={5} paddingTop={50} align="start">
        <HStack spacing={20}>
          <VStack spacing={10}>
            {gameInfo && gameInfo.name && (
              <Text fontSize="6xl" fontWeight="bold" mb="4px">
                {gameInfo.name}
              </Text>
            )}
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
          {gameInfo && gameInfo.image && (
            <Image
              boxSize="400px"
              src={gameInfo.image}
              paddingRight={5}
              borderRadius={10}
            />
          )}
        </HStack>
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
                            <Text>{store.name}</Text>
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
      </VStack>
    );
  };

export default GameInfoGrid