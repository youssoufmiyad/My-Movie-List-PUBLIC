import React, { useState, Suspense, lazy, useRef } from "react";
import { Stack, Box, Button } from "@mui/material";
import CardLoading from "./CardLoading";
import { handleScroll } from "../utils/handleScroll";

const Card = lazy(() => import("./Card"));

const Section = ({ title, movies }) => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const containerRef = useRef();
	const ITEM_WIDTH = 250;
	console.log(scrollPosition)
	if (movies) {
		return (
			<Stack
				className="section"
				sx={{
					alignItems: "center",
					textTransform: "uppercase",
				}}
			>
				<h2>{title}</h2>
				<Stack sx={{ flexDirection: "row" }}>
					<Button
						onClick={() => {
							handleScroll(
								-ITEM_WIDTH,
								containerRef,
								scrollPosition,
								setScrollPosition,
							);
						}}
					>
						{"<"}
					</Button>
					<Stack
						style={{
							overflow: "hidden",
							width: "1200px",
							scrollBehavior: "smooth",
						}}
						ref={containerRef}
						onScroll={(e)=>{setScrollPosition(e.target.scrollLeft)}}
					>
						<Box sx={{ display: "flex", direction: "row" }}>
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
										textAlign: "center",
										justifyContent: "center",
										outline: "#374151 2px solid",
										margin: "4px",
									}}
								>
									Voir tout
								</Stack>
							</a>
						</Box>
					</Stack>
					<Button
						disabled={scrollPosition < 800 ? false : true}
						onClick={() => {
							handleScroll(
								ITEM_WIDTH,
								containerRef,
								scrollPosition,
								setScrollPosition,
							);
						}}
					>
						{">"}
					</Button>
				</Stack>
			</Stack>
		);
	}
	return <h1>No movies</h1>;
};

export default Section;
