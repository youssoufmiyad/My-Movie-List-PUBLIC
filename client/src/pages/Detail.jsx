import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneMovie, getVideos } from "../utils/fetchData";
import { Button, Stack, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinearProgress from "@mui/material/LinearProgress";
import Placeholder from "../assets/backdrop_placeholder.png";
import { updateFavorites, updateWatchlist } from "../utils/lists";

const Detail = () => {
	const { id } = useParams();

	const [movie, setMovie] = useState([]);
	let [watchlist, setWatchlist] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		getOneMovie(id, setMovie);
		getVideos(id, setVideos);
	}, [id]);
	console.log(videos);

	const toggleWatchlist = () => {
		sessionStorage.getItem("watchlist").length > 0
			? setWatchlist(sessionStorage.getItem("watchlist"))
			: true;
		let idx = -1;
		if (watchlist) {
			for (let i = 0; i < watchlist.length; i++) {
				if (watchlist[i].id === id) {
					idx = i;
					break;
				}
			}
		}

		if (idx !== -1) {
			const newWatchlist = watchlist;
			for (let i = 0; i < watchlist.length; i++) {
				if (i !== idx) {
					newWatchlist.push(watchlist[i]);
				}
			}
			watchlist = newWatchlist;
		} else {
			watchlist.push(movie);
		}

		// sessionStorage.setItem("watchlist", watchlist);
		updateWatchlist(sessionStorage.getItem("id"), watchlist);
		console.log(watchlist);
	};

	const toggleFavorite = () => {
		console.log(sessionStorage.getItem("favorites"));

		sessionStorage.getItem("favorites").length > 0
			? setFavorites(sessionStorage.getItem("favorites"))
			: true;
		for (let i = 0; i < favorites.length; i++) {
			console.log(`IDs : ${favorites[i].id} , ${id}`);
			if (favorites[i].id === id) {
				delete favorites[i];
				sessionStorage.setItem("favorites", JSON.stringify(favorites));
				updateFavorites(
					sessionStorage.getItem("id"),
					sessionStorage.getItem("favorites"),
				);
				console.log(favorites);
				return;
			}
		}
		favorites.push(movie);
		sessionStorage.setItem("favorites", JSON.stringify(favorites));
		updateFavorites(
			sessionStorage.getItem("id"),
			sessionStorage.getItem("favorites"),
		);
		console.log(favorites);
	};

	console.log(movie.status);
	return (
		<Stack sx={{ textAlign: "left" }}>
			<div
				style={{
					position: "relative",
				}}
			>
				<img
					src={
						movie.backdrop_path
							? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
							: Placeholder
					}
					alt="backdrop"
					width="100%"
					height={400}
					style={{ opacity: 0.5, objectFit: "cover" }}
				/>
				<Typography
					sx={{
						position: "absolute",
						bottom: "4px",
						fontSize: "100px",
						opacity: 0.7,
						color: "white",
					}}
				>
					{movie.title}
				</Typography>
				<Typography
					sx={{
						float: "right",
						fontSize: "16px",
						opacity: 0.4,
						color: "white",
					}}
				>
					{movie.status}
				</Typography>
			</div>
			<br />
			{sessionStorage.length > 0 ? (
				<Box sx={{display:"flex", flexDirection:"row"}}>
					<Button
						startIcon={<AddIcon />}
						variant="outlined"
						sx={{
							padding:"16px",
							margin:"0px 16px 0px 8px",
							fontSize: "12px",
							backgroundColor: "#28427B",
							color: "white",
							opacity: 0.6,
							outlineColor: "#213547",
						}}
						onClick={toggleWatchlist}
					>
						Watchlist
					</Button>
					<br />
					<Button
						startIcon={<FavoriteIcon />}
						variant="outlined"
						sx={{
							margin:"0px 16px 0px 8px",
							fontSize: "12px",
							backgroundColor: "#28427B",
							color: "white",
							opacity: 0.6,
							outlineColor: "#213547",
						}}
						onClick={toggleFavorite}
					>
						Favorite
					</Button>
				</Box>
			) : (
				false
			)}
			<div>
				<h2 style={{ borderBottom: "4px #425471 solid", color: "white" }}>
					SYNOPSIS
				</h2>
				<Typography>
					{movie.overview ? movie.overview : "Synopsis indisponible"}
				</Typography>
			</div>
			<br />
			<div>
				<h2 style={{ borderBottom: "4px #425471 solid", color: "white" }}>
					GENRES
				</h2>
				{movie.genres
					? movie.genres.map((genre) => {
							return `${genre.name} `;
					  })
					: "Genres indisponibles"}
			</div>
			<br />
			{videos.results ? (
				videos.results.length > 1 ? (
					<Stack sx={{ alignItems: "center", borderTop: "4px #425471 solid" }}>
						<br />
						<iframe
							width="700"
							height="394"
							title="trailer"
							src={`https://www.youtube.com/embed/${
								videos.results[videos.results.length - 1].key
							}`}
						/>
					</Stack>
				) : (
					<Stack sx={{ alignItems: "center", borderTop: "4px #425471 solid" }}>
						{" "}
						<h1>trailer indisponible</h1>
					</Stack>
				)
			) : (
				<Box sx={{ width: "100%" }}>
					<LinearProgress />
				</Box>
			)}
			<br />
		</Stack>
	);
};

export default Detail;
