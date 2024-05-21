// API TMDB

export const getMoviesDesc = async (page, setMovies) => {
	const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=primary_release_date.desc&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setMovies(data);
	return data;
};

/**
 * Documentation
 * @param {number} page Chiffre pouvant aller de 1 à la limite de page
 * @param {string} from Date de sortie minimale (format YYYY-MM-DD)
 * @param {string} to Date de sortie maximale (format YYYY-MM-DD)
 * @param {method} setMovies Setter de notre variable state
 * @param {string} order Ordre de tri des films
 * @returns
 */
export const getMoviesInDateRange = async (
	page,
	from,
	to,
	order,
	setMovies,
) => {
	const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${
		from != null ? `&primary_release_date.gte=${from}` : ""
	}${to != null ? `&primary_release_date.lte=${to}` : ""}&sort_by=${
		(order != null) | (order !== "") ? order : "primary_release_date.desc"
	}&api_key=${process.env.API_KEY}`;

	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setMovies(data);
	return data;
};

export const getOneMovie = async (id, setMovie) => {
	const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setMovie(data);
	return data;
};

export const getMovieCredits = async (id, setCast, setCrew) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=fr-FR&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setCast(data.cast);
	setCrew(data.crew);
	return data;
};

export const getVideos = async (id, setVideos) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=fr-FR&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	// info sur la vidéo dans data.result
	setVideos(data);
	return data;
};

export const getGenres = async (setGenres) => {
	const url = `https://api.themoviedb.org/3/genre/movie/list?language=fr&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setGenres(data.genres);
};

// period doit être "day" ou "week"
export const getTrendingMovies = async (page, period, setMovies) => {
	const url = `https://api.themoviedb.org/3/trending/movie/${period}?language=fr-FR&page=${page}&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setMovies(data);
	return data;
};

export const getTopRatedMovies = async (page, setMovies) => {
	const url = `https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=${page}&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setMovies(data);
	return data;
};

export const getSearchResults = async (query, setSearchResults) => {
	const url = `https://api.themoviedb.org/3/search/multi?query=${query}&language=fr-FR&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	console.log(data);
	setSearchResults(data.results);
	return data;
};

export const getStar = async (id, setStar) => {
	const url = `https://api.themoviedb.org/3/person/${id}?language=fr-FR&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setStar(data);
	return data;
};

export const getStarApparitions = async (id, setApparitions) => {
	const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=fr-FR&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setApparitions(data.cast);
	return data.cast;
};

export const getStarImages = async (id, setImages) => {
	const url = `https://api.themoviedb.org/3/person/${id}/images?language=fr-FR&api_key=${process.env.API_KEY}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setImages(data.profiles);
	return data.profiles;
};

// API de notre application

export const getUsers = async (setUsers) => {
	const url = "http://localhost:3000/users";
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	setUsers(data);
	return data;
};

export const getOneUser = async (setUser, id) => {
	const url = `http://localhost:3000/users/${id}`;
	const options = {
		method: "GET",
	};
	const response = await fetch(url, options);
	const data = await response.json();
	if (setUser !== null) {
		if (!data.message) {
			setUser(data);
		} else {
			setUser(null);
		}
	}

	return data;
};
