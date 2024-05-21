import { getOneUser } from "./fetchData";

export const updateWatchlist = async (user_id, watchlist) => {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            watchlist: watchlist,

        }),
    };
    const response = await fetch(`http://localhost:3000/users/${user_id}`, requestOptions);
    return await response.json();
}

export const updateFavorites = async (user_id, favorites) => {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            favorites: favorites,

        }),
    };
    const response = await fetch(`http://localhost:3000/users/${user_id}`, requestOptions);
    return await response.json();
}

// Ajoute la critique et l'oeuvre correspondante aux données de l'utilisateur
export const addReview = async (userId,movieId,review) => {
    const user = await getOneUser(null,userId)
    console.log(user)

    const Reviews = user.reviews;

    Reviews.push({ movieId: movieId, content: review });
    console.log(Reviews);

    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            reviews: Reviews,
        }),
    };
    const response = await fetch(
        `http://localhost:3000/users/${userId}`,
        requestOptions,
    );
    console.log(response.json());
};

