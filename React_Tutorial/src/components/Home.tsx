import GameGrid from "./GameGrid";
import { Flex, Grid, GridItem, Text, Icon, VStack, CheckboxGroup, Stack, Checkbox} from "@chakra-ui/react";
import NavigationBar from "./NavigationBar";
import SidePanel from "./SidePanel";
import { useEffect, useState } from "react";
import SortSelector from "./SortSelector";
import { useParams, useSearchParams } from "react-router-dom";
import { PlatformIcon } from "./PlatformList";
import axios from "axios";

interface GenreMap{
  [key:string] : string;
}
interface PlatformMap{
  [key:string] : string;
}
{/**Cutomization Query */}
export interface ViewQuery{
  onGenre : boolean;
  onRelease: boolean;
  onMetacritic: boolean;
}

{/**View Game Query */}
interface GameViewQuery{
  usedGenre: string | null;
  usedPlatform: string | null;
  usedOrder: string | null;
  usedSearch: string | null;
}

{/**Game Query */}
export interface GameQuery{
  selectedGenre: string | null;
  selectedPlatform: string | null;
  selectedOrder: string | null;
  selectedSearch: string | null;
}

export interface UserInfo{
  name: string,
  profileImage : string,
  session : string,
}
function Home(){
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
  const { searchText } = useParams();
  {/**View Query */}
  const[viewQuery, setViewQuery] = useState<ViewQuery>({onGenre:true, onRelease:true, onMetacritic:true})
  {/**Game View Query */}
  const[gameViewQuery, setGameViewQuery] = useState<GameViewQuery>({usedGenre: null, usedPlatform: null, usedOrder:null, usedSearch:null})
  {/**Game Query */}
  const[gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery)

  useEffect(() => {
    setGameViewQuery({
      ...gameViewQuery, 
      usedGenre: searchParam.get('genres'),
      usedPlatform: searchParam.get('platforms'),
      usedOrder: searchParam.get('ordering'),
      usedSearch: searchText
    })
  }, [searchParam,searchText]);


  const [user, setUser] = useState<UserInfo | null>(null);

  // Fetch user info when component mounts
  useEffect(() => {
      const fetchUserInfo = async () => {
          try {
              const response = await axios.get<UserInfo>('http://localhost:8080/user/google');
              
              if (response.data) {
                  setUser(response.data);
              }
          } catch (error) {
              console.error("Failed to fetch user info", error);
          }
      }

      fetchUserInfo();
  }, []);
  if(user){
    console.log(user.name);
  }



  return(
      <div>
        <Grid templateAreas={`'nav nav' 'panel main'`} templateColumns={"230px 1fr"}>
          <GridItem area={'nav'} > <NavigationBar setGameQuery={setGameQuery} user={user} setUser={setUser}/></GridItem>
          <GridItem area={'panel'} paddingX={5}> <SidePanel gameQuery={gameQuery} setGameQuery={setGameQuery} updateGenreMap={updateGenreMap} updatePlatformMap={updatePlatformMap} setSearchParam={setSearchParam}/></GridItem>
          <GridItem area={'main'} >
            <VStack spacing={5} paddingLeft={5} align="start">
              <VStack align="start">
                {gameViewQuery.usedSearch && genreMap && (
                  <Text fontSize="5xl" fontWeight="bold" mb="4px" >
                    Result of: "{gameViewQuery.usedSearch}"
                  </Text>
                )}
                <Flex align="center" gap="20px">
                    {gameViewQuery.usedGenre && genreMap && (
                      <Text fontSize="5xl" fontWeight="bold" mb="4px" as="u">
                        {genreMap[gameViewQuery.usedGenre]}
                      </Text>
                    )}
                    {gameViewQuery.usedPlatform && platformMap && (
                      <Icon as={PlatformIcon[platformMap[gameViewQuery.usedPlatform]]} boxSize={10} />
                    )}
                </Flex>
              </VStack>
              <SortSelector gameQuery={gameQuery} selectedOrder={gameViewQuery.usedOrder} setGameQuery={setGameQuery} />
              <CheckboxGroup colorScheme='green' defaultValue={['release','metacritic','genres']}>
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox value='release' onChange={() => setViewQuery({...viewQuery, onRelease:!viewQuery.onRelease})}>Release date</Checkbox>
                  <Checkbox value='metacritic' onChange={() => setViewQuery({...viewQuery, onMetacritic:!viewQuery.onMetacritic})}>Metacritic</Checkbox>
                  <Checkbox value='genres' onChange={() => setViewQuery({...viewQuery, onGenre:!viewQuery.onGenre})}>Genre</Checkbox>
                </Stack>
              </CheckboxGroup>
            </VStack>
            <GameGrid viewQuery={viewQuery} gameQuery={gameQuery}/>
          </GridItem>
        </Grid>
      </div>
  );
}

export default Home;
