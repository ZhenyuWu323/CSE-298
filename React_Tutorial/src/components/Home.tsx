import GameGrid from "./GameGrid";
import { Grid, GridItem} from "@chakra-ui/react";
import { NavigationBar } from "./NavigationBar";
import SidePanel from "./SidePanel";
import { useState } from "react";
import { Genre } from "./GenreList";
import { Platform } from "./PlatformList";

interface GenreMap{
  [key:string] : string;
}
interface PlatformMap{
  [key:string] : string;
}
function Home(){
  {/*Selected Genre*/}
  const[selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  {/*Selected Platform*/}
  const[selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  {/*Genre Mapping*/}
  const [genreMap, setGenreMap] = useState<GenreMap>({});
  const updateGenreMap = (from: string, to: string) => {
    setGenreMap((prevGenreMap) => ({
      ...prevGenreMap,
      [from]: to,
    }));
  };
  {/*Platform Mapping*/}
  const [platformMap, setPlatformMap] = useState<PlatformMap>({});
  const updatePlatformMap = (from: string, to: string) => {
    setPlatformMap((prevPlatformMap) => ({
      ...prevPlatformMap,
      [from]: to,
    }));
  };
    return(
        <div>
          <Grid templateAreas={`'nav nav' 'panel main'`} templateColumns={"230px 1fr"}>
            <GridItem area={'nav'} > <NavigationBar/></GridItem>
            <GridItem area={'panel'} paddingX={5}> <SidePanel onSelectedGenre={setSelectedGenre} onSelectedPlatform={setSelectedPlatform} updateGenreMap={updateGenreMap} updatePlatformMap={updatePlatformMap}/></GridItem>
            <GridItem area={'main'} ><GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} genreMap={genreMap} platformMap={platformMap}/></GridItem>
          </Grid>
        </div>
    );
}

export default Home;
