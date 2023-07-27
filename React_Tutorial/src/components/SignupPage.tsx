import { Flex, Box, Input, Stack, Button, Image, HStack, Text} from "@chakra-ui/react";
import IconImage from "../assets/Icon.png";

const SignupPage = () => {
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
            <Text fontSize="3xl" fontWeight="bold" mb="4px" color="teal">GameExplorer: Sign up</Text>
          </HStack>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button colorScheme="teal" size="lg" fontSize="md">
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignupPage;