const { getMatches, updateMatch } = require("../models/match");

const getMatchById = async (id) => {
    let matches = await getMatches();
    matches = matches.filter(match => match.id == id)
    return matches
};

const getMatchExist = async (opponent, date, homeTeamScore, awayTeamScore) => {
    let matchExists = await getMatches();
    matchExists = matchExists.filter((match) => match.opponent === opponent && match.date === date && match.homeTeamScore === homeTeamScore && match.awayTeamScore === awayTeamScore);
    return matchExists;
};

const updateMatchWithQuery = async (id, fieldsToUpdate) => {
    let query = []
    for (const [key, value] of Object.entries(fieldsToUpdate)) {
        query.push(`${key} = '${value}'`)
    }
    let queryString = query.join(", ");
    await updateMatch(id, queryString);
};

const getMatchesByScore = async (score) => {
    let [homeScore, awayScore] = score.split("-").map(elem => parseInt(elem));
    let matches = await getMatches(); 
    matches = matches.filter(match => match.homeTeamScore === homeScore && match.awayTeamScore === awayScore);
    return matches;
};

const getUpcomings = async () => {
    let matches = await getMatches();
    matches = matches.filter(match => match.homeTeamScore === null && match.awayTeamScore === null);
    return matches;
};

const getLives = async () => {
    let matches = await getMatches();
    const now = new Date();
    matches = matches.filter(match => (now < (new Date(match.endDate))) && (now > (new Date(match.startDate))));
    return matches;
};

const getMatchesResults = async () => {
    const matches = await getMatches();
    let finishedMatches = matches.filter(match => match.homeTeamScore !== null && match.awayTeamScore !== null);
    finishedMatches = finishedMatches.map(({opponent, homeTeamScore, awayTeamScore}) => {
        if (homeTeamScore === awayTeamScore) {
            return {
                opponent,
                result: "Match Nul"
            }
        }
        return {
            opponent,
            result: homeTeamScore > awayTeamScore ? "Gain": "Défaite"
        };
    })
    return finishedMatches;
}

module.exports = {
    getMatchById,
    getLives,
    getMatchExist,
    updateMatchWithQuery,
    getMatchesByScore,
    getUpcomings,
    getMatchesResults,
}