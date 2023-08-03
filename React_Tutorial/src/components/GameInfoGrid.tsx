import { VStack, Text} from "@chakra-ui/react"
import { GameDetail } from "../models/GamePageModel"

interface Props{
    gameInfo: GameDetail
}

const GameInfoGrid = ({gameInfo} : Props) => {
  return (
    <VStack spacing={5} paddingLeft={5} align="start">
        <VStack align="start">
        {gameInfo && gameInfo.name && (
            <Text fontSize="6xl" fontWeight="bold" mb="4px" >
            Hi
            </Text>
        )}
        </VStack>
    </VStack>
  )
}

export default GameInfoGrid