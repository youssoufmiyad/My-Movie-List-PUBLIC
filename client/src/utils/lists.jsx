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

