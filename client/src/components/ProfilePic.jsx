import React from "react";
import { Stack } from "@mui/material";

const ProfilePic = ({ user, size }) => {
	return (
			<a href={`/profile/${user._id}`}>
				<img
					src={`http://localhost:3000/users/${user._id}/profilePic`}
					alt="profile"
					style={{ width: size, height: size, borderRadius: "90%", border:"1px grey solid" }}
				/>
			</a>
	);
};

export default ProfilePic;
