import React, { lazy } from "react";
import { Grid, Box } from "@mui/material";
import { Suspense } from "react";
import CardLoading from "../components/CardLoading";
const Card = lazy(() => import("./Card"));

const MovieGrid = ({ movies, page }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container justifyContent="center" spacing={5}>
				{page === "watchlist"
					? movies
						? movies.map((movie) => {
								return (
									<Grid item>
										<Suspense fallback={<CardLoading />}>
											<Card movie={movie} />
											<br />
										</Suspense>
										<br />
									</Grid>
								);
						  })
						: false
					: movies.results
					  ? movies.results.map((movie) => {
								return (
									<Grid item>
										<Suspense fallback={<CardLoading />}>
											<Card movie={movie} />
											<br />
										</Suspense>
										<br />
									</Grid>
								);
						  })
					  : false}
			</Grid>
		</Box>
	);
};

export default MovieGrid;
