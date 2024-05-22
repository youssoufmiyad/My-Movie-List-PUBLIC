import React, { useState } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import hashPassword from "../utils/hashPassword";
import { connexion } from "../utils/session";

const Login = ({ users }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		let userExist = false;
		let actualUser;
		// Identification
		for (let i = 0; i < users.length; i++) {
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
				CONNEXION
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
					sx={{
						input: { backgroundColor: "#202126", color: "#BDBCBD" },
						label: { color: "#FFF" },
					}}
				/>

				<TextField
					id="filled-basic"
					label="mot de passe"
					type="password"
					variant="filled"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					sx={{
						input: { backgroundColor: "#202126", color: "#BDBCBD" },
						label: { color: "#FFF" },
					}}
				/>
				<Button
					type="button"
					onClick={handleSubmit}
					sx={{
						backgroundColor: "#202126", color: "#BDBCBD" 
					}}
				>
					Se connecter
				</Button>
			</Stack>
			<br />
			Pas encore de compte ? <a href="../register"> Inscrivez vous</a>
		</Stack>
	);
};

export default Login;
