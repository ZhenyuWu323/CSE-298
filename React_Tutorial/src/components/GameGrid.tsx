import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Heading, Image, Box, Grid, Skeleton, Flex,  Button , Text, HStack, Icon, Badge, GridItem, SkeletonText} from "@chakra-ui/react";
import { TbArrowBigRight, TbArrowBigLeft } from "react-icons/tb";
import{FaLinux, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid} from "react-icons/fa"
import {BsNintendoSwitch} from 'react-icons/bs'
import {MdDesktopMac} from 'react-icons/md'
import {SiAtari, SiCommodore, SiD3Dotjs, SiSega,SiApplearcade} from 'react-icons/si'
import { useSearchParams } from "react-router-dom";
import { IconType } from "react-icons";
import { Genre } from "./GenreList";
import { Platform } from "./PlatformList";

interface Game {
  id: string;
  name: string;
  image: string;
  genre: string[];
  platform: string[];
  metacritic: string;
  released: string;
}

interface GameContent{
  TotalPage: number;
  GameList: Game[];
}

{/*Request Parameter*/}
interface Params {
  page: number;
  genres?: string;
  platforms?: string;
}

{/*Properties*/}
interface Props{
  selectedGenre: string | null
  selectedPlatform: string | null
  genreMap: { [key: string]: string }
  platformMap: { [key: string]: string }
}

const ResizeImage = (url: string) => {
  const index = url.indexOf("media/") + "media/".length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};


