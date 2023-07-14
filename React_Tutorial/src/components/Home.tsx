import GameGrid from "./GameGrid";
import { Flex, Grid, GridItem, HStack, Text, Icon, VStack, CheckboxGroup, Stack, Checkbox} from "@chakra-ui/react";
import { NavigationBar } from "./NavigationBar";
import SidePanel from "./SidePanel";
import { useEffect, useState } from "react";
import SortSelector from "./SortSelector";
import { useSearchParams } from "react-router-dom";
import { PlatformIcon } from "./PlatformList";

interface GenreMap{
  [key:string] : string;
}
interface PlatformMap{
  [key:string] : string;
}
export interface ViewQuery{
  onGenre : boolean;
  onRelease: boolean;
  onMetacritic: boolean;
}
function Home(){
  {/*Selected Genre*/}
  const[selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const[usedGenre, setUsedGenre] = useState<string | null>(null)
  {/*Selected Platform*/}
  const[selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const[usedPlatform, setUsedPlatform] = useState<string | null>(null)
  {/*Selected Order */}
  const[selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const[usedOrder,setUsedOrder] = useState<string | null>(null)
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
  {/**Search Param */}
  const[searchParam, setSearchParam] = useSearchParams()
  {/**View Query */}
  const[viewQuery, setViewQuery] = useState<ViewQuery>({onGenre:true, onRelease:true, onMetacritic:true})

  useEffect(() => {
    setUsedOrder(searchParam.get('ordering'))
    setUsedGenre(searchParam.get('genres'))
    setUsedPlatform(searchParam.get('platforms'))
  }, [searchParam]);



    return(
        <div>
          <Grid templateAreas={`'nav nav' 'panel main'`} templateColumns={"230px 1fr"}>
            <GridItem area={'nav'} > <NavigationBar/></GridItem>
            <GridItem area={'panel'} paddingX={5}> <SidePanel onSelectedGenre={setSelectedGenre} onSelectedPlatform={setSelectedPlatform} updateGenreMap={updateGenreMap} updatePlatformMap={updatePlatformMap}/></GridItem>
            <GridItem area={'main'} >
              <VStack spacing={5} paddingLeft={5} align="start">
                <Flex align="center" gap="20px">
                  {usedGenre && genreMap && (
                    <Text fontSize="5xl" fontWeight="bold" mb="4px" as="u">
                      {genreMap[usedGenre]}
                    </Text>
                  )}
                  {usedPlatform && platformMap && (
                    <Icon as={PlatformIcon[platformMap[usedPlatform]]} boxSize={10} />
                  )}
                </Flex>  
                <SortSelector selectedOrder={usedOrder} onSelectedOrder={setSelectedOrder} />
                <CheckboxGroup colorScheme='green' defaultValue={['release','metacritic','genres']}>
                  <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox value='release' onChange={() => setViewQuery({...viewQuery, onRelease:!viewQuery.onRelease})}>Release date</Checkbox>
                    <Checkbox value='metacritic' onChange={() => setViewQuery({...viewQuery, onMetacritic:!viewQuery.onMetacritic})}>Metacritic</Checkbox>
                    <Checkbox value='genres' onChange={() => setViewQuery({...viewQuery, onGenre:!viewQuery.onGenre})}>Genre</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </VStack>
              <GameGrid selectedOrder={selectedOrder} selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} viewQuery={viewQuery}/>
            </GridItem>
          </Grid>
        </div>
    );
}

export default Home;
