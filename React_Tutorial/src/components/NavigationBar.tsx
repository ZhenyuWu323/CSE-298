import { HStack, Image} from "@chakra-ui/react"
import IconImage from "../assets/Icon.png";
import SearchBar from "./SearchBar";
import { GameQuery } from "./Home";

{/*Selected Props for platform & genre */}
interface Props{
  gameQuery: GameQuery;
  setGameQuery: (query: GameQuery) => void;
}

const NavigationBar = ({gameQuery, setGameQuery}:Props) => {
  return (
    <HStack justifyContent='space-between' padding='10px' w="100%" bg="rgba(0, 0, 0, 0.5)">
        <Image src={IconImage} boxSize="70px" />
        <SearchBar gameQuery={gameQuery} setGameQuery={setGameQuery}/>
    </HStack>
  )
}

export default NavigationBar;
