import { VStack } from "@chakra-ui/react";
import GenreList from "./GenreList";
import PlatformList from "./PlatformList";
import { useEffect, useState } from "react";

const SidePanel = () => {
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
    <VStack spacing={20}>
        {isDataLoading && <p>Loading...</p>}
      <GenreList setLoading={setGenreListLoading} />
      <PlatformList setLoading={setPlatformListLoading} />
    </VStack>
  );
};

export default SidePanel;
