import React, { useState, useEffect, lazy, Suspense } from "react";
import { Stack, Typography, Box } from "@mui/material";
import CardLoading from "./CardLoading";

const Card = lazy(() => import("./Card"));

const ProfileCaroussel = ({ user }) => {
	return (
		<Stack>
			<Stack sx={{ marginTop: "12px" }}>
				<Typography
					sx={{
						marginLeft: "25%",
						marginBottom: "8px",
						fontSize: "32px",
						borderBottom: "2px #425471 solid",
						width: "50%",
						textAlign: "left",
					}}
				>
					Favorite films
				</Typography>
				<div style={{ overflow: "auto", width: "1200px" }}>
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						{user.favorites.map((movie) => {
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
					</Box>
				</div>
			</Stack>

			<Stack sx={{ marginTop: "12px" }}>
				<Typography
					sx={{
						marginLeft: "25%",
						marginBottom: "8px",
						fontSize: "32px",
						borderBottom: "2px #425471 solid",
						width: "50%",
						textAlign: "left",
					}}
				>
					In {user.username}'s watchlist
				</Typography>
				<div style={{ overflow: "auto", width: "1200px" }}>
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						{user.watchlist.map((movie) => {
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
					</Box>
				</div>
			</Stack>
		</Stack>
	);
};

export default ProfileCaroussel;
