const db = require("../loaders/mySql")

const getMatches = async () => {
    const [matches] = await db.query('SELECT * FROM matches');
    return matches;
};

const getEvents = async () => {
    const [events] = await db.query('SELECT * FROM events');
    return events;
};

const updateMatch = async (id, queryString) => {
    await db.query(`UPDATE matches SET ${queryString} WHERE id=${id}`);
};

const addEvent = async (matchID, homeScore, awayScore, status) => {
    await db.query(`INSERT INTO events (matchID, eventDate, homeScore, awayScore, status) VALUES (${matchID}, '${new Date().toISOString().split(".")[0]}', ${homeScore}, ${awayScore}, "${status}")`);
};

module.exports = {
    getMatches,
    getEvents,
    updateMatch,
    addEvent,
}