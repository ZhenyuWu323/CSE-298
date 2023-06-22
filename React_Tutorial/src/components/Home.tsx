import GameGrid from "./GameGrid";
import { Grid, GridItem} from "@chakra-ui/react";
import { NavigationBar } from "./NavigationBar";

function Home(){
    return(
        <div>
          <Grid templateAreas={`'nav nav' 'panel main'`}>
            <GridItem area={'nav'} > <NavigationBar/></GridItem>
            <GridItem area={'panel'}> Aside</GridItem>
            <GridItem area={'main'} ><GameGrid/></GridItem>
          </Grid>
        </div>
    );
}

export default Home;
