import { Button, HStack, Icon, List, ListItem, Text} from "@chakra-ui/react";
import{FaLinux, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid} from "react-icons/fa"
import {BsNintendoSwitch} from 'react-icons/bs'
import {MdDesktopMac} from 'react-icons/md'
import {SiAtari, SiCommodore, SiD3Dotjs, SiSega,SiApplearcade} from 'react-icons/si'
import axios from "axios";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { GameQuery } from "./Home";
import { useSearchParams } from "react-router-dom";

export interface Platform {
  id: string;
  name: string;
}

interface Props {
	setLoading: (isLoading: boolean) => void;
	updatePlatformMap: (from: string, to: string) => void;
	setGameQuery: (query: GameQuery) => void
  	gameQuery: GameQuery
}

export const PlatformIcon : {[key:string] : IconType} = {
    PC:FaWindows,
    PlayStation: FaPlaystation,
    Xbox: FaXbox,
    iOS: FaApple,
    Android: FaAndroid,
    Nintendo: BsNintendoSwitch,
    Linux: FaLinux,
    "Apple Macintosh": MdDesktopMac,
    "Commodore / Amiga": SiCommodore,
    SEGA: SiSega,
    Atari: SiAtari,
    "3DO":SiD3Dotjs,
    "Neo Geo": SiApplearcade,
    Web: MdDesktopMac,
    default: MdDesktopMac
  }

const PlatformList = ({ gameQuery, setGameQuery, setLoading, updatePlatformMap}: Props) => {
    {/* Game Platform Icon */}
  const PlatformIcon : {[key:string] : IconType} = {
    PC:FaWindows,
    PlayStation: FaPlaystation,
    Xbox: FaXbox,
    iOS: FaApple,
    Android: FaAndroid,
    Nintendo: BsNintendoSwitch,
    Linux: FaLinux,
    "Apple Macintosh": MdDesktopMac,
    "Commodore / Amiga": SiCommodore,
    SEGA: SiSega,
    Atari: SiAtari,
    "3DO":SiD3Dotjs,
    "Neo Geo": SiApplearcade,
    Web: MdDesktopMac,
    default: MdDesktopMac
  }

	{/* Genre List */}
	const [platformList, setPlatformList] = useState<Platform[]>([]);
	const [searchParam, setSearchParam] = useSearchParams();

	useEffect(() => {
		const fetchData = async () => {
		  try {
			setLoading(true);
			const response = await axios.get("https://cse-298.up.railway.app/api/platforms", {
			});
			setPlatformList(response.data)
			setLoading(false);
		  } catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		  }
		};
		fetchData();
	  }, []);

	  useEffect(() => {
		platformList.forEach((platform) => {
		  updatePlatformMap(platform.id, platform.name);
		});
	  }, [platformList]);

	return (
		<List>
		{!platformList.length && <ListItem></ListItem>}
		{!!platformList.length && (
		  <>
			<ListItem paddingY="1px" key="PlatformTitle">
			  <Text fontSize="3xl" fontWeight="bold" mb="4px" as="u">
				Platforms
			  </Text>
			</ListItem>
			{platformList.map((platform: Platform) => (
			  <ListItem key={platform.id} paddingY="5px">
				<HStack justify="flex-start">
				  <Icon as={PlatformIcon[platform.name]} />
				  <Button onClick={() => {
					setGameQuery({...gameQuery, selectedPlatform: platform.id});
					const currentSearchParams = new URLSearchParams(searchParam);
					currentSearchParams.set('platforms', platform.id);
					const updatedSearchParam = currentSearchParams.toString();
					setSearchParam(updatedSearchParam);
				}} variant="link"><Text fontSize="large">{platform.name}</Text></Button>
				</HStack>
			  </ListItem>
			))}
		  </>
		)}
	  </List>
		
	);
};

export default PlatformList;
