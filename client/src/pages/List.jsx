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
	getTrendingMovies,
} from "../utils/fetchData";
import CardLoading from "../components/CardLoading";
const Card = lazy(()=>import("../components/Card"))

const List = () => {
	const [dateRangedMovies, setDateRangedMovies] = useState([]);
	const [trendingMovies, setTrendingMovies] = useState([]);
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
		getMoviesInDateRange(
			page,
			dateMin,
			dateMax,
			sortMethod,
			setDateRangedMovies,
		);

		getTrendingMovies(page, "week", setTrendingMovies);
	}, [dateMin, dateMax, page, sortMethod]);

	useEffect(() => {
		console.log(sortMethod);
	}, [sortMethod]);

	return (
		<Stack>
			<br />
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="demo-select-small-label">Age</InputLabel>
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
					<MenuItem value="title.asc">
						Alphabétique (croissant)
					</MenuItem>
					<MenuItem value="title.desc">
						Alphabétique (décroissant)
					</MenuItem>
					<MenuItem value="primary_release_date.asc">
						Chronologique (croissant)
					</MenuItem>
					<MenuItem value="primary_release_date.desc">
						Chronologique (décroissant)
					</MenuItem>
					<MenuItem value="popularity.asc">
						Popularité (croissant)
					</MenuItem>
					<MenuItem value="popularity.desc">
						Popularité (décroissant)
					</MenuItem>
					<MenuItem value="vote_average.asc">
						Note (croissant)
					</MenuItem>
					<MenuItem value="vote_average.desc">
						Note (décroissant)
					</MenuItem>
				</Select>
			</FormControl>
			<br />
			<Box sx={{ flexGrow: 1 }}>
				<Grid container justifyContent="center" spacing={5}>
					{trendingMovies.results && sortMethod === ""
						? trendingMovies.results.map((movie) => {
								return (
									<Grid item>
										<Suspense fallback={<CardLoading/>}><Card movie={movie}  /><br /></Suspense>
										<br />
									</Grid>
								);
						  })
						: dateRangedMovies.results
						  ? dateRangedMovies.results.map((movie) => {
									return (
										<Grid item>
											<Suspense fallback={<CardLoading/>}><Card movie={movie}  /><br /></Suspense>
											<br />
										</Grid>
									);
							  })
						  : null}
				</Grid>
			</Box>
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
