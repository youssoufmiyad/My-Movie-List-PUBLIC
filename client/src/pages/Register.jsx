import React, { useState, useEffect } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { emailREGEX, passwordREGEX, usernameREGEX } from "../utils/regex";
import hashPassword from "../utils/hashPassword";

const Register = () => {
	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState("");

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	useEffect(() => {
		console.log(usernameREGEX.test(username));
		if (!usernameREGEX.test(username) & (username.length > 1)) {
			setUsernameError("Nom d'utilisateur invalide");
		} else {
			setUsernameError("");
		}
	}, [username]);

	useEffect(() => {
		console.log(emailREGEX.test(email));
		if (!emailREGEX.test(email) & (email.length > 1)) {
			setEmailError("Adresse mail invalide");
		} else {
			setEmailError("");
		}
	}, [email]);

	useEffect(() => {
		if (!passwordREGEX.test(password) & (password.length > 1)) {
			setPasswordError(
				"Le mot de passe doit contenir 8 caractères dont 1 majuscule, 1 minuscule, 1 nombre, et 1 caractère spécial",
			);
		} else {
			setPasswordError("");
		}
	}, [password]);

	useEffect(() => {
		if ((confirmPassword !== password) & (confirmPassword.length > 1)) {
			setConfirmPasswordError("Les mots de passes sont différents");
		} else {
			setConfirmPasswordError("");
		}
	}, [confirmPassword, password]);

	const submitUser = async () => {
		const hashPWD = hashPassword(password);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: username,
				email: email,
				password: hashPWD,
			}),
		};
		const response = await fetch("http://localhost:3000/users", requestOptions);
		return await response.json();
	};

	return (
		<Stack>
			<Typography
				sx={{
					fontSize: "32px",
				}}
			>
				REGISTER FORM
			</Typography>
			<Stack
				className="form"
				onSubmit={() => {
					console.log("Submit !!");
				}}
			>
				<TextField
					error={
						(usernameError === "") | (usernameError.length < 1) ? false : true
					}
					id="filled-basic"
					label="username"
					variant="filled"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					helperText={usernameError}
					sx={{
						input: { backgroundColor: "#202126", color: "#BDBCBD" },
						label: { color: "#FFF" },
					}}
				/>

				<TextField
					error={(emailError === "") | (emailError.length < 1) ? false : true}
					id="filled-basic"
					label="email"
					variant="filled"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					helperText={emailError}
					sx={{
						input: { backgroundColor: "#202126", color: "#BDBCBD" },
						label: { color: "#FFF" },
					}}
				/>

				<TextField
					error={
						(passwordError === "") | (passwordError.length < 1) ? false : true
					}
					id="filled-basic"
					label="password"
					type="password"
					variant="filled"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					helperText={passwordError}
					sx={{
						input: { backgroundColor: "#202126", color: "#BDBCBD" },
						label: { color: "#FFF" },
					}}
				/>

				<TextField
					error={
						(confirmPasswordError === "") | (confirmPasswordError.length < 1)
							? false
							: true
					}
					id="filled-basic"
					label="confirm password"
					type="password"
					variant="filled"
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
					helperText={confirmPasswordError}
					sx={{
						input: { backgroundColor: "#202126", color: "#BDBCBD" },
						label: { color: "#FFF" },
					}}
				/>

				<Button
					type="button"
					onClick={submitUser}
					disabled={
						usernameREGEX.test(username) &
						emailREGEX.test(email) &
						passwordREGEX.test(password) &
						(password === confirmPassword)
							? false
							: true
					}
					sx={{
						backgroundColor: "#202126",
						color: "#BDBCBD",
					}}
				>
					Submit
				</Button>
			</Stack>
			<br />
			Déja membre ? <a href="../login"> Connectez vous</a>
		</Stack>
	);
};

export default Register;
