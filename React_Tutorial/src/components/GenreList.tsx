import axios from "axios";
import { useEffect, useState } from "react";

interface Genre {
  id: string;
  name: string;
  image: string;
}
const GenreList = () => {

	{/* Genre List */}
	const [genreList, setGenreList] = useState<Genre[]>([]);
	{/* Loading State */}
	const [isLoading, setLoading] = useState(false);

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
	<ul>
		{genreList.map((genre : Genre) => (<li key={genre.id}>{genre.name}</li>))}
	</ul>
	);
};

export default GenreList;
