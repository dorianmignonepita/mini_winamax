var NRP = require('node-redis-pubsub');
const { beginMatch, endMatch, updateMatchScore } = require('./services/match');

var config = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_PASSWORD,
    scope: 'receiver'
};

var nrp = new NRP(config);

nrp.on('matchBegin', async (data) => {
    const {id} = data;
    await beginMatch(id);
});

nrp.on('matchEnd', async (data) => {
    const {id} = data;
    await endMatch(id);
});

nrp.on('matchScore', async (data) => {
    const {id, whoScored} = data;
    await updateMatchScore(id, whoScored);
});