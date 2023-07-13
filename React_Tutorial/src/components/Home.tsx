import GameGrid from "./GameGrid";
import { Grid, GridItem, HStack} from "@chakra-ui/react";
import { NavigationBar } from "./NavigationBar";
import SidePanel from "./SidePanel";
import { useState } from "react";
import { Platform } from "./PlatformList";
import SortSelector from "./SortSelector";

interface GenreMap{
  [key:string] : string;
}
interface PlatformMap{
  [key:string] : string;
}
function Home(){
  {/*Selected Genre*/}
  const[selectedGenre, setSelectedGenre] = useState<string | null>(null)
  {/*Selected Platform*/}
  const[selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  {/*Selected Order */}
  const[selectedOrder, setSelectedOrder] = useState<string | null>(null)
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
            <GridItem area={'main'} >
              <HStack spacing={5} paddingLeft={5}>  
                <SortSelector onSelectedOrder={setSelectedOrder}></SortSelector>
              </HStack>
              <GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} genreMap={genreMap} platformMap={platformMap}/>
            </GridItem>
          </Grid>
        </div>
    );
}

export default Home;
