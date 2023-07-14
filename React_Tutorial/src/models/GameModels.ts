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
  
  export interface Genre {
    id: string;
    name: string;
    image: string;
  }
  
  export interface Platform {
    id: string;
    name: string;
  }
  
  export interface Params {
    page: number;
    genres?: string;
    platforms?: string;
    ordering?: string;
  }