import { Box, Flex, HStack, Stack,Text, Heading, Avatar, AvatarBadge, Textarea, Button, Modal, ModalContent, ModalOverlay, ModalBody, Alert, AlertIcon, AlertTitle, AlertDescription, ModalFooter, useDisclosure} from '@chakra-ui/react';
import { UserInfo } from './Home';
import { useState } from 'react';
import axios from 'axios';

interface Props{
    user: UserInfo | null
    game: String | null
}
export const CommentGrid = ({user, game}:Props) => {
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState<string | null>();
    const [status, setStatus] = useState<string | null>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    const postComment = () => {
        if(!user){
            setStatus("Fail");
            setMessage("Please Login to post comment");
            onOpen();
            return;
        }
        if(comment == ""){
            setStatus("Fail");
            setMessage("Please enter comment");
            onOpen();
            return;
        }
        const data = {
          game: game, 
          userName: user.name,
          userImage: user.profileImage,
          time: new Date().toISOString(),
          content: comment,
        };
    
        axios
          .post('http://localhost:8080/community/postComment', data)
          .then((response) => {
            console.log(response);
            if(response.status == 201){
                setStatus("Success")
                setMessage("Post a new comment")
                setComment('')
                onOpen();
            }
            else{
                setStatus("Fail")
                setMessage("Fail to Post a new comment")
                onOpen();
            }
          })
          .catch((error) => {
            console.log(error);
            setStatus("Fail")
            setMessage("Fail to Post a new comment")
            onOpen();
          });
      };
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Alert
                    status={status === 'Success' ? 'success' : 'error'}
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height="100%"
                    >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        {status}
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        {message}
                    </AlertDescription>
                    </Alert>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <Box
              p={8}
              borderWidth={1}
              borderRadius="lg"
              shadow="lg"
              width={{ base: "100%", sm: "100%", md: "70%" }}
            >
              <Stack spacing={4} justify="center">
                <Heading>
                  <Text fontSize="3xl" fontWeight="bold" mb="4px" color="teal">Comment</Text>
                </Heading>
                {user? (
                    <Flex justify="space-between" alignItems="center">
                        <HStack>
                            <Avatar name={user.name} src={user.profileImage} size='sm'>
                                <AvatarBadge boxSize='1.25em' bg='green.500' />
                            </Avatar>
                            <Text fontSize="lg" fontWeight="bold" mb="4px" as="samp">
                                {user.name}
                            </Text>
                        </HStack>
                        <Button color="teal" onClick={postComment}>Post Comment</Button>
                    </Flex>
                ):
                (
                    <Flex justify="space-between" alignItems="center">
                        <Stack direction='row'>
                            <Avatar size='sm' />
                        </Stack>
                        <Button color="teal" onClick={postComment}>Post Comment</Button>
                    </Flex> 
                )}
                <Textarea
                    placeholder='Write A Comment'
                    size='lg'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
              </Stack>
            </Box>
        </>
      );
}
