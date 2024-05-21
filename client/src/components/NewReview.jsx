import React,{useState} from "react";
import { Stack } from "@mui/material";
import { addReview } from "../utils/lists";

const NewReview = ({movie}) => {
    const [review, setReview] = useState("");

	return (
		<Stack sx={{ backgroundColor: "#FFF", padding: "20px", margin: "20px" }}>
			<form action="">
				<label htmlFor="comment">Ecrivez votre commentaire</label>
				<textarea
					id="comment"
					className="comment"
					style={{
						width: "100%",
						height: "150px",
						padding: "12px 20px",
						boxSizing: "border-box",
						border: "2px solid #ccc",
						borderRadius: "4px",
						backgroundColor: "#f8f8f8",
						fontSize: "16px",
						fontFamily: "-moz-initial",
						resize: "none",
					}}
					onChange={(e) => {
						setReview(e.target.value);
					}}
				/>

				<button type="button" onClick={(e) => {
						addReview(sessionStorage.getItem("id"),movie.id, review );
					}}>
					Postez
				</button>
			</form>
		</Stack>
	);
};

export default NewReview;
