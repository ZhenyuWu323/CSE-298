import { Avatar, AvatarBadge,  Button,  HStack, Image, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack,Text, Link} from "@chakra-ui/react"
import { ExternalLinkIcon} from '@chakra-ui/icons'
import IconImage from "../assets/Icon.png";
import { UserInfo } from "./Home";

{/*Selected Props for platform & genre */}
interface Props{
  user: UserInfo | null;
}

const GameInfoNavBar = ({ user}: Props) => {
  return (
    <HStack justifyContent="space-between" padding="10px" w="100%" bg="rgba(0, 0, 0, 0.5)">
      <HStack align="center">
        <Image src={IconImage} boxSize="70px" />
      </HStack>
      <Spacer />
      {user ? (
        <Stack direction='row'>
          <Menu>
            <Avatar name={user.name} src={user.profileImage} size='sm' as={MenuButton}>
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <MenuList>
              <MenuItem icon={<ExternalLinkIcon />} as={Link} href="/oauthLogout">
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
            Login
          </Button>
        </Stack>
      )}
    </HStack>
  );
};

export default GameInfoNavBar;
