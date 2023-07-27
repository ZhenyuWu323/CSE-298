import { Button, Skeleton, VStack , Text, HStack} from "@chakra-ui/react";
import GenreList from "./GenreList";
import PlatformList from "./PlatformList";
import { useEffect, useState } from "react";
import { GameQuery } from "./Home";
import { SetURLSearchParams, useNavigate,} from "react-router-dom";

{/*Selected Props for platform & genre */}
interface Props{
  updateGenreMap : (from: string, to: string) => void;
  updatePlatformMap : (from: string, to: string) => void;
  setGameQuery: (query: GameQuery) => void
  gameQuery: GameQuery
  setSearchParam: SetURLSearchParams
}

const SidePanel = ({gameQuery, setGameQuery, updateGenreMap, updatePlatformMap}:Props) => {
  {/* Genre List & Platform List Loading state */}
  const [isGenreListLoading, setGenreListLoading] = useState(true);
  const [isPlatformListLoading, setPlatformListLoading] = useState(true);
  const [isDataLoading, setDataLoading] = useState(true)
  const navigation = useNavigate();


  useEffect(() => {
    if (!isGenreListLoading && !isPlatformListLoading) {
      // Both GenreList and PlatformList finished loading
      setDataLoading(false);
    }
  }, [isGenreListLoading, isPlatformListLoading]);

  return (
    <>
      <Skeleton isLoaded={!isDataLoading} style={{ height: "100%", width: "100%" }}>
        <VStack style={{ height: "100%", width: "100%" }} borderRadius={10}>
          <HStack alignSelf="flex-start" marginBottom="20px">
            <Button onClick={() => { navigation('/'); setGameQuery({} as GameQuery) }} variant='link'>
              <Text fontSize="3xl" fontWeight="bold" mb="4px">Home</Text>
            </Button>
          </HStack>
          <GenreList gameQuery={gameQuery} setGameQuery={setGameQuery} setLoading={setGenreListLoading} updateGenreMap={updateGenreMap} />
          <VStack spacing={20}>
            <PlatformList gameQuery={gameQuery} setGameQuery={setGameQuery} setLoading={setPlatformListLoading} updatePlatformMap={updatePlatformMap} />
          </VStack>
        </VStack>
      </Skeleton>
    </>
  );
};

export default SidePanel;
