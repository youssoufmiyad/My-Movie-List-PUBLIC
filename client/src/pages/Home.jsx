import React, { useState, useEffect } from "react";
import Section from "../components/Section";
import { getTopRatedMovies, getTrendingMovies } from "../utils/fetchData";
import SearchBar from "../components/SearchBar";


const Home = () => {
	const [topRatedMovies, settopRatedMovies] = useState([]);
	const [trendingMovies, setTrendingMovies] = useState([]);

	useEffect(() => {
		getTopRatedMovies("1", settopRatedMovies);
		getTrendingMovies("1", "week", setTrendingMovies);
	}, []);

	useEffect(() => {
		
	}, []);
	console.log(topRatedMovies);
	if (topRatedMovies.results) {
		return (
			<div>
				<SearchBar/>
				<br />
				{trendingMovies.results ? (
					<Section
						title={"En ce moment au cinéma"}
						movies={trendingMovies.results.slice(0, 10)}
					/>
				) : (
					false
				)}

				<Section
					title={"Acclamés par la critique"}
					movies={topRatedMovies.results.slice(0, 10)}
				/>
			</div>
		);
	}
};

export default Home;
