

import { Flex, Box, Input, Stack, Button } from "@chakra-ui/react";

const LoginPage = () => {
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
        <Stack spacing={4}>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button colorScheme="teal" size="lg" fontSize="md">
            Log In
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;