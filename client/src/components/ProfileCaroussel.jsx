import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";

const ProfileCaroussel = ({ title, user }) => {
	console.log(user.watchlist.length);

	return (
		<Stack sx={{marginTop:"12px"}}>
			<Typography
				sx={{
					marginLeft:"25%",
					marginBottom:"8px",
					fontSize: "32px",
					borderBottom: "2px #425471 solid",
					width: "50%",
					textAlign:"left"
				}}
			>
				{title}
			</Typography>
			{user.watchlist.map((movie) => {
				{
					console.log(movie);
				}
				return (
					<div>
						<img
							src={`https://image.tmdb.org/t/p/original/${movie.poster_path}.jpg`}
							alt="movie cover"
							width="200px"
							height="300px"
						/>
						<Typography>{movie.original_title}</Typography>
					</div>
				);
			})}
		</Stack>
	);
};

export default ProfileCaroussel;
