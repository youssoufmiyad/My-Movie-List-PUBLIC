import React from "react";

const StarProfilePic = ({ star, size }) => {
	return (
			<a href={`/profile/${star.id}`}>
				<img
					src={`https://image.tmdb.org/t/p/w500/${star.profile_path}`}
					alt="profile"
					style={{ width: size, height: size, borderRadius: "90%", border:"1px grey solid",objectFit: "cover" }}
				/>
			</a>
	);
};

export default StarProfilePic;
