const db = require("../loaders/mySql")

const getUsers = async () => {
    const [users] = await db.query('SELECT * FROM users');
    return users;
};

const getFavorites = async () => {
    const [favorites] = await db.query('SELECT * FROM favorites');
    return favorites;
};

const addFavorite = async (userID, matchID) => {
    await db.query(`INSERT INTO favorites (userID, matchID) VALUES (${userID}, ${matchID});`);
};

const deleteFavorite = async (id) => {
    await db.query(`DELETE FROM favorites WHERE id=${id}`);
};

module.exports = {
    getUsers,
    getFavorites,
    addFavorite,
    deleteFavorite,
}