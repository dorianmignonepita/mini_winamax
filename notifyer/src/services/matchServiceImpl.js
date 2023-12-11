const { getMatches } = require("../models/match");

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


module.exports = {
    getNotStartedMatches,
    getNotEndedMatches,
    getLiveMatches
}