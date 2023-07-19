import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { GameQuery } from "./Home";
import { useNavigate} from "react-router-dom";
import { Game } from "../models/GameModel";



{/*Selected Props for platform & genre */}
interface Props{
  gameQuery: GameQuery;
  setGameQuery: (query: GameQuery) => void;
}

const SearchBar = ({gameQuery, setGameQuery}:Props) => {
	const ref = useRef<HTMLInputElement>(null);
	const navigation = useNavigate();

	

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
				if(ref.current){
				 navigation('search')
				 setGameQuery({selectedGenre:null,selectedOrder:null,selectedPlatform:null,selectedSearch:ref.current.value})
				}
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />}></InputLeftElement>
        <Input
          borderRadius={20}
          placeholder="Search games......"
          variant="filled"
					ref={ref}
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
