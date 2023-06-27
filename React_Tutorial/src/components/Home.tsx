import GameGrid from "./GameGrid";
import { Grid, GridItem} from "@chakra-ui/react";
import { NavigationBar } from "./NavigationBar";
import GenreList from "./GenreList";

function Home(){
    return(
        <div>
          <Grid templateAreas={`'nav nav' 'panel main'`}>
            <GridItem area={'nav'} > <NavigationBar/></GridItem>
            <GridItem area={'panel'}> <GenreList/></GridItem>
            <GridItem area={'main'} ><GameGrid/></GridItem>
          </Grid>
        </div>
    );
}

export default Home;
