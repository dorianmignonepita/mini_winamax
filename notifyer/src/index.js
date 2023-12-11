const { emitStartedMatches, emitEndedMatches, emitScoreMatches } = require("./services/match")

setInterval(async () => {
    await emitStartedMatches();
    await emitEndedMatches();
    await emitScoreMatches();
}, 10000)