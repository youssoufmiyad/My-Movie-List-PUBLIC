import React from "react";
import { Stack, Typography } from "@mui/material";
import ProfilePic from "./ProfilePic";

const Review = ({ user, review }) => {
	return (
		<Stack sx={{ backgroundColor: "#FFF", padding: "20px", margin: "20px" }}>
			<ProfilePic user={user} />
			{/*nom d'utilisateur */}
			<Typography fontSize={"10px"}>{user.username}</Typography>
			{/*commentaire */}
			<Typography>{review}</Typography>
		</Stack>
	);
};

export default Review;
