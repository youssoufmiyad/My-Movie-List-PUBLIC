import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { getMovieCredits } from "../utils/fetchData";
import StarProfilePic from "./StarProfilePic";

const Credit = ({ movie }) => {
	const [credits, setCredits] = useState([]);

	useEffect(() => {
		getMovieCredits(movie.id, setCredits);
	}, [movie]);

	return (
		<Box sx={{ flexGrow: 1, marginTop: 8 }}>
			<h2 style={{ borderBottom: "4px #425471 solid", color: "white" }}>
				CREDITS
			</h2>
			<Grid container justifyContent="center" spacing={5} marginTop={8}>
				{credits ? (
					credits.slice(0, 8).map((person) => {
						{
							console.log(person);
						}
						return (
							<>
								<div style={{ alignItems: "center", margin: 4 }}>
									<StarProfilePic star={person} size={128} />
									<br />
									<h3>{person.name}</h3>
									<h4>({person.character})</h4>
								</div>
							</>
						);
					})
				) : (
					<h1>Aucun membre du cast répertorié par l'application</h1>
				)}
			</Grid>
		</Box>
	);
};

export default Credit;
