import { useGamePageController } from "../controllers/GamePageController";
import {  Grid, GridItem, Text ,Box,CircularProgress} from "@chakra-ui/react";
import GameInfoNavBar from "./GameInfoNavBar";
import GameInfoPanel from "./GameInfoPanel";
import GameInfoGrid from "./GameInfoGrid";


const GameInfo = () => {
   const {gameInfo, isLoading, error, user} = useGamePageController();
   if (error == 1) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl">Error occured when fetching data</Text>
      </Box>
    );
  }
  else{
    return(
        <div>
            <Grid templateAreas={`'nav nav' 'panel main'`} templateColumns={"230px 1fr"}>
                <GridItem area={'nav'} > <GameInfoNavBar user={user}/></GridItem>
                <GridItem area={'panel'} paddingX={30}> <GameInfoPanel/></GridItem>
                <GridItem area={'main'} >
                    {isLoading && !gameInfo ? (
                    <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress isIndeterminate color="grey" size='120px' />
                    </Box>) : (
                    <GameInfoGrid gameInfo={gameInfo}/>
                        )}
                </GridItem>
            </Grid>
        </div>
    );
  }
}

export default GameInfo