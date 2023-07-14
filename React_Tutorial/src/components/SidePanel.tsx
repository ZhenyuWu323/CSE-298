import { Skeleton, VStack } from "@chakra-ui/react";
import GenreList from "./GenreList";
import PlatformList from "./PlatformList";
import { useEffect, useState } from "react";
import { GameQuery } from "./Home";

{/*Selected Props for platform & genre */}
interface Props{
  updateGenreMap : (from: string, to: string) => void;
  updatePlatformMap : (from: string, to: string) => void;
  setGameQuery: (query: GameQuery) => void
  gameQuery: GameQuery
}

const SidePanel = ({gameQuery, setGameQuery, updateGenreMap, updatePlatformMap}:Props) => {
  {/* Genre List & Platform List Loading state */}
  const [isGenreListLoading, setGenreListLoading] = useState(true);
  const [isPlatformListLoading, setPlatformListLoading] = useState(true);
  const [isDataLoading, setDataLoading] = useState(true);


  useEffect(() => {
    if (!isGenreListLoading && !isPlatformListLoading) {
      // Both GenreList and PlatformList finished loading
      setDataLoading(false);
    }
  }, [isGenreListLoading, isPlatformListLoading]);

  return (
    <>
      <Skeleton
        isLoaded={!isDataLoading}
        style={{ height: "100%", width: "100%" }}
      >
        <VStack spacing={20} style={{ height: "100%", width: "100%" }} borderRadius={10}>
          <GenreList gameQuery={gameQuery} setGameQuery={setGameQuery} setLoading={setGenreListLoading} updateGenreMap={updateGenreMap} />
          <PlatformList gameQuery={gameQuery} setGameQuery={setGameQuery} setLoading={setPlatformListLoading} updatePlatformMap={updatePlatformMap}/>
        </VStack>
      </Skeleton>
    </>
  );
};

export default SidePanel;
