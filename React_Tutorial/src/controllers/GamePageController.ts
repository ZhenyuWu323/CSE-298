import { useEffect, useState } from "react";
import { GameDetail, GameInfoParams, fetchGameInfo } from "../models/GamePageModel";
import { useParams } from "react-router-dom";
import { UserInfo } from "../components/Home";
import axios from "axios";





export const useGamePageController = () => {
    const [gameInfo, setGameInfo] = useState<GameDetail>();
    const {gameId} = useParams();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    const [user, setUser] = useState<UserInfo | null>(null);

    // Fetch user info when component mounts
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get<UserInfo>('http://localhost:8080/user/google');
                
                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info", error);
            }
        }

        fetchUserInfo();
    }, []);
    if(user){
        console.log(user.name);
    }

    useEffect(()=>{
        setError(0);
        const fetchData = async () => {
            try {
                setLoading(true);
                const params: GameInfoParams = {gameId: gameId };
                const data = await fetchGameInfo(params);
                setGameInfo(data);
                setLoading(false);
                setError(0);
            } catch (error) {
                setLoading(false);
                setError(1);
            }
        };
        fetchData();
    },[]);

    return {gameInfo, isLoading, error, user};

}

