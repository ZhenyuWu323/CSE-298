import {
    Box,
    Flex,
    Text,
    Avatar,
    VStack,
    Button,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { Comments } from './CommentGrid';
import { TbArrowBigLeft, TbArrowBigRight } from 'react-icons/tb';

interface Props{
    comments: Comments[]
    isLoading: boolean
}


  
export const CommentList = ({ comments, isLoading }: Props) => {
    const[page, setPage] = useState(0);
    const currentPageComments = comments.slice(page * 10, (page + 1) * 10);
    const totalPage = comments.length>10 ? comments.length/10 : 1
    // Make sure the list always has 10 elements
    const paddedComments = [...currentPageComments];
    while (paddedComments.length < 10) {
        paddedComments.push(null);
    }

    return (
        
        <VStack spacing={4} align="stretch">
            {paddedComments.map((comment, i) => (
                <Box key={comment ? comment.id : i} p={5} shadow="md" borderWidth="1px">
                {comment ? (
                    <>
                    <Flex>
                        <Avatar src={comment.userImage} size='sm'/>
                        <Text ml={4}>{comment.userName}</Text>
                    </Flex>
                    <Text mt={2} align="left">
                        {comment.content}
                    </Text>
                    </>
                ) : (
                    // Placeholder for empty comments
                    <Text color="gray.500">No comment</Text>
                )}
                </Box>
            ))}
            <Flex justify="center" alignItems="center" mt={4}>
                <Button
                    leftIcon={<TbArrowBigLeft />}
                    colorScheme="gray"
                    variant="solid"
                    onClick={() =>{
                        if(page != 0){
                            setPage(page-1)
                        }
                    }}
                  >
                    Back
                </Button>
                <Box mx={6}>Page {page+1 + " / " + totalPage}</Box>
                <Button
                    leftIcon={<TbArrowBigRight />}
                    colorScheme="gray"
                    variant="solid"
                    onClick={() =>{
                        if(page < totalPage){
                            setPage(page+1)
                        }
                    }}
                  >
                    Next
                </Button>
              </Flex>
        </VStack>
    );
};