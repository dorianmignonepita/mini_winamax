const express = require('express');
const router = express.Router();

const db = require("../loaders/mySql");
const { getPlayers, addPlayer, updatePlayer, deletePlayer } = require('../models/player');
const { getTopScorers, getStats, getPlayersInPosition, getPlayerById, getPlayerExist, updatePlayerWithQuery } = require('../services/player');

router.get('/', async (req, res) => {
    try {
        const players = await getPlayers();
        res.status(200).send(players);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/topScorers', async (req, res) => {
    try {
        let result = await getTopScorers();
        res.status(200).send(result.splice(0,3));
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await getStats();
        res.status(200).send(stats);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/position/:position', async (req, res) => {
    try {
        const players = await getPlayersInPosition(req.params.position);
        res.status(200).send(players);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const players = await getPlayerById(req.params.id);
        res.status(200).send(players);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const {name, position, number, goalsScored, assists} = req.body;
        const playerExists = await getPlayerExist(name, position, number, goalsScored, assists);
        if (playerExists.length > 0) {
            res.status(400).send("Player already exists")
        }
        await addPlayer(name, position, number, goalsScored, assists);
        res.status(201).send({})
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const players = await getPlayerById(req.params.id);
        if (players.length == 0) {
            res.status(400).send("Player doesn't exist")
        }
        await updatePlayerWithQuery(req.params.id, req.body);
        res.status(204).send({})
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const players = await getPlayerById(req.params.id);
        if (players.length == 0) {
            res.status(400).send("Player doesn't exist")
        }
        await deletePlayer(req.params.id);
        res.status(204).send({})
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;