const { getMatches, getEvents } = require("../models/match");

const getMatchEvents = async (id) => {
    let events = await getEvents();
    events = events.filter(event => event.matchID == id)
    return events
};

const getAvailables = async () => {
    let matches = await getMatches();
    const now = new Date();
    matches = matches.filter(match => (now < (new Date(match.endDate))));
    return matches;
};

module.exports = {
    getMatchEvents,
    getAvailables,
}