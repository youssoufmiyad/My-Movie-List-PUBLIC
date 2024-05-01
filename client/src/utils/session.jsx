export const connexion = (user) => {
	sessionStorage.setItem("id", user._id);
	sessionStorage.setItem("username", user.username);
	sessionStorage.setItem("email", user.email);
	sessionStorage.setItem("password", user.password);
	sessionStorage.setItem("rates", user.rates);
	sessionStorage.setItem("comments", user.comments);
	sessionStorage.setItem("watchlist", user.watchlist);
	sessionStorage.setItem("favorites", user.favorites)

	window.location.replace("../");
};

export const deconnexion = () => {
	sessionStorage.clear();
	window.location.reload();
};
