import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchGameData, Params, GameContent, Game } from "../models/GameModel";
import { GameQuery, ViewQuery } from "../components/Home";

export interface Props {
  viewQuery: ViewQuery
  gameQuery: GameQuery
}

export const useGameGridController = (props: Props) => {
    const {viewQuery, gameQuery} = props;
    const [gameContent, setGameContent] = useState<GameContent>();
    const [gameList, setGameList] = useState<Game[]>([]);
    const [totalPage, setTotalPage] = useState<number>();
    const [searchParam, setSearchParam] = useSearchParams();
    const pageNum = searchParam.get("page") ? parseInt(searchParam.get("page")) : 1;
    let genreNum = gameQuery.selectedGenre ? gameQuery.selectedGenre : searchParam.get("genres");
    let platformNum = gameQuery.selectedPlatform ? gameQuery.selectedPlatform : searchParam.get("platforms");
    let orderNum = gameQuery.selectedOrder ? gameQuery.selectedOrder : searchParam.get("ordering");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    useEffect(()=>{
        setSearchParam({
            page: pageNum.toString(),
            ...(genreNum ? { genres: genreNum } : {}),
            ...(platformNum ? { platforms: platformNum } : {}),
            ...(orderNum && orderNum != "none" ? { ordering: orderNum } : {}),
        });
    },[genreNum, platformNum, orderNum]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const params: Params = { page: pageNum };
                if(genreNum) params.genres = genreNum;
                if(platformNum) params.platforms = platformNum;
                if(orderNum && orderNum != "none") params.ordering = orderNum;
                const data = await fetchGameData(params);
                setGameContent(data);
                setLoading(false);
                setError(0);
            } catch (error) {
                setLoading(false);
                setError(1);
            }
        };
        fetchData();
    }, [pageNum, gameQuery]);

    useEffect(() => {
        if (gameContent) {
            setGameList(gameContent.GameList);
            setTotalPage(gameContent.TotalPage);
            if(totalPage == 0) setError(1);
            else setError(0);
        }
    }, [gameContent]);

    return { gameList, isLoading, error, setSearchParam, pageNum, totalPage, genreNum, platformNum, viewQuery};
};