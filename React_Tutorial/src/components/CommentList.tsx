import {
    Box,
    Flex,
    Text,
    Avatar,
    VStack,
    Button,
    SkeletonCircle,
    SkeletonText,
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
    const totalPage = Math.ceil(comments.length / 10);
    // Make sure the list always has 10 elements
    const paddedComments = [...currentPageComments];
    while (paddedComments.length < 10) {
        paddedComments.push(null);
    }

    return (
        
        <VStack spacing={4} align="stretch">
        {isLoading ? (
          Array(10).fill(0).map((_, i) => (
            <Box key={i} p={5} shadow="md" borderWidth="1px">
              <Flex>
                <SkeletonCircle size='30px'/>
                <SkeletonText ml={4} noOfLines={1} width='200px' />
              </Flex>
              <SkeletonText mt={2} noOfLines={4} width='100%' />
            </Box>
          ))
        ) : (
          paddedComments.map((comment, i) => (
            <Box key={comment ? comment.id : i} p={5} shadow="md" borderWidth="1px">
              {comment ? (
                <>
                  <Flex justifyContent="space-between">
                        <Flex>
                            <Avatar src={comment.userImage} size='sm'/>
                            <Text ml={4}>{comment.userName}</Text>
                        </Flex>
                        <Text>{new Date(comment.time).toLocaleDateString('en-GB')}</Text>
                    </Flex>
                  <Text mt={2} align="left">
                    {comment.content}
                  </Text>
                </>
              ) : (
                <Text color="gray.500">No comment</Text>
              )}
            </Box>
          ))
        )}
        <Flex justify="center" alignItems="center" mt={4}>
          <Button
            leftIcon={<TbArrowBigLeft />}
            colorScheme="gray"
            variant="solid"
            onClick={() => {
              if (page !== 0) {
                setPage(page - 1)
              }
            }}
          >
            Back
          </Button>
          <Box mx={6}>Page {page + 1 + " / " + totalPage}</Box>
          <Button
            rightIcon={<TbArrowBigRight />}
            colorScheme="gray"
            variant="solid"
            onClick={() => {
              if (page < totalPage - 1) {
                setPage(page + 1)
              }
            }}
          >
            Next
          </Button>
        </Flex>
      </VStack>
  
    );
};