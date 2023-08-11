import { Avatar, AvatarBadge,  Button,  HStack, Image, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack,Text, Link} from "@chakra-ui/react"
import { ExternalLinkIcon} from '@chakra-ui/icons'
import IconImage from "../assets/Icon.png";
import SearchBar from "./SearchBar";
import { GameQuery, UserInfo } from "./Home";
import { useNavigate} from "react-router-dom";

{/*Selected Props for platform & genre */}
interface Props{
  setGameQuery: (query: GameQuery) => void;
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
}

const NavigationBar = ({ setGameQuery, user}: Props) => {
  const nav = useNavigate()
  function navigation(path) {
    const fullPath = `https://cse-298.up.railway.app/oauthLogout`;
    fetch(fullPath, {
      method: 'GET', // or 'POST'
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token // if you use token-based authentication
      },
    }).then(response => {
      nav('/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        // handle the response here.
        if(path === '/oauthLogout'){
          // After logging out, you might want to redirect the user to the login page.
          //window.location.href = '/'; // or wherever you want to redirect
          nav('/');
        }
      }
    })
    .catch((error) => {
      nav('/');
      console.error('Error:', error);
    });
  }

  return (
    <HStack justifyContent="space-between" padding="10px" w="100%" bg="rgba(0, 0, 0, 0.5)">
      <HStack align="center">
        <Image src={IconImage} boxSize="70px" />
        <SearchBar setGameQuery={setGameQuery} />
        <Button as={Link} href="/oauthLogout" colorScheme="white" variant="outline">
            Login with Google
          </Button>
      </HStack>
      <Spacer />
      {user ? (
        <Stack direction='row'>
          <Menu>
            <Avatar name={user.name} src={user.profileImage} size='sm' as={MenuButton}>
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <MenuList>
              <MenuItem icon={<ExternalLinkIcon />} onClick={() => {
                  navigation('/oauthLogout');
                }}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
          <Text fontSize="lg" fontWeight="bold" mb="4px" as="samp">
            {user.name}
          </Text>
        </Stack>
      ) : (
        <Stack direction='row'>
          <Avatar size='sm' />
          <Button as={Link} href="/userCenter" colorScheme="white" variant="outline">
            Login with Google
          </Button>
        </Stack>
      )}
    </HStack>
  );
};

export default NavigationBar;
