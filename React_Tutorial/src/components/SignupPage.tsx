import { Flex, Box, Input, Stack, Button, Image, HStack, Text, Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react";
import IconImage from "../assets/Icon.png";
import { useRef, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

const SignupPage = () => {
  // State to hold user input
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<string | null>();
  const [status, setStatus] = useState<string | null>()

  const handleSignup = async () => {
    if(username.current && password.current){
      if((username.current.value == "" || password.current.value == "") || (!username.current.value || !password.current.value)){
        setStatus("Signup failed")
        setMessage("Please enter both username and password.");
        return;
      }
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
          setStatus("Signup successful")
          setMessage("Redirecting to login.");
          setTimeout(() => {
            window.location.href = '/userCenter'; // Replace '/login' with the desired login page URL
          }, 5000);
        } else {
          setStatus("Signup failed")
          setMessage("Please try again later.");
        }
      } catch (error) {
        setStatus("Signup failed")
        if (error.response && error.response.status === 409) {
          setMessage("Username already exists. Please choose a different username.");
        } else {
          setMessage("Please try again later.");
        }
      }
    }
    else{
      setStatus("Signup failed")
      setMessage("Please enter both username and password.");
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
    <>
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
      {status && message && (
        <Alert
          status={status == "Signup successful" ? 'success' : 'error'}
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            {status}
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            {message}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default SignupPage;