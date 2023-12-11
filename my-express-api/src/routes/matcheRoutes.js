const express = require('express');
const router = express.Router();

const { getMatches } = require('../models/match');
const { getMatchEvents, getAvailables } = require('../services/match');

router.get('/', async (req, res) => {
    try {
        const matches = await getMatches();
        res.status(200).send(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/available', async (req, res) => {
    try {
        const matches = await getAvailables();
        res.status(200).send(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id/events', async (req, res) => {
    try {
        const events = await getMatchEvents(req.params.id);
        res.status(200).send(events);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id/events/:field', async (req, res) => {
    try {
        const events = await getMatchEvents(req.params.id);
        res.status(200).send(events.map(e => {
            if(e.hasOwnProperty(req.params.field))
            {
                return {
                    date: e.eventDate,
                    fieldName: req.params.field,
                    newStatus: e[req.params.field]
                }
            }
            return {
                date: e.eventDate,
                fieldName: req.params.field,
            }
        }));
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;