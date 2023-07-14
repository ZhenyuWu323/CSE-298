import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchGameData, Params, GameContent, Game } from "../models/GameModel";

export interface Props {
  selectedGenre: string | null
  selectedPlatform: string | null
  selectedOrder: string
}

export const useGameGridController = (props: Props) => {
    const { selectedOrder, selectedGenre, selectedPlatform } = props;
    const [gameContent, setGameContent] = useState<GameContent>();
    const [gameList, setGameList] = useState<Game[]>([]);
    const [totalPage, setTotalPage] = useState<number>();
    const [searchParam, setSearchParam] = useSearchParams();
    const pageNum = searchParam.get("page") ? parseInt(searchParam.get("page")) : 1;
    let genreNum = selectedGenre ? selectedGenre : searchParam.get("genres");
    let platformNum = selectedPlatform ? selectedPlatform : searchParam.get("platforms");
    let orderNum = selectedOrder ? selectedOrder : searchParam.get("ordering");
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
    }, [pageNum, selectedGenre, selectedPlatform, selectedOrder]);

    useEffect(() => {
        if (gameContent) {
            setGameList(gameContent.GameList);
            setTotalPage(gameContent.TotalPage);
            if(totalPage == 0) setError(1);
            else setError(0);
        }
    }, [gameContent]);

    return { gameList, isLoading, error, setSearchParam, pageNum, totalPage, genreNum, platformNum };
};