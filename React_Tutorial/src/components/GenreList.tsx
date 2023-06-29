import { HStack, List, ListItem, Image,Text} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Genre {
  id: string;
  name: string;
  image: string;
}

interface LoadingProps {
	setLoading: (isLoading: boolean) => void;
}

const ResizeImage = (url: string) => {
	const index = url.indexOf("media/") + "media/".length;
	return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

const GenreList = ({ setLoading }: LoadingProps) => {

	{/* Genre List */}
	const [genreList, setGenreList] = useState<Genre[]>([]);
	{/* Loading State */}
	//const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			setLoading(true);
			const response = await axios.get("https://cse-298.up.railway.app/api/genres", {
			});
			setGenreList(response.data)
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
		<ListItem paddingY="1px" key='GenreTitle'>
        <Text fontSize="3xl" fontWeight="bold" mb="4px" as='u'>Genres</Text>
		</ListItem>
		{genreList.map((genre : Genre) => (
			<ListItem key={genre.id} paddingY = "5px">
				<HStack>
					<Image boxSize="32px" borderRadius={8} src={ResizeImage(genre.image)}></Image>
					<Text fontSize="large">{genre.name}</Text>
				</HStack>
			</ListItem>	
		))}
	</List>
		
	);
};

export default GenreList;
