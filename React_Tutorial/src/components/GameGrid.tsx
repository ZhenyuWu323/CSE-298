import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Heading, Image, Box, Grid, Skeleton, Flex,  Button } from "@chakra-ui/react";
import { TbArrowBigRight, TbArrowBigLeft } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

interface Game {
  ID: number;
  Name: string;
  Image: string;
}

const ResizeImage = (url: string) => {
  const index = url.indexOf("media/") + "media/".length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

function GameGrid() {
  {/* Game List*/}
  const [gameList, setGameList] = useState<Game[]>([]);

  {/* Search Parameter */}
  const[param, setParam] = useSearchParams()
  const pageNum = param.get("page") ? parseInt(param.get("page")) : 1;

  {/* Loading State */}
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/games", {
          params: {
            page: pageNum,
          },
        });
        setGameList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNum]);

  useEffect(() => {
    sessionStorage.setItem("currentPage", pageNum.toString());
  }, [pageNum]);

  return (
    <Box mx="auto" maxW="auto" p={4}>
      <>
        {/* Game Cards */}
        {isLoading ? (
          <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} height="300px" width="400px"/>
            ))}
          </Grid>
        ) : (
          <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense">
            {gameList.map((game: Game) => (
              <Card key={game.ID} borderRadius={10} overflow="hidden">
                <Image src={ResizeImage(game.Image)} />
                <CardBody>
                  <Heading fontSize="2xl">{game.Name}</Heading>
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
                onClick={() => setParam({page: (pageNum - 1).toString()})}
              >
                Back
              </Button>
            )}
            <Box mx={6}>Page {pageNum + " / 42511"}</Box>
            {pageNum < 42512 && (
              <Button
                rightIcon={<TbArrowBigRight />}
                colorScheme="gray"
                variant="solid"
                onClick={() => setParam({page: (pageNum + 1).toString()})}
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

export default GameGrid;