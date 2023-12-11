const db = require("../loaders/mySql")

const getUsers = async () => {
    const [users] = await db.query('SELECT * FROM users');
    return users;
};

const getFavorites = async () => {
    const [favorites] = await db.query('SELECT * FROM favorites');
    return favorites;
};

module.exports = {
    getUsers,
    getFavorites,
}