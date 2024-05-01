import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import Card from "./Card";

const Section = ({ title, movies }) => {
	if (movies) {
		return (
			<Stack sx={{alignItems:"center", textTransform:"uppercase"}}>
				<h2>{title}</h2>
				<Box sx={{display:"flex", flexDirection:"row"}}>
					{movies.map((movie) => {
						return <><Card movie={movie}  /><br /></>;
					})}
				</Box>
			</Stack>
		);
	}
	return <h1>No movies</h1>;
};

export default Section;
