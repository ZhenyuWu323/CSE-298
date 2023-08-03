import { VStack, Text, HStack, Image, Button, Box} from "@chakra-ui/react"
import { GameDetail } from "../models/GamePageModel"
import { useState } from "react";

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
      <VStack spacing={5} paddingLeft={5} paddingTop={20} align="start">
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
      </VStack>
    );
  };

export default GameInfoGrid