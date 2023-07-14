import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Game, GameContent, Params } from "../models/GameModels";

export function useGameController(selectedGenre: string | null, selectedPlatform: string | null, selectedOrder: string) {
  const [gameContent, setGameContent] = useState<GameContent>();
  const [gameList, setGameList] = useState<Game[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [searchParam, setSearchParam] = useSearchParams();
  const pageNum = searchParam.get("page") ? parseInt(searchParam.get("page")) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params: Params = { page: pageNum };

        if (selectedGenre) {
          params.genres = selectedGenre;
        } else {
          params.genres = searchParam.get("genres");
        }

        if (selectedPlatform) {
          params.platforms = selectedPlatform;
        } else {
          params.platforms = searchParam.get("platforms");
        }

        if (selectedOrder && selectedOrder !== "none") {
          params.ordering = selectedOrder;
        } else {
          params.ordering = searchParam.get("ordering");
        }

        const response = await axios.get("https://cse-298.up.railway.app/api/games", {
          params: params,
        });

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
  }, [pageNum, selectedGenre, selectedPlatform, selectedOrder]);

  useEffect(() => {
    if (gameContent) {
      setGameList(gameContent.GameList);
      setTotalPage(gameContent.TotalPage);
      setError(totalPage === 0 ? 1 : 0);
    }
  }, [gameContent]);

  const updateRoute = () => {
    setSearchParam({
      page: pageNum.toString(),
      ...(selectedGenre ? { genres: selectedGenre } : {}),
      ...(selectedPlatform ? { platforms: selectedPlatform } : {}),
      ...(selectedOrder && selectedOrder !== "none" ? { ordering: selectedOrder } : {}),
    });
  };

  return {
    gameList,
    totalPage,
    isLoading,
    error,
    pageNum,
    updateRoute,
  };
}