import GameGrid from "./GameGrid";
import { Grid, GridItem} from "@chakra-ui/react";
import { NavigationBar } from "./NavigationBar";
import SidePanel from "./SidePanel";
import { useState } from "react";
import { Genre } from "./GenreList";
import { Platform } from "./PlatformList";
function Home(){
  {/*Selected Genre*/}
  const[selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const[selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
    return(
        <div>
          <Grid templateAreas={`'nav nav' 'panel main'`} templateColumns={"230px 1fr"}>
            <GridItem area={'nav'} > <NavigationBar/></GridItem>
            <GridItem area={'panel'} paddingX={5}> <SidePanel onSelectedGenre={setSelectedGenre} onSelectedPlatform={setSelectedPlatform}/></GridItem>
            <GridItem area={'main'} ><GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform}/></GridItem>
          </Grid>
        </div>
    );
}

export default Home;
