import { Card, CardBody, Heading, Image, Box, Grid, Skeleton, Flex, Button, Text, HStack, Badge, Icon, SkeletonText } from "@chakra-ui/react";
import { TbArrowBigRight, TbArrowBigLeft } from "react-icons/tb";
import noImage from "../assets/no-image.png";
import { Props, useGameGridController } from '../controllers/GameController';
import { PlatformIcon } from "./PlatformList";
import { Game } from "../models/GameModel";

const ResizeImage = (url: string) => {
    if(url == "") return noImage;
    const index = url.indexOf("media/") + "media/".length;
    return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

function GameGrid(props: Props) {
    const { gameList, isLoading, error, setSearchParam, pageNum, totalPage, genreNum, platformNum, viewQuery, orderNum} = useGameGridController(props);

    if (error == 1) {
      return (
        <Box height="100%" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="2xl">Error occured when fetching data</Text>
        </Box>
      );
    }
    else{
      return (
        <Box mx="auto" maxW="auto" p={4}>
          <>
            {/* Game Cards */}
            {isLoading ? (
              <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense" key="GridSkeleton">
                {Array.from({ length: 20 }).map((_, index) => (
                  <Card key={index} borderRadius={10} overflow="hidden" height="340px" width="340px">
                    <Skeleton height="200px" />
                    <CardBody>
                      <SkeletonText />
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            ) : (
              <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense" key="GameGrid">
                {gameList.map((game: Game) => (
                  <Card key={game.id} borderRadius={10} overflow="hidden">
                    <Image src={ResizeImage(game.image)} />
                    <CardBody>
                      <Heading fontSize="2xl">{game.name}</Heading>
                      <HStack>
                        {game.platform.map((platform) => (
                          <Icon key={platform} as={PlatformIcon[platform]} />
                        ))}
                        {viewQuery.onMetacritic && (<Badge
                          colorScheme={parseInt(game.metacritic) > 75 ? "green" : parseInt(game.metacritic) > 60 ? "yellow" : "red"}
                          fontSize="14px"
                          paddingX={2}
                          borderRadius="4px"
                        >
                          {game.metacritic}
                        </Badge>)}
                      </HStack>
                      <HStack justifyContent="space-between">
                        {viewQuery.onGenre && (<Text fontSize="xs" as="b" color="gray.400">
                          {game.genre.join(", ")}
                        </Text>)}
                        {viewQuery.onRelease && (<Text fontSize="xs" as="b" color="gray.400">
                          {game.released}
                        </Text>)}
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            )}
      
            {/* Page Bar */}
            <Skeleton isLoaded={!isLoading} key="PageBar">
              <Flex justify="center" alignItems="center" mt={4}>
                {pageNum > 1 && (
                  <Button
                    leftIcon={<TbArrowBigLeft />}
                    colorScheme="gray"
                    variant="solid"
                    onClick={() => setSearchParam({
                      page: (pageNum-1).toString(),
                      ...(genreNum ? { genres:genreNum } : {}),
                      ...(platformNum ? { platforms: platformNum } : {}),
                      ...(orderNum && orderNum != "none" ? { ordering: orderNum } : {})
                
                    })}
                  >
                    Back
                  </Button>
                )}
                <Box mx={6}>Page {pageNum + " / " + totalPage}</Box>
                {pageNum < totalPage && (
                  <Button
                    rightIcon={<TbArrowBigRight />}
                    colorScheme="gray"
                    variant="solid"
                    onClick={() =>setSearchParam({
                      page: (pageNum+1).toString(),
                      ...(genreNum ? { genres: genreNum } : {}),
                      ...(platformNum ? { platforms: platformNum } : {}),
                      ...(orderNum && orderNum != "none" ? { ordering: orderNum } : {})
                
                    })}
                  >
                    Next
                  </Button>
                )}
              </Flex>
            </Skeleton>
          </>
        </Box>
      );
    }
  }
  
  export default GameGrid;

