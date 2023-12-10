const { getPlayers, updatePlayer } = require("../models/player");

const getTopScorers = async () => {
    const players = await getPlayers();
    let result = players;
    result.sort(function(a, b) {
        return b.goalsScored - a.goalsScored
    });
    return result
};

const getStats = async () => {
    const players = await getPlayers();
    let stats = players;
    stats = stats.reduce((acc, curr) => {
        acc["goals"] += curr.goalsScored;
        acc["assists"] += curr.assists;
        return acc
    }, {goals: 0, assists: 0})
    return stats;
};

const getPlayersInPosition = async (position) => {
    let players = await getPlayers();
    players = players.filter(player => player.position == position)
    return players;
}

const getPlayerById = async (id) => {
    let players = await getPlayers();
    players = players.filter(player => player.id == id)
    return players
};

const getPlayerExist = async (name, position, number, goalsScored, assists) => {
    let playerExists = await getPlayers();
    playerExists = playerExists.filter((player) => player.name === name && player.position === position && player.number === number && player.goalsScored === goalsScored && player.assists === assists);
    return playerExists;
};

const updatePlayerWithQuery = async (id, fieldsToUpdate) => {
    let query = []
    for (const [key, value] of Object.entries(fieldsToUpdate)) {
        query.push(`${key} = '${value}'`)
    }
    let queryString = query.join(", ");
    await updatePlayer(id, queryString);
};

module.exports = {
    getTopScorers,
    getStats,
    getPlayersInPosition,
    getPlayerById,
    getPlayerExist,
    updatePlayerWithQuery,
}