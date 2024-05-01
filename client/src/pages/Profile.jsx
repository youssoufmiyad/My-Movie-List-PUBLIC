import React, { useState, useEffect } from "react";
import { Stack, Typography, Box } from "@mui/material";
import ProfilePic from "../components/ProfilePic";
import StarProfilePic from "../components/StarProfilePic";
import { getOneUser, getStar } from "../utils/fetchData";
import { useParams } from "react-router-dom";
import ProfileCaroussel from "../components/ProfileCaroussel";

const PROFILE_ID_REGEX = /^[0-9]{1,10}$/;

const Profile = () => {
	const [user, setUser] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		if (PROFILE_ID_REGEX.test(id)) {
			getStar(id, setUser);
		} else {
			getOneUser(setUser, id);
		}
	}, [id]);
	if (PROFILE_ID_REGEX.test(id) & (user !== null)) {
		return (
			<Stack sx={{ marginTop: "12px" }}>
				<Box marginRight={"800px"}>
					<StarProfilePic star={user} size={"110px"} />
					<Box sx={{ display: "inline-block" }}>
						<Typography>{user.name}</Typography>
						<Typography sx={{ opacity: 0.6 }}>
							{user.known_for_department}
						</Typography>
					</Box>
				</Box>
				<Typography>
					Nombre de vu de la page aujourd'hui : {user.popularity}
				</Typography>
				<div>
					<h2 style={{ borderBottom: "4px #425471 solid", color: "white" }}>
						BIOGRAPHY
					</h2>
					<Typography>
						{user.biography
							? user.biography
							: `Pas d'information sur ${user.name}`}
					</Typography>
				</div>
				<br />
				{apparitions.length > 0 ? (
					<Section title={"Aperçu dans :"} movies={apparitions.slice(0, 6)} />
				) : (
					<Typography>aucun film connu</Typography>
				)}
				<br />
				<div className="container" style={{ overflow: "hidden" }}>
					<div
						ref={containerRef}
						style={{ overflowX: "scroll", scrollBehavior: "smooth" }}
					>
						<div
							className="content-box"
							style={{ display: "flex", alignItems: "center", gap: 50 }}
						>
							{images
								? images.map((profile) => {
										return (
											<>
												<img
													src={`https://image.tmdb.org/t/p/w500/${profile.file_path}`}
													alt="profil"
												/>
												<br />
											</>
										);
								  })
								: false}
						</div>
					</div>
					<div className="action-btns">
						<button type="button" onClick={() => handleScroll(-ITEM_WIDTH)}>
							Scroll Left
						</button>
						<button type="button" onClick={() => handleScroll(ITEM_WIDTH)}>
							Scroll Right
						</button>
					</div>
				</div>
			</Stack>
		);
	}
	console.log(PROFILE_ID_REGEX.test(id))
	if (user !== null) {
		return(<Stack sx={{ marginTop: "12px" }}>
			<Box marginRight={"800px"}>
				<ProfilePic user={user} size={"110px"} />
				<Box sx={{ display: "inline-block" }}>
					<Typography>{user.username}</Typography>
					<Typography sx={{ opacity: 0.6 }}>{user.email}</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					border: "2px #425471 solid",
					width: "600px",
					height: "40px",
					margin: "0 auto",
					marginTop: "12px",
					display: "inline-block",
				}}
			>
				<a href="./" style={{ padding: 5 }}>
					Profile
				</a>
				<a href="./activity" style={{ padding: 5 }}>
					Activity
				</a>
				<a href="./watchlist" style={{ padding: 5 }}>
					Watchlist
				</a>
				<a href="./favorite" style={{ padding: 5 }}>
					Favorite
				</a>
				<a href="./rates" style={{ padding: 5 }}>
					Rates
				</a>
				<a href="./comments" style={{ padding: 5 }}>
					Comments
				</a>
			</Box>

			<ProfileCaroussel title={"Favorite films"} user={user} />
		</Stack>)
		
	}
};

export default Profile;
