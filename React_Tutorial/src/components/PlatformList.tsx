import { HStack, Icon, List, ListItem, Text} from "@chakra-ui/react";
import{FaLinux, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid} from "react-icons/fa"
import {BsNintendoSwitch} from 'react-icons/bs'
import {MdDesktopMac} from 'react-icons/md'
import {SiAtari, SiCommodore, SiD3Dotjs, SiSega,SiApplearcade} from 'react-icons/si'
import axios from "axios";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface Platform {
  id: string;
  name: string;
}


const PlatformList = () => {
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
    default: MdDesktopMac
  }

	{/* Genre List */}
	const [plaftormList, setPlatformList] = useState<Platform[]>([]);
	{/* Loading State */}
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			setLoading(true);
			const response = await axios.get("http://localhost:8080/api/plaforms", {
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



	return (
	<List>
		{plaftormList.map((platform : Platform) => (
			<ListItem key={platform.id} paddingY = "10px">
				<HStack>
                    <Icon as= {PlatformIcon[platform.name]}></Icon>
					<Text fontSize="large">{platform.name}</Text>
				</HStack>
			</ListItem>	
		))}
	</List>
		
	);
};

export default PlatformList;
