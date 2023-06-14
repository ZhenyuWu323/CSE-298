import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Heading, Image, Box, Grid } from "@chakra-ui/react";

interface Game {
  ID: number;
  Name: string;
  Image: string;
}

const ResizeImage =(url:string)=>{
  const index = url.indexOf('media/') + 'media/'.length;
  return url.slice(0,index)+ 'crop/600/400/' + url.slice(index);
}

function GameGrid() {
  //Set up gamelist
  const [gameList, setGameList] = useState<Game[]>([]);
  const [pageNum, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);


  //Set up Fetch
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

  return (
    <Box mx="auto" maxW="auto" p={4}>
      {isLoading ? (
        <div>Loading...</div>
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
      {pageNum > 1 && (
        <button onClick={() => setPage(pageNum - 1)}>Previous</button>
      )}
      <span>Page {pageNum}</span>
      <button onClick={() => setPage(pageNum + 1)}>Next</button>
    </Box>
  );
}

export default GameGrid