function GameGrid({selectedGenre, selectedPlatform, genreMap, platformMap}:Props) {
  {/* Game Platform Icon */}
  const PlatformIcon : {[key:string] : IconType} = {
    PC:FaWindows,
    PlayStation: FaPlaystation,
    Xbox: FaXbox,
    iOS: FaApple,
    Android: FaAndroid,
    Nintendo: BsNintendoSwitch,
    Linux: FaLinux,
    "Apple Macintosh": MdDesktopMac,
    "Commodore / Amiga": SiCommodore,
    SEGA: SiSega,
    Atari: SiAtari,
    "3DO":SiD3Dotjs,
    "Neo Geo": SiApplearcade,
    Web: MdDesktopMac,
    default: MdDesktopMac
  }
  {/*Genre */}
  const[genre, setGenre] = useState<Genre>()

  {/*Platform */}
  const[platform, setPlatform] = useState<Platform>()


  {/* Game List*/}
  const [gameContent, setGameContent] = useState<GameContent>()
  const [gameList, setGameList] = useState<Game[]>([]);
  const [totalPage, setTotalPage] = useState<number>()

  {/* Search Parameter */}
  const[searchParam, setSearchParam] = useSearchParams()
  const pageNum = searchParam.get("page") ? parseInt(searchParam.get("page")) : 1;
  let genreNum = null;
  if(selectedGenre){
    genreNum = selectedGenre;
  }
  else{
    genreNum = searchParam.get("genres")
  }
  let platformNum = null;
  if(selectedPlatform){
    platformNum = selectedPlatform
  }
  else{
    platformNum = searchParam.get("platforms")
  }

  {/* Loading State */}
  const [isLoading, setLoading] = useState(false);

  {/*Error handler */}
  const [error, setError] = useState(0);

  {/*Hook: Update Route */}
  useEffect(()=>{
    setSearchParam({
      page: pageNum.toString(),
      ...(genreNum ? { genres: genreNum } : {}),
      ...(platformNum ? { platforms: platformNum } : {}),
    });
  },[genreNum, platformNum])

  {/*Hook: Http request Based on Route */}
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params:Params = { page: pageNum };
        {/*Adding genre */}
        if(genreNum){
          const newGenre: Genre = {
            id: genreNum,
            name: genreMap[genreNum],
            image: "none",
          };
          setGenre(newGenre);
          params.genres = genreNum;
        }

        {/*Adding platform */}
        if(platformNum){
          const newPlatform: Platform = {
            id: platformNum,
            name: platformMap[platformNum],
          };
          setPlatform(newPlatform);
          params.platforms = platformNum;
        }
        const response = await axios.get("https://cse-298.up.railway.app/api/games", {
          params: params,
        });
        console.log(response.request);
        setGameContent(response.data);
        setLoading(false);
        setError(0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(1);
      }
    };
    fetchData();
  }, [pageNum, selectedGenre, selectedPlatform]);


  {/*Hook: Fetch Games:TotoalPage & GameList*/}
  useEffect(() => {
    if (gameContent) {
      setGameList(gameContent.GameList);
      setTotalPage(gameContent.TotalPage);
      if(totalPage == 0){
        setError(1);
      }
      else{
        setError(0);
      }
    }
  }, [gameContent]);






  if (error == 1) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl">Error occured when fetching data</Text>
      </Box>
    );
  }
  else{
    return (
      <Box mx="auto" maxW="auto" p={4}>
        <>
          {/* Selected Genre & Platform */}
          <Flex align="center" gap="20px">
              {!isLoading &&genre && genreMap && (
                <Text fontSize="5xl" fontWeight="bold" mb="4px" as="u">
                  {genreMap[genre.id]}
                </Text>
              )}
              {!isLoading && platform && platformMap && (
                <Icon as={PlatformIcon[platformMap[platform.id]]} boxSize={10} />
              )}
            </Flex>
          {/* Game Cards */}
          {isLoading ? (
            <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense" key="GridSkeleton">
              {Array.from({ length: 20 }).map((_, index) => (
                <Card key={index} borderRadius={10} overflow="hidden" height="340px" width="345px">
                  <Skeleton height="200px" />
                  <CardBody>
                    <SkeletonText />
                  </CardBody>
                </Card>
              ))}
            </Grid>
          ) : (
            <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense" key="GameGrid">
              {gameList.map((game: Game) => (
                <Card key={game.id} borderRadius={10} overflow="hidden">
                  <Image src={ResizeImage(game.image)} />
                  <CardBody>
                    <Heading fontSize="2xl">{game.name}</Heading>
                    <HStack>
                      {game.platform.map((platform) => (
                        <Icon key={platform} as={PlatformIcon[platform]} />
                      ))}
                      <Badge
                        colorScheme={parseInt(game.metacritic) > 75 ? "green" : parseInt(game.metacritic) > 60 ? "yellow" : "red"}
                        fontSize="14px"
                        paddingX={2}
                        borderRadius="4px"
                      >
                        {game.metacritic}
                      </Badge>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text fontSize="xs" as="b" color="gray.400">
                        {game.genre.join(", ")}
                      </Text>
                      <Text fontSize="xs" as="b" color="gray.400">
                        {game.released}
                      </Text>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          )}
    
          {/* Page Bar */}
          <Skeleton isLoaded={!isLoading} key="PageBar">
            <Flex justify="center" alignItems="center" mt={4}>
              {pageNum > 1 && (
                <Button
                  leftIcon={<TbArrowBigLeft />}
                  colorScheme="gray"
                  variant="solid"
                  onClick={() => setSearchParam({
                    page: (pageNum-1).toString(),
                    ...(genreNum ? { genres:genreNum } : {}),
                    ...(platformNum ? { platforms: platformNum } : {})
              
                  })}
                >
                  Back
                </Button>
              )}
              <Box mx={6}>Page {pageNum + " / " + totalPage}</Box>
              {pageNum < totalPage && (
                <Button
                  rightIcon={<TbArrowBigRight />}
                  colorScheme="gray"
                  variant="solid"
                  onClick={() =>setSearchParam({
                    page: (pageNum+1).toString(),
                    ...(genreNum ? { genres: genreNum } : {}),
                    ...(platformNum ? { platforms: platformNum } : {})
              
                  })}
                >
                  Next
                </Button>
              )}
            </Flex>
          </Skeleton>
        </>
      </Box>
    );
  }
}

export default GameGrid;