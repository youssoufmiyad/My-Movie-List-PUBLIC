import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../utils/fetchData";
import MovieGrid from "../components/MovieGrid";
import { Stack } from "@mui/material";
const Favorites = () => {
    const { id } = useParams();
	const [user, setUser] = useState();

	useEffect(() => {
		getOneUser(setUser, id);
	}, [id]);
  return (
    <Stack>
			{user ? (
				<MovieGrid movies={user.favorites} page={"watchlist"} />
			) : (
				<h1>NO FAVORITES</h1>
			)}
		</Stack>
  )
}

export default Favorites
