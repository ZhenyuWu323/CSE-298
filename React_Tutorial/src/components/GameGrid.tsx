import { useEffect, useState } from 'react';
import axios from 'axios';

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
          <h1>Main Page</h1>
          <ul>
            {gameList.map((game:Game) => (
              <li key={game.ID}>{game.Name}</li>
            ))}
          </ul>
          {pageNum > 1 && <button onClick={() => setPage(pageNum - 1)}>Previous</button>}
          <span>Page {pageNum}</span>
          <button onClick={() => setPage(pageNum+1)}>Next</button>
        </div>
      );

}

export default GameGrid;