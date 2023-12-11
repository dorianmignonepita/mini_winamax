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

const addEvent = async (matchID, whoScored) => {
    await db.query(`INSERT INTO events (matchID, eventDate, whoScored) VALUES (${matchID}, '${new Date().toISOString().split(".")[0]}', "${whoScored}")`);
};

module.exports = {
    getMatches,
    getEvents,
    updateMatch,
    addEvent,
}