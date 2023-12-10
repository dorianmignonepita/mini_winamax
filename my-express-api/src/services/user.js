const { getUsers, getFavorites } = require("../models/user");

const getUserFavorites = async (id) => {
    let favorites = await getFavorites();
    favorites = favorites.filter(fav => fav.userID == id);
    return favorites;
};

module.exports = {
    getUserFavorites,
}