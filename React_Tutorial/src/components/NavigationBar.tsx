import { Avatar, AvatarBadge,  HStack, Image, Spacer, Stack,Text} from "@chakra-ui/react"
import IconImage from "../assets/Icon.png";
import SearchBar from "./SearchBar";
import { GameQuery, UserInfo } from "./Home";
import { Link } from "react-router-dom";

{/*Selected Props for platform & genre */}
interface Props{
  setGameQuery: (query: GameQuery) => void;
  user: UserInfo | null;
}

const NavigationBar = ({ setGameQuery, user}: Props) => {
  return (
    <HStack justifyContent="space-between" padding="10px" w="100%" bg="rgba(0, 0, 0, 0.5)">
      <HStack align="center">
        <Image src={IconImage} boxSize="70px" />
        <SearchBar setGameQuery={setGameQuery} />
      </HStack>
      <Spacer />
      {user ? (
        <Stack direction='row'>
          <Avatar name={user.name} src={user.profileImage} size='sm'>
            <AvatarBadge boxSize='1.25em' bg='green.500' />
          </Avatar>
          <Text fontSize="lg" fontWeight="bold" mb="4px" as="samp">
            {user.name}
          </Text>
        </Stack>
      ) : (
        <Stack direction='row'>
          <Avatar size='sm' />
          <Link color='teal.500' to='userCenter'>
              Login
          </Link>
        </Stack>
      )}
    </HStack>
  );
};

export default NavigationBar;
