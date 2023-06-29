import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Heading, Image, Box, Grid, Skeleton, Flex,  Button , Text, HStack, Icon, Badge, GridItem} from "@chakra-ui/react";
import { TbArrowBigRight, TbArrowBigLeft } from "react-icons/tb";
import{FaLinux, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid} from "react-icons/fa"
import {BsNintendoSwitch} from 'react-icons/bs'
import {MdDesktopMac} from 'react-icons/md'
import {SiAtari, SiCommodore, SiD3Dotjs, SiSega,SiApplearcade} from 'react-icons/si'
import { useSearchParams } from "react-router-dom";
import { IconType } from "react-icons";

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

const ResizeImage = (url: string) => {
  const index = url.indexOf("media/") + "media/".length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

function GameGrid() {
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
  {/* Game List*/}
  const [gameContent, setGameContent] = useState<GameContent>()
  const [gameList, setGameList] = useState<Game[]>([]);
  const [totalPage, setTotalPage] = useState<number>()

  {/* Search Parameter */}
  const[param, setParam] = useSearchParams()
  const pageNum = param.get("page") ? parseInt(param.get("page")) : 1;

  {/* Loading State */}
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://cse-298.up.railway.app/api/games", {
          params: {
            page: pageNum,
          },
        });
        setGameContent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNum]);
  
  useEffect(() => {
    if (gameContent) {
      setGameList(gameContent.GameList);
      setTotalPage(gameContent.TotalPage);
    }
  }, [gameContent]);
  
  useEffect(() => {
    if (gameContent) {
      setGameList(gameContent.GameList);
      setTotalPage(gameContent.TotalPage);
    }
  }, [gameContent]);

  return (
    <Box mx="auto" maxW="auto" p={4}>
      <>
        {/* Game Cards */}
        {isLoading ? (
          <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} height="300px" width="400px"/>
            ))}
          </Grid>
        ) : (
          <Grid templateColumns="repeat(4, 1fr)" gap={6} gridAutoFlow="row dense">
            {gameList.map((game: Game) => (
              <Card key={game.id} borderRadius={10} overflow="hidden">
                <Image src={ResizeImage(game.image)} />
                <CardBody>
                  <Heading fontSize="2xl">{game.name}</Heading>
                  <HStack>
                    {game.platform.map((platform) => (<Icon as= {PlatformIcon[platform]}></Icon>))}
                    <Badge colorScheme={parseInt(game.metacritic) > 75 ? "green" : parseInt(game.metacritic) > 60 ? 'yellow': 'red'} fontSize= '14px' paddingX={2} borderRadius="4px">{game.metacritic}</Badge>
                  </HStack>
                  <HStack justifyContent={'space-between'}>
                    <Text fontSize='xs' as='b' color='gray.400'>{game.genre.join(", ")}</Text>
                    <Text fontSize='xs' as='b' color='gray.400'>{game.released}</Text>
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
                onClick={() => setParam({page: (pageNum - 1).toString()})}
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
                onClick={() => setParam({page: (pageNum + 1).toString()})}
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

export default GameGrid;