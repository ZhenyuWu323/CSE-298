import axios from 'axios';

export interface GameInfoParams {
  gameId: string;
}

interface GameStore{
    name: string;
    domin: string;
}

export interface GameDetail {
  name: string;
  description: string;
  webpage: string;
  image: string;
  tag: string[];
  stores: GameStore[];
  genre: string[];
  platform: string[];
  metacritic: string;
  released: string;
}


export const fetchGameInfo = async (params: GameInfoParams) => {
    try {
        const response = await axios.get("http://localhost:8080/api/queryGame", { params: params });
        console.log(response.request);
        return response.data as GameDetail;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

