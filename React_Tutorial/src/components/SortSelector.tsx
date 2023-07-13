import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props{
	onSelectedOrder: (sortOrder: string)=>void;
}

const SortSelector = ({onSelectedOrder}:Props) => {
	const sortOrders = [
		{values: "", label: "Relevance"},
		{value: "-released", label: "Release date"},
		{value: "-metacritic", label: "Metacritic"}
	]

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Relevance
      </MenuButton>
			<MenuList>
				{sortOrders.map(order => <MenuItem onClick={()=>onSelectedOrder(order.value)} key={order.label} value={order.value}>{order.label}</MenuItem>)}
			</MenuList>
    </Menu>
  );
};

export default SortSelector;
