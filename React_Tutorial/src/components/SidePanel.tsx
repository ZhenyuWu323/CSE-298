import { Skeleton, VStack } from "@chakra-ui/react";
import GenreList, { Genre } from "./GenreList";
import PlatformList from "./PlatformList";
import { useEffect, useState } from "react";

{/*Selected Props for platform & genre */}
interface Props{
  onSelectedGenre: (genre: Genre) => void;
}

const SidePanel = ({onSelectedGenre}:Props) => {
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
          <GenreList setLoading={setGenreListLoading} onSelectedGenre={onSelectedGenre} />
          <PlatformList setLoading={setPlatformListLoading} />
        </VStack>
      </Skeleton>
    </>
  );
};

export default SidePanel;
