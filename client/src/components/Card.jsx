import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { getGenres, getOneMovie } from "../utils/fetchData";

const Card = ({ movie }) => {
	const [genres, setGenres] = useState([]);
	const poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
	const [movieGenres] = useState([]);

	useEffect(() => {
		getGenres(setGenres);
	}, []);

	if (movieGenres.length < 1) {
		for (let i = 0; i < genres.length; i++) {
			for (let j = 0; j < 3; j++) {
				if (movie.genre_ids[j] === genres[i].id) {
					movieGenres.push(`${genres[i].name}\n`);
				} else {
				}
			}
		}
	}

	return (
		<Stack
			sx={{
				width: "176px",
				borderRadius: "0.5rem",
				outline: "#374151 2px solid",
				margin: "4px",
			}}
		>
			<img
				src={movie.poster_path ? poster : "https://placehold.co/176x210"}
				alt="poster"
				style={{
					borderTopLeftRadius: "0.5rem",
					borderTopRightRadius: "0.5rem",
					width: "176px",
					height: "210px",
				}}
			/>
			<Stack
				sx={{
					textTransform: "uppercase",
					height: "112px",
					color: "#E5E7EB",
					backgroundColor: "#202126",
					padding: "8px",
					borderBottomLeftRadius: "0.5rem",
					borderBottomRightRadius: "0.5rem",
				}}
			>
				<a href={`./film/${movie.id}`}>{movie.title}</a>
				<hr style={{ width: "160px" }} color="#374151" />
				<span style={{ textTransform: "none" }}>{movieGenres}</span>
			</Stack>
		</Stack>
	);
};

export default Card;

// lien pour les images :
//https://image.tmdb.org/t/p/original/nXs0M4yoKA1dGhAGASEC4672HZb.jpg
