const { getMatches, updateMatch, addEvent } = require("../models/match");

const beginMatch = async (id) => {
    await updateMatch(id, "status='LIVE'");
};

const endMatch = async (id) => {
    await updateMatch(id, "status='ENDED'");
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
    }
    else if (whoScored === competitor2) {
        await updateMatch(id, `awayScore='${parseInt(awayScore)+1}'`);
    }
    await addEvent(id, whoScored);
};

module.exports = {
    beginMatch,
    endMatch,
    getMatchById,
    updateMatchScore,
}