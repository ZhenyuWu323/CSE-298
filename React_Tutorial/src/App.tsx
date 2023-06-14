

import GameGrid from "./components/GameGrid";
import { Grid, GridItem } from "@chakra-ui/react";
import { NavigationBar } from "./components/NavigationBar";


function App() {
  return (
    <div>
      <Grid templateAreas={`'nav nav' 'aside main'`}>
        <GridItem area={'nav'} > <NavigationBar/></GridItem>
        <GridItem area={'aside'}> Aside</GridItem>
        <GridItem area={'main'} > <GameGrid/></GridItem>
      </Grid>
    </div>
  );
}

export default App;
