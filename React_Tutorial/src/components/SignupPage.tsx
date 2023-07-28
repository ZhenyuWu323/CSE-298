import { Flex, Box, Input, Stack, Button, Image, HStack, Text} from "@chakra-ui/react";
import IconImage from "../assets/Icon.png";
import { useRef } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

const SignupPage = () => {
  // State to hold user input
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();


  const handleSignup = async () => {
    if(username.current && password.current){
      // Generate a cryptographically secure random salt
      const salt = bcrypt.genSaltSync(10)
  
      // Perform password hashing on the frontend
      const hashedPassword = await hashPassword(password.current.value, salt);
  
      // Send signup data to the backend API
      try {
        const response = await axios.post("/user/homesign", {
          name: username.current.value,
          password: hashedPassword.toString(),
          salt: salt.toString(),
        });
  
        // Handle the response from the backend
        if (response.status === 201) {
          alert("Signup successful! You can now log in.");
          // Redirect the user to the login page or any other desired action
        } else {
          alert("Signup failed. Please try again later.");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Username already exists. Please choose a different username.");
        } else {
          alert("Signup failed. Please try again later.");
        }
      }
    }
    else{
      alert("Please enter both username and password.");
      return;
    }
  };




  const hashPassword =(password, salt) => {
    try {
      console.log(password)
      console.log(salt)
      const hashedPassword = bcrypt.hashSync(password, salt) 
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password.");
    }
  };


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
          <form>
            <Input type="text" placeholder="Username" ref={username}/>
            <Input type="password" placeholder="Password" ref={password} />
            <Button colorScheme="teal" size="lg" fontSize="md" onClick={handleSignup}>
              Sign Up
            </Button>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignupPage;