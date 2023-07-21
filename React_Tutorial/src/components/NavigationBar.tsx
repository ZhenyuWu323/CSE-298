import { Box, HStack, Image, Spacer} from "@chakra-ui/react"
import IconImage from "../assets/Icon.png";
import SearchBar from "./SearchBar";
import { GameQuery } from "./Home";
import { Link } from "react-router-dom";

{/*Selected Props for platform & genre */}
interface Props{
  setGameQuery: (query: GameQuery) => void;
}

const NavigationBar = ({ setGameQuery }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="10px" w="100%" bg="rgba(0, 0, 0, 0.5)">
      <HStack align="center">
        <Image src={IconImage} boxSize="70px" />
        <SearchBar setGameQuery={setGameQuery} />
      </HStack>
      <Spacer />
      <Box>
        <Link to="/login">Login</Link>
      </Box>
    </HStack>
  );
};

export default NavigationBar;
