import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import { getUsers } from "./utils/fetchData";
import Navbar from "./components/Navbar";
import List from "./pages/List";

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers(setUsers);
	}, []);
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login users={users} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile/:id" element={<Profile />} />
				<Route path="/film" element={<List/>}/>
				<Route path="/film/:id" element={<Detail />} />
			</Routes>
		</Router>
	);
}

export default App;
