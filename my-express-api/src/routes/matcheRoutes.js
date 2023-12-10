const express = require('express');
const router = express.Router();

const db = require("../loaders/mySql");
const { getMatches, addMatch, deleteMatch } = require('../models/match');
const { getMatchesByScore, getUpcomings, getMatchesResults, getMatchById, getMatchExist, updateMatchWithQuery } = require('../services/match');

router.get('/', async (req, res) => {
    try {
        const matches = await getMatches();
        res.status(200).send(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/score/:score', async (req, res) => {
    try {
        const matches = await getMatchesByScore(req.params.score);
        res.status(200).send(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/upcoming', async (req, res) => {
    try {
        const matches = await getUpcomings();
        res.status(200).send(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/results', async (req, res) => {
    try {
        const matches = await getMatchesResults();
        res.status(200).send(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const matches = await getMatchById(req.params.id);
        res.status(200).send(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const {opponent, date, homeTeamScore, awayTeamScore} = req.body;
        const matches = await getMatchExist(opponent, date, homeTeamScore, awayTeamScore);
        if (matches.length > 0) {
            res.status(400).send("matche already exists")
        }
        await addMatch(opponent, date, homeTeamScore, awayTeamScore);
        res.status(201).send({})
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const matches = await getMatchById(req.params.id);
        if (matches.length == 0) {
            res.status(400).send("matche doesn't exist")
        }
        await updateMatchWithQuery(req.params.id, req.body);
        res.status(204).send({})
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const matches = await getMatchById(req.params.id)
        if (matches.length == 0) {
            res.status(400).send("match doesn't exist")
        }
        await deleteMatch(req.params.id);
        res.status(204).send({})
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;