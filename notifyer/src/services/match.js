const { getMatches } = require("../models/match");

var NRP = require('node-redis-pubsub');
const { getFavorites } = require("../models/user");

var config = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_PASSWORD,
    scope: 'receiver'
};

var nrp = new NRP(config);

const getNotStartedMatches = async () => {
    let matches = await getMatches();
    const now = new Date();
    matches = matches.filter(match => ((new Date(match.startDate)) < now) && ((new Date(match.endDate)) > now) && (match.status !== "LIVE"));
    return matches; 
};

const getNotEndedMatches = async () => {
    let matches = await getMatches();
    const now = new Date();
    matches = matches.filter(match => ((new Date(match.endDate)) <= now) && (match.status !== "ENDED"));
    return matches; 
};

const getLiveMatches = async () => {
    let matches = await getMatches();
    matches = matches.filter(match => match.status === "LIVE");
    return matches; 
};

const emitStartedMatches = async () => {
    let matches = await getNotStartedMatches();
    matches.map(match => nrp.emit('matchBegin', { id: match.id }));
    let favorites = await getFavorites();
    const matchesId = matches.map(match => match.id);
    favorites.map(fav => matchesId.includes(fav.matchID) ? console.log({date: `${new Date()}`, type: "match beginned notification", sendTo: `user ${fav.userID}`, message: `the match ${fav.matchID} beginned !`}): null)
};

const emitEndedMatches = async () => {
    let matches = await getNotEndedMatches();
    matches.map(match => nrp.emit('matchEnd', { id: match.id }));
    let favorites = await getFavorites();
    const matchesId = matches.map(match => match.id);
    favorites.map(fav => matchesId.includes(fav.matchID) ? console.log({date: `${new Date()}`, type: "match ended notification", sendTo: `user ${fav.userID}`, message: `the match ${fav.matchID} ended !`}): null)
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const emitScoreMatches = async () => {
    let matches = await getLiveMatches();
    let favorites = await getFavorites();
    matches.map(match => {
        const random = getRandomInt(3);
        if (random === 1) {
            nrp.emit('matchScore', { id: match.id, whoScored: match.competitor1 });
            favorites.map(fav => 
                fav.matchID == match.id ? 
                console.log({date: `${new Date()}`, type: "match score notification", sendTo: `user ${fav.userID}`, message: `team ${match.competitor1} scored !`}) 
                : null)
        }
        else if (random === 2) {
            nrp.emit('matchScore', { id: match.id, whoScored: match.competitor2 });
            favorites.map(fav => 
                fav.matchID == match.id ? 
                console.log({date: `${new Date()}`, type: "match score notification", sendTo: `user ${fav.userID}`, message: `team ${match.competitor1} scored !`}) 
                : null
            )
        }
        return match;
    });
};

module.exports = {
    getNotStartedMatches,
    getNotEndedMatches,
    getLiveMatches,
    emitEndedMatches,
    emitStartedMatches,
    emitScoreMatches,
}