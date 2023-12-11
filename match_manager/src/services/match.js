const { getMatches, updateMatch, addEvent } = require("../models/match");

const beginMatch = async (id) => {
    await updateMatch(id, "status='LIVE'");
    await addEvent(id, 0, 0, "LIVE");
};

const endMatch = async (id) => {
    await updateMatch(id, "status='ENDED'");
    await addEvent(id, 0, 0, "ENDED");
};

const getMatchById = async (id) => {
    let matches = await getMatches();
    matches = matches.filter(match => match.id == id);
    return matches[0]; 
}

const updateMatchScore = async (id, whoScored) => {
    const {competitor1, competitor2, homeScore, awayScore} = await getMatchById(id);
    if (whoScored === competitor1) {
        await updateMatch(id, `homeScore='${parseInt(homeScore)+1}'`);
        await addEvent(id, parseInt(homeScore)+1, parseInt(awayScore), "LIVE");
    }
    else if (whoScored === competitor2) {
        await updateMatch(id, `awayScore='${parseInt(awayScore)+1}'`);
        await addEvent(id, parseInt(homeScore), parseInt(awayScore)+1, "LIVE");
    }
};

module.exports = {
    beginMatch,
    endMatch,
    getMatchById,
    updateMatchScore,
}