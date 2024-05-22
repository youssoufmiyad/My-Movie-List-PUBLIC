import React, { useState, Suspense, lazy } from "react";
import { Stack, Box } from "@mui/material";
import CardLoading from "./CardLoading";

const Card = lazy(() => import("./Card"));

const Section = ({ title, movies }) => {
	if (movies) {
		return (
			<Stack
				sx={{
					alignItems: "center",
					textTransform: "uppercase",
				}}
			>
				<h2>{title}</h2>
				<div style={{ overflow: "auto", width: "1200px" }}>
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						{movies.map((movie) => {
							return (
								<>
									<Suspense fallback={<CardLoading />}>
										<Card movie={movie} />
										<br />
									</Suspense>
									<br />
								</>
							);
						})}
						<a href="../film">
							<Stack
								sx={{
									width: "176px",
									height: "356px",
									borderRadius: "0.5rem",
									backgroundColor: "#202126",
									textAlign:"center",
									justifyContent:"center",
									outline: "#374151 2px solid",
									margin: "4px",
								}}
							>
								Voir tout
							</Stack>
						</a>
					</Box>
				</div>
			</Stack>
		);
	}
	return <h1>No movies</h1>;
};

export default Section;
