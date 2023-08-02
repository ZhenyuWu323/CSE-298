import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { GameQuery } from "./Home";
import { useSearchParams } from "react-router-dom";

interface Props{
	selectedOrder: string;
	setGameQuery: (query: GameQuery) => void
	gameQuery: GameQuery
}

const SortSelector = ({gameQuery, selectedOrder, setGameQuery}:Props) => {
	const[searchParam, setSearchParam] = useSearchParams()
	const sortOrders = [
		{value: "none", label: "Relevance"},
		{value: "-released", label: "Release date"},
		{value: "-metacritic", label: "Metacritic"}
	]

	const currentSortOrder = sortOrders.find(order => order.value === selectedOrder)

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {currentSortOrder?.label || "Relevance"}
      </MenuButton>
			<MenuList>
				{sortOrders.map(order => <MenuItem onClick={()=>{
					setGameQuery({...gameQuery, selectedOrder: order.value});
					const currentSearchParams = new URLSearchParams(searchParam);
					currentSearchParams.set('ordering', order.value);
					const updatedSearchParam = currentSearchParams.toString();
					setSearchParam(updatedSearchParam);
				}} key={order.label} value={order.value}>{order.label}</MenuItem>)}
			</MenuList>
    </Menu>
  );
};

export default SortSelector;
