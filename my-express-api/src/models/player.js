const db = require("../loaders/mySql")

const getPlayers = async () => {
    const [players] = await db.query('SELECT * FROM players');
    return players;
};

const addPlayer = async (name, position, number, goalsScored, assists) => {
    await db.query(`INSERT INTO players (name, position, number, goalsScored, assists) VALUES ('${name}', '${position}', ${number}, ${goalsScored}, ${assists});`);
};

const updatePlayer = async (id, queryString) => {
    await db.query(`UPDATE players SET ${queryString} WHERE id=${id}`);
};

const deletePlayer = async (id) => {
    await db.query(`DELETE FROM players WHERE id=${id}`);
}

module.exports = {
    getPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
}