import React from "react";
import { deconnexion } from "../utils/session";
import { Stack, Typography } from "@mui/material";
import ProfilePic from "./ProfilePic";
import SearchBar from "./SearchBar";

const Navbar = () => {
	const user = {
		_id: sessionStorage.getItem("id"),
		username: sessionStorage.getItem("username"),
		email: sessionStorage.getItem("email"),
		password: sessionStorage.getItem("password"),
		rates: sessionStorage.getItem("rates"),
		comments: sessionStorage.getItem("comments"),
		watchlist: sessionStorage.getItem("watchlist"),
		favorites: sessionStorage.getItem("favorites"),
	};
	return (
		<Stack
			className="navbar"
			id="navbar"
			direction="row"
			sx={{
				borderBottom: "2px #425471 solid",
				alignItems: "center",
				padding: "0px",
			}}
		>
			<a href="http://localhost:5173/" style={{ margin: "6px" }}>
				My-Movie-List
			</a>
			<br />
			<button type="button" onClick={()=>{window.location.assign("../film");}} style={{ margin: "6px" }}>
						FILMS
					</button><br />

			{sessionStorage.getItem("id") ? (
				<>
					<button type="button" onClick={deconnexion} style={{ margin: "6px" }}>
						disconnect
					</button>
					<ProfilePic user={user} size={40} />
				</>
				
			) : (
				<button
					type="button"
					onClick={() => {
						window.location.replace("http://localhost:5173/login");
					}}
					style={{ margin: "6px" }}
				>
					login
				</button>
			)}
			<br />
			<SearchBar/>
		</Stack>
	);
};
export default Navbar;
