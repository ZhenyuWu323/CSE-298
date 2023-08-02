import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchGameData, Params, GameContent, Game } from "../models/GameGridModel";
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
    const { searchText } = useParams();
    const decodedSearchText = decodeURIComponent(searchText).replace(/ /g, '+');
    const pageNum = searchParam.get("page") ? parseInt(searchParam.get("page")) : 1;
    let genreNum = searchParam.get("genres");
    let platformNum = searchParam.get("platforms");
    let orderNum = searchParam.get("ordering");
    let search = decodedSearchText;
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    useEffect(()=>{
        if(gameQuery == {} as GameQuery){
            setSearchParam({
                ...(pageNum != 1 ? { page: pageNum.toString() } : {}),
                ...(genreNum ? { genres: genreNum } : {}),
                ...(platformNum ? { platforms: platformNum } : {}),
                ...(orderNum && orderNum != "none" ? { ordering: orderNum } : {}),
            });
        }
    },[genreNum, platformNum, orderNum]);

    useEffect(()=>{
        setError(0);
    },[]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const params: Params = { page: pageNum };
                if(genreNum) params.genres = genreNum;
                if(platformNum) params.platforms = platformNum;
                if(orderNum && orderNum != "none") params.ordering = orderNum;
                if(searchText) params.search = search;
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
    }, [ searchParam, searchText]);

    useEffect(() => {
        if (gameContent) {
            setGameList(gameContent.GameList);
            setTotalPage(gameContent.TotalPage);
            if(totalPage == 0) setError(1);
            else setError(0);
        }
    }, [gameContent]);

    return { gameList, isLoading, error, setSearchParam, pageNum, totalPage, genreNum, platformNum, viewQuery, orderNum};
};