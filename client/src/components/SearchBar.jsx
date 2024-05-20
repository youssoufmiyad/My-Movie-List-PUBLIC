import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, IconButton, Typography } from "@mui/material";
import { getSearchResults } from "../utils/fetchData";
import { SpaRounded } from "@mui/icons-material";
import SearchCard from "./SearchCard";

const SearchBar = () => {
	const [searchStarted, setSearchStarted] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [displayResult, setDisplayResult] = useState(false);

	useEffect(() => {
		if (searchQuery.length > 3) {
			getSearchResults(searchQuery, setSearchResults);
			setDisplayResult(true);
		} else {
			setDisplayResult(false);
		}
	}, [searchQuery]);



	return (
		<div>
			<div
				style={{
					display: "flex",
					alignSelf: "center",
					justifyContent: "center",
					flexDirection: "row",
					padding: 20,
				}}
			>
				<form style={{ color: "BCBCBD" }}>
					<TextField
						onInput={(e) => {
							setSearchQuery(e.target.value);
							setDisplayResult(true);
						}}
						label="Cherchez un film"
						placeholder="Nom du film, acteur, réalisateur"
						size="medium"
						sx={{ border: "" }}
						InputLabelProps={{
							style: { color: "#fff" },
						}}
						inputProps={{
							style: { color: "#fff" },
						}}
					/>
				</form>
				<IconButton
					type="submit"
					aria-label="search"
					onClick={() => {
						window.location.assign(`../film?title=${searchQuery}`);
					}}
				>
					<SearchIcon style={{ fill: "#747bff" }} />
				</IconButton>
			</div>
			{displayResult
				? searchResults.slice(0, 3).map((result) => {
						return <SearchCard element={result} />;
				  })
				: () => {
						if (searchStarted) {
							<span>Recherche...</span>;
						}
				  }}
		</div>
	);
};

export default SearchBar;
