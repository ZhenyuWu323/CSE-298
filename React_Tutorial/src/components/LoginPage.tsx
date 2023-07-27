

import { Flex, Box, Input, Stack, Button, Image, HStack, Text,Link} from "@chakra-ui/react";
import IconImage from "../assets/Icon.png";
import axios from "axios";
import { useState } from "react";
interface UserInfo{
  name: string,
  profileImage : string,
}
const LoginPage = () => {

  const[user, setUser] = useState<UserInfo>();

  const googleLogin = async () => {
    try {
        const response = await axios.get('https://cse-298.up.railway.app/login/google');
        return response.data as UserInfo;  // handle the response here
    } catch (error) {
        console.log(error);  // handle the error here
    }
}
  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
    >
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        shadow="lg"
        width={{ base: "90%", sm: "70%", md: "40%" }}
      >
        <Stack spacing={4} justify="center">
          <HStack>
            <Image src={IconImage} boxSize="70px" />
            <Text fontSize="3xl" fontWeight="bold" mb="4px" color="teal">GameExplorer: Login</Text>
          </HStack>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Text>
            Don't have an account?{' '}
            <Link color='teal.500' href='signup'>
              Sign up with us
            </Link>
          </Text>
          <Button colorScheme="teal" size="lg" fontSize="md">
            Log In
          </Button>

          <Button onClick={googleLogin}>
            Login with Google
          </Button>
          
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;