const db = require("../loaders/mySql")

const getMatches = async () => {
    const [matches] = await db.query('SELECT * FROM matches');
    return matches;
};

const getEvents = async () => {
    const [events] = await db.query('SELECT * FROM events');
    return events;
};

module.exports = {
    getMatches,
    getEvents,
}