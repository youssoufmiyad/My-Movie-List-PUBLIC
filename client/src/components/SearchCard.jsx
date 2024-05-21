import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import StarProfilePic from "./StarProfilePic";

const SearchCard = ({ element }) => {
	const poster = `https://image.tmdb.org/t/p/original${element.poster_path}`;

	if (element.media_type === "movie") {
		return (
			<Stack
				sx={{
					marginLeft: "35%",
					width: "360px",
					zIndex: "1",
                    position:"relative"
				}}
			>
				<a href={`../film/${element.id}`}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#202126",
						}}
					>
						<img
							src={
								element.poster_path ? poster : "https://placehold.co/176x210"
							}
							alt="poster"
							width={48}
							height={48}
						/>{" "}
						<br />{" "}
						<h3>
							{element.title.length > 27
								? `${element.title.substring(0, 26)}...`
								: element.title}
							<br />
							<p style={{fontSize:"8px"}}>
								{element.overview.length > 235
									? `${element.overview.substring(0, 80)}...`
									: element.overview}
							</p>
						</h3>
					</Box>
				</a>
			</Stack>
		);
	}
	if (element.media_type === "person") {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<StarProfilePic star={element} size={48} />

				<br />
				<a href={`./profile/${element.id}`}>
					{element.name.length > 27
						? `${element.name.substring(0, 26)}...`
						: element.name}
				</a>
			</Box>
		);
	}
};

export default SearchCard;
