import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Heading, SimpleGrid } from '@chakra-ui/react';

interface Game{
    ID:number;
    Name:string;
}

function GameGrid(){
    //Set up gamelist
    const [gameList, setGameList] = useState<Game[]>([]);
    const [pageNum, setPage] = useState(1)

    //Set up Fetch
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/games', {
                params: {
                  page: pageNum,
                },
              });
            setGameList(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [pageNum]);

      return (
        <div>
          <SimpleGrid column={3} spacing={10}>
            {gameList.map((game:Game) => (
              <Card>
                <CardBody>
                  <Heading>{game.Name}</Heading>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
          {pageNum > 1 && <button onClick={() => setPage(pageNum - 1)}>Previous</button>}
          <span>Page {pageNum}</span>
          <button onClick={() => setPage(pageNum+1)}>Next</button>
        </div>
      );

}

export default GameGrid;