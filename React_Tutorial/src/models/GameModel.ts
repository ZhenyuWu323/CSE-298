import axios from 'axios';

export interface Params {
  page: number;
  genres?: string;
  platforms?: string;
  ordering?: string;
}

export interface Game {
  id: string;
  name: string;
  image: string;
  genre: string[];
  platform: string[];
  metacritic: string;
  released: string;
}

export interface GameContent {
  TotalPage: number;
  GameList: Game[];
}

export const fetchGameData = async (params: Params) => {
    try {
        const response = await axios.get("https://cse-298.up.railway.app/api/games", { params: params });
        console.log(response.request);
        return response.data as GameContent;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};