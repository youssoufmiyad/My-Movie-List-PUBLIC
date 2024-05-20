import React, { useState, useEffect, Suspense, lazy } from "react";
import {
	Stack,
	Box,
	Grid,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
} from "@mui/material";
import {
	getMoviesDesc,
	getMoviesInDateRange,
	getSearchResults,
	getTrendingMovies,
} from "../utils/fetchData";
import MovieGrid from "../components/MovieGrid";

const List = () => {
	const [dateRangedMovies, setDateRangedMovies] = useState([]);
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [queryMovies, setQueryMovies] = useState([]);
	const [sortMethod, setSortMethod] = useState("");


	const [page, setPage] = useState(1);

	const currentDate = new Date();
	const dateMin = new Date(2000, 1, 1).toISOString().split("T")[0];
	const dateMax = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 6,
		28,
	)
		.toISOString()
		.split("T")[0];

	useEffect(() => {
		setDateRangedMovies([]);
		getMoviesInDateRange(
			page,
			dateMin,
			dateMax,
			sortMethod,
			setDateRangedMovies,
		);

		setTrendingMovies([]);
		getTrendingMovies(page, "week", setTrendingMovies);
	}, [dateMin, dateMax, page, sortMethod]);

	useEffect(() => {
		console.log(sortMethod);
	}, [sortMethod]);

	const urlParams = new URLSearchParams(window.location.search);
	const movieTitle = urlParams.get("title");

	useEffect(() => {
		if (movieTitle !== "") {
			getSearchResults(movieTitle, setQueryMovies);
		}
		console.log(queryMovies.results);
	});

	return (
		<Stack>
			<br />
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="demo-select-small-label">Trier par ordre...</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={sortMethod}
					label="trier par ordre..."
					onChange={(e) => {
						setSortMethod(e.target.value);
					}}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="title.asc">Alphabétique (croissant)</MenuItem>
					<MenuItem value="title.desc">Alphabétique (décroissant)</MenuItem>
					<MenuItem value="primary_release_date.asc">
						Chronologique (croissant)
					</MenuItem>
					<MenuItem value="primary_release_date.desc">
						Chronologique (décroissant)
					</MenuItem>
					<MenuItem value="popularity.asc">Popularité (croissant)</MenuItem>
					<MenuItem value="popularity.desc">Popularité (décroissant)</MenuItem>
					<MenuItem value="vote_average.asc">Note (croissant)</MenuItem>
					<MenuItem value="vote_average.desc">Note (décroissant)</MenuItem>
				</Select>
			</FormControl>
			<br />
			<MovieGrid
				movies={
					queryMovies.results
						? queryMovies
						: trendingMovies.results && sortMethod === ""
						  ? trendingMovies
						  : dateRangedMovies.results
							  ? dateRangedMovies
							  : []
				}
			/>
			{trendingMovies.total_pages ? (
				<div style={{ direction: "row" }}>
					<button
						className="pagination-button"
						type="button"
						disabled={page === 1}
						onClick={() => {
							setPage(page - 1);
							window.scrollTo(0, 0);
						}}
					>
						&lt;{/*  signe < */}
					</button>
					{page > 2 ? (
						<button
							type="button"
							onClick={() => {
								setPage(page - 2);
								window.scrollTo(0, 0);
							}}
						>
							{page - 2}
						</button>
					) : null}
					{page > 1 ? (
						<button
							type="button"
							onClick={() => {
								setPage(page - 1);
								window.scrollTo(0, 0);
							}}
						>
							{page - 1}
						</button>
					) : null}
					<button type="button" disabled>
						{page}
					</button>
					{page < trendingMovies.total_pages ? (
						<>
							<button
								type="button"
								onClick={() => {
									setPage(page + 1);
									window.scrollTo(0, 0);
								}}
							>
								{page + 1}
							</button>
							<button
								type="button"
								onClick={() => {
									setPage(page + 2);
									window.scrollTo(0, 0);
								}}
							>
								{page + 2}
							</button>
						</>
					) : null}
					<button
						className="pagination-button"
						type="button"
						disabled={page >= trendingMovies.total_pages}
						onClick={() => {
							setPage(page + 1);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						&gt;{/*  signe > */}
					</button>
				</div>
			) : null}
			<br />
		</Stack>
	);
};

export default List;
