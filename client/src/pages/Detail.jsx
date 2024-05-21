import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getOneMovie,
	getOneUser,
	getUsers,
	getVideos,
} from "../utils/fetchData";
import { Button, Stack, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinearProgress from "@mui/material/LinearProgress";
import Placeholder from "../assets/backdrop_placeholder.png";
import { updateFavorites, updateWatchlist } from "../utils/lists";
import NewReview from "../components/NewReview";
import Review from "../components/Review";

const Detail = () => {
	const { id } = useParams();

	const [movie, setMovie] = useState([]);
	const [watchlist, setWatchlist] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [videos, setVideos] = useState([]);

	const [user, setUser] = useState();
	const [users, setUsers] = useState([]);

	const [isInWatchlist, setIsInWatchlist] = useState(false);
	const [isInFaveList, setIsInFaveList] = useState(false);
	const [hasReview, setHasReview] = useState(false);

	useEffect(() => {
		getOneMovie(id, setMovie);
		getVideos(id, setVideos);
	}, [id]);

	useEffect(() => {
		if (sessionStorage.length > 0) {
			getOneUser(setUser, sessionStorage.getItem("id"));
		}

		getUsers(setUsers);

		setWatchlist(JSON.parse(sessionStorage.getItem("watchlist")));
		setFavorites(JSON.parse(sessionStorage.getItem("favorites")));
	}, []);

	useEffect(() => {
		for (const w in watchlist) {
			if (watchlist[w].id === movie.id) {
				setIsInWatchlist(true);
				return;
			}
		}
		setIsInWatchlist(false);
	}, [watchlist, movie]);

	useEffect(() => {
		for (const f in favorites) {
			if (favorites[f].id === movie.id) {
				setIsInFaveList(true);
				return;
			}
		}
		setIsInFaveList(false);
	}, [favorites, movie]);

	useEffect(() => {
		if (sessionStorage.length > 0 && user) {
			for (const r in user.reviews) {
				if (user.reviews[r].movieId === movie.id) {
					setHasReview(true);
					return;
				}
			}
			setHasReview(false);
		}
	}, [user, movie]);

	useEffect(() => {
		console.log("isIn :");
		console.log(isInWatchlist);
	}, [isInWatchlist]);

	const toggleWatchlist = () => {
		let isRemoved = false;
		for (const w in watchlist) {
			console.log(`w : ${w}`);
			if (movie.id === watchlist[w].id) {
				watchlist.splice(w, 1);
				isRemoved = true;
				setIsInWatchlist(false);
			}
		}
		if (!isRemoved) {
			watchlist.push(movie);
			setIsInWatchlist(true);
		}
		updateWatchlist(sessionStorage.getItem("id"), movie);

		sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
	};

	const toggleFavorite = () => {
		let isRemoved = false;
		for (const f in favorites) {
			if (movie.id === favorites[f].id) {
				favorites.splice(f, 1);
				isRemoved = true;
				setIsInFaveList(false);
			}
		}
		if (!isRemoved) {
			favorites.push(movie);
			setIsInFaveList(true);
		}
		console.log(`Removed from favorites : ${isRemoved}`);

		updateFavorites(sessionStorage.getItem("id"), movie);
		sessionStorage.setItem("favorites", JSON.stringify(favorites));
	};

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
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<Button
						startIcon={<AddIcon />}
						variant="outlined"
						sx={{
							padding: "16px",
							margin: "0px 16px 0px 8px",
							fontSize: "12px",
							backgroundColor: isInWatchlist ? "green" : "#28427B",
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
							margin: "0px 16px 0px 8px",
							fontSize: "12px",
							backgroundColor: isInFaveList ? "green" : "#28427B",
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
			{sessionStorage.length > 0 ? (
				!hasReview ? (
					<NewReview movie={movie} />
				) : (
					false
				)
			) : (
				false
			)}
			<br />
			{users.map((u) => {
				for (const r in u.reviews) {
					if (u.reviews[r].movieId === movie.id) {
						return (
							<Review username={u.username} review={u.reviews[r].content} />
						);
					}
				}
			})}
		</Stack>
	);
};

export default Detail;
