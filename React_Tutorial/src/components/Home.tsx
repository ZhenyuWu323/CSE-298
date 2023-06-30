import GameGrid from "./GameGrid";
import { Grid, GridItem} from "@chakra-ui/react";
import { NavigationBar } from "./NavigationBar";
import SidePanel from "./SidePanel";
import { useState } from "react";
import { Genre } from "./GenreList";
function Home(){
  {/*Selected Genre*/}
  const[selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
    return(
        <div>
          <Grid templateAreas={`'nav nav' 'panel main'`} templateColumns={"230px 1fr"}>
            <GridItem area={'nav'} > <NavigationBar/></GridItem>
            <GridItem area={'panel'} paddingX={5}> <SidePanel onSelectedGenre={setSelectedGenre}/></GridItem>
            <GridItem area={'main'} ><GameGrid selectedGenre={selectedGenre}/></GridItem>
          </Grid>
        </div>
    );
}

export default Home;
