export const connexion = (user) => {
	const watchlist = []

	for (let index = 0; index < user.watchlist.length; index++) {
		watchlist.push(user.watchlist[index]);
		
	}

	console.log("User watchlist : ")
	console.log(user.watchlist)
	console.log("Watchlist :")
	console.log(watchlist)

	sessionStorage.setItem("id", user._id);
	sessionStorage.setItem("username", user.username);
	sessionStorage.setItem("email", user.email);
	sessionStorage.setItem("password", user.password);
	sessionStorage.setItem("rates", user.rates);
	sessionStorage.setItem("comments", user.comments);
	sessionStorage.setItem("watchlist", JSON.stringify(user.watchlist));
	sessionStorage.setItem("favorites", user.favorites)
	
	console.log("session watchlist : ")
	console.log(JSON.parse(sessionStorage.getItem("watchlist")))
	// window.location.replace("../");
};

export const deconnexion = () => {
	sessionStorage.clear();
	window.location.reload();
};
