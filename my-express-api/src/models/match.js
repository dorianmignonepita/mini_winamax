const db = require("../loaders/mySql")

const getMatches = async () => {
    const [matches] = await db.query('SELECT * FROM matches');
    return matches;
};

const addMatch = async (opponent, date, homeTeamScore, awayTeamScore) => {
    await db.query(`INSERT INTO matches (opponent, date, homeTeamScore, awayTeamScore) VALUES ('${opponent}', '${date}', ${homeTeamScore}, ${awayTeamScore});`);
};

const updateMatch = async (id, queryString) => {
    await db.query(`UPDATE matches SET ${queryString} WHERE id=${id}`);
};

const deleteMatch = async (id) => {
    await db.query(`DELETE FROM matches WHERE id=${id}`);
}

module.exports = {
    getMatches,
    addMatch,
    updateMatch,
    deleteMatch,
}