import React, { useState } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import hashPassword from "../utils/hashPassword";
import { connexion } from "../utils/session";

const Login = ({ users }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(
			`Email : ${email} hashed password : ${hashPassword(
				password,
			)} password : ${password}`,
		);
		let userExist = false;
		let actualUser;
		// Identification
		console.log(users);
		for (let i = 0; i < users.length; i++) {
			console.log("mail : ", users[i]);
			if (users[i].email === email) {
				userExist = true;
				actualUser = users[i];
			} else if (users[i].username === email) {
				userExist = true;
				actualUser = users[i];
			}
		}
		if (userExist) {
			console.log("user exist");
		} else {
			console.log("user doesn't exist");
			return;
		}

		// Authentification
		if (hashPassword(password) === actualUser.password) {
			console.log("correct password");
			alert("USER IS CORRECT");

			connexion(actualUser);
		} else {
			console.log("incorrect password");
		}
	};

	return (
		<Stack>
			<Typography
				sx={{
					fontSize: "32px",
				}}
			>
				LOGIN FORM
			</Typography>
			<Stack
				className="form"
				onSubmit={() => {
					console.log("Submit !!");
				}}
			>
				<TextField
					id="filled-basic"
					label="email"
					variant="filled"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>

				<TextField
					id="filled-basic"
					label="password"
					type="password"
					variant="filled"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<Button type="button" onClick={handleSubmit}>
					Submit
				</Button>
			</Stack>
		</Stack>
	);
};

export default Login;
