import { HStack, List, ListItem, Image, Text, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GameQuery } from "./Home";

export interface Genre {
  id: string;
  name: string;
  image: string;
}

{/*Genre Props*/}
interface Props {
  setLoading: (isLoading: boolean) => void;
  updateGenreMap:(from: string, to: string) => void;
  setGameQuery: (query: GameQuery) => void
  gameQuery: GameQuery

}



const ResizeImage = (url: string) => {
  const index = url.indexOf("media/") + "media/".length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

const GenreList = ({gameQuery, setGameQuery, setLoading, updateGenreMap}: Props) => {
  {
    /* Genre List */
  }
  const [genreList, setGenreList] = useState<Genre[]>([]);
  {
    /* Loading State */
  }
  //const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/genres",
          {}
        );
        setGenreList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    genreList.forEach((genre) => {
      updateGenreMap(genre.id, genre.name);
    });
  }, [genreList]);

  return (
    <List>
      {!genreList.length && <Spinner />}
      {!!genreList.length && (
        <>
          <ListItem paddingY="1px" key="GenreTitle">
            <Text fontSize="3xl" fontWeight="bold" mb="4px" as="u">
              Genres
            </Text>
          </ListItem>
          {genreList.map((genre: Genre) => (
            <ListItem key={genre.id} paddingY="5px">
              <HStack spacing={4}>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  src={ResizeImage(genre.image)}
                ></Image>
                <Button onClick={() =>setGameQuery({...gameQuery, selectedGenre: genre.id})} variant='link' ><Text fontSize="large">{genre.name}</Text></Button>
              </HStack>
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};

export default GenreList;
